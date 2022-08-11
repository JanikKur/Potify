const express = require('express');
const passport = require('../lib/passport');
const { getAllUsers, getUser, login, validateUser, addUser, updateUser, subscribePodcast, logout, deleteUser } = require('../controllers/users');
const validateUserToken = require('../utils/validateUserToken');



const router = express.Router();

router.get('/', getAllUsers); 

router.get('/id/:id', getUser);

router.get('/validate', validateUserToken, validateUser);

router.put('/:id', validateUserToken, updateUser);

router.put('/subscribepodcast/:id', validateUserToken, subscribePodcast);

router.post('/login', passport.authenticate('local', {session: false}), login);

router.post('/', addUser); 

router.delete('/logout', logout)

router.delete('/:id', validateUserToken, deleteUser); 


module.exports = router;
