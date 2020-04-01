require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const blogRouter = require('./blog.router');

app.set('views engine', 'pug'); // Indique à Express que le moteur de templating à utiliser 
app.set('views', './views'); //Indique à Express le dossier

const PORT = 9000;
const HOST = 'localhost';

app.use('/', blogRouter); // Traite les routes pour la partie front-office
app.use(express.static('./public'));

// Démarrage de l'application

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`, options)
        .then(() => console.log(`Mongoose : Connexion établie à Atlas !`))
        .then(() => {
            app.listen(PORT, HOST, () => {
                console.log(`Express : Le serveur écoute sur http://${HOST}:${PORT}`);
            });
        })
        .catch((err) => console.error(err));