const nodemailer = require('nodemailer');

// Create a transporter using your email service provider details
const transporter = nodemailer.createTransport({
  secure: true,
  host: 'smtp.gmail.com',
  port: 465,
  auth: {
      user: 'akhilmaindola18@gmail.com', 
      pass: 'jsdo javj rwkg iuec'
  }
});
module.exports = transporter;
// Endpoint for sending the email
// app.post('/sendConfirmationEmail', (req, res) => {
//   const { fullName, email, phone, travelDate, passengers, ageGroup, selectedBus } = req.body;
//     console.log(req.body);
//   const mailOptions = {
//     from: 'satendrakaushik2002@gmail.com',
//     to: email,
//     subject: 'Bus Ticket Booking Confirmation',
//     text: `Hello ${fullName},

//     Your bus ticket booking has been confirmed!

//     Bus: ${selectedBus.name}
//     From: ${selectedBus.from} To: ${selectedBus.to}
//     Departure: ${selectedBus.departure}
//     Travel Date: ${travelDate}
//     Passengers: ${passengers}
//     Age Group: ${ageGroup}
//     Total Price: ₹${selectedBus.price * passengers}

//     Thank you for booking with us!`
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log(error);
//       res.status(500).send('Error sending email');
//     } else {
//       console.log('Email sent: ' + info.response);
//       res.status(200).send('Confirmation email sent');
//     }
//   });
// });
