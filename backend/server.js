const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.get('/', (req, res) => {
    res.send('SkillScope Backend is running');
});

const userRoutes = require('./routes/userRoutes');
const assessmentRoutes = require('./routes/assessmentRoutes');
const jobRoutes = require('./routes/jobRoutes');
const roadmapRoutes = require('./routes/roadmapRoutes');
const mentorRoutes = require('./routes/mentorRoutes');
const careerRoutes = require('./routes/careerRoutes');

app.use('/api/users', userRoutes);
app.use('/api/assessment', assessmentRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/roadmap', roadmapRoutes);
app.use('/api/mentors', mentorRoutes);
app.use('/api/careers', careerRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
