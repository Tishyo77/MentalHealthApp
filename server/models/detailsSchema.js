const mongoose = require("mongoose");
const detailsSchema = new mongoose.Schema({
    "email": {type: String},
    "feelings": [{type: String}],
}, {
    collection: "details"
})

module.exports = mongoose.model("detailsSchema", detailsSchema);