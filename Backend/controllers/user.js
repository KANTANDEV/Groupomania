// On importe notre schemat de donnees 
const User = require('../models/user')
// on importe notre package de cryptage 
const bcrypt = require('bcrypt');
// on importe le package de verification de token
const jwt = require('jsonwebtoken');
//on importe fs
const fs = require('fs');
const e = require('express');
const user = require('../models/user');
// On definie le ObjectId pour pouvoir verifier l'id attribue par la DB 
const ObjectID = require("mongoose").Types.ObjectId;
///////////////////////////////////////////////////////////////////// On cree nos controleurs de routes ///////////////////////////////////////////////////////////////////////////

// Inscription
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                pseudo: req.body.pseudo,
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: "utilisateur créé" }))
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
};

// connection
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: "utilisateur inexistant" })
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: "mot de passe erroné" })
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.TOKEN,
                            { expiresIn: '24h' }
                        )



                    })
                })
                .catch((error => res.status(500).json({ error })));
        })
        .catch(error => res.status(500).json({ error }))
};

//logout
exports.logout = (req, res) => {
    // res.cookie('token', '', { expires: new Date(0) },)
    res.status(200).json({ token: jwt.sign( {userId: user._id}, "LOGOUT", { expiresIn: "0"}), message: "logout successful" })
}



// affiche tout les utilisateurs 

exports.getAllUsers = async (req, res) => {
    const users = await User.find().select('-password -email');
    res.status(200).json(users);
}

// affiche un seul utilisateur en fonction de son id 

exports.userInfo = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown :' + req.params.id)

    User.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log('Id unknown' + err)
    }).select('-password -email');
};

// Met a jours les information d'un utilisateur 

exports.updateUser = async (req, res) => {

    try {
        await User.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    bio: req.body.bio,
                },
            },
            { new: true, upsert: true, setDefaultsOnInsert: true })
            .then((data) => res.send(data))
            .catch((err) => res.status(500).send({ message: err }));
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

// Supprime un utilisateur

exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        const user = await User.findById(req.params.id)
        if (req.params.id == user._id || user.admin) {
            await User.deleteOne({ _id: req.params.id });
            fs.unlinkSync(__dirname + '/.' + user.picture)
            res.status(200).json({ message: "User deleted !" });
        } else {
            res.status(401).json({ message: "You are not authorized to delete this user" });
        }
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}
// Follow
exports.follow = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id || !ObjectID.isValid(req.body.idToFollow));

    try {
        await User.findOneAndUpdate(
            { _id: req.params.id },
            {
                $addToSet: {
                    following: req.body.idToFollow,
                },
            },
            { new: true, upsert: true, setDefaultsOnInsert: true })
            .then((data) => res.send(data))
            .catch((err) => res.status(500).send({ message: err }));


        await User.findOneAndUpdate(
            { _id: req.body.idToFollow },
            {
                $addToSet: {
                    followers: req.params.id,
                },
            },
            { new: true, upsert: true, setDefaultsOnInsert: true })
            // .then((data) => res.send(data))
            .catch((err) => res.status(500).send({ message: err }));

    } catch (err) {
        return res.status(500).json({ message: err });
    }
}
// Unfollow
exports.unfollow = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id || !ObjectID.isValid(req.body.idToFollow));

    try {
        await User.findOneAndUpdate(
            { _id: req.params.id },
            {
                $pull: {
                    following: req.body.idToUnFollow,
                },
            },
            { new: true, upsert: true, setDefaultsOnInsert: true })
            .then((data) => res.send(data))
            .catch((err) => res.status(500).send({ message: err }));

        await User.findOneAndUpdate(
            { _id: req.body.idToUnFollow },
            {
                $pull: {
                    followers: req.params.id,
                },
            },
            { new: true, upsert: true, setDefaultsOnInsert: true })
            // .then((data) => res.send(data))
            .catch((err) => res.status(500).send({ message: err }));

    } catch (err) {
        return res.status(500).json({ message: err });
    }
}