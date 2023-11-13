const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    user: {
        username: String,
        key: String,
    },
    img: {
        type: String,
        required : true
    }
}, {
    collection: "posts"
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
