const express = require('express');
const allRouter = require('./routes');

require('dotenv').config();
const app = express();
app.use(express.json());
app.use(allRouter);

app.listen(process.env.PORT, () => {
  console.log(`server is running in http://localhost:${process.env.PORT}`);
});