// controllers/loginUser.js
const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = async (req, res) => {
    try {
        const { username, password } = req.body;

        // 1. Find user by username
        const user = await User.findOne({ username });

        if (!user) {
            req.flash('loginError', 'Invalid username or password');
            return res.redirect('/auth/login');
        }

        // 2. Compare password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            req.flash('loginError', 'Invalid username or password');
            return res.redirect('/auth/login');
        }

        // 3. Store session
        req.session.userId = user._id;

        return res.redirect('/');

    } catch (error) {
        console.error(error);
        req.flash('loginError', 'Something went wrong. Please try again.');
        return res.redirect('/auth/login');
    }
};
