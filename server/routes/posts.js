//Route for posts
const router = require("express").Router();
const Post = require("../models/Post");
const fs = require("fs");

//Create post at MongoDB
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update post from MongoDB and delete old image from server
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        if (req.body.photo !== post.photo) {
          const path = `./postimages/${post.photo}`;
          if (fs.existsSync(path)) {
            fs.unlink(path, function (err) {
              if (err) throw err;
            });
          }
        }
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can only change your own posts!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete post from MongoDB and delete image from server
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const path = `./postimages/${post.photo}`;
        if (fs.existsSync(path)) {
          fs.unlink(path, function (err) {
            if (err) throw err;
          });
        }
        await post.delete();
        res.status(200).json("Post deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can only delete your own posts!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//Read post from MongoDB
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Read all post from MongoDB
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    posts.reverse();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
