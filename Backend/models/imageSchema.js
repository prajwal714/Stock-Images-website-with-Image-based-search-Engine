const mongoose=require("mongoose");
const Schema=mongoose.Schema;

var ImageSchema=new Schema({
    title: {
        type: String,
        default: none,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    tags: [
        { type: String}
    ],
    imageUrl: {
        type: String,
        required: true
    }
});

var Image=mongoose.model('Image',ImageSchema);

module.exports=Image;