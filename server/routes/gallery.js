// Route for Gallery
const express = require("express");
const Photo = require("../models/Galleryphoto");
const Router = express.Router();

const fs = require("fs");

//Create image at MongoDB
Router.post("/", async (req, res) => {
  const auth = req.currentUser;
  const photo = new Photo(req.body);
  if (!auth) res.status(403).send("Nicht autorisiert!");
  try {
    const savedPhoto = await photo.save();

    res.status(200).json(savedPhoto);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete image from MongoDB and server
Router.delete("/:id", async (req, res) => {
  const auth = req.currentUser;
  if (!auth) res.status(403).send("Nicht autorisiert!");
  try {
    const photo = await Photo.findById(req.params.id);
    if (photo.username !== req.body.username)
      res.status(401).json("Es können nur die eigenen Fotos gelöscht werden!");

    const path = `./galleryimages/${photo.photo}`;
    if (fs.existsSync(path)) {
      fs.unlink(path, function (err) {
        if (err) throw err;
      });
    } else {
      res.status(403).send("Die Datei existiert nicht!");
    }

    await photo.delete();

    res.status(200).json("Foto gelöscht...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//Read imagelist from MongoDB
Router.get("/photos", async (req, res) => {
  try {
    const photos = await Photo.find({});

    photos.reverse();

    res.send(photos);
  } catch (error) {
    res.status(500).json(err);
  }
});

module.exports = Router;
