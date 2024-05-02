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

detailsRoute.get("/find-feelings", async (req, res) => {
    const { email } = req.query; 
    try {
        const user = await detailsSchema.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ feelings: user.feelings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

detailsRoute.get("/find-entries", async (req, res) => {
    const { email } = req.query;

    try {
        const user = await detailsSchema.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ diary: user.diary });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

detailsRoute.post("/add-entry", async (req, res) => {
    const { email, entry } = req.body;

    try {
        const user = await detailsSchema.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Add the new entry to the user's diary
        user.diary.push(entry);
        await user.save();

        res.status(200).json({ message: "Entry added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

detailsRoute.put("/edit-entry", async (req, res) => {
    const { email, entry } = req.body;

    try {
        const user = await detailsSchema.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Find the index of the entry with the same date as the edited entry
        const entryIndex = user.diary.findIndex(e => e.date === entry.date);
        if (entryIndex === -1) {
            return res.status(404).json({ message: "Entry not found" });
        }

        // Update the entry
        user.diary[entryIndex].entry = entry.entry;
        await user.save();

        res.status(200).json({ message: "Entry updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

detailsRoute.get("/find-avatar", async (req, res) => {
    const { email } = req.query;

    try {
        const user = await detailsSchema.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ avatar: user.avatar });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

detailsRoute.delete("/delete-details", async (req, res) => {
    try {
        const { email } = req.body;

        const deletedUser = await detailsSchema.findOneAndDelete({ email: email });

        if (deletedUser) {
            res.json({ message: 'User deleted successfully', deletedUser });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = detailsRoute;