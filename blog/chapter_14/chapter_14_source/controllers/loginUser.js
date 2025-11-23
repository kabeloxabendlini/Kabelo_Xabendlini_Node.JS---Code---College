const bcrypt = require('bcryptjs'); // match the name with usage
const User = require('../models/User');

module.exports = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user by username
        const user = await User.findOne({ username: username });

        if (!user) {
            return res.redirect('/auth/login'); // user not found
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.redirect('/auth/login'); // wrong password
        }

        // Store user ID in session
        req.session.userId = user._id;

        // Redirect to home page after successful login
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.redirect('/auth/login'); // fallback for errors
    }
};
