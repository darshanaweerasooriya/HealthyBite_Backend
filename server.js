const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();
const app = express();

connectDB();

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0',() => console.log(`Server is running on port ${PORT}...`));


