const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../Models/User');
const config = require('./config')
require('dotenv');

// Serialize/Deserialize User
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

// Google Strategy
passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/api/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
            user = new User({
                googleId: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
                profilePhoto: profile.photos[0].value
            });
            await user.save();
        }
        done(null, user);
    } catch (err) {
        done(err, null);
    }
}));

// Facebook Strategy
// passport.use(new FacebookStrategy({
//     clientID: process.env.FACEBOOK_APP_ID,
//     clientSecret: process.env.FACEBOOK_APP_SECRET,
//     callbackURL: '/auth/facebook/callback',
//     profileFields: ['id', 'displayName', 'photos', 'email']
// }, async (accessToken, refreshToken, profile, done) => {
//     try {
//         let user = await User.findOne({ facebookId: profile.id });
//         if (!user) {
//             user = new User({
//                 facebookId: profile.id,
//                 name: profile.displayName,
//                 email: profile.emails ? profile.emails[0].value : '',
//                 profilePhoto: profile.photos[0].value
//             });
//             await user.save();
//         }
//         done(null, user);
//     } catch (err) {
//         done(err, null);
//     }
// }));
