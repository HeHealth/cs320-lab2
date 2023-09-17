const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const jobRoutes = require('./routes/jobRoutes');
const userRoutes = require('./routes/userRoutes');

// Middleware
app.use(express.json());
app.use(cors({
  exposedHeaders: ['x-auth-token'],
}));



// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/jobPortal', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Use Routes
app.use('/api/jobs', jobRoutes);
app.use('/api/users', userRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
