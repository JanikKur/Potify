module.exports.checkUserData = (req, res, next) => {
    
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        return res.sendStatus(400);
    }

    next();
}