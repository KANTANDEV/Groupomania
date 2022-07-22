// On importe nos schemats de donnees
const { setInternalBufferSize } = require("bson");
const PostModel = require("../models/post");
const UserModel = require("../models/user");
const ObjectID = require("mongoose").Types.ObjectId;
// on importe le package file systeme de node
const fs = require("fs");
const { uploadErrors } = require("../utils/errors");
const post = require("../models/post");

exports.readPost = (req, res) => {
  PostModel.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log("Error to get data :" + err);
    }
  }).sort({ createdAt: -1 });
};


exports.createPost = async (req, res) => {
  let filename ;
  
  console.log(req.file);
  if (req.post != null) {
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
      console.log(err);
      const errors = uploadErrors(err);
      return res.status(201).json({ errors });
    }
    filename = req.body.userId + Date.now() + ".jpg";
  }

  //Si il ya une video en chercher si dans l'url de la video il y a un /watch et on le remplace par un /embed
  if (req.body.video != null) {
    if (req.body.video.includes("/watch?v=")) {
      req.body.video = req.body.video.replace("/watch?v=", "/embed/");
    }
  }

  const newPost = new PostModel({
    userId: req.body.userId,
    message: req.body.message,
    video: req.body.video,
    picture: req.file != null ? "./uploads/images/posts/" + req.file.filename : null,
    likers: [],
    comments: [],
  });

  try {
    const post = await newPost.save();
    res.send(post);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};



exports.updatePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);



  const user = await UserModel.findById(req.body.id);


  let filename;

  if (req.file != null) {
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
      console.log(err);
      const errors = uploadErrors(err);
      return res.status(201).json({ errors });
    }
    filename = req.body.userId + Date.now() + ".jpg";
  }



  PostModel.findOne({ _id: req.params.id }, (err, post) => {
    if (post.userId == req.body.id || user.admin) {
      post.message = req.body.message;
      post.video = req.body.video;
      post.picture = req.file != null ? "uploads/images/posts/" + filename : null,
        post.save((err, doc) => {
          if (!err) {
            res.send(doc);
          } else {
            console.log("Error to update data :" + err);
          }
        });
    } else {
      // fs.unlinkSync(req.file.path);
      res.send("Vous n'avez pas les droits pour modifier ce post");
    }
  });
};

exports.deletePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.postid);

  const user = await UserModel.findById(req.body.id);

  PostModel.findOne({ _id: req.params.id }, (err, post) => {
    if (post.userId == req.body.id || user.admin) {
      post.remove((err, doc) => {
        if (!err) {
          // fs.unlinkSync( "/../../uploads/images/posts", () => {});
          res.send(doc);
        } else {
          console.log("Error to delete data :" + err);
        }
      });
    } else {
      res.send("Vous n'avez pas les droits pour supprimer ce post");
    }
  });
};

exports.likePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  try {
    await PostModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $addToSet: {
          likers: req.body.id,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));

    await UserModel.findByIdAndUpdate(
      { _id: req.body.id },
      {
        $addToSet: {
          likes: req.params.id,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
      // .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

exports.unlikePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  try {
    await PostModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $pull: {
          likers: req.body.id,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));

    await UserModel.findByIdAndUpdate(
      { _id: req.body.id },
      {
        $pull: {
          likes: req.params.id,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
      // .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

exports.commentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterPseudo: req.body.commenterPseudo,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true },
      (err, doc) => {
        if (!err) res.send(doc);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

exports.editCommentPost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  const user = await UserModel.findById(req.body.id);


  try {
    return PostModel.findById({ _id: req.params.id }, (err, docs) => {
      const theComment = docs.comments.find((comment) =>
        comment._id.equals(req.body.commentId)
      );
      if (!theComment) return res.status(400).send("Comment not found");
      if (theComment.commenterId === user.id || user.admin === true) {
        theComment.text = req.body.text;
      }
      else {
        return res.status(400).send("Vous n'avez pas les droits pour modifier ce commentaire")
      }

      return docs.save((err) => {
        if (!err) res.status(200).send(docs);
        else return res.status(500).send(err);
      });
    }).clone();
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

exports.deleteCommentPost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  const user = await UserModel.findById(req.body.id);

  if (req.body.commenterId === user.id || user.admin) {
    try {
      return PostModel.findByIdAndUpdate(
        req.params.id,
        {
          $pull: {
            comments: {
              _id: req.body.commentId,
            },
          },
        },
        { new: true },
        (err, doc) => {
          if (!err) res.send(doc);
          else return res.status(400).send(err);
        }
      ).clone();
    } catch (err) {
      return res.status(400).json({ message: err });
    }
  } else return res.status(400).send("Vous n'avez pas les droits pour supprimer ce commentaire")
};
