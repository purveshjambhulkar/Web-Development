const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require('method-override');


app.use(methodOverride('_method'));

app.use(express.urlencoded({ extended: true }));

main().then(() => {
    console.log("connection succesful");
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/chitchat');

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));


// let chat1 = new Chat({ from: "purvesh", to: "elon musk", message: "hi bro", created_at: new Date(), })
// chat1.save().then((data) => {
//     console.log(data);
// }).catch((err) => {
//     console.log(err);
// })

app.get("/", (req, res) => {
    res.render("index.ejs");
})

//ROUTE - show all chats
app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    // console.log(chats);
    res.render("chats.ejs", { chats });
})

//ROUTE - to create a new chat
app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
})

//POST req to add new chat to DB
app.post("/chats/new", (req, res) => {
    let { from, to, message, date } = req.body;
    let chat1 = new Chat({ from: from, to: to, message: message, created_at: date });
    chat1.save().then((data) => {
        console.log(data);
    }).catch((err) => {
        console.log(err);

    })
    res.redirect("/chats");

})

//ROUTE - to update chats
app.get("/chats/:id/edit", async (req, res) => {
    let { id } = req.params;
    // console.log(`the id is ${id}`);
    let chat = await Chat.findById(id);

    res.render("edit.ejs", { chat });

})

//PUT REQ TO EDIT 
app.post("/chats/:id", async (req, res) => {
    let { id } = req.params;
    console.log(res.body);
    
    let {message : message} = res.body;
    let UpdatedCHat = await Chat.findByIdAndUpdate(id , {message : message} , {runValidators:true , new:true});
    console.log(UpdatedCHat);
    res.redirect("/chats");
    
})  



//DELETE ROUTE
app.delete("/chats/:id" , async (req , res)=>{
    let {id} = req.params;
    let delChat = await Chat.findByIdAndDelete(id);
    console.log(delChat);
    
    res.redirect("/chats");
})


app.listen(8080, () => {
    console.log(`THE PORT IS LISTENING AT 8080`);
});