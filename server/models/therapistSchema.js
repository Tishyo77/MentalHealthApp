const mongoose = require("mongoose");

const therapistSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    phone: { type: String }, 
    address: { type: String },
    state: { type: String },
    country: { type: String },
    verification: { type: String },
    approved: { type: Boolean }, 
}, {
    collection: "therapists"
});

module.exports = mongoose.model("therapist", therapistSchema);
