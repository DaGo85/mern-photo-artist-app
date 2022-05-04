// Route for Gallery
const express = require("express");
const Photo = require("../models/Galleryphoto");
const Router = express.Router();

const fs = require("fs");

//Create image at MongoDB
Router.post(
  "/",
  async (req, res) => {
    const auth = req.currentUser;
    const photo = new Photo(req.body);
    if (auth) {
      try {
        const savedPhoto = await photo.save();
        res.status(200).json(savedPhoto);
      } catch (err) {
        res.status(500).send({
          upload_error: "Error while uploading file...Try again later.",
        });
      }
    } else res.status(403).send("Not authorized");
  },
  (err, req, res, next) => {
    if (err) {
      res.status(500).send({
        upload_error: error.message,
      });
    }
  }
);

//Delete image from MongoDB and server
Router.delete("/:id", async (req, res) => {
  const auth = req.currentUser;
  console.log(req.currentUser);
  if (auth) {
    try {
      const photo = await Photo.findById(req.params.id);
      if (photo.username === req.body.username) {
        try {
          const path = `./galleryimages/${photo.photo}`;
          if (fs.existsSync(path)) {
            fs.unlink(path, function (err) {
              if (err) throw err;
            });
          }
          await photo.delete();
          res.status(200).json("Photo deleted...");
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can only delete your own photos!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else res.status(403).send("Not authorized");
});

//Read imagelist from MongoDB
Router.get("/photos", async (req, res) => {
  try {
    const photos = await Photo.find({});
    photos.reverse();
    res.send(photos);
  } catch (error) {
    res.status(500).send({ get_error: "Error while getting list of photos." });
  }
});

module.exports = Router;
