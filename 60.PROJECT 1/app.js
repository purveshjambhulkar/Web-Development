const express = require('express');
const app = express();
const path = require('path');
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const methodOverride = require('method-override');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

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


//NEW ROUTE - To Add the data to the DB
app.get("/listings/new", (req, res) => {
    res.render("./listings/newlistings.ejs");
});

//NEW ROUTE - To the form data to DB
app.post("/listings/new", async (req, res) => {
    let { title, description, image, price, location, country } = req.body;
    const list = new Listing({ title: title, description: description, image: image, price: price, location: location, country: country });
    await list.save();
    res.redirect("/listings");

});

//NOTE : here the new route is kept before the show route bcoz the compiler
//thinks the "new" is some kind of id and therefore to avoid this here the 
//new route is written before the show route


//SHOW ROUTE - TO THE DATA OF ANY ONE LISTING
app.get("/listings/:id", async (req, res) => {
    let list = await Listing.findById(req.params.id);
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


app.listen(8080, () => {
    console.log("THE PORT IS 8080");

})