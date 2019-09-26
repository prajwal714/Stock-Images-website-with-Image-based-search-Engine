const Joi=require("joi");
const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true
    }
});

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

