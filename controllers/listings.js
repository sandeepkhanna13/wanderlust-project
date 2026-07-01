const Listing = require("../models/listing.js");

// ✅ Use MAPTILER_TOKEN from .env
const mapToken = process.env.MAPTILER_TOKEN;

// Index route (Find all listings)
module.exports.index = async (req, res) => {
  let { category, country } = req.query;
  let allListings;

  // BOTH category and country
  if (category && country) {
    allListings = await Listing.find({
      category: category,
      country: { $regex: country, $options: "i" },
    });
    return res.render("listings/index.ejs", { allListings });
  }

  // ONLY country
  if (country) {
    allListings = await Listing.find({
      country: { $regex: country, $options: "i" },
    });
    return res.render("listings/index.ejs", { allListings });
  }

  // ONLY category
  if (category) {
    allListings = await Listing.find({ category: category });
    return res.render("listings/index.ejs", { allListings });
  }

  // DEFAULT
  allListings = await Listing.find();
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.createNewListing = async (req, res) => {
  // --- MAPTILER GEOCODING ---
  const locationQuery = req.body.listing.location;
  const maptilerUrl = `https://api.maptiler.com/geocoding/${encodeURIComponent(locationQuery)}.json?key=${mapToken}`;

  try {
    const response = await fetch(maptilerUrl);
    const data = await response.json();

    if (!data.features || data.features.length === 0) {
      req.flash("error", "Location not found. Please try a different address.");
      return res.redirect("/listings/new");
    }

    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };

    // ✅ Assign geometry from MapTiler
    newListing.geometry = data.features[0].geometry;

    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
  } catch (err) {
    console.error("Geocoding error:", err);
    req.flash("error", "Geocoding service failed. Please try again later.");
    res.redirect("/listings/new");
  }
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", {
    listing,
    mapToken: mapToken, // ✅ Using the correct MAPTILER_TOKEN
  });
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }

  let originalImage = listing.image.url;
  originalImage = originalImage.replace("/upload", "/upload/w_250");

  res.render("listings/edit.ejs", { listing, originalImage });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;

  // ✅ Re-geocode if location was updated
  const locationQuery = req.body.listing.location;
  const maptilerUrl = `https://api.maptiler.com/geocoding/${encodeURIComponent(locationQuery)}.json?key=${mapToken}`;

  try {
    const response = await fetch(maptilerUrl);
    const data = await response.json();

    const newListing = await Listing.findByIdAndUpdate(
      id,
      { ...req.body.listing },
      { new: true }
    );

    // ✅ Update geometry if geocoding succeeded
    if (data.features && data.features.length > 0) {
      newListing.geometry = data.features[0].geometry;
    }

    if (typeof req.file !== "undefined") {
      let url = req.file.path;
      let filename = req.file.filename;
      newListing.image = { url, filename };
    }

    await newListing.save();
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
  } catch (err) {
    console.error("Update geocoding error:", err);
    req.flash("error", "Failed to update listing. Please try again.");
    res.redirect(`/listings/${id}/edit`);
  }
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};