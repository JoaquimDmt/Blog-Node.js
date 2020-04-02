const express = require ('express');
const blogRouter = express.Router();

const Article = require('./models/Article.model')
const Authors = require('./models/Author.model')
const Category = require('./models/Category.model')

/**
* GET /
* Affiche la page d'accueil et tous les articles
*/
blogRouter.get('/', async (request, response) =>{
    await Article.find().populate('author category').sort({dateCreated: 'desc'}).exec().then(articles => {
        // console.log({articles})
        response.render('index.pug', { articles })
    }).catch(error => response.send(error)) 
});
/**
* GET /article/:id
* Affiche l'article selectionné'
*/
blogRouter.get('/article/:id', async (req, res) =>{
    await Article.findById(req.params.id).populate('author category').exec().then(article => {
        if (article == null) {
            res.redirect('/')
            // throw "L'article auquel vous tentez d'accéder n'existe pas."
        }
        res.render('article.pug', { article })
    }).catch(error => res.send(error))
});

module.exports = blogRouter;