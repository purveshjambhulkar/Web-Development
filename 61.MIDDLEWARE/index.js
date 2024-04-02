const express = require("express");
const app = express();
const ExpressError = require("./ExpressError");


app.get("/" , (req , res)=>{
    // res.send("Lets go for error handling middlewares!!");
    throw new ExpressError (403 , "error hai bhai error hai");

})




app.listen(8080 , (req , res)=> {

})