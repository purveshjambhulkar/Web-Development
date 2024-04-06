const mongoose = require("mongoose");

main().then(() => {
    console.log(`Connection Successfull !!`);

}).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/RelationDemo');

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}



const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },

    address: [
        {
            _id: false, // now there will no auto id generated for this field
            location: {
                type: String,
            },
            city: {
                type: String,
            },
        },
    ],
});

const User = mongoose.model("User", UserSchema);

const addUsers = async (name, loc, city) => {
    let user1 = new User({
        name: name,
        address: [{
            location: loc,
            city: city,
        }]
    })

    //another mehtod to add address
    // user1.address.push({
    //     location: "ombul nagar",
    //     city: "pakistian",
    // });

    let result = await user1.save();
    console.log(result);
};

const addMoreAddress = async (name, loc, city) => {
    let user = await User.findOne({ name: name });
    user.address.push({
        location: loc,
        city: city,
    })

    let result = await user.save();
    console.log(result);

};

// addUsers("purvesh", "jambhul", "pune");
// addMoreAddress("purvesh", "delhi", "india");

