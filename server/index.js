//
const express = require("express");

const config = require("./config/key");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");

const galleryRoute = require("./routes/gallery");
const storyRoute = require("./routes/story");
const postRoute = require("./routes/posts");
const contactRoute = require("./routes/contact");

const app = express();
app.use(express.json());
app.use(cors());

//Connect to MongoDB
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`MongoDB Connected...`))
  .catch((err) => console.log(err));

// Middleware
// 1. application/x-www-form-urlencoded data analysis
// 2. application-json data analysis
// 3. cookie analysis
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  // index.html for all page routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

//ContactRoute
app.use("/api/contact", contactRoute);

//PostRoute
app.use("/postimages", express.static(path.join(__dirname, "../postimages/")));
app.use("/api/posts", postRoute);

//StoryRoute
app.use(
  "/storyimages",
  express.static(path.join(__dirname, "../storyimages/"))
);
app.use("/api/stories", storyRoute);

//GalleryRoute
app.use("/api/gallery", galleryRoute);
app.use(
  "/galleryimages",
  express.static(path.join(__dirname, "../galleryimages/"))
);

//Multer storage settings for galleryimages
const storagegallery = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "galleryimages");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

//Multer storage settings for storyimages
const storagestory = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "storyimages");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

//Multer storage settings for postimages
const storagepostimg = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "postimages");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

//Multer image upload settings for all routes
const fileSizeLimitErrorHandler = (err, req, res, next) => {
  if (err) {
    console.log(err.message);
    res.sendStatus(413);
  } else {
    next();
  }
};

const ffilter = function (req, file, cb) {
  if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
    req.fileValidationError = "Forbidden extension";
    return cb(null, false, req.fileValidationError);
  }
  cb(undefined, true); //Continue with upload
};
const filelimits = { fileSize: 3000000 }; //Max file size 1MB = 1000000 bytes

//Upload settings merged for the different routes (gallery, post, story)
const uploadgallery = multer({
  storage: storagegallery,
  limits: filelimits,
  fileFilter: ffilter,
});

const uploadstory = multer({
  storage: storagestory,
  limits: filelimits,
  fileFilter: ffilter,
});

const uploadpost = multer({
  storage: storagepostimg,
  limits: filelimits,
  fileFilter: ffilter,
});

//Galleryimage upload route
app.post(
  "/api/uploadgallery/",
  uploadgallery.single("file"),
  fileSizeLimitErrorHandler,
  (req, res) => {
    res.status(200).json("Data uploaded!");
  }
);

//Storyimage upload route
app.post(
  "/api/uploadstory/",
  uploadstory.single("file"),
  fileSizeLimitErrorHandler,
  (req, res) => {
    res.status(200).json("Data uploaded!");
  }
);

//Postimage upload route
app.post(
  "/api/uploadpost/",
  uploadpost.single("file"),
  fileSizeLimitErrorHandler,
  (req, res) => {
    res.status(200).json("Data uploaded!");
  }
);

//When running on heroku, use process.env.PORT
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server Running on port: ${port}`);
});
