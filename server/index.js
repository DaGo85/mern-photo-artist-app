//All middleware settings and routes
const express = require("express");

const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const galleryRoute = require("./routes/gallery");
const storyRoute = require("./routes/story");
const postRoute = require("./routes/posts");
const contactRoute = require("./routes/contact");
const decodeIDToken = require("./utility/authenticateToken");

const whitelist = [process.env.CORS1, process.env.CORS2];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
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

//ContactRoute
app.use("/api/contact", contactRoute);

//PostRoute
app.use("/api/posts", postRoute);

//StoryRoute
app.use("/api/stories", storyRoute);

//GalleryRoute
app.use("/api/gallery", galleryRoute);

//When running on digital ocean, use process.env.PORT
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server Running on port: ${port}`);
});
