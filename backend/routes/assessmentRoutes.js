const express = require('express');
const router = express.Router();
const assessmentController = require('../controllers/assessmentController');
const requireAuth = require('../middleware/authMiddleware');

router.post('/submit', requireAuth, assessmentController.submitAssessment);
router.get('/history', requireAuth, assessmentController.getHistory);
router.get('/questions', requireAuth, assessmentController.getQuestions);

module.exports = router;
