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



app.get("/", (req, res) => {
    res.send("i am root");
})

// app.get("/listadd", async (req, res) => {
//     let newListing = new    Listing({
//         title : "dy patil",
//         description : "engineering collefe",
//         price : 880,
//         location : "akurdi",
//         country : "India", 
//     });

//     await newListing.save();
//     console.log(`listADDED`);
//     res.send(`listADDED`);

// })


//INDEX ROUTE
app.get("/listings", async (req, res) => {
    let alllistings = await Listing.find();
    res.render("./listings/index.ejs", { alllistings });
})

//8888888888888888888888888888888888888888888888888888888888888

const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        throw new ExpressError(400, result.error);
    } else {
        next();
    }
}


const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        throw new ExpressError(400, result.error);
    } else {
        next();
    }
}



//88888888888888888888888888888888888888888888888888888888888888888



//NEW ROUTE - To Add the data to the DB
app.get("/listings/new", (req, res) => {
    res.render("./listings/newlistings.ejs");
});

//NEW ROUTE - To the form data to DB  //USAGE OF VALIDATE
app.post("/listings/new", validateListing, wrapAsync(async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");

}));

//NOTE : here the new route is kept before the show route bcoz the compiler
//thinks the "new" is some kind of id and therefore to avoid this here the 
//new route is written before the show route


//SHOW ROUTE - TO THE DATA OF ANY ONE LISTING
app.get("/listings/:id", async (req, res) => {
    let list = await Listing.findById(req.params.id).populate("reviews"); //populatiing the reviews to display them is show route
    res.render("./listings/showlistings.ejs", { list })

})


// EDIT/UPDATE ROUTE - to update the data in the DB
app.get("/listings/:id/edit", async (req, res) => {
    let list = await Listing.findById(req.params.id);
    res.render("./listings/editlistings.ejs", { list });
})

// PUT REQ TO REFLECT THOSE CHANGES IN THE DB
app.put("/listings/:id", async (req, res) => {
    let id = req.params.id;
    let { title, description, image, price, location, country } = req.body;
    const listx = await Listing.findByIdAndUpdate(id, { title: title, description: description, image: image, price: price, location: location, country: country });
    res.redirect("/listings");
})

// DELETE ROUTE - to remove data from the DB
app.delete("/listings/:id", async (req, res) => {
    let id = req.params.id;
    const reslt = await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
});



//Route for Review //VALIDATE FOR REVIEW
app.post("/listings/:id/reviews", validateReview, wrapAsync(async (req, res, next) => {
    let id = req.params.id;
    let list = await Listing.findById(id);
    let review = new Review(req.body.review);
    await review.save();
    list.reviews.push(review);
    await list.save();
    console.log(`New Review Added`);
    res.redirect("./listings/showlistings.ejs");
}))

//Delete route for review
app.delete("./listings/:id/reviews/:reviewId", wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;

    await Review.deleteOne(reviewId);
    res.redirect("./listings/showlistings.ejs");

}))


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