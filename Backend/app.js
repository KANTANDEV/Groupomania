// on importe le module express
const express = require('express');
// on importe mongoose
const mongoose = require('mongoose');
// on importe le package path
const path = require('path');
//on importe dotenv
const dotenv = require('dotenv');
// on configure notre package
dotenv.config()
// on importe body parser qui qnqlyse les corps de requete entrant
const bodyParser = require('body-parser');
// On importe notre module router 
const userRoutes = require('./routes/user');
// const postRoutes = require('./routes/post');
// Connection a la base de donnee mongoDB
mongoose.connect('mongodb+srv://' + process.env.DB_LOG + '@groupomaniadb.jvjkjex.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB Atlas réussie !'))
    .catch(() => console.log('Connexion à MongoDB Atlas échouée !'));
// on cree l'application express
const app = express();
// on analyse les corps de donnee entrant
app.use(bodyParser.json());
// on gere mutler
app.use('/images', express.static(path.join(__dirname, 'images')));
// on cree une route vers notre router
app.use('/api/user', userRoutes);
// app.use('/api/post', postRoutes);

// On exporte notre application pour pouvoir s'en servir dans d'autre fichier 
module.exports = app;