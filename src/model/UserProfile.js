const mongoose = require('mongoose');
const { Schema } = mongoose;

const userProfileSchema = new Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    username: {
        type: String,
        required: true
    },

    bio: {
        type: String,
        required: true
    },

    profileImage: {
        type: String,
        required: false
    },

});

module.exports = mongoose.model('UserProfile', userProfileSchema);