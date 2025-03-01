const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../Config/config');

// Signup
const signup = async (req, res) => {
  const { name, email, role, password } = req.body;
  
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    user = new User({ name, email, role, password: await bcrypt.hash(password, 10) });
    await user.save();

    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Google Login
const googleLogin = async (req, res) => {
  
  const { id, displayName, emails, photos } = req.user;
  const email = emails[0].value;
  const profilePhoto = photos[0].value;

  try {
    let user = await User.findOne({ email });
    if (!user) user = await User.create({ name: displayName, email, googleId: id, profilePhoto });

    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, profilePhoto: user.profilePhoto });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Facebook Login
const facebookLogin = async (req, res) => {
  const { id, displayName, emails, photos } = req.user;
  const email = emails[0].value;
  const profilePhoto = photos[0].value;

  try {
    let user = await User.findOne({ email });
    if (!user) user = await User.create({ name: displayName, email, facebookId: id, profilePhoto });

    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, profilePhoto: user.profilePhoto });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};




module.exports = { signup, login, googleLogin, facebookLogin };