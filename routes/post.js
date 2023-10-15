const router = require('express').Router();
const Post = require("../models/Post");


// routes


router.post("/add/post", (req, res) =>{
    const {title,post,author} = req.body;
    const newPost = new Post({title,post,author})


    //save the post
    newPost.save()
    .then(() =>{
        console.log("Successfully added Post!");
        res.redirect("/");
    })


    .catch((err) => console.log(err));
});


router.get("/delete/post/:_id", (req, res) =>{
    const {_id} = req.params;
    Post.deleteOne({_id})
    .then(() =>{
        console.log("Deleted Post successfully");
        res.redirect("/");
    })
    .catch((err) => console.log(err));
});
router.get('/update/post/:_id', (req, res) => {
    const { _id } = req.params;


    Post.findById(_id)
        .then((postItem) => {
            if (!postItem) {
                console.log('Post not found');
                return res.status(404).json({ error: 'Post not found' });
            }


            res.render('update', { postItem });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        });
});


router.post('/update/post/:_id', (req, res) => {
    const { _id } = req.params;
    const { updatedTitle, updatedPost, updatedAuthor } = req.body;


    Post.findByIdAndUpdate(_id, { title:updatedTitle, post: updatedPost, author:updatedAuthor }, { new: true })
        .then((updatedItem) => {
            if (!updatedItem) {
                console.log('Post not found');
                return res.status(404).json({ error: 'Post not found' });
            }


            console.log('Updated post successfully');
            res.redirect('/');
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        });
});


module.exports = router;
