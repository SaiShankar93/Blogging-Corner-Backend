const mongoose = require("mongoose");

let postsSchema = new mongoose.Schema({
    postTitle: {
        type: String,
        required: true,
        unique: true
    },
    postBody: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    imageUrl : {
        type: [String]
    }
})
module.exports = mongoose.model("postsCollection", postsSchema);