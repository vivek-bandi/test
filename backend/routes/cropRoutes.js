const express = require('express');
const { getCrops, getCropById, createCrop, updateCrop, deleteCrop, getPriceSuggestion } = require('../controllers/cropController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
    .get(getCrops)
    .post(protect, authorize('farmer'), createCrop);

router.route('/suggest-price')
    .post(protect, authorize('farmer'), getPriceSuggestion);

router.route('/:id')
    .get(getCropById)
    .put(protect, authorize('farmer'), updateCrop)
    .delete(protect, authorize('farmer'), deleteCrop);

module.exports = router;
