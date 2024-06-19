const express = require('express');
const {compose,all,getPost,deletePost, myBlogs} = require('../controllers/postController');
const router = express.Router();
const storeImage = require('./multer')

const upload = storeImage();

router.post("/compose",upload.array('image',2),compose);
router.get("/all",all);
router.get("/posts/:postId",getPost);
router.get("/myblogs",myBlogs);
router.post("/delete/:postId",deletePost);


module.exports = router