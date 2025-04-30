const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const mealPlanRoutes = require('./routes/mealPlanRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const nutritionTrackingRoutes = require('./routes/nutrtiontrackingRoutes');
const mealRoutes = require('./routes/mealRoutes');
const groceryRoutes = require('./routes/groceryRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const progressLogRoutes = require('./routes/progressLogRoutes');
const nutritionContentRoutes = require('./routes/nutritioncontentRoutes');
const postRoutes = require('./routes/postRoutes');
const appointmentRoutes = require('./routes/appoinmentRoutes');
const professionalRoutes = require('./routes/professionalRoutes');
const app = express();

connectDB();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/users',cors(), userRoutes);
app.use('/api/mealplan',cors(), mealPlanRoutes);
app.use('/api/recipes',cors(), recipeRoutes);
app.use('/api/nutritiontracking',cors(), nutritionTrackingRoutes);
app.use('/api/meal',cors(), mealRoutes);
app.use('/api/grocery',cors(), groceryRoutes);
app.use('/api/feedback',cors(), feedbackRoutes);
app.use('/api/progresslog',cors(), progressLogRoutes);
app.use('/api/nutritioncontent',cors(), nutritionContentRoutes);
app.use('/api/posts',cors(), postRoutes);
app.use('/api/appointment',cors(), appointmentRoutes);
app.use('/api/professional',cors(), professionalRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0',() => console.log(`Server is running on port ${PORT}...`));


