const mongoose = require("mongoose");
const avatarSchema = new mongoose.Schema({
    "id": {type: Number},
    "link": {type: String},
}, {
    collection: "avatars"
})

module.exports = mongoose.model("avatarSchema", avatarSchema);