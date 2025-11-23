const express = require('express')
const mongoose = require('mongoose')

// Connect to MongoDB
// NOTE: useNewUrlParser is no longer required in modern Mongoose,
// but keeping it won't break anything.
mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true })

const app = new express()
const ejs = require('ejs')

const fileUpload = require('express-fileupload')
const validateMiddleWare = require('./middleware/validationMiddleware')
const expressSession = require('express-session')
const authMiddleware = require('./middleware/authMiddleware')
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')
const flash = require('connect-flash')

// Set view engine to EJS templates
app.set('view engine', 'ejs')

// Global variable to keep track of logged-in user (for views)
global.loggedIn = null;

// Serve static files (CSS, images, JS, etc.)
app.use(express.static('public'))

// Body parsers to read JSON and form data (req.body)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))  // extended recommended

// Enable file uploads (used for blog post images)
app.use(fileUpload())

// Validation middleware for storing posts
app.use('/posts/store', validateMiddleWare)

// Configure sessions (required for login)
app.use(expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}))

// Flash messages (e.g., "Incorrect password", "User exists", etc.)
app.use(flash())

// Middleware that runs on every request and stores logged-in user ID globally
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId // used inside EJS templates
    next()
})

// Start server
app.listen(4000, () => {
    console.log('App listening on port 4000')
})

// Controllers
const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const logoutController = require('./controllers/logout')

// ROUTES ---------------------------------------------------------

// Home page
app.get('/', homeController)

// View a single blog post by ID
app.get('/post/:id', getPostController)

// New post form (must be logged in)
app.get('/posts/new', authMiddleware, newPostController)

// Process/stores new post (must be logged in)
app.post('/posts/store', authMiddleware, storePostController)

// Registration page
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)

// Handles new user registration form
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)

// Login page
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController)

// Handles login form submit
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController)

// Logout route
app.get('/auth/logout', logoutController)

// Fallback route — if no route matches, show 404 page
app.use((req, res) => {
    res.render('notfound')
})
