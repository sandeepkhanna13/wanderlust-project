const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js");

module.exports.createReview = async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newreview = new Review(req.body.review);
  // console.log(req.body.review);
  newreview.author = req.user._id;
  listing.reviews.push(newreview);
  await listing.save();
  await newreview.save();
  req.flash("success", "New Review Created!");
  res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async (req, res) => {
  let { id, reviewsId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewsId } });
  await Review.findByIdAndDelete(reviewsId);
  req.flash("success", "Review Deleted!");
  res.redirect(`/listings/${id}`);
};
