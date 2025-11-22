const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user using await (no callback)
        const user = await User.create({
            username,
            password: hashedPassword
        });

        // Optionally store user session
        req.session.userId = user._id;

        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.redirect('/register'); // or show an error page
    }
};
