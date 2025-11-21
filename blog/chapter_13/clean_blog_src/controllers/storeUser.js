// controllers/storeUser.js
const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        await User.create({
            username,
            email,
            password: hashedPassword
        });

        // Success → redirect to login (or home, if you prefer)
        return res.redirect('/auth/login');

    } catch (error) {
        console.error(error);

        let validationErrors = [];

        // Handle Mongoose validation errors
        if (error.name === 'ValidationError') {
            validationErrors = Object.keys(error.errors).map(
                key => error.errors[key].message
            );
        }

        // Handle duplicate email or username
        if (error.code === 11000) {
            validationErrors.push('Username or Email already exists.');
        }

        // Save submitted data so the form can refill
        req.flash('validationErrors', validationErrors);
        req.flash('data', req.body);

        return res.redirect('/auth/register');
    }
};
