const express = require('express');
const router = express.Router();
const { signup, login, googleLogin, facebookLogin } = require('../Controllers/AuthController');
const passport = require('passport');

// Signup
router.post('/signup', signup);

// Login
router.post('/login', login);

// Google Login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('http://localhost:5173');
    }
);

// Facebook Login
// router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
// router.get('/facebook/callback', passport.authenticate('facebook', { session: false }), facebookLogin);



module.exports = router;