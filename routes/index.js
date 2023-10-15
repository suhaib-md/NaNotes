const router = require('express').Router();
const Post = require("../models/Post");
// routes will be here


router.get("/", async(req,res) => {
    const allPost = await Post.find();
    res.render("index", {post: allPost});
});




module.exports = router;