const Order = require('../models/Order');

exports.getFarmerAnalytics = async (req, res) => {
    try {
        const farmerId = req.user.id;
        
        // Aggregate total revenue
        const revenueAggregation = await Order.aggregate([
            { $match: { farmer: req.user._id, status: { $ne: 'cancelled' } } },
            { $group: { _id: null, totalRevenue: { $sum: '$totalPrice' }, totalOrders: { $sum: 1 } } }
        ]);
        
        const stats = revenueAggregation[0] || { totalRevenue: 0, totalOrders: 0 };
        
        // Aggregate top crops
        const topCropsAgg = await Order.aggregate([
            { $match: { farmer: req.user._id } },
            { $group: { _id: '$crop', totalSold: { $sum: '$quantity' } } },
            { $sort: { totalSold: -1 } },
            { $limit: 5 },
            { $lookup: { from: 'crops', localField: '_id', foreignField: '_id', as: 'cropInfo' } },
            { $unwind: '$cropInfo' },
            { $project: { name: '$cropInfo.name', totalSold: 1 } }
        ]);

        res.status(200).json({ 
            success: true, 
            data: { 
                totalRevenue: stats.totalRevenue,
                totalOrders: stats.totalOrders,
                topCrops: topCropsAgg
            } 
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
