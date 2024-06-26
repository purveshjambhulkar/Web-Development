const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const { listingSchema } = require("../schema");

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

    //review

    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
})


//Middleware for deleting the reviews on deletion of  a listing 
ListingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
})

const Listing = mongoose.model("Listing", ListingSchema);

module.exports = Listing;   