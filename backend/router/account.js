const { Router } = require("express");
const { Account, User } = require("../db");
const { authMiddleware } = require("../middleware");
const mongoose = require("mongoose");

const router = Router();

router.get("/balance", authMiddleware, async function(req, res) {
    const acc = await Account.findOne({
        userId: req.userId
    });

    const user = await User.findOne({
        _id: req.userId
    })

    res.json({
        balance: acc.balance,
        name: user.firstName
    })
});

router.post("/transfer", authMiddleware, async (req, res) => {
    const { amount, to } = req.body;

    const account = await Account.findOne({
        userId: req.userId
    });

    if (account.balance < amount) {
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }

    const toAccount = await Account.findOne({
        userId: to
    });

    if (!toAccount) {
        return res.status(400).json({
            message: "Invalid account"
        })
    }

    await Account.updateOne({
        userId: req.userId
    }, {
        $inc: {
            balance: -amount
        }
    })

    await Account.updateOne({
        userId: to
    }, {
        $inc: {
            balance: amount
        }
    })

    res.json({
        message: "Transfer successful"
    })
});





module.exports = router;