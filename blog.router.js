const express = require ('express');

const blogRouter = express.Router();

blogRouter.get('/', (request, response) =>{
    response.render('index.pug');
});
blogRouter.get('/admin', (request, response) =>{
    response.send('Hello Admin Jo !');
});

module.exports = blogRouter;