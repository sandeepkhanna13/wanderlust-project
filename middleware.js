const Listing = require("./models/listing.js");
const Review = require("./models/reviews.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema } = require("./schema.js");
const { reviewsSchema } = require("./schema.js");
const { bookingSchema } = require("./schema.js");

module.exports.isLogdin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "you must be logged in to do this!");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing.owner._id.equals(req.user._id)) {
    req.flash("error", "you are not the owner of this listing");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
  let { id, reviewsId } = req.params;
  let review = await Review.findById(reviewsId);
  if (!review.author._id.equals(req.user._id)) {
    req.flash("error", "you did not create this review");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

//Server Side validation of Listing Middleware.
module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  // console.log(result);
  if (error) {
    next(new ExpressError(400, error));
  } else {
    next();
  }
};

//Server Side validation of reviwes Middleware.
module.exports.validateReview = (req, res, next) => {
  let { error } = reviewsSchema.validate(req.body);

  if (error) {
    next(new ExpressError(400, error));
  } else {
    next();
  }
};

//Server Side validation of booking Middleware.
module.exports.validateBooking = (req, res, next) => {
  let { error } = bookingSchema.validate(req.body);

  if (error) {
    next(new ExpressError(400, error));
  } else {
    next();
  }
};

module.exports.isAdmin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "Please login first!");
    return res.redirect("/login");
  }

  if (req.user.role !== "admin") {
    req.flash("error", "Access Denied!");
    return res.redirect("/listings");
  }

  next();
};

// const isLoggedIn = (req, res, next) => {
//   if (!req.isAuthenticated()) {
//     req.flash("error", "You must be logged in to create listing!");
//     return res.redirect("/login");
//   }
//   next();
// };

// module.exports = isLoggedIn;

//Use this pattern for require this file.
// const isLoggedIn = require("./middleware/isLoggedIn");
