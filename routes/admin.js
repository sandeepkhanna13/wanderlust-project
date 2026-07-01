const express = require("express");
const router = express.Router();
const { isAdmin } = require("../middleware.js");
const adminController = require("../controllers/admin.js");

// dashboard
router.get("/dashboard", isAdmin, adminController.dashboard);
router.get("/bookings", isAdmin, adminController.allBookings);
router.get("/listings", isAdmin, adminController.allListings);
router.get("/users", isAdmin, adminController.allUsers);
router.get("/reviews", isAdmin, adminController.allReviews);
// DELETE routes
router.delete("/listings/:id", isAdmin, adminController.deleteListing);
router.delete("/users/:id", isAdmin, adminController.deleteUser);
router.delete("/reviews/:id", isAdmin, adminController.deleteReview);
router.delete("/bookings/:id", isAdmin, adminController.deleteBooking);
module.exports = router;
