const mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/test');

main().then(
    console.log("conextion ")

).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/amazon');

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
    },
    price: {
        type: Number,
        min: [1 , "PRICE VADHAY FUKTYA"],
    },

});

const Book = mongoose.model("Book", bookSchema);

let book1 = new Book({ title: "C ", author: "Ritchie", price: -5 }); //will throw error because of price

book1.save().then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(`THE ERROR IS : `);
    
    console.log(err.errors.price.properties.message);

});