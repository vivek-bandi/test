import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const BuyerRegister = () => {
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', role: 'buyer', phone: '', location: '', nearAddress: ''
    });
    const [error, setError] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError('');
            await register(formData);
            navigate('/marketplace');
        } catch (err) {
            if (err.message === 'Network Error') {
                setError('Network Error. Please ensure the backend server is running.');
            } else {
                setError(err.response?.data?.error || 'Registration failed.');
            }
        }
    };

    return (
        <div className="page container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 100px)', padding: '2rem 1rem' }}>
            <div className="card animate-slide-up" style={{ width: '100%', maxWidth: '600px', padding: '2.5rem', borderRadius: '1.5rem', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border)' }}>
                
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ display: 'inline-block', background: '#FEF3C7', padding: '0.75rem 1.5rem', borderRadius: '2rem', color: '#D97706', fontWeight: 700, marginBottom: '1rem', fontSize: '0.9rem' }}>
                        Buyer Account
                    </div>
                    <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                        Join as a <span style={{ color: 'var(--secondary)' }}>Buyer</span>
                    </h2>
                    <p style={{ color: 'var(--text-muted)' }}>
                        Get access to fresh, local produce directly from farmers at transparent prices.
                    </p>
                </div>
                
                {error && <div style={{ background: '#FEE2E2', color: '#DC2626', padding: '1rem', borderRadius: 'var(--radius)', marginBottom: '1.5rem', textAlign: 'center', fontWeight: 500, border: '1px solid #F87171' }}>{error}</div>}
                
                <form onSubmit={handleSubmit} className="animate-fade-in">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                            <label className="form-label">Full Name</label>
                            <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required placeholder="John Doe" />
                        </div>
                        
                        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                            <label className="form-label">Email Address</label>
                            <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required placeholder="john@example.com" />
                        </div>
                        
                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} required placeholder="••••••••" />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Phone Number</label>
                            <input type="text" name="phone" className="form-control" value={formData.phone} onChange={handleChange} required placeholder="1234567890" />
                        </div>

                        <div className="form-group">
                            <label className="form-label">City / State</label>
                            <input type="text" name="location" className="form-control" value={formData.location} onChange={handleChange} required placeholder="New York, NY" />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Address / Landmark</label>
                            <input type="text" name="nearAddress" className="form-control" value={formData.nearAddress} onChange={handleChange} required placeholder="123 Main St" />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className="btn" 
                        style={{ 
                            width: '100%', 
                            marginTop: '2rem', 
                            padding: '1rem', 
                            fontSize: '1.1rem', 
                            fontWeight: 700,
                            background: 'var(--secondary)',
                            color: 'white',
                            boxShadow: '0 4px 14px 0 rgba(245, 158, 11, 0.39)'
                        }}
                    >
                        Create Buyer Account
                    </button>
                </form>
                
                <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-muted)' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--secondary)', fontWeight: '600' }}>Login here</Link>
                </p>
                <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem' }}>
                    <Link to="/register/farmer" style={{ color: 'var(--text-muted)', textDecoration: 'underline' }}>Wait, I want to register as a Farmer instead</Link>
                </p>
            </div>
        </div>
    );
};

export default BuyerRegister;
