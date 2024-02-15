const express = require("express");
const app = express();
const path = require("path");
let port = 8080;
app.set("view engine" , "ejs");
app.set("views", path.join(__dirname , "/views"));

app.listen(port ,()=>{
    console.log(`the server is listening at ${port}`);  
})

app.get("/" , (req ,res)=>{
    let dice = Math.floor(Math.random() * 6) + 1;
    res.render("dice-roll.ejs" , { num : dice});
})

app.get("/insta/:username" , (req ,res)=>{
    const following = ["purvesh", "viraj" , "om" , "sahil"];
    let follow = Math.floor(Math.random() * 1000000) + 1;
    let {username} = req.params;
    res.render("instagram.ejs" , {name : username , Followers : follow  , following });
})