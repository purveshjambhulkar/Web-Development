const express = require("express");
const app = express();
const ExpressError = require("./ExpressError");


// //error handling middleware
// app.use((err , req, res, next)=>{
//     let { status = 444 , message = "error hai bhai error hai part 2"} = err;
//     res.status(status).send(message); 
// })

app.get("/" , (req , res)=>{
    // res.send("Lets go for error handling middlewares!!");\
    res.send("hello")
    
    // throw new ExpressError (444 , "error hai bhai error hai");

})


// Create an admin route & send an error with a 403 status code.

app.get("/admin" , (req , res)=>{
    throw new ExpressError(444 , "Admin ke area me koi entrest nahi kr sakta");
})




app.listen(8080 , (req , res)=> {

})