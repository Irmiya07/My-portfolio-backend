const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv =require('dotenv');
const authRoutes = require('./src/routes/authRoutes');
const projectRoutes = require('./src/routes/projectRoutes');
const skillRoutes = require('./src/routes/skillRoutes');
const certificateRoutes = require('./src/routes/certificateRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: [
      "http://localhost:5173",      // local dev
      "https://irmiya.netlify.app"  // deployed frontend 
    ],
    credentials: true
}));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/certificates', certificateRoutes);

app.get('/', (req, res) => {
  res.json({ message: "Server running" });
});

app.use((req, res, next) => {
  res.status(404).json({
    message: "API endpoint not found"
  });
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
