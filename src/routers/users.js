const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fetchuser = require('../middleware/fetchuser');
const User = require('../model/User');
router.use(bodyParser.json())


router.post('/:followId/follow', fetchuser, async (req, res) => {
    try {
        let success = false;


        const {followId} = req.params;
        const userId = req.user.id;
        console.log(userId);

        const user = await User.findById(userId).select("-password");
         
        // if(!user){
        //     return res.status(404).json({user,success,message:"User not found"})
        // }
        
        if(user.following.includes(followId)){
            return res.status(404).json({success,message:"User already followed"})
        }

        // user = await User.findByIdAndUpdate(req.user.id, {
        //     $push: { following: req.body.followId},
        // }, { new: true })

        user.following.push(followId);
        await user.save();

        success = true;
        res.status(200).json({ success, user, message: 'User followed successfully'});

    }catch(err){
        console.log(err);
        return res.status(404).json({ success:false , message: 'An Internal error occured'});
    }
});



//Route :5   unfollowing a user.
router.post('/:unfollowId/unfollow', fetchuser, async (req, res) => {
    try {
        let success = false;

        const { unfollowId } = req.params;
        const userId = req.user.id;

        const user = await User.findById(userId).select("-password");
         
        if (!user) {
            return res.status(404).json({ user, success, message: "User not found" });
        }
        
        if (!user.following.includes(unfollowId)) {
            return res.status(404).json({ success, message: "User is not followed" });
        }

        // Remove the unfollowed user from the following array
        const index = user.following.indexOf(unfollowId);
        user.following.splice(index, 1);
        await user.save();

        success = true;
        res.status(200).json({ success, user, message: 'User unfollowed successfully' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: 'An internal error occurred' });
    }
});



module.exports = router;