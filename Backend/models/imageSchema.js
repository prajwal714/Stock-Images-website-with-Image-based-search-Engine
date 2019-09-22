const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var ImageSchema = new Schema({
  title: {
    type: String,

    required: true
  },
  location: {
    type: String,
    required: true
  },
  tags: { type: Array, required: true },
  imageUrl: {
    type: String,
    required: true
  }
});

var Image = mongoose.model("Image", ImageSchema);

module.exports = Image;
