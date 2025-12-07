const express = require('express');
const router = express.Router();
const careerController = require('../controllers/careerController');
// Public routes do not necessarily need requireAuth if data is public
// But if we want to enforce login, we add it. user requirements say "User Module" includes Login. 
// Assuming public browsing is allowed, or maybe not. Let's make it public for now or optional auth.
// Careers page usually public.

router.get('/', careerController.getAllCareers);
router.get('/:id', careerController.getCareerById);

module.exports = router;
