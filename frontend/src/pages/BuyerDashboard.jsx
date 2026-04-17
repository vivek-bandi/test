import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { ShoppingBag, Truck, Star } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

const BuyerDashboard = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [reviewingFarmer, setReviewingFarmer] = useState(null);

    useEffect(() => {
        if (!user) return;
        fetchOrders();
    }, [user]);

    const fetchOrders = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/orders/myorders`);
            setOrders(res.data.data);
        } catch (err) {
            console.error('Failed to fetch orders', err);
        }
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        const rating = e.target.rating.value;
        const comment = e.target.comment.value;
        try {
            await axios.post(`${API_URL}/api/reviews`, { 
                farmerId: reviewingFarmer, 
                rating: Number(rating), 
                comment 
            });
            alert('Review submitted successfully!');
            setReviewingFarmer(null);
        } catch (err) {
            alert(err.response?.data?.error || 'Failed to submit review');
        }
    };

    if (!user) return <div className="page container">Access denied. Please login.</div>;

    return (
        <div className="page container animate-fade-in">
            <h1 style={{ marginBottom: '2rem' }}>My Dashboard</h1>
            
            <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'minmax(0, 1fr) 350px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ShoppingBag color="var(--primary)" /> Order History</h2>
                    {orders.length === 0 ? <div className="card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>No orders placed yet.</div> : null}
                    {orders.map(order => (
                        <div key={order._id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.1rem' }}>{order.crop?.name}</h3>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Farmer: {order.farmer?.name}</p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <h4 style={{ color: 'var(--primary)', fontSize: '1.25rem' }}>₹{order.totalPrice}</h4>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Qty: {order.quantity}</span>
                                </div>
                            </div>
                            
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Truck size={18} color={order.status === 'delivered' ? 'var(--primary)' : 'var(--secondary)'} />
                                    <span>Status: <strong style={{ textTransform: 'capitalize' }}>{order.status}</strong></span>
                                </div>
                                {order.status === 'delivered' && (
                                    <button onClick={() => setReviewingFarmer(order.farmer._id)} className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
                                        <Star size={16} /> Rate Farmer
                                    </button>
                                )}
                            </div>
                            
                            {/* Tracking Timeline Visualization */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', position: 'relative' }}>
                                <div style={{ position: 'absolute', top: '10px', left: '10%', right: '10%', height: '2px', background: 'var(--border)', zIndex: 0 }} />
                                {['pending', 'confirmed', 'dispatched', 'delivered'].map((step, idx) => {
                                    const isActive = ['pending', 'confirmed', 'dispatched', 'delivered'].indexOf(order.status) >= idx;
                                    return (
                                        <div key={step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1, background: 'var(--surface)', padding: '0 0.5rem' }}>
                                            <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: isActive ? 'var(--primary)' : 'var(--border)', marginBottom: '0.5rem', transition: 'background 0.3s' }} />
                                            <span style={{ fontSize: '0.75rem', textTransform: 'capitalize', color: isActive ? 'var(--text-main)' : 'var(--text-muted)' }}>{step}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ alignSelf: 'start' }}>
                    {reviewingFarmer && (
                        <div className="card animate-slide-up" style={{ border: '2px solid var(--accent)' }}>
                            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Star color="var(--accent)" fill="var(--accent)" /> Leave a Review
                            </h3>
                            <form onSubmit={handleSubmitReview}>
                                <div className="form-group">
                                    <label className="form-label">Rating (1-5)</label>
                                    <input type="number" name="rating" min="1" max="5" required className="form-control" defaultValue="5" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Comments</label>
                                    <textarea name="comment" className="form-control" rows="3" required placeholder="How was the quality and delivery?"></textarea>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button type="button" onClick={() => setReviewingFarmer(null)} className="btn btn-outline" style={{ flex: 1 }}>Cancel</button>
                                    <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Submit</button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BuyerDashboard;
