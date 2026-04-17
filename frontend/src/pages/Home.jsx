import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, TrendingUp, Truck, ShieldCheck } from 'lucide-react';

const Home = () => {
    return (
        <div>
            {/* Hero Section */}
            <section className="hero-section" style={{ 
                padding: '8rem 0', 
                textAlign: 'center', 
                position: 'relative', 
                overflow: 'hidden',
                backgroundImage: 'url("/farmer-hero.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: 'white'
            }}>
                {/* Dark overlay for better text readability */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.4)', zIndex: 1 }}></div>
                
                <div className="container animate-slide-up" style={{ position: 'relative', zIndex: 2 }}>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.2, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                        Fresh Crops, <br /> Direct from the Farm
                    </h1>
                    <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem', opacity: 0.95, textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                        Eliminate the middleman. Farmers get fair prices, you get fresh produce at transparent costs.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <Link to="/marketplace" className="btn" style={{ background: 'var(--primary)', color: 'white', fontSize: '1.1rem', padding: '1rem 2rem', border: 'none' }}>
                            Browse Marketplace
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="container page">
                <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem', color: 'var(--text-main)' }}>Why <span className="gradient-text">AgriSmart?</span></h2>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                    <div className="card" style={{ textAlign: 'center', padding: '2.5rem 1.5rem' }}>
                        <div style={{ background: '#F0FDF4', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                            <TrendingUp color="var(--primary)" size={32} />
                        </div>
                        <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Fair Prices</h3>
                        <p style={{ color: 'var(--text-muted)' }}>Smart price suggestions ensuring maximum profit for farmers and value for consumers.</p>
                    </div>
                    
                    <div className="card" style={{ textAlign: 'center', padding: '2.5rem 1.5rem' }}>
                        <div style={{ background: '#EFF6FF', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                            <Truck color="var(--secondary)" size={32} />
                        </div>
                        <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Direct Delivery</h3>
                        <p style={{ color: 'var(--text-muted)' }}>Track logistics from the farm straight to your doorstep in real time.</p>
                    </div>
                    
                    <div className="card" style={{ textAlign: 'center', padding: '2.5rem 1.5rem' }}>
                        <div style={{ background: '#FFFBEB', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                            <ShieldCheck color="var(--accent)" size={32} />
                        </div>
                        <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Trusted Quality</h3>
                        <p style={{ color: 'var(--text-muted)' }}>Transparent rating and review system helps build long-term trust.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
