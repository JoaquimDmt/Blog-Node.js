const express = require('express');

const app = express();
const blogRouter = require('./blog.router');

app.set('views engine', 'pug');
app.set('views', './views');

const PORT = 9000;
const HOST = 'localhost';

app.use('/', blogRouter);

app.listen(PORT, HOST, () => {
    console.log(`Express : Le serveur écoute sur http://${HOST}:${PORT}`);
});