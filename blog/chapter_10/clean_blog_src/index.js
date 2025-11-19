// Import Express framework
const express = require('express');

// Import path module for working with file system paths
const path = require('path');

// Import controllers for handling specific routes
const newPostController = require('./controllers/newPost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')

// Create Express application
const app = express();

// Import EJS template engine and set it as default
const ejs = require('ejs');
app.set('view engine', 'ejs');

// Serve static files from "public" folder
app.use(express.static('public'));

// Parse incoming JSON and form data
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Custom middleware example
const customMiddleWare = (req, res, next) => {
    console.log('Custom middle ware called');
    next(); // Pass request to next handler
};

// Use custom middleware globally
app.use(customMiddleWare);

// Validation middleware for blog posts
const validateMiddleWare = (req, res, next) => {
    // Ensure both image and title are present
    if (req.files == null || req.body.title == null) {
        return res.redirect('/posts/new'); // Redirect to form if invalid
    }
    next(); // Continue if valid
};

// Apply validation only on /posts/store route
app.use('/posts/store', validateMiddleWare);

// Import Mongoose and BlogPost model
const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost');

// Connect to MongoDB database
mongoose.connect('mongodb://localhost/my_database', { useUnifiedTopology: true, useNewUrlParser: true });

// (Unused import from console — safe to remove)
const { error } = require('console');

// Enable file uploads using express-fileupload
const fileUpload = require('express-fileupload');
app.use(fileUpload());

// Start Express server
app.listen(4000, () => {
    console.log('App listening on port 4000');
});

// Homepage — display all blog posts
app.get('/', async (req, res) => {
    const blogposts = await BlogPost.find({});
    res.render('index', {
        blogposts: blogposts
    });
});

// Static pages
app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/samplepost', (req, res) => {
    res.render('samplepost');
});

// View an individual blog post
app.get('/post/:id', async (req, res) => {
    const blogpost = await BlogPost.findById(req.params.id);
    res.render('post', {
        blogpost: blogpost
    });
});

// Show "create new post" form
app.get('/posts/new', newPostController);

// Optional create page
app.get('/create', (req, res) => {
    res.render('create');
});

// Store a new blog post
app.post('/posts/store', async (req, res) => {
    try {
        // Access uploaded image
        let image = req.files.image;

        // Save image into /public/img folder
        await image.mv(path.resolve(__dirname, 'public/img', image.name));

        // Create new blog post entry in database
        await BlogPost.create({
            ...req.body,                 // Spread form inputs
            image: '/img/' + image.name  // Save image path
        });

        res.redirect('/'); // Redirect to homepage
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// USER AUTH ROUTES
// Show user registration form
app.get('/auth/register', newUserController);

// Handle registration data and create user
app.post('/users/register', storeUserController);

// Show login form
app.get('/auth/login', loginController);

// Handle login submission
app.post('/users/login', loginUserController);
