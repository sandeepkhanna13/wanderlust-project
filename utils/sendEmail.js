const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// console.log(process.env.EMAIL_USER);
// console.log(process.env.EMAIL_PASS);

async function sendBookingEmail(user, booking, listing) {
  const mailOptions = {
    from: "ramukeshkumar@gmail.com",
    to: user.email,
    subject: "Booking Confirmation 🎉",
    html: `
      <h2>Booking Confirmed!</h2>
      <p><strong>Name:</strong> ${user.username}</p>
      <p><strong>Listing:</strong> ${listing.title}</p>
      <p><strong>Check-In:</strong> ${booking.checkIn}</p>
      <p><strong>Check-Out:</strong> ${booking.checkOut}</p>
      <p><strong>Check-Out:</strong> ${booking.status}</p>
      <p><strong>Total Price:</strong> ₹${booking.totalPrice}</p>
    `,
  };
  await transporter.sendMail(mailOptions);
}

module.exports = sendBookingEmail;
