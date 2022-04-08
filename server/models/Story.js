//Mongoose schema for stories
const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema(
  {
    story: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
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

module.exports = mongoose.model("Story", StorySchema);
