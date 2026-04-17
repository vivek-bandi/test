const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', { expiresIn: '30d' });
};

exports.register = async (req, res) => {
    try {
        const { name, email, password, role, phone, location, nearAddress, farmDetails, farmImage } = req.body;
        
        if (!email && !phone) {
            return res.status(400).json({ success: false, error: 'Please provide either email or phone number' });
        }

        const query = [];
        if (email) query.push({ email });
        if (phone) query.push({ phone });

        const userExists = await User.findOne({ $or: query });
        if (userExists) {
            return res.status(400).json({ success: false, error: 'User with this email or phone already exists' });
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const user = await User.create({
            name, email, password: hashedPassword, role, phone, location, nearAddress, farmDetails, farmImage
        });
        
        res.status(201).json({ success: true, token: generateToken(user._id), user: { id: user._id, name, email, role } });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { identifier, password } = req.body;
        if (!identifier || !password) {
            return res.status(400).json({ success: false, error: 'Please provide email/phone and password' });
        }
        
        const user = await User.findOne({ 
            $or: [
                { email: identifier },
                { phone: identifier }
            ]
        });
        if (!user) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }
        
        res.status(200).json({ success: true, token: generateToken(user._id), user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).json({ success: true, data: user });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user.id, req.body, {
            new: true,
            runValidators: true
        }).select('-password');
        
        res.status(200).json({ success: true, data: user });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
