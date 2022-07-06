// On importe nos schemats de donnees
const { setInternalBufferSize } = require('bson');
const PostModel = require('../models/post');
const UserModel = require('../models/user');


exports.readPost = (req, res) => {
    PostModel.find((err, docs) => {
        if (!err) {
            res.send(docs)
        }
        else {
            console.log('Error to get data :' + err);
        }
    })
}

exports.createPost =  async (req, res) => {
    const newPost = new PostModel({
        posterId: req.body.posterId,
        message: req.body.message,
        video: req.body.video,
        likers: [],
        comments: [],
    });

    try{
        const post = await newPost.save();
        return res.status(201).json(post);
    }
    catch(err) {
        return res.status(400).send(err);
    }
}

exports.updatePost = (req, res) => {

}

exports.deletePost = (req, res) => {

}