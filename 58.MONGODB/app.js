const mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/test');

main().then(
    console.log("conextion ")

).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
});

const User = mongoose.model("User", userSchema);


// INSERTING DATA
// const user1 = new User( { name : "ourvesh" , email : "pureshg@gamia.com" , age:19});

// user1.save();

//INSERTING MULTIPLE DATA

// User.insertMany([
//     { name: "adan" ,email : "adam@fmao.com" , age:23 },
//     { name: "rekon" ,email : "rek@fmao.com" , age:232 },
//     { name: "sahi" ,email : "shiti@fmao.com" , age:89 },
// ]).then((data)=>{
//     console.log(data);

// })

// User.find({}).then((data) => {
//     console.log(data);
// }).catch((err) => {
//     console.log(err);

// })


// console.log(`IMPLEMETION OF FIND`);

// User.find({ name: "ourvesh" }).then((data) => {
//     console.log(data);
// }).catch((err) => {
//     console.log(err);

// })

// User.updateOne({ name: "adan" }, { name: "adam" }).then((data) => {
//     console.log(data)
// }).catch((err) => { console.log(err) });

User.deleteOne({ age: 232 }).then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
})