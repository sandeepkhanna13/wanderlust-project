// const PDFDocument = require("pdfkit");
// const fs = require("fs");
// const path = require("path");

// function generatePDF(booking, listing, user) {
//   const doc = new PDFDocument();

//   const filePath = path.join(
//     __dirname,
//     "../public/tickets",
//     `booking-${booking._id}.pdf`
//   );

//   doc.pipe(fs.createWriteStream(filePath));

//   doc.fontSize(20).text("Booking Confirmation", { align: "center" });

//   doc.moveDown();
//   doc.text(`Name: ${user.username}`);
//   doc.text(`Listing: ${listing.title}`);
//   doc.text(`Check-In: ${booking.checkIn}`);
//   doc.text(`Check-Out: ${booking.checkOut}`);
//   doc.text(`Status: ${booking.status}`);
//   doc.text(`Total Price: ₹${booking.totalPrice}`);

//   doc.end();
//   return filePath;
// }
// module.exports = generatePDF;


const PDFDocument = require("pdfkit");

function generatePDF(booking, listing, user, res) {
  const doc = new PDFDocument();

  //headers for download
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=booking-${booking._id}.pdf`
  );

  //direct response
  doc.pipe(res);

  //PDF content
  doc.fontSize(20).text("Booking Confirmation", { align: "center" });

  doc.moveDown();
  doc.text(`Name: ${user.username}`);
  doc.text(`Listing: ${listing.title}`);
  doc.text(`Check-In: ${booking.checkIn}`);
  doc.text(`Check-Out: ${booking.checkOut}`);
  doc.text(`Status: ${booking.status}`);
  doc.text(`Total Price: ₹${booking.totalPrice}`);

  doc.end();
}

module.exports = generatePDF;