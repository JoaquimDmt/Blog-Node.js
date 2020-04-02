const express = require ('express');
const blogRouter = express.Router();

const Article = require('./models/Article.model')
const Authors = require('./models/Author.model')
const Category = require('./models/Category.model')

blogRouter.get('/', async (request, response) =>{
    await Article.find().populate('author category').sort({dateCreated: 'desc'}).exec().then(articles => {
        // console.log({articles})
        response.render('index.pug', { articles })
    }).catch(error => response.send(error)) 
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
blogRouter.get('/admin/admin', (req, res) =>{
    // response.send('Hello Admin Jo !');
    Article.find().populate('author category').sort({dateCreated: 'desc'}).exec().then(articles => {
        res.render('admin/admin.pug', { articles })
    }).catch(error => res.send(error)) 
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