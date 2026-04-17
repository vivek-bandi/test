const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['farmer', 'buyer'], required: true },
    phone: { type: String, unique: true, required: true },
    location: { type: String, required: true },
    nearAddress: { type: String, required: true },
    farmDetails: { 
        type: String,
        required: function() { return this.role === 'farmer'; }
    }, // For farmers
    certifications: [{ type: String }], // Optional image URLs or text
    farmImage: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
