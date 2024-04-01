# **Project 1**

## **Phase 1 - Basic Setup**



### **Installation**

To install the project, you need to follow these **steps**:

1. npm init -y
2. npm i express
3. npm i ejs
4. npm i method-override
5. npm i mongoose

### **Basic setup**

- #### Setting up the *app.js* :

```
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "views"));
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname , "/public")));


app.listen(8080, () => {
    console.log("THE PORT IS 8080");

})
```

- #### Basic Database setup (Mongoose)

```
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(() => {
    console.log(`CONNECTION SUCCESFUL`);
}).then((err) => {
    // console.log(err);

})

async function main() {
    await mongoose.connect(MONGO_URL);
}
```

- #### Creating listing schema inside */models* as *listing.js*

```
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQocfSg8XYL_zvHMr4Oba4_neZTRgN1t0aTOw&usqp=CAU",
        set: (v) =>
            v === "" ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQocfSg8XYL_zvHMr4Oba4_neZTRgN1t0aTOw&usqp=CAU" : v,

    },
    price: {
        type: Number,
    },
    location: {
        type: String,
    },
    country: {
        type: String,
    },

})


const Listing = mongoose.model("Listing", ListingSchema);

module.exports = Listing;  
```

- #### Creating basic Route which the displays the listing data using *index.ejs*

```//INDEX ROUTE
app.get("/listings", async (req, res) => {
    let alllistings = await Listing.find();
    res.render("./listings/index.ejs", { alllistings });
})
```

- #### Inserting all the data present in /init - *data.js* into the database using the *index.js* file 

```const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(() => {
    console.log(`CONNECTION SUCCESFUL`);
}).then((err) => {
    console.log(err);

})

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async ()=>{
    await Listing.deleteMany({});
    
    await Listing.insertMany(initData.data);
    console.log(`data inserted successfully`);
    
}

initDB();
```


### **CRUD OPERATIONS**

- #### SHOW ROUTE 
This route show the data of  a specific listing by its id. 

```
//SHOW ROUTE - TO THE DATA OF ANY ONE LISTING
app.get("/listings/:id", async (req, res) => {
    let list = await Listing.findById(req.params.id);
    res.render("./listings/showlistings.ejs", { list })

})
```

- #### EDIT ROUTE
This  route renders the edit page for a given listing  and gets the data from that listing to populate the form fields with the current values in the database.

```
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
```

- #### NEW ROUTE
The new route renders the form for creating a new listing and sends that information to be saved into  the database.

```
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
```

- #### DELETE ROUTE
This  route is used for deleting a listing from the database. It takes an ID as parameter and then it finds that particular listing using its ID and deletes.

```
// DELETE ROUTE - to remove data from the DB
app.delete("/listings/:id", async (req, res) => {
    let id = req.params.id;
    const reslt = await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
});
```

## **Phase 1 - Completed**

## **Phase 2**

## Installation and Setup of Ejs Mate

```
npm i ejs-mate
```

#### Basic Setup

```
const ejsMate = require("ejs-mate");

app.engine("ejs" , ejsMate);
```

