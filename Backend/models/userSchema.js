const Joi=require("joi");
const mongoose=require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");
const userSchema=new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
});

userSchema.methods.generateAuthToken=function()
{
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
    return token;
}
const User=mongoose.model('User',userSchema); 

function validateUser(user)
{
    const schema={
        username: Joi.string().min(1).max(50).required(),
        password: Joi.string().min(5).max(255).required()
    }

    return Joi.validate(user,schema);
}




exports.User=User;
exports.validate=validateUser;

