const mongoose = require("mongoose");

const detailsSchema = new mongoose.Schema({
    email: { type: String, required: true },
    feelings: [{ type: String }],
    diary: [{ date: { type: String, required: true }, entry: { type: String, required: true } }],
    avatar: { type: String },
    lastReadBook: {
        name: { type: String },
        author: { type: String },
        linkImage: { type: String },
        linkBook: { type: String }
    },
    lastheardMeditation: {
        name: { type: String },
        duration: { type: String },
        link: { type: String }
    }
}, {
    collection: "details"
});

module.exports = mongoose.model("detailsSchema", detailsSchema);

