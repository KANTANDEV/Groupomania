// on importe le module helmet
const helmet = require("helmet");
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
// on importe cors
const cors = require('cors');
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


// Configuration middleware CORS 'cross origin resource sharing'
const corsOptions = {
    origin: ["http://localhost:3000", "*"],
    default: "http://localhost:3000",
    credentials: true,
    allowedHeaders: ["sessionId", "Content-Type"],
    exposedHeaders: ["sessionId"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    "X-Frame-Options":  "ALLOW-FROM http://localhost:3000" || "ALLOW-FROM http://localhost:4000" || "ALLOW-FROM https://www.youtube.com/",
    
}

app.use(cors(corsOptions));

// on configure les option de notre package helmet
app.use(
    helmet({
        contentSecurityPolicy: false,
        crossOriginEmbedderPolicy: false,
        crossOriginResourcePolicy: false,
    })
);
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