const express = require('express');
const allRouter = require('./routes');
const path = require('path');

require('dotenv').config();


const app = express();

// Mengatur direktori public
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(allRouter);

app.listen(process.env.PORT, () => {
  console.log(`server is running in http://localhost:${process.env.PORT}`);
});
