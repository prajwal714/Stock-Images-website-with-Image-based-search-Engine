const express = require("express");
const router = express.Router();
const Joi = require("joi");

const images = [
  {
    _id: 1,
    url:
      "https://images.pexels.com/photos/2387866/pexels-photo-2387866.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    caption: "random candid picture",
    author: "Prajwal",
    place: "Bangalore"
  },
  {
    _id: 2,
    url:
      "https://images.pexels.com/photos/2305747/pexels-photo-2305747.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    caption: "Beautiful Cityscape",
    author: "Prajwal",
    place: "Bangalore"
  }
];

router.get("/", (req, res) => {
  res.send(images);
});

router.get("/:id", (req, res) => {
  let image = images.find(i => i._id === parseInt(req.params.id));

  if (!image) res.status(404).send("The Image with given id not found");

  res.send(image);
});

router.post("/", (req, res) => {
  let { error } = validateImage(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const newImage = {
    _id: images.length + 1,
    url: req.body.url,
    caption: req.body.caption,
    author: req.body.author,
    place: req.body.place
  };
  images.push(newImage);
  console.log("New Image pushed...");
  res.redirect("/api/images");
});

router.put("/:id", (req, res) => {
  let { error } = validateImage(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let image = images.find(i => i._id === parseInt(req.params.id));
  if (!image) return res.status(404).send("The Image to be updated not found!");
  else {
    console.log("Image found, updating...");
    image.url;
    image.caption = req.body.caption;
    image.author = req.body.author;
    res.send(image);
  }
});

router.delete("/api/images/:id", (req, res) => {
  let image = images.find(i => i._id === parseInt(req.params.id));
  if (!image) return res.status(404).send("The Image to be updated not found!");

  let index = images.indexOf(image);
  images.splice(index, 1);
  console.log("Deleted course... ");
  res.send(image);
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
