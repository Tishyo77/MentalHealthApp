const mongoose = require("mongoose");

const detailsSchema = new mongoose.Schema({
    email: { type: String, required: true },
    feelings: [{ type: String }],
    diary: [{ date: { type: String, required: true }, entry: { type: String, required: true } }],
    avatar: { type: Number }
}, {
    collection: "details"
});

module.exports = mongoose.model("detailsSchema", detailsSchema);

