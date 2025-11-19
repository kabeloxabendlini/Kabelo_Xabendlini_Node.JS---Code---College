const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user using async/await (NO CALLBACKS)
        const user = await User.findOne({ username: username });

        if (!user) {
            return res.redirect('/auth/login');
        }

        // Compare hashed password with async/await
        const same = await bcrypt.compare(password, user.password);

        if (!same) {
            return res.redirect('/auth/login');
        }

        // Password correct → login success
        // (session will be added later)
        res.redirect('/');

    } catch (error) {
        console.error(error);
        res.redirect('/auth/login');
    }
};
