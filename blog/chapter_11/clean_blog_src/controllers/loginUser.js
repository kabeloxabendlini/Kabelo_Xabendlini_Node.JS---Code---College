// controllers/loginUser.js
const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    const { username, password } = req.body;

    try {
        // 1. Find user by username
        const user = await User.findOne({ username: username });

        if (!user) {
            req.flash('validationErrors', ['User not found']);
            return res.redirect('/auth/login');
        }

        // 2. Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            req.flash('validationErrors', ['Incorrect password']);
            return res.redirect('/auth/login');
        }

        // 3. Save user session
        req.session.userId = user._id;

        return res.redirect('/');
    } catch (error) {
        console.error(error);
        req.flash('validationErrors', ['Something went wrong']);
        return res.redirect('/auth/login');
    }
};
