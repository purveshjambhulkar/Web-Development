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

const listings = require("./routes/listings.js");
const review = require("./routes/review.js");


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


//using router for routes of listings and reviews

app.use("/listings", listings);
app.use("/listings/:id/reviews", review);




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


//8888888888888888888888888888888888888888888888888888888888888






//88888888888888888888888888888888888888888888888888888888888888888





//ROUTES FOR REVIEWS 



//Route for Review //VALIDATE FOR REVIEW
// app.post("/listings/:id/reviews", validateReview, wrapAsync(async (req, res, next) => {
//     let id = req.params.id;
//     let list = await Listing.findById(id);
//     let review = new Review(req.body.review);
//     list.reviews.push(review);
//     await review.save();
//     await list.save();
//     console.log(`New Review Added`);
//     res.render("/listings");
// }))



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