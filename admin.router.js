const express = require ('express');
const adminRouter = express.Router();

const Article = require('./models/Article.model')
const Authors = require('./models/Author.model')
const Category = require('./models/Category.model')

/**
* GET /admin/admin
* Affiche l'espace de gestion des articles'
*/
adminRouter.get('/admin', (req, res) =>{
    // response.send('Hello Admin Jo !');
    Article.find().populate('author category').sort({dateCreated: 'desc'}).exec().then(articles => {
        res.render('admin/admin.pug', { articles })
    }).catch(error => res.send(error)) 
});

/**
* GET /admin/write
* Affiche le formulaire permettant de créer un nouvel article
*/
adminRouter.get('/write', (req, res) => {
    // Va récupérer la liste des auteurs et des categories en base, et les passent à la vue
    Promise.all([
        Authors.find().sort('name'),
        Category.find().sort('title')
    ])
    .then(([authors, categories]) => res.render('admin/write.pug', { authors, categories }))
    .catch(error => res.send(error.message))
})
/**
* POST /admin/write
* Récupère les données du formulaire et crée l'article dans la base.
*/
adminRouter.post('/write', (req, res) => {
   
    console.log('Les données de formulaire envoyées en POST sont :')
    console.log('<input name="titre">      -->', req.body.titre)
    console.log('<textarea name="contenu"> -->', req.body.contenu)
    console.log('<select name="categorie"> -->', req.body.categorie)
    console.log('<select name="auteur">    -->', req.body.auteur)
 
    Article.create({
        title: req.body.titre,
        content: req.body.contenu,
        category: req.body.categorie,
        author: req.body.auteur,
        dateCreated: new Date(),
    })
    .then(result => {
        console.log(result)
        res.redirect('/')
    })
    .catch(err => console.log(err));
 })

 /**
* GET /admin/edit
* Affiche le formulaire permettant de créer un nouvel article
*/
adminRouter.get('/edit/:id', (req, res) => {
    // Va récupérer la liste des auteurs et des categories en base, et les passent à la vue
    Promise.all([
        Article.findById(req.params.id),
        Authors.find().sort('name'),
        Category.find().sort('title')
    ])
    .then(([authors, categories]) => res.render('admin/write.pug', { authors, categories }))
    .catch(error => res.send(error.message))
})
 
/**
* GET /delete/:id
* Supprimer un article
*/
adminRouter.get('/delete/:id', (req, res) => {
    Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
 })
 
module.exports = adminRouter;