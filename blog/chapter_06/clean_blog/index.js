const express = require('express');
const path = require('path');

const app = new express();
const ejs = require('ejs');
app.set('view engine', 'ejs');

app.use(express.static('public'));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost');

// Remove deprecated mongoose options
mongoose.connect('mongodb://localhost/my_database');

app.listen(4000, () => {
    console.log('App listening on port 4000');
});

app.get('/', async (req, res) => {
    const blogposts = await BlogPost.find({});
    res.render('index', {
        blogposts: blogposts
    });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/create', (req, res) => {
    res.render('create');
});

app.get('/samplepost', (req, res) => {
    res.render('samplepost');
});

app.get('/posts/new', (req, res) => {
    res.render('create');
});

app.get('/post/:id', async (req, res) => {
    const blogpost = await BlogPost.findById(req.params.id);
    res.render('post', {
        blogpost: blogpost
    });
});

// FIXED — no callbacks in Mongoose v7+
app.post('/posts/store', async (req, res) => {
    try {
        await BlogPost.create(req.body);
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.redirect('/posts/new');
    }
});
