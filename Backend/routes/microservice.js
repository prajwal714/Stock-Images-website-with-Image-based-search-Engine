const _ = require("lodash");
const jsonpatch=require("json-patch");
const jwt=require('jsonwebtoken');
const bcrypt = require("bcrypt");
const Joi=require("joi");
const express = require("express");
const app=express();
const JWTPrivateKey="jwt_secret_key";
function validateUser(user)
{
    const schema = {
        username: Joi.string().min(1).required(),
        password: Joi.string().min(5).required()
    }

    return Joi.validate(schema,user);
}

function generateAuthToken(user)
{
    const token=jwt.sign({username: user.username, password: user.password},JWTPrivateKey);
    return token;
}

function auth(req,res,next)
{
    const token=req.header('x-auth-token');
    if(!token)
    return res.status(401).send("Access denied. No token provided");

    try{
        const decoded=jwt.verify(token,JWTPrivateKey);
        req.user=decoded;
        console.log("User authenticated");
        next();
    }
    catch{
        res.status(400).send("Invalid token");
    }
}


app.post("/api/login",async (req,res)=>{
    
    const {error}=validateUser(req.body);
    if(error)
    return res.status(400).send(error.details[0].message);

    let user=_.pick(req.body,['username','password']);
    const salt=await bcrypt.genSalt(10);
    user.password=await bcrypt.hash(user.password,salt);
    const token=generateAuthToken(user);

    res.header('x-auth-token',token).send(_.pick(user,['username','password']));

})

app.post("/api/applyPatch", auth, async (req,res)=>{
    const {doc,patch}=req.body;
     jsonpatch.apply(doc,patch)
     .then((newDoc)=>{
         res.status(200).send(newDoc);
     })
     .catch(err=>{console.log(err)
    res.send(400).send(err)});
})





    





   
})

