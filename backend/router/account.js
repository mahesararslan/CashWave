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

// //An endpoint for user to transfer money to another account
// router.post("/transfer", authMiddleware, async (req, res) => {
//     const session = await mongoose.startSession(); //This ensures that these operations either all succeed together or fail together.
  
//     session.startTransaction(); // This ensures that the operations within the transaction are either fully completed
//     //or fully rolled back, maintaining data integrity.
//     const { amount, to } = req.body;
  
//     if (amount === null || amount < 1) {
//       return res.status(400).json({
//         message: "Enter Amount",
//       });
//     }
  
//     // first we will check our acoount balance
//     const fromAccount = await Account.findOne({
//       userId: req.userId,
//     }).session(session); // to make it the part of the session. if we dont write .session(session) it
//     // will no longer the part of the session
  
//     if (fromAccount.balance < amount) {
//       await session.abortTransaction(); // all the changes made in these operations are saved
//       return res.status(400).json({
//         message: "Insufficient Balance",
//       });
//     }
  
//     // we will check that account exist to whom we wnat to send money
//     const toAccount = await Account.findOne({ userId: to });
  
//     console.log(toAccount);
//     // console.log(typeof userData.firstName);
//     // console.log(userData2.firstName);
  
//     if (!toAccount) {
//       return res.status(400).json({
//         message: "Invalid Account",
//       });
//     }
  
//     // if account exists we will deduct the money from the "fromAccount" and add it to the "toAccount"
//     await Account.updateOne(
//       { userId: req.userId },
//       {
//         $inc: {
//           balance: -amount,
//         },
//       }
//     ).session(session);
  
//     await Account.updateOne(
//       { userId: to },
//       {
//         $inc: {
//           balance: amount,
//         },
//       }
//     ).session(session);
  
//     //senders history
//     const receiver = await User.findById(to);
//     const sender = await User.findById(req.userId);
  
//     await User.findByIdAndUpdate(req.userId, {
//       $push: {
//         history: {
//           $each: [{ name: receiver.firstName, amount: amount, sent: true }],
//           $position: 0,
//         },
//       },
//     });
  
//     //receivers history
  
//     await User.findByIdAndUpdate(to, {
//       $push: {
//         history: {
//           $each: [{ name: sender.firstName, amount: amount, sent: false }],
//           $position: 0,
//         },
//       },
//     });
  
//     //
//     // Commit the transaction
//     await session.commitTransaction(); //all the changes made in these operations are saved. If the transaction is
//     //aborted (using session.abortTransaction()), none of the changes made in these operations are saved.
  
//     res.json({
//       message: "transfer Successful",
//     });
//   });

router.post("/transfer", authMiddleware, async (req, res) => {
  const { amount, to } = req.body;

  if (amount === null || amount < 1) {
    return res.status(400).json({
      message: "Enter Amount",
    });
  }

  // First we will check our account balance
  const fromAccount = await Account.findOne({
    userId: req.userId,
  });

  if (fromAccount.balance < amount) {
    return res.status(400).json({
      message: "Insufficient Balance",
    });
  }

  // We will check that account exists to whom we want to send money
  const toAccount = await Account.findOne({ userId: to });

  if (!toAccount) {
    return res.status(400).json({
      message: "Invalid Account",
    });
  }

  // If account exists we will deduct the money from the "fromAccount" and add it to the "toAccount"
  await Account.updateOne(
    { userId: req.userId },
    {
      $inc: {
        balance: -amount,
      },
    }
  );

  await Account.updateOne(
    { userId: to },
    {
      $inc: {
        balance: amount,
      },
    }
  );

  // Senders history
  const receiver = await User.findById(to);
  const sender = await User.findById(req.userId);

  await User.findByIdAndUpdate(req.userId, {
    $push: {
      history: {
        $each: [{ name: receiver.firstName, amount: amount, sent: true }],
        $position: 0,
      },
    },
  });

  // Receivers history
  await User.findByIdAndUpdate(to, {
    $push: {
      history: {
        $each: [{ name: sender.firstName, amount: amount, sent: false }],
        $position: 0,
      },
    },
  });

  res.json({
    message: "Transfer Successful",
  });
});
  module.exports = router;