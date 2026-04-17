const express = require('express');
const { createReview, getFarmerReviews } = require('../controllers/reviewController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, authorize('buyer'), createReview);
router.get('/farmer/:id', getFarmerReviews);

module.exports = router;
