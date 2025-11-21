// ---------------------- IMPORT MODULES ----------------------
const express = require('express');                     
const path = require('path');                           
const mongoose = require('mongoose');                   
const session = require('express-session');             
const flash = require('connect-flash');                 
const fileUpload = require('express-fileupload');       

// Controllers
const newPostController = require('./controllers/newPost');
const storePostController = require('./controllers/storePost');
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const logoutController = require('./controllers/logout');

// Middleware
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');

// Models
const BlogPost = require('./models/BlogPost');

// ---------------------- APP SETUP ----------------------
const app = express();
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static('public'));

// Built-in body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable file uploads
app.use(fileUpload());

// ---------------------- DATABASE ----------------------
mongoose.connect('mongodb://localhost/my_blog')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// ---------------------- SESSION & FLASH ----------------------
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

// Track logged-in user globally for templates
global.loggedIn = null;
app.use('*', (req, res, next) => {
    loggedIn = req.session.userId;
    next();
});

// ---------------------- PORT ----------------------
const PORT = 4000;
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));

// ---------------------- ROUTES ----------------------

// Home page — show all blog posts
app.get('/', async (req, res) => {
    const blogposts = await BlogPost.find().populate('userid', 'username');
    res.render('index', { blogposts });
});

// Static pages
app.get('/about', (req, res) => res.render('about'));
app.get('/contact', (req, res) => res.render('contact'));
app.get('/samplepost', (req, res) => res.render('samplepost'));

// Single blog post
app.get('/post/:id', async (req, res) => {
    const blogpost = await BlogPost.findById(req.params.id);
    res.render('post', { blogpost });
});

// Create post page (protected)
app.get('/posts/new', authMiddleware, newPostController);
app.get('/create', authMiddleware, (req, res) => res.render('create'));

// Store post (protected)
app.post('/posts/store', authMiddleware, async (req, res) => {
    try {
        const image = req.files.image;
        await image.mv(path.resolve(__dirname, 'public/img', image.name));

        await BlogPost.create({
            ...req.body,
            image: '/img/' + image.name
        });

        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// ---------------------- AUTH ROUTES ----------------------

// Registration
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController);

// Login
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController);

// Logout
app.get('/auth/logout', logoutController);

// ---------------------- 404 ----------------------
app.use((req, res) => res.render('notfound'));
