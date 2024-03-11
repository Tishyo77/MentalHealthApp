const express = require("express");
const detailsSchema = require("../models/detailsSchema");
const detailsRoute = express.Router();

detailsRoute.post("/add-user", async (req, res) => {
    const { email, feelings } = req.body;
    
    try 
    {
        const newUser = new detailsSchema({ email, feelings });
        const savedUser = await newUser.save();
        res.json(savedUser);
    } 
    catch (err) 
    {
        res.status(500).json({ error: err.message });
    }
});

detailsRoute.post("/add-feeling", async (req, res) => {
    const { email, feeling } = req.body;
    try 
    {
        const user = await detailsSchema.findOne({ email });
        if (!user) 
            return res.status(404).json({ message: "User not found" });

        user.feelings.push(feeling);
        if (user.feelings.length > 14) 
            user.feelings.shift();
        await user.save();

        res.status(200).json({ message: "Feeling added successfully" });
    } 
    catch (error) 
    {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = detailsRoute;