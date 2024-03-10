const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    "email": {type:String},
    "password": {type:String},
    "name": {type:String},
}, {
    collection: "users"
})

module.exports = mongoose.model("userSchema", userSchema);