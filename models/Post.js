const mongoose = require("mongoose");


const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    post: {
        type: String,
        required: true
    },
    author: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model("Post", PostSchema);