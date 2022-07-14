const UserModel = require('../models/user');
const fs = require('fs');
const { uploadErrors } = require('../utils/errors');


exports.uploadProfil = async (req, res, next) => {


    try {
        if (
            req.file.mimetype != "image/jpg" &&
            req.file.mimetype != "image/png" &&
            req.file.mimetype != "image/jpeg" &&
            req.file.mimetype != "image/gif"
        ) {
            fs.unlinkSync(req.file.path);
            throw Error("invalide file");
        }


        if (req.file.size > 500000) throw Error("max size");
    } catch (err) {
        console.log(err)
        const errors = uploadErrors(err);
        return res.status(201).json({ errors });
    }

    try {
        const docs = await UserModel.findByIdAndUpdate(
            req.body.userId,
            { $set: { picture: "./uploads/images/profil/" + req.file.filename } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        return res.send(docs)
    } catch (err) {
        return res.status(500).json({ message: err });
    }


};