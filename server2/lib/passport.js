const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local');
const JwtCookieComboStrategy = require('passport-jwt-cookiecombo');
const User = require('../models/User');

passport.use(new JwtCookieComboStrategy({
    secretOrPublicKey: process.env.AUTHENTICATION_SECRET
}, (payload, done) => {
    return done(null, payload.user);
}));

passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findOne({email: username}).select('+password').exec((err, user) => {
            if(err) return done(err);
            if (!user) { return done(null, false); }
            bcrypt.compare(password, user.password, function (err, result) {
                if (err || (result === false)) {
                    return done(null, false);
                }
                if (result === true) {
                    return done(null, user);
                }
            });
        });
    }
));

module.exports = passport;