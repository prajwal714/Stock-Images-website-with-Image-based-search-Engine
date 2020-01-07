const _ =require("lodash");

const bcrypt=require("bcrypt");
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

    user=new User(_.pick(req.body,['username',"password"]));
    const salt=await bcrypt.genSalt(10);
    user.password=await bcrypt.hash(user.password,salt); 
    await user.save();

   
    await console.log("Succesfully regitered user",user);
    const token = user.generateAuthToken();
  
    res.header('x-auth-token',token).send(_.pick(user, ["_id","username", "password"]));
})



module.exports=router;