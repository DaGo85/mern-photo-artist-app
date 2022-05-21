//All middleware settings and routes
const express = require("express");

const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");

const galleryRoute = require("./routes/gallery");
const storyRoute = require("./routes/story");
const postRoute = require("./routes/posts");
const contactRoute = require("./routes/contact");
const decodeIDToken = require("./utility/authenticateToken");

const app = express();
app.use(express.json());
app.use(cors());
app.use(decodeIDToken);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`MongoDB Connected...`))
  .catch((err) => console.log(err));

// Serve static assets if in production

app.use(express.static("client/build"));

//ContactRoute
app.use("/api/contact", contactRoute);

//PostRoute
app.use("/api/posts", postRoute);

//StoryRoute
app.use("/api/stories", storyRoute);

//GalleryRoute
app.use("/api/gallery", galleryRoute);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// index.html for all page routes
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
});

//When running on digital ocean, use process.env.PORT
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server Running on port: ${port}`);
});
