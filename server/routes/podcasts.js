const express = require('express');
const { getAllPodcasts, getPodcast, getPodcastByIds, getPodcastsByAuthor, getPodcastsByTitle, playPodcast, updatePodcast, addPodcast, deletePodcast, addEpisode, updateEpisode } = require('../controllers/podcasts');
const { isPodcastAuthor } = require('../utils/isPodcastAuthor');
const pagination = require('../utils/pagination');
const saveFile = require('../utils/saveFile');
const validateUserToken = require('../utils/validateUserToken');

const router = express.Router();

//Get all podcasts
router.get('/', pagination, getAllPodcasts);

//Get all podcasts from author
router.get('/author/:id', pagination, getPodcastsByAuthor);

//Get a Podcast by its author
router.get('/title/:title', pagination, getPodcastsByTitle);

//Get a specific podcast
router.get('/id/:id', getPodcast);

//Get a specific podcast
router.get('/ids/:ids', pagination, getPodcastByIds);

//Play a specific episode
router.get('/play/:file', playPodcast);

//Update a podcasts
router.put('/id/:id', [validateUserToken, isPodcastAuthor, saveFile], updatePodcast);

//Adds a Episode to a Podcast
router.put('/addEpisode/:id', [validateUserToken, isPodcastAuthor, saveFile], addEpisode);

//Adds a Episode to a Podcast
router.put('/updateEpisode/:fileName', validateUserToken, updateEpisode);

//Add new podcast
router.post('/', [validateUserToken, saveFile], addPodcast);

//Delete a podcast
router.delete('/:id', [validateUserToken, isPodcastAuthor], deletePodcast);

module.exports = router;