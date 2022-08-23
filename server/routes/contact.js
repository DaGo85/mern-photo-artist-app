// Route for contact form

const sendgrid = require("@sendgrid/mail");
const router = require("express").Router();

const dotenv = require("dotenv");
dotenv.config();

const apiKey = process.env.SENDGRID_API_KEY;
const sender = process.env.EMAIL_ADDRESS;
sendgrid.setApiKey(apiKey);

router.post("/", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  const msg = {
    to: "devgoergens@gmail.com",
    from: sender,
    subject: `Du hast eine Nachricht von ${name} erhalten!`,
    text: "message",
    html: `<p>Name: ${name}<br/>
           Email: ${email}<br/>
           Message: <pre>${message}</pre></p>`,
  };
  sendgrid
    .send(msg)
    .then((resp) => {
      res.json({ status: "Message Sent" });
    })
    .catch((error) => {
      res.json({ status: "ERROR" });
    });
});

module.exports = router;
