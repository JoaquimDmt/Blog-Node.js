const express = require ('express');
const blogRouter = express.Router();

const Article = require('./models/Article.model')
const Authors = require('./models/Author.model')
const Category = require('./models/Category.model')

blogRouter.get('/', (req, res) =>{
    Article.find().populate('author category').sort({dateCreated: 'desc'}).exec().then(articles => {
        // console.log({articles})
        res.render('index.pug', { articles })
    }).catch(error => res.send(error)) 
});
blogRouter.get('/article/:id', async (req, res) =>{
    await Article.findById(req.params.id).populate('author category').exec().then(article => {
        if (article == null) {
            res.redirect('/')
            // throw "L'article auquel vous tentez d'accéder n'existe pas."
        }
        res.render('article.pug', { article })
    }).catch(error => res.send(error))
});
blogRouter.get('/admin', (request, response) =>{
    response.send('Hello Admin Jo !');
});

module.exports = blogRouter;

// date = articles.date;
        // year = date.getFullYear();
        // month = date.getMonth()+1;
        // dt = date.getDate();

        // if (dt < 10) {
        // dt = '0' + dt;
        // }
        // if (month < 10) {
        // month = '0' + month;
        // }

        // console.log(year+'-' + month + '-'+dt);