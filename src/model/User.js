const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true
    },

    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],

    date: {
        type: Date,
        default: Date.now,
        required: true
    }
});

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {expiresIn: '7d'});
  };

module.exports = mongoose.model('User', userSchema);