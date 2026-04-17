import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError('');
            await login(identifier, password);
            navigate('/marketplace');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed. Please check credentials.');
        }
    };

    return (
        <div className="page container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 100px)', padding: '2rem 1rem' }}>
            <div className="card animate-slide-up" style={{ width: '100%', maxWidth: '440px', padding: '3rem 2.5rem', borderRadius: '1.5rem', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border)' }}>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        width: '56px', 
                        height: '56px', 
                        borderRadius: '50%', 
                        background: '#F0FDF4',
                        color: 'var(--primary)', 
                        marginBottom: '1.25rem'
                    }}>
                        <span style={{ fontSize: '1.6rem' }}>🌱</span>
                    </div>
                    <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Welcome Back</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Enter your credentials to access your account.</p>
                </div>
                
                {error && <div style={{ background: '#FEE2E2', color: '#DC2626', padding: '1rem', borderRadius: 'var(--radius)', marginBottom: '1.5rem', textAlign: 'center', fontWeight: '500', fontSize: '0.95rem', border: '1px solid #FCA5A5' }}>{error}</div>}
                
                <form onSubmit={handleSubmit} className="animate-fade-in">
                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label className="form-label">Email or Phone Number</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="xyz@example.com" 
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="form-group" style={{ marginBottom: '2.5rem' }}>
                        <label className="form-label">Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            placeholder="••••••••" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', fontWeight: 700 }}>
                        Sign In
                    </button>
                </form>
                
                <p style={{ textAlign: 'center', marginTop: '2.5rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                    Don't have an account? <Link to="/get-started" style={{ color: 'var(--primary)', fontWeight: '700', textDecoration: 'none', marginLeft: '0.25rem' }}>Create one here</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
