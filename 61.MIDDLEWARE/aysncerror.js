const express = require("express");
const app = express();



app.get("/" , (req , res)=>{
    res.send("async error handling");
})



app.listen(8080 , ()=>{

})