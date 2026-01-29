
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const chatRouter = require('./routes/chatRoutes');
require('dotenv').config();

const app = express();

// Environment variables
const PORT = process.env.PORT || 3001;
const MONGO_URL = process.env.MONGODB_URL; // use standard name "MONGO_URI"

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connection successful'))
.catch((err) => {
  console.error('❌ MongoDB connection failed:', err.message);
  process.exit(1); // stop the server if DB isn't connected
});

// Routes
app.use('/api/chat', chatRouter);

// Default route
app.get('/', (req, res) => {
  res.send('🚀 Server is running and connected to MongoDB!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

