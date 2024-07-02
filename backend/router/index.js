const { Router } = require("express");
const userRouter = require("./user.js");
const accountRouter = require("./account.js");
const historyRouter = require("./history");

const router = Router();

router.use("/user", userRouter);
router.use("/account", accountRouter);
router.use("/history", historyRouter);

module.exports = router;