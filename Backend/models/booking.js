const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  eventId: { type: String, required: true },
  userId: { type: String, required: true },
  seats: { type: Number, required: true },
  bookingDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", bookingSchema);
