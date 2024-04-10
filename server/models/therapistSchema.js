const mongoose = require("mongoose");

const therapistSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    phone: { type: String }, // Changed from Number to String
    address: { type: String },
    locality: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    verification: { type: String },
    approved: { type: Boolean }, // Changed from String to Boolean
}, {
    collection: "therapist"
});

module.exports = mongoose.model("therapist", therapistSchema);
