const Listing = require("../models/listing.js");
const User = require("../models/user.js");
const Review = require("../models/reviews.js");
const Booking = require("../models/booking.js");

module.exports.dashboard = async (req, res) => {
  const totalListings = await Listing.countDocuments();
  const totalUsers = await User.countDocuments();
  const totalReviews = await Review.countDocuments();
  const totalBookings = await Booking.countDocuments();

  res.render("admin/dashboard.ejs", {
    totalListings,
    totalUsers,
    totalReviews,
    totalBookings,
  });
};

// Listings
module.exports.allListings = async (req, res) => {
  const listings = await Listing.find({}).populate("owner");
  // console.log(listings);
  res.render("admin/listings.ejs", { listings });
};

//Delete Listings
module.exports.deleteListing = async (req, res) => {
  const { id } = req.params;
  const listings = await Listing.findByIdAndDelete(id);
  // console.log(listings);
  return res.redirect("/admin/dashboard");
};

// Users
module.exports.allUsers = async (req, res) => {
  const users = await User.find({});
  res.render("admin/users.ejs", { users });
};

// DELETE USER
module.exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  req.flash("success", "User deleted successfully");
  res.redirect("/admin/users");
};

// Reviews
module.exports.allReviews = async (req, res) => {
  const reviews = await Review.find({}).populate("author");
  // console.log(reviews);
  res.render("admin/reviews.ejs", { reviews });
};

// DELETE REVIEW
module.exports.deleteReview = async (req, res) => {
  const { id } = req.params;
  await Review.findByIdAndDelete(id);
  req.flash("success", "Review deleted successfully");
  res.redirect("/admin/reviews");
};

// Bookings
module.exports.allBookings = async (req, res) => {
  const bookings = await Booking.find({}).populate("user").populate("listing");
  // console.log(bookings);
  res.render("admin/bookings.ejs", { bookings });
};

// DELETE BOOKING
module.exports.deleteBooking = async (req, res) => {
  const { id } = req.params;
  await Booking.findByIdAndDelete(id);
  req.flash("success", "Booking deleted successfully");
  res.redirect("/admin/bookings");
};
