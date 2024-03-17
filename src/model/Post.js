const mongoose = require('mongoose');
const { Schema } = mongoose;

const  PostSchema = new Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    title: {
        type: String,
        required: true
    },

    textContent:{
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now,
        required:true
    }

});

module.exports = mongoose.model('Post', PostSchema );