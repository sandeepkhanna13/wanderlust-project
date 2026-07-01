const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/wrapAsycn.js");
const {
  validateReview,
  isLogdin,
  isReviewAuthor,
} = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

//Reviwes
//Create Reviwes Route
router.post(
  "/",
  isLogdin,
  validateReview,
  wrapAsync(reviewController.createReview),
);

//Delete Reviwes Route
router.delete(
  "/:reviewsId",
  isLogdin,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview),
);

module.exports = router;
