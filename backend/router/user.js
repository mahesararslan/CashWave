const { Router } = require("express");
const jwt = require("jsonwebtoken")
const { User, Account } = require("../db");
const { signupBody, signinBody, updateBody } = require("../types");
const JWT_SECRET = require("../config");
const { authMiddleware } = require("../middleware")

const router = Router();

router.post("/signup", async function(req, res) {

    const createUser = req.body;
    const parsedUser = signupBody.safeParse(createUser);

    if(!parsedUser.success) {
        res.status(411).json({
            msg: "You sent the wrong inputs"
        })
        return
    }

    const existingUser = await User.findOne({
        username: createUser.username
    })

    if(existingUser) {
        res.status(411).json({
            msg: "Email already taken / Incorrect inputs"
        })
        return;
    }
    
    const user = await User.create({
        username: createUser.username,
        password: createUser.password,
        firstName: createUser.firstName,
        lastName: createUser.lastName
    })

    const userId = user._id;

    // Create new account for the user and initialize a random amount for the user.
    await Account.create({
        userId,
        balance: Math.random() * 10000 + 1
    })

    const token = jwt.sign({userId}, JWT_SECRET);

    res.json({
        msg: "User Created Successfully",
        token: token
    });

})

router.post("/signin", async function(req, res) {

    const parsedUser = signinBody.safeParse(req.body);
    if(!parsedUser.success) {
        res.status(411).json({
            msg: "Incorrect inputs"
        })
        return;
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })

    if(!user) {
        res.status(411).json({
            msg: "User does't exist"
        })
        return;
    }

    const userId = user._id;

    const token = jwt.sign({userId}, JWT_SECRET)

    res.json({
        token: token
    })
})

router.put("/", authMiddleware, async function(req, res) {

    const { success } = updateBody.safeParse(req.body)

    if(!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
        return;
    }

    await User.updateOne(req.body, {
        _id: req.userId
    })

    res.json({
        message: "Updated successfully"
    })
})

router.get("/bulk", authMiddleware, async function(req, res) {
    // if there is a filter than assign that else assign empty string as filter which will return back all users as all users contain empty string.
    const filter = req.query.filter || "";

    // regex means if the firstname contains the filter. checks for contains.
    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        },{
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id

        }))
    })
})


module.exports = router;