const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
const User = require('../model/User');
const fetchuser = require('../middleware/fetchuser');


// it's my secret key for encripted and decripted our msg
const JWT_SECRET = process.env.JWT_SECRET;

router.use(bodyParser.json())

//Route:1 sign up user , POST "/api/auth/signup"
router.post('/signup', [
    body('name', 'Enter a valid name').isLength({ min: 2 }),
    body('email', "Enter a valid email").isEmail(),
    body('password', "Enter a password").isLength({ min: 8 })
], async function (req, res) {
    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        // check the user already exit orr not
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "Sorry a user is already exist." });
        }


        //Use bcrypt fucntion to generate hash not password store in database
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)

        //create new users
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });

        // JSON WEB TOKEN while user sign in 

        const data = {
            user: {
                id: user.id
            }
        }
        const expiresIn = '3d';
        const authtoken = jwt.sign(data, JWT_SECRET , {expiresIn});
        success = true;
        res.json({ success, authtoken });


    } catch (err) {
        console.log("Error : " + err.message);
        res.status(500).json({ success, message: "Some Error occured" });
    }
})

//Route :2 login user POST:"/api/auth/login"

router.post('/login', [
    body('email', "Enter a valid email").isEmail(),
    body('password', 'Enter a password').isLength({ min: 8 })
], async function (req, res) {
    let success = false;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: "Validation failed", errors: errors.array() });
    }

    const { email, password } = req.body;
    try {

        // let user = await User.findOne({email})  it also posible
        let user = await User.findOne({ email: email })
        if (!user) {
            success = false;
            return res.status(400).json({ success, errors: "Invalid email or password" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success, errors: "Invalid email or password" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const expiresIn = '3d';
        const authtoken = jwt.sign(data, JWT_SECRET , {expiresIn});
        success = true;
        res.json({ success, authtoken })

    } catch (err) {
        console.log("Error : " + err.message);
        res.status(500).json({ message: "An internal error" });
    }
})

// Route:3 Get logged in user details user POST "/api/auth/getuser" login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userid = req.user.id;
        const user = await User.findById(userid).select("-password");
        res.json({ user })
    } catch (e) {
        res.status(500).json({ message: "This is internal Error...." })
    }
})




module.exports = router;