const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");
// todo: remove
// related to sending password reset email
const config = require("../config/key");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const moment = require("moment");
// Set the time in KST on the heroku server
require("moment-timezone");
moment.tz.setDefault("Europe/Berlin");

const dotenv = require("dotenv");
dotenv.config();

//=================================
//             User
//=================================

router.post("/login", (req, res) => {
  // Find the requested email in DB
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "There is no user with this email.",
      });
    }
    // If the user is found, check if the password is the same
    user.comparePassword(req.body.password, (err, isSame) => {
      if (!isSame)
        return res.json({
          loginSuccess: false,
          message: "Please enter the correct password.",
        });

      // If the password is the same, create a token
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // There are various ways to store tokens, such as cookies, local storage, and session.
        // use cookies here
        res.cookie("cookie_authExp", user.tokenExp);
        res
          .cookie("cookie_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

router.post("/register", (req, res) => {
  // When the client receives the necessary information when registering as a member, it is put into the DB.
  const user = new User(req.body); // req.body is possible because there is bodyParser.

  user.save((err, userInfo) => {
    // In case of failure or success, it is sent to the user in JSON format.
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
      userInfo: userInfo,
    });
  });
});

// auth is middleware. After receiving a request, but before passing a callback function.
router.get("/auth", auth, (req, res) => {
  // That the middleware has passed so far = authentication succeeded
  // Select the relevant user's information and send it to the frontend.
  res.status(200).json({
    _id: req.user.id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    username: req.user.username, //possible error name/username maybe wrong
    role: req.user.role,
  });
});

// Log out. The reason that the auth middleware is added is because you are logged in before logout.
router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "", tokenExp: "" },
    (err, user) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  );
});

// API to send password reset mail
router.post("/forgot", (req, res) => {
  if (req.body.email === "") {
    req.status(400).send({ message: "Please enter your e-mail." });
  }

  // Find the requested email in DB
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      console.error("email not in database");
      return res.json({
        emailInDB: false,
        message: "email not found",
      });
    } else {
      // If the user is found, create a hash token
      // Using moment().valueOf() instead of Date.now()
      // to use the same time value no matter where the server is in the world
      const resetToken = crypto.randomBytes(20).toString("hex");
      user.resetPwdToken = resetToken;
      user.resetPwdExp = moment().valueOf() + 600000; // Valid for 10 minutes
      user.save();

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: `${process.env.EMAIL_ADDRESS}`,
          pass: `${process.env.EMAIL_PASSWORD}`,
        },
      });

      let tenMinsFromNow = moment().add(10, "minutes").format("LT");

      const message = {
        from: `${config.emailAddress}`,
        to: `${user.email}`,
        bcc: "dgoergens@gmail.com",
        subject: "Password reset guide",
        text:
          "You have been asked to set a new password for the React-boilerplate account.\n" +
          "If you have ever requested, please access the link below and set a new password.\n" +
          `Link is valid up to ${tenMinsFromNow}.\n\n` +
          `localhost:3000/reset/${user.resetPwdToken}\n\n` +
          "If you haven't asked for it, please ignore the email. Your password will remain unaltered and secure.\n\n" +
          "MFG D. Goergens.",
      };

      console.log("Sending email...");
      let sentValid = true;

      transporter.sendMail(message, (err, info) => {
        if (err) {
          console.log("Error sending email: ", err);
          sentValid = false;
          return err;
        } else {
          console.log("E-mail sent complete!", info.response);
        }
      });
      // Why should return be out of sendMail's callback function?
      // That's because nodemailer uses an asynchronous process for sending emails.
      // So the response should be returned after the sendMail function.
      // If you put return in sendMail's callback function, the response doesn't come even if it dies!
      if (sentValid) {
        return res.status(200).json({
          message: "password reset mail sent",
        });
      } else {
        return res.status(500).json({
          message: "Email sending failed",
        });
      }
    }
  });
});

// Password reset API
router.post("/reset", (req, res) => {
  // , next was the third parameter
  User.findOne({
    resetPwdToken: req.body.resetPwdToken,
    resetPwdExp: { $gt: moment().valueOf() },
  })
    .then((user) => {
      if (!user) {
        return res.json({
          message: "link not valid",
        });
      } else {
        // If there is a user...
        // If the new password matches the old password, reject it
        user.comparePassword(req.body.password, (err, isSame) => {
          if (isSame)
            return res.json({
              pwdNotChanged: true,
              message:
                "Same as the old password. Please enter a different password.",
            });
          // If this gate has been crossed, update to the new password.
          user.password = req.body.password;
          user.resetPwdToken = null;
          user.resetPwdExp = null;

          user.save((err, userInfo) => {
            // In case of failure or success, it is sent to the user in JSON format.
            if (err) return res.json({ success: false, err });
            return res.status(200).json({
              success: true,
              userInfo: userInfo,
            });
          });
        });
      }
    })
    .catch((err) => {
      console.log("Password reset error.\n", err);
    });
});

module.exports = router;
