//Route for stories
const router = require("express").Router();
const Story = require("../models/Story");
const fs = require("fs");
const StoryPhoto = require("../models/StoryPhoto");

//Create story at MongoDB
router.post("/story", async (req, res) => {
  const auth = req.currentUser;
  if (auth) {
    const newStory = new Story(req.body);
    try {
      const savedStory = await newStory.save();
      res.status(200).json(savedStory);
    } catch (err) {
      res.status(500).json(err);
    }
  } else res.status(403).send("Not authorized");
});

//Update story at MongoDB
router.put("/story/:id", async (req, res) => {
  const auth = req.currentUser;
  if (auth) {
    try {
      const story = await Story.findById(req.params.id);
      if (story.username === req.body.username) {
        try {
          if (req.body.photo !== story.photo) {
            const path = `./storyimages/${story.photo}`;
            if (fs.existsSync(path)) {
              fs.unlink(path, function (err) {
                if (err) throw err;
              });
            }
          }
          const updatedStory = await Story.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedStory);
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can only change your own story!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else res.status(403).send("Not authorized");
});

//Delete story from MongoDB and images from server
router.delete("/story/:id", async (req, res) => {
  const auth = req.currentUser;
  if (auth) {
    try {
      const story = await Story.findById(req.params.id);
      const storyPhotos = await StoryPhoto.find();
      const deleteStoryPhotos = storyPhotos.filter(
        (s) => s.story === req.params.id
      );

      if (story.username === req.body.username) {
        await StoryPhoto.deleteMany({
          story: req.params.id,
        });
        deleteStoryPhotos.forEach((dsp) => {
          try {
            const path = `./storyimages/${dsp.photo}`;
            if (fs.existsSync(path)) {
              fs.unlink(path, function (err) {
                if (err) throw err;
              });
            }
          } catch (err) {
            res.status(500).json(err);
          }
        });
        try {
          const path = `./storyimages/${story.photo}`;
          if (fs.existsSync(path)) {
            fs.unlink(path, function (err) {
              if (err) throw err;
            });
          }
          await story.delete();
          res.status(200).json("Story deleted...");
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can only delete your own story!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else res.status(403).send("Not authorized");
});

//Read story from MongoDB
router.get("/story/:id", async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    res.status(200).json(story);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Read all stories from MongoDB
router.get("/story", async (req, res) => {
  try {
    const stories = await Story.find();
    stories.reverse();
    res.status(200).json(stories);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Create storygallery image at MongoDB
router.post("/photos", async (req, res) => {
  const auth = req.currentUser;
  if (auth) {
    const newStoryPhoto = new StoryPhoto(req.body);
    try {
      const savedStoryPhoto = await newStoryPhoto.save();
      res.status(200).json(savedStoryPhoto);
    } catch (err) {
      console.log(err.message);
      res.status(500).json(err);
    }
  } else res.status(403).send("Not authorized");
});

//Delete storygallery image from MongoDB and server
router.delete("/photos/:id", async (req, res) => {
  const auth = req.currentUser;
  if (auth) {
    try {
      const storyPhoto = await StoryPhoto.findById(req.params.id);
      if (storyPhoto.username === req.body.username) {
        try {
          const path = `./storyimages/${storyPhoto.photo}`;
          if (fs.existsSync(path)) {
            fs.unlink(path, function (err) {
              if (err) throw err;
            });
          }
          await storyPhoto.delete();
          res.status(200).json("Storyphoto deleted...");
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can only delete your own storyphoto!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else res.status(403).send("Not authorized");
});

//Read storygallery image at MongoDB
router.get("/photos/:id", async (req, res) => {
  try {
    const storyPhoto = await StoryPhoto.findById(req.params.id);
    res.status(200).json(storyPhoto);
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err);
  }
});

//Read all storygallery images at MongoDB
router.post("/photos/storyphotoq", async (req, res) => {
  try {
    let storyPhotoQ = StoryPhoto.aggregate();
    console.log(req.body);
    if (req.body.storyPhotoQuery)
      storyPhotoQ.match({ story: req.body.storyPhotoQuery });
    let result = await storyPhotoQ.exec();
    result.reverse();
    res.status(200).json(result);
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err);
  }
});

module.exports = router;
