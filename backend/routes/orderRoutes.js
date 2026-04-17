const express = require('express');
const { placeOrder, getMyOrders, getFarmerOrders, updateOrderStatus, getOrderById } = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, authorize('buyer'), placeOrder);
router.get('/myorders', protect, authorize('buyer'), getMyOrders);
router.get('/farmer', protect, authorize('farmer'), getFarmerOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/status', protect, authorize('farmer', 'buyer'), updateOrderStatus); // Logistics

module.exports = router;
