import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Sprout, LogOut, User } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="glass" style={{ position: 'sticky', top: 0, zIndex: 50, padding: '1rem 0' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.25rem' }}>
                    <Sprout color="var(--primary)" size={28} />
                    <span className="gradient-text">AgriSmart</span>
                </Link>
                
                <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <Link to="/about" style={{ fontWeight: 500, transition: 'color 0.2s' }}>About Us</Link>
                    <Link to="/marketplace" style={{ fontWeight: 500, transition: 'color 0.2s' }}>Marketplace</Link>
                    
                    {!user ? (
                        <>
                            <Link to="/login" style={{ fontWeight: 500 }}>Login</Link>
                            <Link to="/get-started" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Get Started</Link>
                        </>
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Link to={user.role === 'farmer' ? '/farmer-dashboard' : '/buyer-dashboard'} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontWeight: 600, color: 'var(--primary)' }}>
                                <User size={18} />
                                {user.name}
                            </Link>
                            <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', gap: '0.4rem' }}>
                                <LogOut size={16} /> Logout
                            </button>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
