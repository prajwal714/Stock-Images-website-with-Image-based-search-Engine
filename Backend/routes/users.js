const {User,validate}=require('../models/userSchema');
const mongoose=require("mongoose");
const express=require("express");
const router=express.Router();

router.post('/api/users', async (req,res)=>{
    const {error}=validate(req.body);
    if(error)
    return res.status(400).send(error.details[0].message);

    let user=await User.findOne({username: req.body.username});
    if(user)
    return res.status(400).send("Username already exist");

    user=new User({
        username: req.body.username,
        password: req.body.password
    });
    await user.save();
    await console.log("Succesfully regitered user",user);
    res.send(user);
})



module.exports=router;