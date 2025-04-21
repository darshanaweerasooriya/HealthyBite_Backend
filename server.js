const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const mealPlanRoutes = require('./routes/mealPlanRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const app = express();

connectDB();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/users',cors(), userRoutes);
app.use('/api/mealplan',cors(), mealPlanRoutes);
app.use('/api/recipes',cors(), recipeRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0',() => console.log(`Server is running on port ${PORT}...`));


