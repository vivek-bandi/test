const express = require('express');
const { getFarmerAnalytics } = require('../controllers/analyticsController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/farmer', protect, authorize('farmer'), getFarmerAnalytics);

module.exports = router;
