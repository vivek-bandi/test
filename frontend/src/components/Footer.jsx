import React from 'react';

const Footer = () => {
    return (
        <footer style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', padding: '3rem 0', marginTop: 'auto' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
                <div style={{ flex: '1 1 300px' }}>
                    <h3 className="gradient-text" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>AgriSmart</h3>
                    <p style={{ color: 'var(--text-muted)' }}>Empowering farmers and connecting them directly with consumers for fair trade and fresh produce.</p>
                </div>
                <div style={{ flex: '1 1 200px' }}>
                    <h4 style={{ marginBottom: '1rem' }}>Quick Links</h4>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-muted)' }}>
                        <li><a href="/marketplace">Marketplace</a></li>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>
                <div style={{ flex: '1 1 200px' }}>
                    <h4 style={{ marginBottom: '1rem' }}>Legal</h4>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-muted)' }}>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms of Service</a></li>
                    </ul>
                </div>
            </div>
            <div className="container" style={{ borderTop: '1px solid var(--border)', marginTop: '2rem', paddingTop: '1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                <p>&copy; {new Date().getFullYear()} AgriSmart Marketplace. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
