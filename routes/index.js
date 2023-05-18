const express = require("express");
const router = express.Router();

const authRoute = require("./authRouter");
const userRoute = require("./userRouter")

router.use(authRoute);
router.use("/users", userRoute);

module.exports = router;
