const mongoose = require("mongoose");

const meditateSchema = new mongoose.Schema({
    name: { type: String },
    titles: { type: [{type: String}]},
    links: { type: [{type: String}]}, 
}, {
    collection: "meditations"
});

module.exports = mongoose.model("meditations", meditateSchema);
