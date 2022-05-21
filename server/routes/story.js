//Route for stories
const router = require("express").Router();
const Story = require("../models/Story");
const StoryPhoto = require("../models/Storyphoto");

//Create story at MongoDB
router.post("/story", async (req, res) => {
  const auth = req.currentUser;
  if (!auth) res.status(403).send("Nicht autorisiert!");

  const newStory = new Story(req.body);

  try {
    const savedStory = await newStory.save();

    res.status(200).json(savedStory);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update story at MongoDB
router.put("/story/:id", async (req, res) => {
  const auth = req.currentUser;
  if (!auth) res.status(403).send("Nicht autorisiert!");

  try {
    const story = await Story.findById(req.params.id);

    if (story.username !== req.body.username)
      res.status(401).json("Nur die eigene Story kann verändert werden!");

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
});

//Delete story from MongoDB
router.delete("/story/:id", async (req, res) => {
  const auth = req.currentUser;
  if (!auth) res.status(403).send("Nicht autorisiert!");

  try {
    const story = await Story.findById(req.params.id);

    if (story.username !== req.body.username)
      res.status(401).json("Nur die eigene Story!");

    await StoryPhoto.deleteMany({
      story: req.params.id,
    });

    await story.delete();

    res.status(200).json("Story gelöscht...");
  } catch (err) {
    res.status(500).json(err);
  }
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
  if (!auth) res.status(403).send("Nicht autorisiert!");

  const newStoryPhoto = new StoryPhoto(req.body);

  try {
    const savedStoryPhoto = await newStoryPhoto.save();

    res.status(200).json(savedStoryPhoto);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete storygallery image from MongoDB
router.delete("/photos/:id", async (req, res) => {
  const auth = req.currentUser;
  if (!auth) res.status(403).send("Nicht autorisiert!");

  try {
    const storyPhoto = await StoryPhoto.findById(req.params.id);

    if (storyPhoto.username !== req.body.username)
      res.status(401).json("Nur das eigene Storyphoto kann gelöscht werden!");

    await storyPhoto.delete();

    res.status(200).json("Storyphoto gelöscht...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//Read storygallery image at MongoDB
router.get("/photos/:id", async (req, res) => {
  try {
    const storyPhoto = await StoryPhoto.findById(req.params.id);

    res.status(200).json(storyPhoto);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Read all storygallery images at MongoDB
router.post("/photos/storyphotoq", async (req, res) => {
  try {
    let storyPhotoQ = StoryPhoto.aggregate();

    if (req.body.storyPhotoQuery)
      storyPhotoQ.match({ story: req.body.storyPhotoQuery });
    let result = await storyPhotoQ.exec();

    result.reverse();

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
