const express=require('express');
const router=express.Router();
const admin=require('firebase-admin');
const multer=require("multer");

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databseURL: 'https://'
})

const storage=multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null,'public');
        
    },
    filename: function(req,file,cb)
    {
        cb(null,Date.now()+'-'+file.originalname);
    }
});


const upload=multer({
    storage: storage,
    
}).single('file');
//stores the image in local storage and create a reference to the file

router.post('/upload',(req,res)=>{
    console.log(req.body);
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).send(req.file)

    })
});


module.exports=router;