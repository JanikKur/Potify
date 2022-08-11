const mongoose = require('mongoose');

const PodcastSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true
    },
    fileLinks: {
        type: Array,
        required: true
    },
    episodes: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model('Podcast', PodcastSchema);