const Profile = require('../models/profileModel');

// Update profile (requires authentication)
exports.updateProfile = async (req, res) => {
    try {
        const { bio, interests, name } = req.body;
        const username = req.user.username; 

        // Find the user's profile by username and update the fields
        const updatedProfile = await Profile.findOneAndUpdate(
            { username }, 
            { bio, interests, name },
            { new: true } 
        );

        if (!updatedProfile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.status(200).json({ message: 'Profile updated', profile: updatedProfile });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get profile by username (this can be used to fetch the profile for viewing/editing)
exports.getProfile = async (req, res) => {
    try {
        // Find the profile by username and populate posts and replies
        const profile = await Profile.findOne({ username: req.params.username })
            .populate({
                path: 'posts',
                populate: {
                    path: 'replies', // If replies are part of the Post schema
                    model: 'Post'   // Model used for replies
                }
            })
            .populate('replies'); // Populating replies if they are referenced directly

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        // Return the profile data
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.editProfile = async (req, res) => {
    try {
        const { name, bio, interests } = req.body;
        const username = req.user.username; // Assuming username is coming from the JWT token

        // Update profile with the new information
        const updatedProfile = await Profile.findOneAndUpdate(
            { username },
            { name, bio, interests },
            { new: true, runValidators: true } // Return the updated document
        );

        if (!updatedProfile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.status(200).json({ message: 'Profile updated successfully', profile: updatedProfile });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
