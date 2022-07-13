// on importe mongoose
const mongoose = require('mongoose');
// On cree nos schemats de donnes
const PostSchema = mongoose.Schema(
    {
        userId: { type: String, required: true },
        message: { type: String, trim: true, maxlength: 500 },
        picture: { type: String },
        video: { type: String },
        likers: { type: [String], required: true },
        comments: {
            type: [
                {
                    commenterId: String,
                    commenterPseudo: String,
                    text: String,
                    timestamp: Number,
                }
            ],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('post', PostSchema);