const User = require('../models/User');

module.exports = async (req, res, next) => {
    if (!req.session.userId) {
        return res.redirect('/auth/login');
    }

    try {
        // Use await instead of callback
        const user = await User.findById(req.session.userId);

        if (!user) {
            return res.redirect('/auth/login');
        }

        req.user = user; // attach user to request object
        next();
    } catch (error) {
        console.error(error);
        return res.redirect('/auth/login');
    }
};
