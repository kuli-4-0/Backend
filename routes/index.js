const express = require('express');
const router = express.Router();

const authRoute = require('./authRouter');
const userRoute = require('./userRouter');
const eventRoute = require('./eventRouter');

router.get('/', (req, res) => {
  res.send('<h1></h1>Welcome To Elise API</h1>');
});

router.use(authRoute);
router.use('/users', userRoute);
router.use('/events', eventRoute);

module.exports = router;
