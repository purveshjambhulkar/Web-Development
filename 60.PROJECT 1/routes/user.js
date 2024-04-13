const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user.js");
const passport = require("passport");


//adding new user
router.get("/signup", (req, res) => {
    res.render("user/signup.ejs");
})

router.post("/signup", async (req, res) => {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    let registeredUser = await User.register(newUser, password);
    //automatic login after signup
    req.login(registeredUser, (err) => {
        if (err) {
            next(err);
        } else {
            console.log(registeredUser);
            res.redirect("/listings");

        }
    })
})


//authenticating the old user //logging in
router.get("/login", (req, res) => {
    res.render("user/login.ejs");
})

router.post("/login",
    passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }),
    async (req, res) => {
        // res.send("you are underarrest !!");
        res.redirect("/listings");
    })


//logout
router.get("/logout", (req, res) => {
    req.logOut((err) => {
        if (err) {
            next(err);
        }
        console.log(`Logged Out Successfully`);
        res.redirect("/listings");
    })
})





module.exports = router;