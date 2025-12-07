const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const requireAuth = require('../middleware/authMiddleware');

router.get('/trends', requireAuth, jobController.getTrendingJobs);

module.exports = router;
