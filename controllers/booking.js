const Listing = require("../models/listing.js");
const Booking = require("../models/booking.js");
const sendBookingEmail = require("../utils/sendEmail.js");
const generatePDF = require("../utils/generatePDF.js");

module.exports.renderNewForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("bookings/newBooking.ejs", { listing });
};

module.exports.createBooking = async (req, res) => {
  const id = req.params.id;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }
  const { checkIn, checkOut } = req.body.booking;
  console.log(checkIn);
  console.log(checkOut);

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  console.log(checkInDate);
  console.log(checkOutDate);

  // date validation
  if (checkOutDate <= checkInDate) {
    req.flash(
      "error",
      "Invalid date range. Please ensure your check-out date is after your check-in date.!!",
    );
    return res.redirect(`/listings/${listing._id}`);
  }
  // availability check
  const existingBookings = await Booking.find({
    listing: listing._id,
    status: "confirmed",
    checkIn: { $lt: checkOutDate },
    checkOut: { $gt: checkInDate },
  });

  if (existingBookings.length > 0) {
    req.flash(
      "error",
      "Sorry, this listing is already booked for the selected dates.!!",
    );
    return res.redirect(`/listings/${listing._id}`);
  }

  const days =(checkOutDate - checkInDate) / (1000 * 60 * 60 * 24);
  const price = days * listing.price;

  if (days <= 0) {
    req.flash("error", "Booking must be for at least 1 night.!!");
    return res.redirect(`/listings/${id}`);
  }

  // const newBooking = new Booking({
  //   listing: listing._id,
  //   user: req.user._id,
  //   checkIn: checkIn,
  //   checkOut: checkOut,
  //   totalPrice: price,
  // });

  const newBooking = new Booking({
    listing: listing._id,
    user: req.user._id,
    checkIn: checkInDate,   
    checkOut: checkOutDate, 
    totalPrice: price,
  });

  await newBooking.save();

  console.log("Booking saved");

  req.flash("success", "Booking confirmed 🎉");

  //Generate PDF
  // const pdfPath = generatePDF(newBooking, listing, req.user);

  //Send Email
  // await sendBookingEmail(req.user, newBooking, listing);

  try {
    await sendBookingEmail(req.user, newBooking, listing);
  } 
  catch (err) {
    console.log("Email error:", err.message);
  }

  console.log("Email sending...");

  // return res.redirect(`/listings/${id}`);
  return res.redirect(`/listings/${listing._id}/bookings/${newBooking._id}`);
};

module.exports.renderBookingConformPage = async (req, res) => {
  const booking = await Booking.findById(req.params.bookingid)
    .populate("listing")
    .populate("user");
  res.render("bookings/show.ejs", { booking });
};

module.exports.downloadticket = async (req, res) => {
  // const filePath = `./public/tickets/booking-${req.params.bookingid}.pdf`;
  // res.download(filePath);

  try {
    const booking = await Booking.findById(req.params.bookingid)
      .populate("listing")
      .populate("user");

    if (!booking) {
      return res.status(404).send("Booking not found");
    }

    //generate + download directly
    generatePDF(booking, booking.listing, booking.user, res);

  } 
  catch (err) {
    res.status(500).send("Error generating ticket");
  }

};

module.exports.cancelBooking = async (req, res) => {
  const { bookingid, id } = req.params;
  const booking = await Booking.findById(bookingid);
  if (!booking) {
    req.flash("error", "Booking not found!!!");
    return res.redirect(`/listings/${id}`);
  }

  if (!booking.user.equals(req.user._id)) {
    req.flash("error", "You are not Created This Booking!!!");
    return res.redirect(`/listings/${id}`);
  }

  booking.status = "cancelled";
  await booking.save();
  req.flash("success", "Booking cancelled!!!");
  return res.redirect(`/listings/${id}/bookings/${bookingid}`);
};

// checkIn: { $lt: req.body.booking.checkOut },
// checkOut: { $gt: req.body.booking.checkIn },
// ==============---------=================
// “Purani booking ka start (checkIn)
// nayi booking ke end se pehle hai
// AUR
// purani booking ka end (checkOut)
// nayi booking ke start ke baad hai”
