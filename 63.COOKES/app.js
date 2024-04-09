const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");



app.use(cookieParser("secret code"));


//ROUTE TO SET COOKIES
app.get("/setcookies" , (req , res)=>{
    res.cookie("name" , "John");
    res.cookie("age" , "20");

    res.send("cookies are set");
})

//ROUTES TO ACCESS THE COOKIES
app.get("/getcookies" , (req , res)=>{
    console.dir(req.cookies);
    res.send("cookies accessed");
})

app.get("/greet" , (req , res)=>{
    const {name} = req.cookies;
    res.send(`welcome ${name}`);
})



//ROUTE FOR SIGNED COOKIES
app.get("/setsignedcookies" , (req ,res)=>{
    res.cookie("color"  , "pink" , {signed : true});
    res.send("signed cookies are set");
})

//accessing signed cookies
app.get("/getsignedcookies" , (req ,res)=>{
    console.dir(req.signedCookies);
    res.send("signed cookies printed");
})





app.get("/user", (req, res) => {
    res.send("working");
})


app.listen(8080, () => {
    console.log(`server started`);

})