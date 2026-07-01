const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsycn.js");
const { isLogdin, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js"); //here we are imported complete file.
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLogdin,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createNewListing),
  );

router.get("/new", isLogdin, listingController.renderNewForm);
router.get(
  "/:id/edit",
  isLogdin,
  isOwner,
  wrapAsync(listingController.renderEditForm),
);

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLogdin,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing),
  )
  .delete(isLogdin, isOwner, wrapAsync(listingController.destroyListing));

//Index Route
// router.get("/",wrapAsync(listingController.index));

//New Route
// router.get("/new",isLogdin,listingController.renderNewForm);

//Create Route
// router.post("/",isLogdin,validateListing,wrapAsync(listingController.createNewListing));

//Show Route
// router.get("/:id",wrapAsync(listingController.showListing));

//Edit Route
// router.get("/:id/edit",isLogdin,isOwner,wrapAsync(listingController.renderEditFrom));

//Update Route
// router.put("/:id",isLogdin,isOwner,validateListing,wrapAsync(listingController.updateListing));

//delete Route
// router.delete("/:id",isLogdin,isOwner,wrapAsync(listingController.destroyListing));

module.exports = router;
