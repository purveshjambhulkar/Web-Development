const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require('path');
const flash = require("connect-flash");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));






app.use(cookieParser("secret code"));
app.use(flash());


//ROUTE TO SET COOKIES
app.get("/setcookies", (req, res) => {
    res.cookie("name", "John");
    res.cookie("age", "20");

    res.send("cookies are set");
})

//ROUTES TO ACCESS THE COOKIES
app.get("/getcookies", (req, res) => {
    console.dir(req.cookies);
    res.send("cookies accessed");
})

app.get("/greet", (req, res) => {
    const { name } = req.cookies;
    res.send(`welcome ${name}`);
})



//ROUTE FOR SIGNED COOKIES
app.get("/setsignedcookies", (req, res) => {
    res.cookie("color", "pink", { signed: true });
    res.send("signed cookies are set");
})

//accessing signed cookies
app.get("/getsignedcookies", (req, res) => {
    console.dir(req.signedCookies);
    res.send("signed cookies printed");
})

//=================================================================== 

//dealing with express session

// app.use(session({
//     secret: "this is a secret",
//     resave: false,
//     saveUninitialized: true,
// }))
//another way to do this

const sessionOptions = {
    secret: "this is a secret",
    resave: false,
    saveUninitialized: true,
}

app.use(session(sessionOptions));

//defining a middleware for res.locals.
app.use((req , res, next)=>{
    res.locals.errMsg = req.flash("error");
    res.locals.successMsg = req.flash("success");
    next();
})

app.get("/register", (req, res) => {
    let { name = "unknown" } = req.query;
    req.session.name = name;
    if (name == "unknown") {
        req.flash("error" , "name not registered");
    }else{
        req.flash("success", "registeration completed successfully");
    }
    res.redirect("/hello");
})

app.get("/hello", (req, res) => {
    let { name } = req.session;
 
    res.render("hello.ejs", { name: name, });
})


//route to count the number of sessions
app.get("/count", (req, res) => {
    if (req.session.count) {
        req.session.count++;
    }
    else {
        req.session.count = 1;
    }

    res.send(`you visitied ${req.session.count} times`);
})





app.get("/user", (req, res) => {
    res.send("working");
})


app.listen(8080, () => {
    console.log(`server started`);

})