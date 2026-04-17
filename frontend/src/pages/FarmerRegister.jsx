import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const FarmerRegister = () => {
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', role: 'farmer', phone: '', location: '', nearAddress: '', farmDetails: '', farmImage: ''
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
            navigate('/farmer-dashboard');
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
                    <div style={{ display: 'inline-block', background: '#F0FDF4', padding: '0.75rem 1.5rem', borderRadius: '2rem', color: 'var(--primary-dark)', fontWeight: 700, marginBottom: '1rem', fontSize: '0.9rem' }}>
                        Farmer Account
                    </div>
                    <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                        Join as a <span style={{ color: 'var(--primary)' }}>Farmer</span>
                    </h2>
                    <p style={{ color: 'var(--text-muted)' }}>
                        Start selling your fresh crops directly to consumers and increase your profits today.
                    </p>
                </div>
                
                {error && <div style={{ background: '#FEE2E2', color: '#DC2626', padding: '1rem', borderRadius: 'var(--radius)', marginBottom: '1.5rem', textAlign: 'center', fontWeight: 500, border: '1px solid #F87171' }}>{error}</div>}
                
                <form onSubmit={handleSubmit} className="animate-fade-in">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                            <label className="form-label">Full Name</label>
                            <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required placeholder="Jane Smith" />
                        </div>
                        
                        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                            <label className="form-label">Email Address</label>
                            <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required placeholder="jane@farm.com" />
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
                            <input type="text" name="location" className="form-control" value={formData.location} onChange={handleChange} required placeholder="Salinas, CA" />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Address / Landmark</label>
                            <input type="text" name="nearAddress" className="form-control" value={formData.nearAddress} onChange={handleChange} required placeholder="Near the old oak tree" />
                        </div>
                    </div>

                    <div className="animate-slide-up" style={{ marginTop: '1rem', paddingTop: '1.5rem', borderTop: '1px dashed var(--border)' }}>
                        <h3 style={{ fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: '1rem' }}>Farm Information</h3>
                        <div className="form-group">
                            <label className="form-label">What do you grow? (Farm Details)</label>
                            <textarea name="farmDetails" className="form-control" value={formData.farmDetails} onChange={handleChange} rows="3" placeholder="E.g., Organic tomatoes, wheat, seasonal vegetables..." required />
                        </div>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label">Farm Image URL (Optional)</label>
                            <input type="url" name="farmImage" className="form-control" value={formData.farmImage} onChange={handleChange} placeholder="https://..." />
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
                            background: 'var(--primary)',
                            color: 'white',
                            boxShadow: '0 4px 14px 0 rgba(16, 185, 129, 0.39)'
                        }}
                    >
                        Create Farmer Account
                    </button>
                </form>
                
                <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-muted)' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '600' }}>Login here</Link>
                </p>
                <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem' }}>
                    <Link to="/register/buyer" style={{ color: 'var(--text-muted)', textDecoration: 'underline' }}>Wait, I want to register as a Buyer instead</Link>
                </p>
            </div>
        </div>
    );
};

export default FarmerRegister;
