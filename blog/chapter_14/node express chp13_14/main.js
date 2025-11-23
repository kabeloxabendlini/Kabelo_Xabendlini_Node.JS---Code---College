// ---------------------- IMPORT MODULES ----------------------
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session');
const flash = require('connect-flash');

// Middleware
const validateMiddleWare = require('./middleware/validationMiddleware');
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');

// Controllers
const homeController = require('./controllers/home');
const newPostController = require('./controllers/newPost');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const createPostController = require('./controllers/createPost');
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const logoutController = require('./controllers/logout');

// ---------------------- APP SETUP ----------------------
const app = express();
app.set('view engine', 'ejs'); // Use EJS templates
global.loggedIn = null; // Track logged-in user globally

// ---------------------- DATABASE CONNECTION ----------------------
mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// ---------------------- MIDDLEWARE ----------------------
// Serve static files
app.use(express.static('public'));

// Parse JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // extended option fixes body-parser deprecation warning

// Enable file uploads
app.use(fileUpload());

// Validate incoming post requests
app.use('/posts/store', validateMiddleWare);

// Express session configuration
app.use(expressSession({
    secret: 'keyboard cat',          // secret key for session encryption
    resave: false,                   // don't save session if unmodified
    saveUninitialized: false         // don't create session until something stored
}));

// Flash messages
app.use(flash());

// Track logged-in user for templates
app.use('*', (req, res, next) => {
    loggedIn = req.session.userId || null;
    next();
});

// ---------------------- SERVER ----------------------
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

// ---------------------- ROUTES ----------------------
// Home page
app.get('/', homeController);

// Single post page
app.get('/post/:id', getPostController);

// Create post page (protected)
app.get('/posts/new', authMiddleware, newPostController);

// Alternate create page
app.get('/posts/create', redirectIfAuthenticatedMiddleware, createPostController);

// Store post (protected)
app.post('/posts/store', authMiddleware, storePostController);

// Registration routes (redirect if already logged in)
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController);

// Login routes (redirect if already logged in)
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController);

// Logout
app.get('/auth/logout', logoutController);

// 404 Page (catch-all)
app.use((req, res) => {
    res.render('notfound');
});
