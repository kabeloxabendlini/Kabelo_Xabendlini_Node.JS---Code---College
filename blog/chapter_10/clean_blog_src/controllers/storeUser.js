const User = require('../models/User');

module.exports = async (req, res) => {
    try {
        await User.create(req.body);
        res.redirect('/auth/login');
    } catch (error) {
        console.error(error);
        res.redirect('/auth/register');
    }
};
