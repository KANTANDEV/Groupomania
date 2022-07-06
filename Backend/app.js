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
// on cree l'application express
const app = express();
// On importe notre module router 
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
// Connection a la base de donnee mongoDB
mongoose.connect('mongodb+srv://' + process.env.DB_LOG + '@groupomaniadb.jvjkjex.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB Atlas réussie !'))
    .catch(() => console.log('Connexion à MongoDB Atlas échouée !'));
// middleware CORS 'cross origin resource sharing'
app.use((req, res, next) => {
    // accéder à notre API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Origin', '*');
    // On ajoute une exeption pour le cross origin ressourses
    res.setHeader('Cross-Origin-Resource-Policy', 'http://127.0.0.1:4200/');
    // ajouter les headers mentionnés aux requêtes envoyées vers notre API
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // envoyer des requêtes avec les méthodes mentionnées
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// on analyse les corps de donnee entrant
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// on gere mutler
app.use('/images', express.static(path.join(__dirname, 'images')));
// on cree une route vers notre router
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

// On exporte notre application pour pouvoir s'en servir dans d'autre fichier 
module.exports = app;