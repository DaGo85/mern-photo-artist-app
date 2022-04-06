//Mongoose schema for story images
const mongoose = require("mongoose");

const StoryphotoSchema = mongoose.Schema(
  {
    photo: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    story: { type: String, required: true },
    orientation: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

const StoryPhoto = mongoose.model("StoryPhoto", StoryphotoSchema);

module.exports = StoryPhoto;
