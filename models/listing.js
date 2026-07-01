const mongoose = require("mongoose");
const Review = require("./reviews.js");
const { required } = require("joi");
const Schema = mongoose.Schema;
// const {Schema} = mongoose;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  category: {
    type: String,
    enum: [
      "mountains",
      "trending",
      "rooms",
      "iconic-cities",
      "castels",
      "amazing-Pools",
      "camping",
      "farms",
      "arctic",
      "domes",
      "boats",
    ],
    required: true,
  },
});

//Post Midleware for Delete all related reviews from Review collection.when our listing is deleted.
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing.reviews) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
