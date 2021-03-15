// implement your server here
// require your posts router and connect it here
const express = require('express');
const PostsRouter = require('./posts/posts-router');

const app = express();
module.exports = app;

app.use(express.json());

app.use('/api/posts', PostsRouter);
