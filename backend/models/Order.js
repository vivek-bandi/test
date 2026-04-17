const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    crop: { type: mongoose.Schema.Types.ObjectId, ref: 'Crop', required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },

    status: {
        type: String,
        enum: ['pending', 'confirmed', 'dispatched', 'delivered', 'cancelled'],
        default: 'pending'
    },

    paymentStatus: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'


    },

    deliveryAddress: { type: String, required: true },

    expiryDate: { type: Date },

    trackingInfo: {
        estimatedDelivery: { type: Date },
        updates: [{
            status: { type: String },
            time: { type: Date, default: Date.now },
            location: { type: String }
        }]
    }

}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);