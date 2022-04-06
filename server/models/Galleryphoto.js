//Mongoose schema for Gallery images
const mongoose = require("mongoose");

const PhotoSchema = mongoose.Schema(
  {
    photo: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
    },
    orientation: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

const Photo = mongoose.model("Photo", PhotoSchema);

module.exports = Photo;
