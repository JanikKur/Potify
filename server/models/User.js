const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        select: false 
    },
    subscriptions: {
        type: Array,
        required: false,
        default: []
    }
});

module.exports = mongoose.model('User', UserSchema);