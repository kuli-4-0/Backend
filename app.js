const express = require('express');
const allRouter = require('./routes');
const path = require('path');
const cors = require('cors');
const config = require('./config/index.js');

require('dotenv').config();

const app = express();

app.use(cors());

// Mengatur direktori public
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(allRouter);

app.listen(config.port, () => {
  console.log(`server is running in http://localhost:${config.port}`);
});
