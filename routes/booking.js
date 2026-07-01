const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/wrapAsycn.js");
const { validateBooking, isLogdin } = require("../middleware.js");
const bookingController = require("../controllers/booking.js");

//Booking
//Render Booking From Route
router.get("/new", isLogdin, wrapAsync(bookingController.renderNewForm));
//Create Booking
router.post(
  "/",
  isLogdin,
  validateBooking,
  wrapAsync(bookingController.createBooking),
);
//Show Booking Confomation Page.
router.get("/:bookingid", bookingController.renderBookingConformPage);
//download our ticket.
router.get("/:bookingid/ticket", bookingController.downloadticket);
//cancle booking
router.put(
  "/:bookingid/cancel",
  isLogdin,
  wrapAsync(bookingController.cancelBooking),
);

module.exports = router;
