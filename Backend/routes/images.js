const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const images = require("../models/imageSchema");
const {User} = require("../models/userSchema");

const Joi = require("joi");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const Data = {
  CarouselImages: [
    {
      downloadUrl:
        "https://images.unsplash.com/photo-1509225770129-fbcf8a696c0b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
    },
    {
      downloadUrl:
        "https://images.unsplash.com/photo-1533230050368-fbf55584f7d7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
    },
    {
      downloadUrl: "https://wallpapercave.com/wp/wp2822939.jpg"
    },
    {
      downloadUrl: "https://wallpaperbro.com/img/144488.jpg"
    }
  ],
  galleryImages: [
    {
      id: 1,
      title: "Mountian View",
      tags: ["nature", "morning", "mountains"],
      location: "Darjeeling",
      imageUrl:
        "https://media2.trover.com/T/58989d99761f9f521b0189a2/fixedw_large_4x.jpg"
    },
    {
      id: 2,
      title: "Forest View",
      tags: ["nature", "forest", "trees"],
      location: "Sundarban",
      imageUrl:
        "https://www.forest-trends.org/wp-content/uploads/2017/04/acadia_np_622419-High-Res.jpg"
    },
    {
      id: 3,
      title: "Lake Side view",
      tags: ["nature", "water", "lake"],
      location: "kolkata",
      imageUrl:
        "https://dayhikesneardenver.com/wp-content/uploads/2017/09/lost-lake-near-nederland-cc-bfagan-831x530.jpg"
    },
    {
      id: 4,
      title: "Tiger Action",
      tags: ["wildlife", "tiger", "forest"],
      location: "Jim Corbet",
      imageUrl:
        "https://www.rd.com/wp-content/uploads/2019/07/Close-up-profile-portrait-of-one-Indochinese-tiger-yawning-or-roaring-mouth-wide-open-and-showing-teeth-low-angle-view.jpg"
    },
    {
      id: 5,
      title: "Street Food",
      tags: ["food", "street", "city"],
      location: "varanasi",
      imageUrl:
        "https://d36tnp772eyphs.cloudfront.net/blogs/1/2018/05/shutterstock_540536074-1200x900.jpg"
    }
  ]
};

router.post("/upload", (req, res) => {
  images
    .create(req.body)
    .then(img => {
      console.log(img);
      console.log("image uploaded successfully");
      res.status(200).send("Success");
    })
    .catch(err => console.log(err));
});
router.get("/me", auth,async (req, res) => {
  console.log(req.user);
  const user=await User.findById(req.user._id).select("-password");
  console.log(user);
  res.send(JSON.stringify(user));
});

router.get("/testAuth", [auth, admin], (req, res) => {
  console.log(req.user);
  console.log("This is secret page");
  res.status(200).send("You passed authentication");
});

router.get("/", (req, res) => {
  images.find({}, (err, allImages) => {
    if (err) console.log(err);
    else res.send(allImages);
  });
});

router.get("/:id", (req, res) => {
  let image = images.find(i => i._id === parseInt(req.params.id));

  if (!image) res.status(404).send("The Image with given id not found");

  res.send(image);
});

router.put("/:id", (req, res) => {
  let { error } = validateImage(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let image = Data.galleryImages.find(i => i._id === parseInt(req.params.id));
  if (!image) return res.status(404).send("The Image to be updated not found!");
  else {
    console.log("Image found, updating...");
    image.url;
    image.title = req.body.title;
    image.location = req.body.location;
    //image.author = req.body.author;
    res.send(image);
  }
});

router.delete("/:id", (req, res) => {
  console.log(req.params.id);
  images
    .findByIdAndRemove(req.params.id)
    .then(foundImg => console.log("deleted image" + foundImg))
    .then(res.send(200).message("Image Deleted Successfully"))
    .catch(err => console.log("There was error deleting the image", err));
  // if (!image) return res.status(404).send("The Image to be updated not found!");
});

function validateImage(image) {
  const schema = {
    url: Joi.string().required(),
    caption: Joi.string()
      .min(5)
      .required(),
    author: Joi.string().required()
  };
  let result = Joi.validate(image, schema);

  return result;
}

module.exports = router;
