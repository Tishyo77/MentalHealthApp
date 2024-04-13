const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
    "name": {type: String},
    "author": {type: String},
    "linkBook": {type: String},
    "linkImage": {type: String},
}, {
    collection: "books"
})

module.exports = mongoose.model("bookSchema", bookSchema);