const Podcast = require('../models/Podcast');

module.exports.isPodcastAuthor = async (req,res,next) => {
    const podcastAuthor = await Podcast.findOne({_id: req.params.id}, {author: 1});
    if(podcastAuthor.author !== req.user._id){
        return res.status(401).json({ msg: "Unauthorized" });
    }
    next();
}