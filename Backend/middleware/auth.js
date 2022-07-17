// on importe le package de verification des tokens
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.cookie;
        const decodedToken = jwt.verify(token, process.env.TOKEN);
        const userId = decodedToken.userId;
        req.auth = { userId };

        if (req.body.userId && req.body.userId != userId) {
            throw "identifiant invalide";
        }
        next();

    }
    catch (error) {
        console.log(error);
        res.status(401).json({ error: error | 'requête non authentifiée' });
    }
}