const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const Post = require('../model/Post');
const User = require('../model/User')

router.use(bodyParser.json())


//Route :1 create new post    POST:"/api/post/create".

router.post('/create', fetchuser, [
    body('title', "title must be at least 3 characters long.").isLength({ min: 3 }),
    body('textContent', "textcontent must be at least 5 characters long").isLength({ min: 5 }),
], async (req, res) => {

    let success = false;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({ success: false, message: "Validation failed", errors: errors.array() });
    }

    try {

        const authToken = req.headers.authorization;

        let post = await Post.create({
            user: req.user.id,
            title: req.body.title,
            textContent: req.body.textContent,
        });

        success = true;
        res.header('Authorization', authToken).json({ success, post });

    } catch (e) {
        console.log(e)
        res.status(500).json({ success:false, message: "Internal Error found" });
    }
});

//Route :2 view post by user only  GET:"/api/post/view"
router.get('/view', fetchuser, async (req, res) => {
    try {
        const docs = await Post.find({ user: req.user.id });
        res.json(docs)
    } catch (err) { console.log(err);  res.status(500).json({ success: false, message: "Internal server error" }); }
})


//Route :3 Delete a created post by user DELETE:"/api/post/delete/objectId"
router.delete('/delete/:id', fetchuser, async (req, res) => {
    try {
        let success = false;
        let post = await Post.findById(req.params.id);
        if (!post) { return res.status(404).send({success:false,message:"Post not found"}) }

        post = await Post.findByIdAndDelete(req.params.id);
        success = true;
        res.json({ success, post, message: 'post has been deleted' });
    } catch (err) { console.log(err); }
})

//Route :4 UPDATE post  by the user PUT:"/api/post/update/:id"
router.put('/update/:id', fetchuser, async (req, res) => {

    let success = false;
    const { title, textContent } = req.body;

    // create a update object
    const updatePost = {};

    if (title) updatePost.title = title;
    if (textContent) updatePost.textContent = textContent;
 
    let post = await Post.findById(req.params.id);

    // Check the post is exit or not
    if (!post) {
        res.status(400).json({ success:false, message: "post not found" });
    }

    post = await Post.findByIdAndUpdate(req.params.id, { $set: updatePost }, { new: true });
    success = true;
    res.json({ success, post })
});


//Route :5 Fetch to get latest posts from followed users.  Get: 
router.get('/FollowingPost/', fetchuser, async (req, res) => {
    try {
        let success = false;
        // const user = await User.findById(req.params.id);
        const user = await User.findById(req.user.id);

        if(!user) {
            return res.status(404).json({ message: 'User not found'});
        }
        
        // Extract followed users IDs
        const followedUserIds = user.following.map(user => user._id);

        const latestsPosts = await Post.find({user:{ $in:followedUserIds}}).sort({createdAt: -1});

        success = true;
        res.json({ success, latestsPosts, message: 'followed Post only' });
    } catch (err) { console.log(err); }
})
 
module.exports = router;