const User = require('../models/User');

module.exports = async (req, res, next) => {
    try {
        if (!req.session.userId) {
            // user is NOT logged in → allow access
            return next();
        }

        const user = await User.findById(req.session.userId);

        if (user) {
            // logged in → redirect to home page
            return res.redirect('/');
        }

        next();
    } catch (err) {
        console.error(err);
        next();
    }
};
