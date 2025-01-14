const express = require("express");
const transporter = require("../nodemail");
const router = express.Router();

function generateRandomCode() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }
  return code;
}

router.post("/", async (req, res) => {
  const {
    fullName,
    email,
    phone,
    travelDate,
    passengers,
    ageGroup,
    selectedBus,
  } = req.body;
  console.log(req.body);
  try {
    const TicketID = generateRandomCode();
    const mailOptionsUser = {
      from: "akhilmaindola18@gmail.com",
      to: email,
      subject: "Bus Ticket Booking Confirmation",
      text: `Hello ${fullName},

            Your bus ticket booking has been confirmed!

            Bus: ${selectedBus.name}
            TicketID : ${TicketID}
            From: ${selectedBus.from} To: ${selectedBus.to}
            Departure: ${selectedBus.departure}
            Travel Date: ${travelDate}
            Passengers: ${passengers}
            Age Group: ${ageGroup}
            Total Price: ₹${selectedBus.price * passengers}

            Thank you for booking with us!`,
    };
    const mailOptionsDriver = {
      from: "akhilmaindola18@gmail.com",
      to: selectedBus.email,
      subject: "Bus Ticket Booking Confirmation",
      text: `From Move Smart,
            Bus Ticket has been confirmed!
            Name : ${fullName}
            Bus: ${selectedBus.name}
            TicketID : ${TicketID}
            From: ${selectedBus.from} To: ${selectedBus.to}
            Departure: ${selectedBus.departure}
            Travel Date: ${travelDate}
            Passengers: ${passengers}
            Age Group: ${ageGroup}
            Total Price: ₹${selectedBus.price * passengers}

            Make sure to provide the wonderful experience to the passengers.`,
    };
    await transporter.sendMail(mailOptionsUser);
    await transporter.sendMail(mailOptionsDriver);

    res.send({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .send({ error: "Failed to send email. Please try again later." });
  }
});
router.post("/send-email", async (req, res) => {
  try {
    console.log(req.body);
    const { Email } = req.body;
    const mailOptionsDriver = {
      from: "akhilmaindola18@gmail.com",
      to: Email,
      subject: `Bus is near you.`,
    };
    await transporter.sendMail(mailOptionsDriver);
    res.send('Mail sent')
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .send({ error: "Failed to send email. Please try again later." });
  }
});

module.exports = router;
