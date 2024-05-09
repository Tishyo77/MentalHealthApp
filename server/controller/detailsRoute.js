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

detailsRoute.patch("/update-avatar/:email", async (req, res) => {
    try {
        const { email } = req.params;
        const { avatar } = req.body;

        const user = await detailsSchema.findOne({ email });
        if (!user) {
            console.log('User not found for email:', email);
            return res.status(404).json({ message: "User not found" });
        }

        user.avatar = avatar;
        const savedUser = await user.save();

        res.status(200).json({ message: "Avatar updated successfully" });
    } catch (error) {
        console.error('Error updating avatar:', error);
        res.status(500).json({ message: "Internal server error" });
    }
});

detailsRoute.get("/get-avatar/:email", async (req, res) => {
    try {
      const { email } = req.params;
      const user = await detailsSchema.findOne({ email: email }, { avatar: 1 });
      if (user) {
        res.json({ avatar: user.avatar });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

detailsRoute.post("/update-last-read-book", async (req, res) => {
    const { email, name, author, linkImage, linkBook } = req.body;
  
    try {
      const user = await detailsSchema.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Update the last read book information
      user.lastReadBook = { name, author, linkImage, linkBook };
      await user.save();
  
      res.status(200).json({ message: "Last read book updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
});

detailsRoute.get("/get-last-read-book", async (req, res) => {
    const { email } = req.query;

    try {
        const user = await detailsSchema.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const lastReadBook = user.lastReadBook || {};
        res.status(200).json(lastReadBook);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

detailsRoute.put('/update-last-meditation', async (req, res) => {
    try {
      const { email, name, duration, link } = req.body;
      const updatedDetails = await detailsSchema.findOneAndUpdate(
        { email },
        {
          $set: {
            lastheardMeditation: {
              name: name,
              duration: duration,
              link: link,
            },
          },
        },
        { new: true }
      );
  
      res.json(updatedDetails);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });


module.exports = detailsRoute;