const Order = require('../models/Order');
const Crop = require('../models/Crop');

// ✅ PLACE ORDER
exports.placeOrder = async (req, res) => {
    try {
        const { cropId, quantity, deliveryAddress } = req.body;

        const crop = await Crop.findById(cropId);
        if (!crop) {
            return res.status(404).json({ success: false, error: 'Crop not found' });
        }

        if (crop.quantity < quantity) {
            return res.status(400).json({ success: false, error: 'Not enough quantity available' });
        }

        const totalPrice = crop.price * quantity;
        const expiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        console.log("EXPIRY:", expiry);

        const order = await Order.create({
            buyer: req.user.id,
            farmer: crop.farmer,
            crop: cropId,
            quantity,
            totalPrice,
            deliveryAddress,
            status: 'pending',
            paymentStatus: 'pending',

            expiryDate: expiry,

            trackingInfo: {
                estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
            }
        });

        // 🔥 ADD THIS
        console.log("Saved order:", order);
        // Reduce crop quantity
        crop.quantity -= quantity;
        if (crop.quantity === 0) crop.status = 'sold_out';
        await crop.save();

        res.status(201).json({ success: true, data: order });

    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// ✅ GET MY ORDERS (BUYER)
exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ buyer: req.user.id })
            .populate('crop', 'name images unit price farmer')
            .populate({
                path: 'crop',
                populate: {
                    path: 'farmer',
                    select: 'name'
                }
            })
            .populate('farmer', 'name phone');

        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        });

    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// ✅ GET FARMER ORDERS (FIXED)
exports.getFarmerOrders = async (req, res) => {
    try {
        const orders = await Order.find({ farmer: req.user.id })
            .populate('buyer', 'name phone location')
            .populate({
                path: 'crop',
                select: 'name unit farmer',
                populate: {
                    path: 'farmer',
                    select: 'name'
                }
            })
            .populate('farmer', 'name');

        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        });

    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// ✅ GET ORDER BY ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('buyer', 'name phone location')
            .populate({
                path: 'crop',
                select: 'name images farmer',
                populate: {
                    path: 'farmer',
                    select: 'name phone'
                }
            })
            .populate('farmer', 'name phone location');

        if (!order) {
            return res.status(404).json({ success: false, error: 'Order not found' });
        }

        res.status(200).json({ success: true, data: order });

    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// ✅ UPDATE ORDER STATUS
exports.updateOrderStatus = async (req, res) => {
    try {
        const { status, locationUpdate } = req.body;

        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ success: false, error: 'Order not found' });
        }

        // Authorization check
        if (req.user.role === 'farmer' && order.farmer.toString() !== req.user.id) {
            return res.status(401).json({ success: false, error: 'Not authorized' });
        }

        if (status) order.status = status;

        if (locationUpdate) {
            order.trackingInfo.updates.push({
                status: status || order.status,
                location: locationUpdate
            });
        }

        await order.save();

        res.status(200).json({ success: true, data: order });

    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};