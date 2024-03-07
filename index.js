const express = require('express');



const app = express();



app.use(express.json());



let blogPosts = [];


app.post('/blog', (req, res) => {
    const post = req.body;
    post.id = blogPosts.length + 1; 
    blogPosts.push(post);
    res.status(201).json(post); 
});


app.get('/blog', (req, res) => {
    res.json(blogPosts);
});



app.get('/blog/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = blogPosts.find(p => p.id === postId);
    if (post) {
        res.json(post);
    } else {
        res.status(404).send('Post not found');
    }
});



app.delete('/blog/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const postIndex = blogPosts.findIndex(p => p.id === postId);
    if (postIndex > -1) {
        blogPosts.splice(postIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Post not found');
    }
});



app.listen(3000, () => console.log('Blog API is running on http://localhost'));