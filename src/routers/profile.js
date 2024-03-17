const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const UserProfile = require('../model/UserProfile');

router.use(bodyParser.json());

// Route: Add profile details  POST: "/api/profile/add"
router.post('/add', fetchuser, [
    body('username', "Username must be at least 3 characters long.").isLength({ min: 3 }),
    body('bio', "Bio must be at least 5 characters long").isLength({ min: 5 }),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const image = req.body.profileImage ? req.body.profileImage.replace(/^.*[\\\/]/, '') : '';

        const profile = await UserProfile.create({
            user: req.user.id,
            username: req.body.username,
            profileImage: image,
            bio: req.body.bio
        });

        res.json({ success: true, profile });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// Route: View profile  GET: "/profile/view"
router.get('/view', fetchuser, async (req, res) => {
    try {
        const profiles = await UserProfile.find({ user: req.user.id });
        res.json(profiles);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Route: Delete profile  DELETE: "/api/profile/delete/:id"
router.delete('/delete/:id', fetchuser, async (req, res) => {
    try {
        const profile = await UserProfile.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if (!profile) {
            return res.status(404).json({ success: false, message: "Profile not found" });
        }
        res.json({ success: true, profile, message: 'Profile has been deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// Route: Update profile by the user  PUT: "/api/profile/update/:id"
router.put('/update/:id', fetchuser, async (req, res) => {
    try {
        const { username, bio, profileImage } = req.body;

        const updateProfile = {};
        if (username) updateProfile.username = username;
        if (bio) updateProfile.bio = bio;
        if (profileImage) updateProfile.profileImage = profileImage.replace(/^.*[\\\/]/, '');

        const profile = await UserProfile.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            { $set: updateProfile },
            { new: true }
        );

        if (!profile) {
            return res.status(404).json({ success: false, message: "Profile not found" });
        }

        res.json({ success: true, profile });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

module.exports = router;
