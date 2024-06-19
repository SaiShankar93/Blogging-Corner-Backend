const postsCollection = require("../models/posts");
const User = require("../models/user");

async function all(req, res) {
    console.log("came to all posts")
    try {
        // Query all blogs from the database
        const allBlogs = await postsCollection.find();
        // console.log(allBlogs)
        // Check if there are any blogs found
        if (allBlogs.length === 0) {
            // If no blogs found, send an appropriate response
            return res.status(404).json({ message: "No blogs found" });
        }
        
        // If blogs found, send them as a response
        res.status(200).json(allBlogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

async function compose(req, res) {
    const files = req.files;
    const imageUrl = files && files.map(file => file.location);
    console.log(imageUrl)
    try {
        console.log(req.body);
        const newBlog = new postsCollection({
            postTitle: req.body.postTitle.trim(),
            postBody: req.body.postBody,
            author: req.body.userName,
            imageUrl : imageUrl
        });
        console.log(imageUrl);
        await newBlog.save();
        console.log(newBlog);
        console.log("Successfully added the blog to the database.");

        res.status(201).json({ message: "Post created successfully" });
    } catch (error) {
        if (error.code === 11000) {
            console.error("Duplicate key error:", error.message);
            res.status(400).json({ message: "The Blog Title Should be unique from other titles . Please choose another title for the blog." });
        } else {
            console.error(error.message);
            res.status(500).json({ message: "Internal Server Error. Please try again later." });
        }
    }
}

async function myBlogs(req, res) {
    const username = req.query.username;
    // console.log(username);
    try {
        let myblogs = await postsCollection.find({ author: username }).sort({ _id: -1 });
        res.json({
            blogs: myblogs,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


async function getPost(req, res) {
    try {
        let reqTitle = req.params.postId;
        let postDetails = await postsCollection.findOne({ postTitle: reqTitle }).exec();

        if (!postDetails) {
            return res.status(404).json({ message: "Post not found" });
        }
        let username = postDetails.author;
        console.log(username)
        let userDetails = await User.findOne({ username: username }).exec();

        if (!userDetails) {
            return res.status(404).json({ message: "Author not found" });
        }

        res.json({
            postTitle: postDetails.postTitle,
            postBody: postDetails.postBody,
            letter: userDetails.username.charAt(0).toUpperCase(),
            username: userDetails.username,
            useremail: userDetails.email,
            time: postDetails.createdAt,
            author: postDetails.author,
            imageUrl : postDetails.imageUrl
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


async function deletePost(req, res) {
    // console.log('e',req.params.postId)
    const reqTitle = req.params.postId;
    try {
        await postsCollection.deleteOne({ postTitle: reqTitle });
        res.status(204).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { compose, myBlogs, getPost, deletePost,all };
