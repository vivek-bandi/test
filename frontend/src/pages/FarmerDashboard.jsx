import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { BarChart as BarChartIcon, Package, PlusCircle, TrendingUp, Settings } from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from "recharts";

const API_URL = import.meta.env.VITE_API_URL;

const FarmerDashboard = () => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState(null);
    const [crops, setCrops] = useState([]);
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState('overview');
    const [profileFormData, setProfileFormData] = useState({});
    const [editingCrop, setEditingCrop] = useState(null);
    const [priceSuggestion, setPriceSuggestion] = useState(null);
    const [priceCategory, setPriceCategory] = useState('Vegetables');

    // Make state robust since this is an analytics dashboard
    useEffect(() => {
        if (!user) return;
        setProfileFormData({
            name: user.name || '',
            phone: user.phone || '',
            location: user.location || '',
            farmDetails: user.farmDetails || '',
            farmImage: user.farmImage || ''
        });
        fetchDashboardData();
    }, [user]);

    const fetchDashboardData = async () => {
        try {
            const [statsRes, cropsRes, ordersRes] = await Promise.all([
                axios.get(`${API_URL}/api/analytics/farmer`),
                axios.get(`${API_URL}/api/crops?farmerId=${user._id}`), // Note: basic filter
                axios.get(`${API_URL}/api/orders/farmer`)
            ]);
            setStats(statsRes.data.data);

            // To ensure we only see THIS farmer's crops, filter client side if server doesn't support query by ID natively
            const myCrops = cropsRes.data.data.filter(c => c.farmer?._id === user._id || c.farmer === user._id);
            setCrops(myCrops);
            setOrders(ordersRes.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleAddCrop = async (e) => {
        e.preventDefault();
        const form = e.target;
        const cropData = {
            name: form.name.value,
            category: form.category.value,
            quantity: Number(form.quantity.value),
            price: Number(form.price.value),
            unit: 'kg', // Defaulting for demo
            description: form.description.value,
            images: form.imageUrl.value ? [form.imageUrl.value] : []
        };

        try {
            await axios.post(`${API_URL}/api/crops`, cropData);
            alert('Crop added successfully');
            form.reset();
            fetchDashboardData();
        } catch (err) {
            alert(err.response?.data?.error || 'Failed to add crop');
        }
    };

    const handleUpdateCrop = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${API_URL}/api/crops/${editingCrop._id}`, editingCrop);
            setEditingCrop(null);
            fetchDashboardData();
        } catch (err) {
            alert(err.response?.data?.error || 'Failed to update crop');
        }
    };

    const handleDeleteCrop = async (cropId) => {
        if (!window.confirm('Are you sure you want to delete this crop?')) return;
        try {
            await axios.delete(`${API_URL}/api/crops/${cropId}`);
            fetchDashboardData();
        } catch (err) {
            alert(err.response?.data?.error || 'Failed to delete crop');
        }
    };

    const getPriceSuggestion = async (category) => {
        try {
            const res = await axios.post(`${API_URL}/api/crops/suggest-price`, { category: category });
            setPriceSuggestion(res.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpdateOrderStatus = async (orderId, newStatus) => {
        try {
            await axios.put(`${API_URL}/api/orders/${orderId}/status`, { status: newStatus });
            fetchDashboardData();
        } catch (err) {
            alert('Failed to update status');
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${API_URL}/api/auth/profile`, profileFormData);
            alert('Profile updated successfully! Refresh to see changes across app.');
        } catch (err) {
            alert(err.response?.data?.error || 'Failed to update profile');
        }
    };

    if (!user) return <div className="page container">Access denied. Please login.</div>;

    return (
        <div className="page container animate-fade-in" style={{ display: 'flex', gap: '2rem' }}>
            {/* Sidebar */}
            <aside className="card" style={{ width: '250px', height: 'fit-content', padding: '1rem 0' }}>
                <div style={{ padding: '0 1.5rem 1rem', borderBottom: '1px solid var(--border)', marginBottom: '1rem' }}>
                    <h2 style={{ fontSize: '1.25rem' }}>{user.name}</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Farmer Account</p>
                </div>
                <ul style={{ display: 'flex', flexDirection: 'column' }}>
                    <li>
                        <button className="btn" style={{ width: '100%', justifyContent: 'flex-start', padding: '0.75rem 1.5rem', background: activeTab === 'overview' ? '#F0FDF4' : 'transparent', color: activeTab === 'overview' ? 'var(--primary)' : 'inherit', borderRadius: 0 }} onClick={() => setActiveTab('overview')}>
                            <BarChartIcon size={18} /> Overview & Analytics
                        </button>
                    </li>
                    <li>
                        <button className="btn" style={{ width: '100%', justifyContent: 'flex-start', padding: '0.75rem 1.5rem', background: activeTab === 'inventory' ? '#F0FDF4' : 'transparent', color: activeTab === 'inventory' ? 'var(--primary)' : 'inherit', borderRadius: 0 }} onClick={() => setActiveTab('inventory')}>
                            <Package size={18} /> My Crops & Inventory
                        </button>
                    </li>
                    <li>
                        <button className="btn" style={{ width: '100%', justifyContent: 'flex-start', padding: '0.75rem 1.5rem', background: activeTab === 'orders' ? '#F0FDF4' : 'transparent', color: activeTab === 'orders' ? 'var(--primary)' : 'inherit', borderRadius: 0 }} onClick={() => setActiveTab('orders')}>
                            <TrendingUp size={18} /> Orders & Logistics
                        </button>
                    </li>
                    <li>
                        <button className="btn" style={{ width: '100%', justifyContent: 'flex-start', padding: '0.75rem 1.5rem', background: activeTab === 'profile' ? '#F0FDF4' : 'transparent', color: activeTab === 'profile' ? 'var(--primary)' : 'inherit', borderRadius: 0 }} onClick={() => setActiveTab('profile')}>
                            <Settings size={18} /> Profile Settings
                        </button>
                    </li>
                </ul>
            </aside>
            {/* ✅ ADD THIS WRAPPER */}

            {/* Main Content */}
            <main style={{ flex: 1 }}>
                {activeTab === 'overview' && stats && (
                    <div className="animate-slide-up">

                        {/* Header */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '2rem'
                        }}>
                            <h2>Dashboard Overview</h2>
                        </div>

                        {/* Cards */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '1.5rem',
                            marginBottom: '2rem'
                        }}>

                            {/* Total Revenue */}
                            <div className="card gradient-bg" style={{ color: 'black' }}>
                                <h3>Total Revenue</h3>
                                <div style={{
                                    fontSize: '2.5rem',
                                    fontWeight: 700,
                                    margin: '0.5rem 0',
                                    color: '#22c55e'
                                }}>
                                    ₹{stats.totalRevenue || 0}
                                </div>
                                <p style={{ opacity: 0.8 }}>Lifetime earnings</p>
                            </div>

                            {/* Total Orders */}
                            <div className="card" style={{
                                background: '#EFF6FF',
                                borderColor: '#BFDBFE'
                            }}>
                                <h3>Total Orders</h3>
                                <div style={{
                                    fontSize: '2.5rem',
                                    fontWeight: 700,
                                    margin: '0.5rem 0',
                                    color: '#3b82f6'
                                }}>
                                    {stats.totalOrders || 0}
                                </div>
                                <p style={{ color: 'var(--text-muted)' }}>
                                    From loyal customers
                                </p>
                            </div>

                        </div>

                        {/* 📊 Market Demand Trends */}
                        <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
                            <h3 style={{ marginBottom: '1rem' }}>Market Demand Trends</h3>

                            {stats.topCrops && stats.topCrops.length > 0 ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                                    {stats.topCrops.map((crop, index) => {
                                        const colors = [
                                            "#ef4444", // red
                                            "#f97316", // orange
                                            "#22c55e", // green
                                            "#3b82f6", // blue
                                            "#a855f7"  // purple
                                        ];

                                        const labels = ["High Demand", "Good", "Stable", "Moderate", "Low"];

                                        const width = Math.min(crop.totalSold * 5, 100); // scale width

                                        return (
                                            <div key={index}>

                                                {/* Crop Name */}
                                                <div style={{ marginBottom: '0.3rem', fontWeight: 500 }}>
                                                    {crop.name}
                                                </div>

                                                {/* Bar */}
                                                <div style={{
                                                    height: '8px',
                                                    background: '#e5e7eb',
                                                    borderRadius: '10px',
                                                    position: 'relative'
                                                }}>
                                                    <div style={{
                                                        width: `${width}%`,
                                                        height: '100%',
                                                        background: colors[index % colors.length],
                                                        borderRadius: '10px'
                                                    }}></div>
                                                </div>

                                                {/* Label */}
                                                <div style={{
                                                    fontSize: '0.8rem',
                                                    marginTop: '0.2rem',
                                                    color: 'gray',
                                                    textAlign: 'right'
                                                }}>
                                                    {labels[index % labels.length]}
                                                </div>

                                            </div>
                                        );
                                    })}

                                </div>
                            ) : (
                                <p>No demand data available</p>
                            )}
                        </div>

                        {/* Top Selling Crops */}
                        <div className="card">
                            <h3 style={{ marginBottom: '1rem' }}>Top Selling Crops</h3>

                            {stats.topCrops?.length > 0 ? (
                                <ul style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.5rem'
                                }}>
                                    {stats.topCrops.map((tc, i) => (
                                        <li
                                            key={i}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                padding: '0.75rem',
                                                background: 'var(--bg-color)',
                                                borderRadius: 'var(--radius)'
                                            }}
                                        >
                                            <span>{tc.name}</span>
                                            <span style={{ fontWeight: 600 }}>
                                                {tc.totalSold} sold
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p style={{ color: 'var(--text-muted)' }}>
                                    No sales data yet.
                                </p>
                            )}
                        </div>

                    </div>

                )}  {/* ✅ FIXED ORDER */}

                {activeTab === 'inventory' && (
                    <div className="animate-slide-up">
                        <h2>My Crops</h2>
                        <div className="card" style={{ margin: '1.5rem 0', background: '#F8FAFC', border: '1px dashed var(--border)' }}>
                            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><PlusCircle size={20} color="var(--primary)" /> Add New Crop</h3>
                            <form onSubmit={handleAddCrop} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="form-group"><input name="name" placeholder="Crop Name" required className="form-control" /></div>
                                <div className="form-group">
                                    <select name="category" value={priceCategory} onChange={(e) => setPriceCategory(e.target.value)} required className="form-control">
                                        <option value="Vegetables">Vegetables</option>
                                        <option value="Fruits">Fruits</option>
                                        <option value="Grains">Grains</option>
                                    </select>
                                </div>
                                <div className="form-group"><input type="number" name="quantity" placeholder="Quantity (kg)" required className="form-control" /></div>
                                <div className="form-group"><input type="number" name="price" placeholder="Price per kg (₹)" required className="form-control" /></div>

                                <div className="form-group" style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '0.5rem', background: '#FFFBEB', padding: '1rem', borderRadius: 'var(--radius)', border: '1px solid var(--accent)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontWeight: 600, color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><TrendingUp size={18} /> AI Price Suggestion</span>
                                        <button type="button" onClick={() => getPriceSuggestion(priceCategory)} className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', background: 'white', borderColor: 'var(--accent)' }}>Get Suggestion</button>
                                    </div>
                                    {priceSuggestion && (
                                        <div className="animate-fade-in" style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                                            <p>{priceSuggestion.message}</p>
                                            <div style={{ marginTop: '0.5rem', display: 'flex', gap: '1rem' }}>
                                                <span style={{ background: 'white', padding: '0.2rem 0.5rem', borderRadius: '4px', border: '1px solid #E5E7EB' }}>Suggested: <strong>₹{priceSuggestion.suggestedPrice} / {priceSuggestion.unit}</strong></span>
                                                <span style={{ background: 'white', padding: '0.2rem 0.5rem', borderRadius: '4px', border: '1px solid #E5E7EB' }}>Trend: <strong>{priceSuggestion.marketTrend}</strong></span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="form-group" style={{ gridColumn: '1 / -1' }}><input type="url" name="imageUrl" placeholder="Image URL (Optional)" className="form-control" /></div>
                                <div className="form-group" style={{ gridColumn: '1 / -1' }}><textarea name="description" placeholder="Description" className="form-control" rows="2" /></div>
                                <button type="submit" className="btn btn-primary" style={{ gridColumn: '1 / -1' }}>List Crop in Marketplace</button>
                            </form>
                        </div>

                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {crops.map(c => (
                                <div key={c._id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        {c.images && c.images.length > 0 ? (
                                            <img src={c.images[0]} alt={c.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: 'var(--radius)' }} />
                                        ) : (
                                            <div style={{ width: '60px', height: '60px', background: '#e2e8f0', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Package size={24} color="var(--text-muted)" />
                                            </div>
                                        )}
                                        <div>
                                            <h4 style={{ fontSize: '1.1rem' }}>{c.name} <span style={{ fontSize: '0.8rem', fontWeight: 'normal', color: 'var(--text-muted)' }}>({c.category})</span></h4>
                                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>Stock: {c.quantity} {c.unit} | Price: ₹{c.price}/{c.unit}</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                                        <span style={{ padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.85rem', background: c.status === 'available' ? '#F0FDF4' : '#FEE2E2', color: c.status === 'available' ? 'var(--primary-dark)' : '#DC2626' }}>
                                            {c.status.toUpperCase()}
                                        </span>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button onClick={() => setEditingCrop(c)} className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}>Edit</button>
                                            <button onClick={() => handleDeleteCrop(c._id)} className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', background: '#FEE2E2', color: '#DC2626', borderColor: '#FEE2E2' }}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {editingCrop && (
                            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                                <div className="card animate-scale-in" style={{ width: '100%', maxWidth: '500px', padding: '2rem' }}>
                                    <h3>Edit Crop</h3>
                                    <form onSubmit={handleUpdateCrop} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                                        <div className="form-group">
                                            <label className="form-label">Price (₹)</label>
                                            <input type="number" className="form-control" value={editingCrop.price} onChange={(e) => setEditingCrop({ ...editingCrop, price: Number(e.target.value) })} required />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Quantity</label>
                                            <input type="number" className="form-control" value={editingCrop.quantity} onChange={(e) => setEditingCrop({ ...editingCrop, quantity: Number(e.target.value) })} required />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Status</label>
                                            <select className="form-control" value={editingCrop.status} onChange={(e) => setEditingCrop({ ...editingCrop, status: e.target.value })}>
                                                <option value="available">Available</option>
                                                <option value="sold_out">Sold Out</option>
                                            </select>
                                        </div>
                                        <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                                            <button type="button" onClick={() => setEditingCrop(null)} className="btn btn-outline" style={{ flex: 1 }}>Cancel</button>
                                            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Save Changes</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'orders' && (
                    <div className="animate-slide-up">
                        <h2>Order Logistics</h2>

                        <div style={{ display: 'grid', gap: '1rem', marginTop: '1.5rem' }}>
                            {orders.length === 0 ? (
                                <p>No orders yet.</p>
                            ) : (
                                orders.map((o) => {

                                    const isExpired = o.expiryDate && new Date(o.expiryDate) < new Date();
                                    const daysLeft = o.expiryDate
                                        ? Math.ceil((new Date(o.expiryDate) - new Date()) / (1000 * 60 * 60 * 24))
                                        : null;

                                    const getStatusColor = (status) => {
                                        if (status === "pending") return "#f59e0b";
                                        if (status === "confirmed") return "#22c55e";
                                        if (status === "dispatched") return "#3b82f6";
                                        if (status === "delivered") return "#6366f1";
                                        return "#6b7280";
                                    };

                                    const statusColor = getStatusColor(o.status);

                                    return (
                                        <div key={o._id} className="card" style={{ padding: '1.5rem' }}>

                                            {/* TOP SECTION */}
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                marginBottom: '1rem',
                                                paddingBottom: '1rem',
                                                borderBottom: '1px solid var(--border)'
                                            }}>
                                                <div>
                                                    <h4>Order ID: #{o._id.substring(o._id.length - 6)}</h4>

                                                    <h3 style={{ marginTop: '0.5rem' }}>
                                                        {o.crop?.name || "Crop Name"}
                                                    </h3>

                                                    {/* 👇 CLEAN ALIGNMENT BLOCK */}
                                                    <div style={{ marginTop: '0.4rem' }}>

                                                        {/* Buyer */}
                                                        <p style={{ fontSize: '0.85rem', color: 'gray', margin: 0 }}>
                                                            Buyer: {o.buyer?.name || "Buyer"}
                                                        </p>

                                                        {/* Farmer (FIXED PROPERLY) */}
                                                        <p style={{ fontSize: '0.85rem', color: 'gray', margin: 0 }}>
                                                            Farmer: {o.crop?.farmer?.name || o.farmer?.name || "Farmer"}
                                                        </p>

                                                        {/* Expiry (FIXED PROPERLY) */}
                                                        <p style={{
                                                            fontSize: '0.85rem',
                                                            margin: 0,
                                                            color: o.expiryDate
                                                                ? (new Date(o.expiryDate) < new Date() ? "red" : "#ef4444")
                                                                : "gray",
                                                            fontWeight: 500
                                                        }}>
                                                            {o.expiryDate
                                                                ? (new Date(o.expiryDate) < new Date()
                                                                    ? "⚠ Expired"
                                                                    : `Expires on ${new Date(o.expiryDate).toLocaleDateString()}`)
                                                                : "No expiry"}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* RIGHT SIDE */}
                                                <div style={{ textAlign: 'right' }}>
                                                    <h4 style={{ color: 'var(--primary)' }}>₹{o.totalPrice}</h4>
                                                    <span style={{ fontSize: '0.85rem' }}>{o.quantity} units</span>
                                                </div>
                                            </div>

                                            {/* STATUS */}
                                            <div style={{ marginBottom: '1rem' }}>
                                                <strong>Status: </strong>
                                                <span style={{
                                                    background: statusColor + "20",
                                                    color: statusColor,
                                                    padding: '0.3rem 0.6rem',
                                                    borderRadius: '6px'
                                                }}>
                                                    {o.status.toUpperCase()}
                                                </span>
                                            </div>

                                            {/* 📦 TIMELINE */}
                                            <div style={{ marginTop: '1.5rem', position: 'relative' }}>

                                                {/* Full line */}
                                                <div style={{
                                                    position: 'absolute',
                                                    top: '10px',
                                                    left: 0,
                                                    right: 0,
                                                    height: '2px',
                                                    background: '#e5e7eb'
                                                }}></div>

                                                {/* Active line */}
                                                <div style={{
                                                    position: 'absolute',
                                                    top: '10px',
                                                    left: 0,
                                                    height: '2px',
                                                    width: `${(["pending", "confirmed", "dispatched", "delivered"].indexOf(o.status) + 1)
                                                        / 4 * 100
                                                        }%`,
                                                    background: '#22c55e'
                                                }}></div>

                                                {/* Steps */}
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    {["pending", "confirmed", "dispatched", "delivered"].map((step, index) => {

                                                        const isActive =
                                                            ["pending", "confirmed", "dispatched", "delivered"].indexOf(o.status) >= index;

                                                        return (
                                                            <div key={step} style={{ textAlign: 'center', flex: 1 }}>

                                                                <div style={{
                                                                    width: '18px',
                                                                    height: '18px',
                                                                    borderRadius: '50%',
                                                                    margin: '0 auto',
                                                                    background: isActive ? "#22c55e" : "#e5e7eb",
                                                                    border: '2px solid white'
                                                                }}></div>

                                                                <p style={{
                                                                    fontSize: '0.75rem',
                                                                    marginTop: '6px',
                                                                    color: isActive ? '#22c55e' : 'gray'
                                                                }}>
                                                                    {step}
                                                                </p>

                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                            {/* BUTTONS */}
                                            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                                                {o.status === 'pending' && (
                                                    <button onClick={() => handleUpdateOrderStatus(o._id, 'confirmed')} className="btn btn-secondary">
                                                        Confirm
                                                    </button>
                                                )}

                                                {o.status === 'confirmed' && (
                                                    <button onClick={() => handleUpdateOrderStatus(o._id, 'dispatched')} className="btn btn-primary">
                                                        Dispatch
                                                    </button>
                                                )}

                                                {o.status === 'dispatched' && (
                                                    <button onClick={() => handleUpdateOrderStatus(o._id, 'delivered')} className="btn btn-outline">
                                                        Deliver
                                                    </button>
                                                )}
                                            </div>

                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'profile' && (
                    <div className="animate-slide-up">
                        <h2>Profile Settings</h2>
                        <div className="card" style={{ marginTop: '1.5rem' }}>
                            <form onSubmit={handleUpdateProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div className="form-group">
                                    <label className="form-label">Full Name</label>
                                    <input type="text" className="form-control" value={profileFormData.name} onChange={(e) => setProfileFormData({ ...profileFormData, name: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Phone Number</label>
                                    <input type="text" className="form-control" value={profileFormData.phone} onChange={(e) => setProfileFormData({ ...profileFormData, phone: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Location</label>
                                    <input type="text" className="form-control" value={profileFormData.location} onChange={(e) => setProfileFormData({ ...profileFormData, location: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Farm Details / About</label>
                                    <textarea className="form-control" rows="3" value={profileFormData.farmDetails} onChange={(e) => setProfileFormData({ ...profileFormData, farmDetails: e.target.value })}></textarea>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Farm Image URL (Optional)</label>
                                    <input type="url" className="form-control" value={profileFormData.farmImage} onChange={(e) => setProfileFormData({ ...profileFormData, farmImage: e.target.value })} />
                                </div>
                                <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Save Changes</button>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div >
    );
};

export default FarmerDashboard;