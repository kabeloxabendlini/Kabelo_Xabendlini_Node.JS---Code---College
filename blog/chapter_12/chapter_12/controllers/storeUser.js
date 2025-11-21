// controllers\storeUser.js - NEW (using Promises)
module.exports = (req, res) => {
    User.create(req.body)
        .then(user => {
            res.redirect('/');
        })
        .catch(error => {
            // console.error(error); 
            // Handle validation errors or duplicate key errors here
            // Example:
            // if (error.name === 'ValidationError') { ... }
            res.redirect('/auth/register');
        });
};