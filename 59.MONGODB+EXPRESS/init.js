const mongoose = require("mongoose");
const Chat = require("./models/chat.js");


main().then(() => {
    console.log("connection succesful");
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/chitchat');

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


// let chat1 = new Chat({ from: "purvesh", to: "elon musk", message: "hi bro", created_at: new Date(), })
// chat1.save().then((data) => {
//     console.log(data);
// }).catch((err) => {
//     console.log(err);
// })

//INSERTING MANY DATA AT ONE TIME

let allChats = [
    { from: "John", to: "Jane", message: "Hi Jane!", created_at: new Date() },
    { from: "Alice", to: "Bob", message: "Hello Bob!", created_at: new Date() },
    { from: "Charlie", to: "David", message: "Hey David, how are you?", created_at: new Date() },
    { from: "Eve", to: "Frank", message: "I'm doing well, thanks!", created_at: new Date() },
    { from: "Grace", to: "Heidi", message: "What are you up to?", created_at: new Date() },
    { from: "Ivan", to: "Judy", message: "Long time no see!", created_at: new Date() },
    { from: "Karen", to: "Leo", message: "Do you want to grab lunch sometime?", created_at: new Date() },
    { from: "Mark", to: "Nina", message: "I'm working on a new project, want to join?", created_at: new Date() },
    { from: "Oliver", to: "Pam", message: "Hey Pam, I found this funny meme...", created_at: new Date() },
    { from: "Quinn", to: "Ryan", message: "Want to catch up this weekend?", created_at: new Date() },
];

Chat.insertMany(allChats);