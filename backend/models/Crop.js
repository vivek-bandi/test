const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true }, // e.g., kg, tons
    price: { type: Number, required: true },
    description: { type: String },
    images: [{ type: String }],
    status: { type: String, enum: ['available', 'sold_out'], default: 'available' }
}, { timestamps: true });

module.exports = mongoose.model('Crop', cropSchema);
