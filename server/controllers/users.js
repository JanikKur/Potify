const User = require('../models/User');
const { hashPassword } = require('../utils/hashPassword');
const jwt = require('jsonwebtoken');
const { comparePasswords } = require('../utils/comparePasswords');

//Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users });
    }
    catch (err) {
        res.status(500).json({ msg: err });
    }
}

//Get a specific user
const getUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        res.status(200).json({ user });
    }
    catch (err) {
        res.status(500).json({ msg: err });
    }
}

//Login a User
const login = async (req, res) => {
    jwt.sign({ user: req.user }, process.env.AUTHENTICATION_SECRET, (err, token) => {
        if (err) return res.json(err);
        // Send Set-Cookie header
        res.cookie('jwt', token, {
            httpOnly: true,
            sameSite: 'none',
            secure: true
        });

        delete req.user.password
        res.send(req.user);
        // Return json web token
        return res.json({
            jwt: token
        });
    });
}

//Validate a User
const validateUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user._id });
        res.status(200).json({ user });
    }
    catch (err) {
        res.status(500).json({ msg: err });
    }
}

//Update a User
const updateUser = async (req, res) => {
    if(req.params.id !== req.user._id) return res.sendStatus(401); //Check if user to update is also logged in user
    try {
        let user = null;
        if(req.body.oldPassword && req.body.password){ //Update Password
            const userPassword = await User.findOne({ _id: req.user._id}, {password: 1});
            try{
                await comparePasswords(req.body.oldPassword, userPassword.password);
                const newPassword = await hashPassword(req.body.password);
                user = await User.updateOne({ _id: req.params.id }, { $set: {...req.body, password: newPassword} });
            }catch(err){
                return res.status(400).json({ err });
            }
        }
        else{
            delete req.body.password;
            user = await User.updateOne({ _id: req.params.id }, { $set: req.body });
        }
        
        res.status(200).json({ user });
    }
    catch (err) {
        res.status(500).json({ msg: err });
    }
}

//Subscribe a Podcast
const subscribePodcast = async (req, res) => {
    try {
        const user = await User.updateOne({ _id: req.user._id }, { $addToSet: {subscriptions: req.params.id} });
        res.status(200).json({ user });
    }
    catch (err) {
        res.status(500).json({ msg: err });
    }
}

//Unsubscribe a Podcast
const unsubscribePodcast = async (req, res) => {
    try {
        const user = await User.updateOne({ _id: req.user._id }, { $pull: {subscriptions: req.params.id} });
        res.status(200).json({ user });
    }
    catch (err) {
        res.status(500).json({ msg: err });
    }
}

//Add a User
const addUser = async (req, res) => {
    try {
        let hashedPassword = await hashPassword(req.body.password);
        const user = await User.create({...req.body, password: hashedPassword});
        res.status(201).json({ user });
    }
    catch (err) {
        res.status(500).json({ msg: err });
    }
}

//Logout a User
const logout = async (req, res) => {
    if(req.cookies['jwt']){
        res.clearCookie('jwt')
        res.sendStatus(200)
    }
}

//Delete a User
const deleteUser = async (req, res) => {
    if(req.params.id !== req.user._id) return res.sendStatus(401); //Check if user to update is also logged in user
    try {
        const user = await User.deleteOne({ _id: req.params.id });
        res.status(201).json({ user });
    }
    catch (err) {
        res.status(500).json({ msg: err });
    }
}

module.exports = {
    getAllUsers,
    getUser,
    login,
    validateUser,
    updateUser,
    subscribePodcast,
    unsubscribePodcast,
    addUser,
    logout,
    deleteUser
}