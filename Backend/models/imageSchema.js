const mongoose=require("mongoose");
const Schema=mongoose.Schema;

var ImageSchema=new Schema({
    imageName: {
        type: String,
        default: none,
        required: true
    },
    imageDate:{
        type: String,
        required: true
    }
});

var Image=mongoose.model('Image',ImageSchema);

module.exports=Image;