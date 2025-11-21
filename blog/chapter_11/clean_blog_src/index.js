// Load required modules
const express = require('express');                   // Web framework
const path = require('path');                         // Utility for file paths
const newPostController = require('./controllers/newPost'); 
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const storePostController = require('./controllers/storePost');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');
const logoutController = require('./controllers/logout');
const expressSession = require('express-session');    // Session handling
const bodyParser = require('body-parser');            // Parse incoming request bodies
const mongoose = require('mongoose');                 // MongoDB ODM
const BlogPost = require('./models/BlogPost');        // BlogPost model
const fileUpload = require('express-fileupload');     // File upload middleware

const app = express();
app.set('view engine', 'ejs');                        // Use EJS as template engine

// Serve static files
app.use(express.static('public'));

// Parse JSON and URL-encoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Validation middleware for new posts
const validateMiddleWare = (req, res, next) => {
    if (!req.files || !req.body.title) {
        return res.redirect('/posts/new');
    }
    next();
};
app.use('/posts/store', validateMiddleWare);

// ----------------- MONGODB CONNECTION -----------------
// Removed deprecated options: useNewUrlParser & useUnifiedTopology
mongoose.connect('mongodb://localhost/my_database')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const PORT = 4000;

// ----------------- SESSION -----------------
app.use(expressSession({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

// Track logged-in user globally
global.loggedIn = null;
app.use('*', (req, res, next) => {
    loggedIn = req.session.userId;
    next();
});

// Enable file uploads
app.use(fileUpload());

// ----------------- START SERVER -----------------
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

// ----------------- ROUTES -----------------

// Home page – display all blog posts
app.get('/', async (req, res) => {
    const blogposts = await BlogPost.find({});
    res.render('index', { blogposts });
});

// Static pages
app.get('/about', (req, res) => res.render('about'));
app.get('/contact', (req, res) => res.render('contact'));
app.get('/samplepost', (req, res) => res.render('samplepost'));

// View a single post
app.get('/post/:id', async (req, res) => {
    const blogpost = await BlogPost.findById(req.params.id);
    res.render('post', { blogpost });
});

// Create new post page
app.get('/posts/new', newPostController);
app.get('/create', (req, res) => res.render('create'));

// Store blog post
app.post('/posts/store', async (req, res) => {
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

// ----------------- USER ROUTES -----------------
app.get('/auth/register', newUserController);
app.post('/users/register', storeUserController);

app.get('/auth/login', loginController);
app.post('/users/login', loginUserController);

app.get('/auth/logout', logoutController);

// ----------------- PROTECTED ROUTES -----------------
app.get('/posts/new', authMiddleware, newPostController);
app.post('/posts/store', authMiddleware, storePostController);

// Redirect if already authenticated
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController);
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController);

// Catch-all 404
app.use((req, res) => res.render('notfound'));