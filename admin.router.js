const express = require ('express');
const adminRouter = express.Router();

const Article = require('./models/Article.model')
const Authors = require('./models/Author.model')
const Category = require('./models/Category.model')

/**
* GET /admin/admin
* Affiche l'espace de gestion des articles'
*/
adminRouter.get('/admin/admin', (req, res) =>{
    // response.send('Hello Admin Jo !');
    Article.find().populate('author category').sort({dateCreated: 'desc'}).exec().then(articles => {
        res.render('admin/admin.pug', { articles })
    }).catch(error => res.send(error)) 
});
/**
* GET /admin/write
* Affiche le formulaire permettant de créer un nouvel article
*/
adminRouter.get('/admin/write', (req, res) => {
    // Va récupérer la liste des auteurs et des categories en base, et les passent à la vue
    Promise.all([
        Authors.find().sort('name'),
        Category.find().sort('title')
    ])
    .then(([authors, categories]) => res.render('admin/write.pug', { authors, categories }))
    .catch(error => res.send(error.message))
 })
 
module.exports = adminRouter;