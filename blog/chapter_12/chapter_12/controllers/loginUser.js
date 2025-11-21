// controllers\loginUser.js - NEW
const User = require('../models/User'); 

module.exports = (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username: username })
        .then(user => {
            if (user) {
                // Keep your existing logic inside this block.
                // You will compare passwords here, create a session, and redirect.
                /* Example logic:
                if (/* password is valid *\/) {
                    req.session.userId = user._id;
                    return res.redirect('/');
                } else {
                    return res.redirect('/auth/login');
                }
                */
               res.redirect('/auth/login'); // Default redirect if no specific logic matched
            } else {
                res.redirect('/auth/login'); // No user found
            }
        })
        .catch(error => {
            console.error(error);
            // Handle any database errors
            res.redirect('/auth/login');
        });
};