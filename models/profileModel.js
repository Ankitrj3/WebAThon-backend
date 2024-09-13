const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
    },
    interests: {
        type: [String], 
    },
    posts: [{
        type: String, 
    }],
    replies: [{
        type: String, 
    }],
});

module.exports = mongoose.model('Profile', profileSchema);
