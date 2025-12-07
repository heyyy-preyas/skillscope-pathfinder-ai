const express = require('express');
const router = express.Router();
const mentorController = require('../controllers/mentorController');
const requireAuth = require('../middleware/authMiddleware');

router.get('/', requireAuth, mentorController.getAllMentors);
router.get('/:id', requireAuth, mentorController.getMentorProfile);
router.post('/book', mentorController.bookSession);

module.exports = router;
