const express = require('express');
const app = express();
const path = require('path');
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema } = require("./schema.js");
const { reviewSchema } = require("./schema.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");


const listingsRouter = require("./routes/listings.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "/public")));
app.engine("ejs", ejsMate);


const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(() => {
    console.log(`CONNECTION SUCCESFUL`);
}).then((err) => {
    // console.log(err);

})

async function main() {
    await mongoose.connect(MONGO_URL);
}

//8888888888888888888888888888888888888888888888888888888888888
//dealing with sessions and flash and cookies
const sessionOptions = {
    secret: "mysupersecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        // expires: Date.now() + 60 * 1000, //cookie will expire within one minute
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
}

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//making middleware for implementing flash
app.use((req, res, next) => {
    res.locals.currUser = req.user ;
    req.flash("success", "new lisiting created successfully");
    next();
})
// 
// 8888888888888888888888888888888888888888888888888888888888888888

//using router for routes of listings and reviews

app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewRouter); 
app.use("/", userRouter); 







app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!!!"));
})

app.use((err, req, res, next) => {
    let { statusCode, message } = err;
    res.render("./listings/error.ejs");
    // res.status(statusCode).send(message);   
})


app.listen(8080, () => {
    console.log("THE PORT IS 8080");
})