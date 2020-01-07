module.exports=function(req,res,next)
{
    //401 Unauthorized
    //403 forbidden
    if(req.user.isAdmin)
    {
        console.log("Admin authenticated");
        next();
    }
    else
    return res.status(403).send("Access Denied");
}