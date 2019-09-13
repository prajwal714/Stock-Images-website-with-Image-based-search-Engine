const config=require("config");
const startupDebugger=require("debug")("app:startup");
const dbDebugger=require("debug")("app:db");
const morgan=require("morgan");
const helmet = require("helmet");
const express = require("express");
const app = express();


//Routes
const images=require("./routes/images");
const home=require("./routes/home");

//default view engines
app.set('view engine','pug');
app.set('views','./views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());

//configuration
console.log("Application Name: "+config.get("name"));
console.log("Mail Server: "+config.get("mail.host"));
console.log("Password: "+config.get("mail.password"));

 if(app.get("env")==="development")//returns the current environment of our app
 {
     app.use(morgan("tiny"));
     startupDebugger("Morgan Enabled...");
 }

 app.use('/',home);
 app.use("/api/images",images);




const port=process.env.PORT||3000;
app.listen(port,()=>{
    console.log(`server started at PORT ${port}`);
});