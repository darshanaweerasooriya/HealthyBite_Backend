const express = require('express');
const cors = require('cors');
const http = require('http');
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
const fitnessAssessRoutes = require('./routes/fitnessAssessRoutes');
const messageRoutes = require('./routes/messageRoutes');

const app = express();
const server = http.createServer(app); // Use server for Socket.io
const initSocket = require('./sockets');
initSocket(server); // Initialize Socket.io with server

connectDB(); // Connect to MongoDB

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/users', cors(), userRoutes);
app.use('/', cors(), mealPlanRoutes);
app.use('/api/recipes', cors(), recipeRoutes);
app.use('/api/nutritiontracking', cors(), nutritionTrackingRoutes);
app.use('/api/meal', cors(), mealRoutes);
app.use('/api/grocery', cors(), groceryRoutes);
app.use('/api/feedback', cors(), feedbackRoutes);
app.use('/api/progresslog', cors(), progressLogRoutes);
app.use('/api/nutritioncontent', cors(), nutritionContentRoutes);
app.use('/api/posts', cors(), postRoutes);
app.use('/api/appointment', cors(), appointmentRoutes);
app.use('/api/professional', cors(), professionalRoutes);
app.use('/api/fitnessassess', cors(), fitnessAssessRoutes);
app.use('/api/message', cors(), messageRoutes);

// Port config
const PORT = process.env.PORT || 3001;

// ✅ Start server on 0.0.0.0 so it's accessible on LAN
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
