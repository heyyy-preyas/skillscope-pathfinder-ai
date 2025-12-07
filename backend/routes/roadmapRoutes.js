const express = require('express');
const router = express.Router();
const roadmapController = require('../controllers/roadmapController');
const requireAuth = require('../middleware/authMiddleware');

router.get('/', requireAuth, roadmapController.getRoadmap);
router.post('/generate', requireAuth, roadmapController.generateRoadmap);

module.exports = router;
