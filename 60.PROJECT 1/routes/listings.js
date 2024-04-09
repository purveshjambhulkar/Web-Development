const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");



const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        throw new ExpressError(400, result.error);
    } else {
        next();
    }
}


// router.get("/", (req, res) => {
//     res.send("i am root");
// })



//INDEX ROUTE
router.get("/", async (req, res) => {
    let alllistings = await Listing.find();
    res.render("./listings/index.ejs", { alllistings });
})


//NEW ROUTE - To Add the data to the DB
router.get("/new", (req, res) => {
    res.render("./listings/newlistings.ejs");
});

//NEW ROUTE - To the form data to DB  //USAGE OF VALIDATE
router.post("/new", validateListing, wrapAsync(async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");

}));

//NOTE : here the new route is kept before the show route bcoz the compiler
//thinks the "new" is some kind of id and therefore to avoid this here the 
//new route is written before the show route


//SHOW ROUTE - TO THE DATA OF ANY ONE LISTING
router.get("/:id", async (req, res) => {
    let list = await Listing.findById(req.params.id).populate("reviews"); //populatiing the reviews to display them is show route
    res.render("./listings/showlistings.ejs", { list })

})


// EDIT/UPDATE ROUTE - to update the data in the DB
router.get("/:id/edit", async (req, res) => {
    let list = await Listing.findById(req.params.id);
    res.render("./listings/editlistings.ejs", { list });
})

// PUT REQ TO REFLECT THOSE CHANGES IN THE DB
router.put("/:id", async (req, res) => {
    let id = req.params.id;
    let { title, description, image, price, location, country } = req.body;
    const listx = await Listing.findByIdAndUpdate(id, { title: title, description: description, image: image, price: price, location: location, country: country });
    res.redirect("/listings");
})

// DELETE ROUTE - to remove data from the DB
router.delete("/:id", async (req, res) => {
    let id = req.params.id;
    const reslt = await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
});


module.exports = router;