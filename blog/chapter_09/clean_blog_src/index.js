// Import Express framework
const express = require('express');

// Import path module (used for directory/file paths)
const path = require('path');

// Import controller for "create new post" page
const newPostController = require('./controllers/newPost')

// Create Express application instance
const app = new express();

// Import EJS template engine
const ejs = require('ejs');

// Set EJS as the view engine for rendering pages
app.set('view engine', 'ejs');

// Serve static files (CSS, images, JS) from the "public" folder
app.use(express.static('public'));

// Body-parser middleware to read form data
const bodyParser = require('body-parser');

// Parse JSON bodies
app.use(bodyParser.json());

// Parse URL-encoded form data
app.use(bodyParser.urlencoded({ extended: true }));

// Custom middleware example (runs for every request)
const customMiddleWare = (req, res, next) => {
    console.log('Custom middle ware called');
    next(); // Continue to next middleware/route
};

// Apply custom middleware globally
app.use(customMiddleWare);

// Middleware to validate post submission form
const validateMiddleWare = (req, res, next) => {
    // Check if required fields exist (image + title)
    if (req.files == null || req.body.title == null) {
        return res.redirect('/posts/new'); // Redirect back if invalid
    }
    next(); // Continue if valid
};

// Apply validation only to /posts/store route
app.use('/posts/store', validateMiddleWare);

// Import Mongoose and BlogPost model
const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/my_database', { useUnifiedTopology: true, useNewUrlParser: true });

// (Unused import from console — safe to remove)
const { error } = require('console');

// Enable file uploads
const fileUpload = require('express-fileupload');
app.use(fileUpload());

// Start Express server on port 4000
app.listen(4000, () => {
    console.log('App listening on port 4000');
});

// Home page — fetch all blog posts from DB
app.get('/', async (req, res) => {
    const blogposts = await BlogPost.find({});
    res.render('index', {
        blogposts: blogposts
    });
});

// About page
app.get('/about', (req, res) => {
    res.render('about');
});

// Contact page
app.get('/contact', (req, res) => {
    res.render('contact');
});

// Static sample post page
app.get('/samplepost', (req, res) => {
    res.render('samplepost');
});

// View a specific blog post by ID
app.get('/post/:id', async (req, res) => {
    const blogpost = await BlogPost.findById(req.params.id);
    res.render('post', {
        blogpost: blogpost
    });
});

// Display "create new post" form (using external controller)
app.get('/posts/new', newPostController);

// Alternative create page
app.get('/create', (req, res) => {
    res.render('create');
});

// Store new blog post in the database
app.post('/posts/store', async (req, res) => {
    try {
        // Get uploaded image file
        let image = req.files.image;

        // Move image to /public/img folder
        await image.mv(path.resolve(__dirname, 'public/img', image.name));

        // Create blog post with form data and image path
        await BlogPost.create({
            ...req.body,
            image: '/img/' + image.name
        });

        // Redirect to homepage
        res.redirect('/');
    } catch (error) {
        // Print error to console and return 500 response
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
