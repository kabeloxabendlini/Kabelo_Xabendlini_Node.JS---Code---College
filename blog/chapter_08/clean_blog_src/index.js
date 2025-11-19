// Import required modules
const express = require('express');
const path = require('path');
const newPostController = require('./controllers/newPost')
const app = new express();
const ejs = require('ejs');

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the "public" folder
app.use(express.static('public'));

// Body-parser middleware for processing form data
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Custom middleware example
const customMiddleWare = (req, res, next) => {
    console.log('Custom middle ware called');
    next(); // Pass control to the next middleware/route handler
};

// Use custom middleware for all routes
app.use(customMiddleWare);

// Middleware to validate form data before storing a post
const validateMiddleWare = (req, res, next) => {
    // Check if required fields are missing
    if (req.files == null || req.body.title == null) {
        return res.redirect('/posts/new');  // Redirect back to form if invalid
    }
    next(); // Valid → continue
};

// Apply validation middleware only to /posts/store route
app.use('/posts/store', validateMiddleWare);

// Import Mongoose and BlogPost model
const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost');

// Connect to MongoDB database
mongoose.connect('mongodb://localhost/my_database', { useUnifiedTopology: true, useNewUrlParser: true });

// Enable file uploads
const fileUpload = require('express-fileupload');
app.use(fileUpload());

// Start the server on port 4000
app.listen(4000, () => {
    console.log('App listening on port 4000');
});

// Home page — fetch and display all blog posts
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

// Sample post page (static example)
app.get('/samplepost', (req, res) => {
    res.render('samplepost');
});

// View a single post by ID
app.get('/post/:id', async (req, res) => {
    const blogpost = await BlogPost.findById(req.params.id);
    res.render('post', {
        blogpost: blogpost
    });
});

// Display new post creation form (controller imported at top)
app.get('/posts/new', newPostController);

// Alternative create page (if needed)
app.get('/create', (req, res) => {
    res.render('create');
});

// Store post in database
app.post('/posts/store', async (req, res) => {
    try {
        // Access uploaded image
        let image = req.files.image;

        // Move image to public/img folder
        await image.mv(path.resolve(__dirname, 'public/img', image.name));

        // Create blog post in DB
        await BlogPost.create({
            ...req.body,            // Spread form fields
            image: '/img/' + image.name // Save image path
        });

        res.redirect('/'); // Redirect back to home page
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error'); // Error handling
    }
});
