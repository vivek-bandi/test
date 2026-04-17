import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sprout, ShoppingCart, ArrowRight } from 'lucide-react';

const GetStarted = () => {
    const navigate = useNavigate();

    const handleSelection = (role) => {
        // Navigate directly to the specialized route
        if (role === 'buyer') {
            navigate('/register/buyer');
        } else {
            navigate('/register/farmer');
        }
    };

    return (
        <div style={{
            minHeight: 'calc(100vh - 64px - 80px)', // Approx full screen minus nav/footer
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)',
            padding: '2rem 1rem'
        }}>
            <div className="container animate-slide-up" style={{ maxWidth: '900px', width: '100%' }}>
                
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
                        Join <span className="gradient-text">AgriSmart</span>
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)' }}>
                        Select your account type to begin your journey.
                    </p>
                </div>

                <div className="role-grid" style={{
                    display: 'grid',
                    gap: '2rem',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
                }}>
                    {/* Buyer Choice */}
                    <div 
                        className="role-card"
                        onClick={() => handleSelection('buyer')}
                        style={{
                            background: 'white',
                            borderRadius: '1.5rem',
                            padding: '3rem 2rem',
                            boxShadow: 'var(--shadow-md)',
                            border: '2px solid transparent',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Hover accent styles handled via inline style hover in real life, but we use simple CSS injection below */}
                        <div style={{ background: '#EFF6FF', padding: '1.5rem', borderRadius: '50%', marginBottom: '1.5rem', transition: 'transform 0.3s ease' }} className="icon-wrap">
                            <ShoppingCart color="var(--secondary)" size={40} />
                        </div>
                        <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: 'var(--text-main)' }}>I am a Buyer</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.6, flexGrow: 1 }}>
                            Access premium, farm-fresh produce directly from verified growers at fair, transparent prices.
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--secondary)', fontWeight: 600 }}>
                            Join as Buyer <ArrowRight size={18} />
                        </div>
                    </div>

                    {/* Farmer Choice */}
                    <div 
                        className="role-card"
                        onClick={() => handleSelection('farmer')}
                        style={{
                            background: 'white',
                            borderRadius: '1.5rem',
                            padding: '3rem 2rem',
                            boxShadow: 'var(--shadow-md)',
                            border: '2px solid transparent',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        <div style={{ background: '#F0FDF4', padding: '1.5rem', borderRadius: '50%', marginBottom: '1.5rem', transition: 'transform 0.3s ease' }} className="icon-wrap">
                            <Sprout color="var(--primary)" size={40} />
                        </div>
                        <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: 'var(--text-main)' }}>I am a Farmer</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.6, flexGrow: 1 }}>
                            List your crops on a transparent marketplace, bypass middlemen, and increase your profit margins.
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 600 }}>
                            Join as Farmer <ArrowRight size={18} />
                        </div>
                    </div>
                </div>

                <style>{`
                    .role-card:hover {
                        transform: translateY(-8px);
                        box-shadow: var(--shadow-lg) !important;
                        border-color: #E2E8F0 !important;
                    }
                    .role-card:hover .icon-wrap {
                        transform: scale(1.1);
                    }
                    /* Add dynamic gradient borders on hover for premium feel */
                    .role-card:nth-child(1):hover {
                        border-color: var(--secondary) !important;
                    }
                    .role-card:nth-child(2):hover {
                        border-color: var(--primary) !important;
                    }
                `}</style>
            </div>
        </div>
    );
};

export default GetStarted;
