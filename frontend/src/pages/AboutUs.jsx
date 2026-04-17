import React from 'react';
import { Sprout, Users, ShieldCheck, Zap, LineChart, Leaf } from 'lucide-react';

const AboutUs = () => {
    return (
        <div style={{ overflowX: 'hidden' }}>
            {/* Hero Section */}
            <section style={{ 
                padding: '6rem 1rem 4rem', 
                position: 'relative',
                background: 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)'
             }}>
                <div className="container animate-slide-up" style={{ display: 'grid', gridTemplateColumns: 'revert-layer', gap: '3rem', alignItems: 'center' }}>
                    <style>{`
                        @media (min-width: 768px) {
                            .hero-grid { grid-template-columns: 1fr 1fr; }
                        }
                    `}</style>
                    <div className="hero-grid" style={{ display: 'grid', gap: '3rem', alignItems: 'center' }}>
                        
                        {/* Text Content */}
                        <div style={{ paddingRight: '1rem' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#F0FDF4', color: 'var(--primary)', padding: '0.5rem 1rem', borderRadius: '2rem', marginBottom: '1.5rem', fontWeight: 600, fontSize: '0.9rem' }}>
                                <Sprout size={18} /> Smart Farming
                            </div>
                            <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.1, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
                                Revolutionizing <br/>
                                <span className="gradient-text">Agriculture</span>
                            </h1>
                            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.7 }}>
                                Empowering Farmers, Delivering Freshness. We are an open marketplace bridging the gap between the field and your plate with smart technology and fair pricing.
                            </p>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ background: 'white', padding: '1rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-md)', flex: 1, borderLeft: '4px solid var(--primary)' }}>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)' }}>100%</div>
                                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Transparent</div>
                                </div>
                                <div style={{ background: 'white', padding: '1rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-md)', flex: 1, borderLeft: '4px solid var(--secondary)' }}>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)' }}>0</div>
                                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Middlemen</div>
                                </div>
                            </div>
                        </div>

                        {/* Image Content */}
                        <div style={{ position: 'relative' }}>
                            <div style={{ position: 'absolute', top: '-1rem', right: '-1rem', bottom: '1rem', left: '1rem', background: 'var(--primary)', borderRadius: '2rem', opacity: 0.1, zIndex: 0 }}></div>
                            <img 
                                src="/aboutus-hero-v2.png" 
                                alt="Modern Farming Technology" 
                                style={{ 
                                    width: '100%', 
                                    height: 'auto', 
                                    borderRadius: '2rem', 
                                    boxShadow: 'var(--shadow-lg)',
                                    position: 'relative',
                                    zIndex: 1,
                                    border: '4px solid white'
                                }} 
                            />
                            {/* Floating Badge */}
                            <div style={{ position: 'absolute', bottom: '2rem', left: '-2rem', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', padding: '1rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-lg)', zIndex: 2, display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ background: '#FFFBEB', padding: '0.5rem', borderRadius: '50%' }}>
                                    <ShieldCheck color="var(--accent)" size={24} />
                                </div>
                                <div>
                                    <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>Verified Quality</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>From trusted farmers</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Pillars */}
            <section className="container page" style={{ paddingTop: '5rem', paddingBottom: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    
                    {/* Mission Card */}
                    <div className="card animate-slide-up" style={{ animationDelay: '0.1s', borderTop: '4px solid var(--primary)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ background: '#F0FDF4', padding: '1rem', borderRadius: '1rem' }}>
                                <Leaf color="var(--primary)" size={28} />
                            </div>
                            <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)' }}>Our Mission</h2>
                        </div>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '1.05rem' }}>
                            The <strong>Smart Crop Marketplace</strong> is a modern platform designed to directly connect farmers with consumers and retailers. Our goal is to eliminate middlemen, ensuring farmers receive fair prices while consumers enjoy fresh produce at transparent costs.
                        </p>
                    </div>

                    {/* Problem Card */}
                    <div className="card animate-slide-up" style={{ animationDelay: '0.2s', borderTop: '4px solid var(--accent)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ background: '#FFFBEB', padding: '1rem', borderRadius: '1rem' }}>
                                <Zap color="var(--accent)" size={28} />
                            </div>
                            <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)' }}>The Problem</h2>
                        </div>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '1.05rem' }}>
                            Traditional agricultural markets force farmers to depend on intermediaries, severely reducing profit margins. Consumers, in turn, pay inflated prices. We bypass this outdated system by providing an open, digital marketplace.
                        </p>
                    </div>

                    {/* How It Works Card */}
                    <div className="card animate-slide-up" style={{ animationDelay: '0.3s', borderTop: '4px solid var(--secondary)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ background: '#EFF6FF', padding: '1rem', borderRadius: '1rem' }}>
                                <LineChart color="var(--secondary)" size={28} />
                            </div>
                            <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)' }}>How It Works</h2>
                        </div>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '1.05rem' }}>
                            AgriSmart ensures transparency and efficiency. Our platform features intelligent crop availability updates, AI price suggestions, real-time logistics tracking, and detailed farmer analytics to optimize the agricultural economy.
                        </p>
                    </div>

                </div>
            </section>

            {/* Bottom Callout */}
            <section className="container" style={{ paddingBottom: '6rem' }}>
                <div className="card animate-fade-in" style={{ 
                    background: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)', 
                    textAlign: 'center', 
                    padding: '3rem 2rem',
                    border: '1px solid #E2E8F0',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1.5rem'
                }}>
                    <div style={{ display: 'flex', gap: '-10px', justifyContent: 'center' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid white', zIndex: 3 }}>
                            <Users color="white" size={20} />
                        </div>
                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid white', marginLeft: '-15px', zIndex: 2 }}>
                            <Sprout color="white" size={20} />
                        </div>
                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid white', marginLeft: '-15px', zIndex: 1 }}>
                            <ShieldCheck color="white" size={20} />
                        </div>
                    </div>
                    <div>
                        <h3 style={{ fontSize: '1.75rem', marginBottom: '0.75rem', color: 'var(--text-main)' }}>Join the Agricultural Revolution</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                            Together, we are improving farmers' incomes, reducing food supply chain inefficiencies, and promoting a sustainable future.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
