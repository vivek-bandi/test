const Review = require('../models/Review');
const Order = require('../models/Order');

exports.createReview = async (req, res) => {
    try {
        const { farmerId, cropId, rating, comment } = req.body;
        
        // Optional: Check if the user actually ordered from this farmer
        const validOrder = await Order.findOne({ buyer: req.user.id, farmer: farmerId });
        if (!validOrder) {
            return res.status(400).json({ success: false, error: 'You can only review farmers you have purchased from' });
        }
        
        const review = await Review.create({
            buyer: req.user.id,
            farmer: farmerId,
            crop: cropId,
            rating,
            comment
        });
        
        res.status(201).json({ success: true, data: review });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.getFarmerReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ farmer: req.params.id }).populate('buyer', 'name profileImage').sort('-createdAt');
        
        // Calculate average
        const avg = reviews.reduce((a, b) => a + b.rating, 0) / (reviews.length || 1);
        
        res.status(200).json({ success: true, averageRating: avg.toFixed(1), count: reviews.length, data: reviews });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
