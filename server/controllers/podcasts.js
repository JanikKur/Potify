const Podcast = require('../models/Podcast');
const fs = require('fs');
const path = require('path');

const getAllPodcasts = async (req, res) => {
    try {
        const podcasts = await Podcast.find();
        res.status(200).json({ podcasts });
    }
    catch (err) {
        res.status(500).json({ msg: err });
    }
}

const getPodcast = async (req, res) => {
    try {
        const podcast = await Podcast.findOne({ _id: req.params.id });
        res.status(200).json({ podcast });
    }
    catch (err) {
        res.status(500).json({ msg: err });
    }
}

const getPodcastByIds = async (req, res) => {
    try {
        const ids = JSON.parse(req.params.ids);
        const podcasts = await Podcast.find({_id: {$in: ids}});
        res.status(200).json({ podcasts });
    }
    catch (err) {
        res.status(500).json({ msg: err });
    }
}


const getPodcastsByAuthor = async (req, res) => {
    try {
        const podcasts = await Podcast.find({ author: req.params.id });
        res.status(200).json({ podcasts });
    }
    catch (err) {
        res.status(500).json({ msg: err });
    }
}

const getPodcastsByTitle = async (req, res) => {
    try {
        const podcasts = await Podcast.find({ title: req.params.title });
        res.status(200).json({ podcasts });
    }
    catch (err) {
        res.status(500).json({ msg: err });
    }
}

const playPodcast = async (req, res) => {
    const file = path.join(__dirname + '/../public/podcasts/' + req.params.file);
    let stat = null;
    try{
        stat = fs.statSync(file);
    }catch(err){
        return res.status(404).json({ msg: `File "${req.params.file}" not found` });
    }
    const total = stat.size;
    fs.exists(file, (exists) => {
        if (exists) {
            const range = req.headers.range || 'bytes=0-1023';
            const parts = range.replace(/bytes=/, '').split('-');
            const partialStart = parts[0];
            const partialEnd = parts[1];

            const start = parseInt(partialStart, 10);
            const end = partialEnd ? parseInt(partialEnd, 10) : total - 1;
            const chunksize = (end - start) + 1;
            const rstream = fs.createReadStream(file, { start: start, end: end });

            res.writeHead(206, {
                'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
                'Accept-Ranges': 'bytes', 'Content-Length': chunksize,
                'Content-Type': 'audio/mpeg'
            });
            rstream.pipe(res);

        } else {
            res.send('Error - 404');
            res.end();
        }
    });
}

const updatePodcast = async (req, res) => {
    if(req.params.id !== req.user._id) return res.sendStatus(401);
    try {
        const podcast = await Podcast.updateOne({ _id: req.params.id }, { $set: req.body });
        res.status(200).json({ podcast });
    }
    catch (err) {
        res.status(500).json({ msg: err });
    }
}

const addEpisode = async (req, res) => {
    try {
        const podcast = await Podcast.updateOne({ _id: req.params.id }, { $push: { episodes: { ...req.body, date: new Date().getTime() } } });
        res.status(200).json({ podcast });
    }
    catch (err) {
        res.status(500).json({ msg: err });
    }
}


const addPodcast = async (req, res) => {
    try {
        const podcast = await Podcast.create({...req.body, author: req.user._id, date: new Date().getTime()});
        res.status(201).json({ podcast });
    }
    catch (err) {
        res.status(500).json({ msg: err });
    }
}

const deletePodcast = async (req, res) => {
    if(req.params.id !== req.user._id) return res.sendStatus(401);
    try {
        const podcast = await Podcast.deleteOne({ _id: req.params.id });
        res.status(201).json({ podcast });
    }
    catch (err) {
        res.status(500).json({ msg: err });
    }
}

module.exports = {
    getAllPodcasts,
    getPodcast,
    getPodcastByIds,
    getPodcastsByAuthor,
    getPodcastsByTitle,
    playPodcast,
    updatePodcast,
    addPodcast,
    deletePodcast,
    addEpisode
}