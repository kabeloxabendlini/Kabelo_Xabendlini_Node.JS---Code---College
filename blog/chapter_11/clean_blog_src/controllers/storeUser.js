// controllers/storeUser.js
const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // 1. Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 2. Create User
        await User.create({
            username,
            email,
            password: hashedPassword
        });

        // 3. Redirect to Login after successful registration
        return res.redirect('/auth/login');

    } catch (error) {
        console.error(error);

        // --- Handling validation errors ---
        let validationErrors = [];

        if (error.name === "ValidationError") {
            Object.keys(error.errors).forEach(key => {
                validationErrors.push(error.errors[key].message);
            });
        }

        // --- Duplicate username or email ---
        if (error.code === 11000) {
            validationErrors.push("Username or email already exists");
        }

        // Save errors to flash
        req.flash('validationErrors', validationErrors);

        return res.redirect('/auth/register');
    }
};
