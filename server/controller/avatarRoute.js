const express = require("express");
const avatarSchema = require("../models/avatarSchema");
const avatarRoute = express.Router();

avatarRoute.get("/retrieve", async (req, res) => {
    try {
        const avatars = await avatarSchema.find({});
        res.json(avatars);
    } catch (error) {
        console.error("Error retrieving avatars:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = avatarRoute;
