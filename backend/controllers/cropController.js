const Crop = require('../models/Crop');

// Get all crops
exports.getCrops = async (req, res) => {
    try {
        const { keyword, category, minPrice, maxPrice, status } = req.query;
        let query = {};
        
        if (keyword) {
            query.name = { $regex: keyword, $options: 'i' };
        }
        if (category) query.category = category;
        if (status) query.status = status;
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        const crops = await Crop.find(query).populate('farmer', 'name email location phone');
        res.status(200).json({ success: true, count: crops.length, data: crops });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// Get single crop
exports.getCropById = async (req, res) => {
    try {
        const crop = await Crop.findById(req.params.id).populate('farmer', 'name email location phone farmDetails');
        if (!crop) return res.status(404).json({ success: false, error: 'Crop not found' });
        res.status(200).json({ success: true, data: crop });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// Create crop
exports.createCrop = async (req, res) => {
    try {
        req.body.farmer = req.user.id;
        const crop = await Crop.create(req.body);
        res.status(201).json({ success: true, data: crop });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// Update crop
exports.updateCrop = async (req, res) => {
    try {
        let crop = await Crop.findById(req.params.id);
        if (!crop) return res.status(404).json({ success: false, error: 'Crop not found' });
        
        // Ensure user is crop owner
        if (crop.farmer.toString() !== req.user.id) {
            return res.status(401).json({ success: false, error: 'Not authorized to update this crop' });
        }
        
        crop = await Crop.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.status(200).json({ success: true, data: crop });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// Delete crop
exports.deleteCrop = async (req, res) => {
    try {
        const crop = await Crop.findById(req.params.id);
        if (!crop) return res.status(404).json({ success: false, error: 'Crop not found' });
        
        if (crop.farmer.toString() !== req.user.id) {
            return res.status(401).json({ success: false, error: 'Not authorized to delete this crop' });
        }
        
        await crop.deleteOne();
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// Module 4: Smart Price Suggestion Module
exports.getPriceSuggestion = async (req, res) => {
    try {
        const { category, currentMonth } = req.body;
        
        // Simple mock algorithm based on typical market dynamics
        // In a real system, this would query market APIS or historical databases
        
        let basePrice = 50; 
        if (category === 'Vegetables') basePrice = 30;
        else if (category === 'Fruits') basePrice = 80;
        else if (category === 'Grains') basePrice = 40;
        
        // Add random fluctuation + seasonal logic
        const monthDemandMultiplier = [1.1, 1.2, 1.0, 0.9, 0.8, 1.0, 1.3, 1.4, 1.1, 0.9, 0.8, 1.2]; // 1-12
        const multiplier = monthDemandMultiplier[(currentMonth || new Date().getMonth())];
        
        const suggestedPrice = Math.round(basePrice * multiplier * (1 + (Math.random() * 0.2 - 0.1)));
        
        const marketTrend = multiplier > 1.1 ? 'High Demand' : (multiplier < 0.9 ? 'Low Demand' : 'Stable Demand');
        
        res.status(200).json({ 
            success: true, 
            data: { 
                suggestedPrice,
                unit: 'per kg',
                marketTrend,
                message: `Based on current market trends (${marketTrend}), we suggest setting a price around ₹${suggestedPrice} per kg for better sales.`
            } 
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
