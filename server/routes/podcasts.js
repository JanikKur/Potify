const express = require('express');
const { getAllPodcasts, getPodcast, getPodcastByIds, getPodcastsByAuthor, getPodcastsByTitle, playPodcast, updatePodcast, addPodcast, deletePodcast, addEpisode } = require('../controllers/podcasts');
const saveFile = require('../utils/saveFile');
const validateUserToken = require('../utils/validateUserToken');

const router = express.Router();

//Get all podcasts
router.get('/', getAllPodcasts);

//Get all podcasts from author
router.get('/author/:id', getPodcastsByAuthor);

//Get a Podcast by its author
router.get('/title/:title', getPodcastsByTitle);

//Get a specific podcast
router.get('/id/:id', getPodcast);

//Get a specific podcast
router.get('/ids/:ids', getPodcastByIds);

//Play a specific episode
router.get('/play/:file', playPodcast);

//Update a podcasts
router.put('/:id', validateUserToken, updatePodcast);

//Adds a Episode to a Podcast
router.put('/addEpisode/:id', [validateUserToken, saveFile], addEpisode);

//Add new podcast
router.post('/', [validateUserToken, saveFile], addPodcast);

//Delete a podcast
router.delete('/:id', deletePodcast);

module.exports = router;