const express = require('express');
const PostsRouter = require('./data/posts-router.js');

const server = express();

server.use(express.json());
server.use('/api/posts', PostsRouter);

module.exports = server;
