import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Search, MapPin, Tag } from 'lucide-react';
const API_URL = import.meta.env.VITE_API_URL;

const Marketplace = () => {
    const [crops, setCrops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [maxPriceFilter, setMaxPriceFilter] = useState('');
    const [farmerRatings, setFarmerRatings] = useState({});
    const [viewingReviewsFor, setViewingReviewsFor] = useState(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetchCrops();
    }, [searchTerm, categoryFilter, maxPriceFilter]);

    const fetchCrops = async () => {
        try {
            setLoading(true);
            let url = `${API_URL}/api/crops?`;
            if (searchTerm) url += `keyword=${searchTerm}&`;
            if (categoryFilter) url += `category=${categoryFilter}&`;
            if (maxPriceFilter) url += `maxPrice=${maxPriceFilter}&`;
            
            const res = await axios.get(url);
            const fetchedCrops = res.data.data;
            setCrops(fetchedCrops);
            setLoading(false);

            // Fetch ratings for unique farmers
            const uniqueFarmerIds = [...new Set(fetchedCrops.map(c => c.farmer?._id).filter(Boolean))];
            uniqueFarmerIds.forEach(fetchFarmerRating);
        } catch (err) {
            console.error('Failed to fetch crops', err);
            setLoading(false);
        }
    };

    const fetchFarmerRating = async (farmerId) => {
        if (farmerRatings[farmerId]) return; // already fetched
        try {
            const res = await axios.get(`${API_URL}/api/reviews/farmer/${farmerId}`);
            setFarmerRatings(prev => ({
                ...prev,
                [farmerId]: {
                    average: res.data.averageRating,
                    count: res.data.count,
                    reviews: res.data.data
                }
            }));
        } catch (err) {
            console.error('Failed to fetch rating for', farmerId);
        }
    };

    const handlePurchase = async (cropId, quantity) => {
        if (!user) return alert('Please login to purchase');
        if (user.role !== 'buyer') return alert('Only buyers can purchase crops. Log in as a buyer.');
        
        try {
            const addr = prompt("Enter delivery address:");
            if (!addr) return;
            const qty = prompt("Enter quantity (in crop units):", "1");
            if (!qty) return;

            await axios.post(`${API_URL}/api/orders`, { cropId, quantity: Number(qty), deliveryAddress: addr });
            alert('Order placed successfully!');
            fetchCrops(); // Refresh stock
        } catch (err) {
            alert(err.response?.data?.error || 'Purchase failed');
        }
    };

    return (
        <div className="page container animate-fade-in" style={{ padding: '2rem 1rem' }}>
            
            {/* Premium Header & Filters */}
            <div style={{ 
                background: 'linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)', 
                padding: '2rem', 
                borderRadius: '1.5rem', 
                boxShadow: 'var(--shadow-md)', 
                marginBottom: '3rem',
                border: '1px solid var(--border)' 
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '-0.02em', color: 'var(--text-main)' }}>
                            Fresh <span className="gradient-text">Marketplace</span>
                        </h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Support local farmers. Buy direct. Eat fresh.</p>
                    </div>
                </div>
                
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <div style={{ display: 'flex', flexGrow: 1, minWidth: '250px', gap: '0.5rem', background: '#F1F5F9', padding: '0.75rem 1rem', borderRadius: '1rem', border: '1px solid transparent', transition: 'all 0.3s ease' }} className="search-bar">
                        <Search size={20} color="var(--primary)" style={{ alignSelf: 'center' }} />
                        <input type="text" placeholder="Search for tomatoes, wheat, etc..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', fontSize: '1rem', color: 'var(--text-main)' }} />
                    </div>
                    
                    <select 
                        value={categoryFilter} 
                        onChange={(e) => setCategoryFilter(e.target.value)} 
                        style={{ padding: '0.75rem 1.5rem', borderRadius: '1rem', border: '1px solid var(--border)', background: 'white', color: 'var(--text-main)', fontSize: '1rem', cursor: 'pointer', outline: 'none', boxShadow: 'var(--shadow-sm)' }}
                    >
                        <option value="">All Categories</option>
                        <option value="Vegetables">Vegetables</option>
                        <option value="Fruits">Fruits</option>
                        <option value="Grains">Grains</option>
                    </select>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'white', padding: '0.75rem 1.5rem', borderRadius: '1rem', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
                        <label style={{ fontSize: '0.95rem', color: 'var(--text-muted)', fontWeight: 500 }}>Max ₹</label>
                        <input type="number" value={maxPriceFilter} onChange={(e) => setMaxPriceFilter(e.target.value)} placeholder="Any" style={{ width: '70px', border: 'none', outline: 'none', background: 'transparent', fontSize: '1rem', color: 'var(--text-main)', fontWeight: 600 }} />
                    </div>
                </div>
            </div>

            <style>{`
                .search-bar:focus-within {
                    background: white !important;
                    border-color: var(--primary) !important;
                    box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
                }
                .crop-card {
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    border: 1px solid var(--border);
                }
                .crop-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                    border-color: #CBD5E1;
                }
                .crop-image-wrapper {
                    overflow: hidden;
                }
                .crop-image-wrapper img {
                    transition: transform 0.5s ease;
                }
                .crop-card:hover .crop-image-wrapper img {
                    transform: scale(1.05);
                }
            `}</style>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '5rem 0' }}>
                    <div style={{ display: 'inline-block', width: '50px', height: '50px', borderRadius: '50%', border: '4px solid #E2E8F0', borderTopColor: 'var(--primary)', animation: 'spin 1s linear infinite', marginBottom: '1rem' }}></div>
                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                    <div style={{ color: 'var(--text-muted)', fontSize: '1.2rem', fontWeight: 500 }}>Harvesting the freshest crops for you...</div>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
                    {crops.map((crop, i) => (
                        <div key={crop._id} className="card crop-card" style={{ display: 'flex', flexDirection: 'column', padding: 0, borderRadius: '1.5rem', overflow: 'hidden', animationDelay: `${i * 0.05}s` }}>
                            
                            {/* Premium Image Header */}
                            <div className="crop-image-wrapper" style={{ width: '100%', height: '220px', background: '#F8FAFC', position: 'relative' }}>
                                <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)', padding: '0.4rem 0.8rem', borderRadius: '2rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-dark)', zIndex: 2, display: 'flex', alignItems: 'center', gap: '0.3rem', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                                    {crop.category}
                                </div>
                                {crop.images && crop.images.length > 0 ? (
                                    <img src={crop.images[0]} alt={crop.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', color: 'var(--text-muted)' }}>
                                        <span style={{ fontSize: '4rem', opacity: 0.5 }}>🌾</span>
                                    </div>
                                )}
                            </div>
                            
                            {/* Content Body */}
                            <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flexGrow: 1, position: 'relative' }}>
                                {/* Floating Price Badge */}
                                <div style={{ position: 'absolute', top: '-1.5rem', left: '1.5rem', background: 'white', padding: '0.5rem 1rem', borderRadius: '1rem', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', border: '2px solid var(--primary)', display: 'flex', alignItems: 'baseline', gap: '0.2rem' }}>
                                    <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1 }}>₹{crop.price}</span>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>/{crop.unit}</span>
                                </div>

                                <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>{crop.name}</h3>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                        {crop.description || 'Fresh crop direct from farm. Cultivated with care.'}
                                    </p>
                                </div>
                                
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem', padding: '1rem', background: '#F8FAFC', borderRadius: '1rem', marginTop: 'auto' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', fontSize: '0.9rem', fontWeight: 500 }}>
                                        <div style={{ background: '#EFF6FF', padding: '0.4rem', borderRadius: '50%' }}><Tag size={14} color="var(--secondary)" /></div>
                                        Available Stock: <span style={{ fontWeight: 700 }}>{crop.quantity} {crop.unit}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', fontSize: '0.9rem', fontWeight: 500 }}>
                                        <div style={{ background: '#FFFBEB', padding: '0.4rem', borderRadius: '50%' }}><MapPin size={14} color="var(--accent)" /></div>
                                        Location: <span style={{ color: 'var(--text-muted)' }}>{crop.farmer?.location || 'Not Provided'}</span>
                                    </div>
                                    
                                    <div style={{ marginTop: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Farmer: <strong style={{ color: 'var(--text-main)' }}>{crop.farmer?.name || 'Unknown'}</strong></span>
                                        {crop.farmer?._id && farmerRatings[crop.farmer?._id] && (
                                            <button 
                                                onClick={() => setViewingReviewsFor(crop.farmer._id)}
                                                style={{ background: '#FFFBEB', border: '1px solid #FDE68A', color: '#D97706', padding: '0.25rem 0.75rem', borderRadius: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', fontWeight: 700, transition: 'all 0.2s' }}
                                                onMouseOver={(e) => e.currentTarget.style.background = '#FEF3C7'}
                                                onMouseOut={(e) => e.currentTarget.style.background = '#FFFBEB'}
                                            >
                                                ★ {farmerRatings[crop.farmer._id].average > 0 ? farmerRatings[crop.farmer._id].average : 'New'} 
                                                <span style={{ color: '#92400E', fontWeight: 500 }}>({farmerRatings[crop.farmer._id].count})</span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                                
                                <button 
                                    onClick={() => handlePurchase(crop._id, 1)}
                                    className="btn btn-secondary" 
                                    style={{ width: '100%', py: '1rem', fontSize: '1.05rem', fontWeight: 600, borderRadius: '1rem' }}
                                    disabled={crop.status === 'sold_out' || crop.quantity <= 0}
                                >
                                    {crop.status === 'sold_out' ? 'Temporarily Sold Out' : 'Purchase Now'}
                                </button>
                            </div>
                        </div>
                    ))}
                    {crops.length === 0 && (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 2rem', background: 'white', borderRadius: '1.5rem', border: '1px dashed var(--border)' }}>
                            <Search size={48} color="var(--border)" style={{ marginBottom: '1rem' }} />
                            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>No Crops Found</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>We couldn't find any crops matching your criteria. Check back soon or adjust your filters!</p>
                        </div>
                    )}
                </div>
            )}

            {/* Reviews Modal */}
            {viewingReviewsFor && farmerRatings[viewingReviewsFor] && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div className="card animate-scale-in" style={{ width: '100%', maxWidth: '500px', padding: '2rem', maxHeight: '80vh', overflowY: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Farmer Reviews <span style={{ color: 'var(--accent)' }}>★ {farmerRatings[viewingReviewsFor].average}</span></h3>
                            <button onClick={() => setViewingReviewsFor(null)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-muted)' }}>&times;</button>
                        </div>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {farmerRatings[viewingReviewsFor].reviews.length === 0 ? (
                                <p style={{ color: 'var(--text-muted)' }}>No reviews yet for this farmer.</p>
                            ) : (
                                farmerRatings[viewingReviewsFor].reviews.map(rev => (
                                    <div key={rev._id} style={{ padding: '1rem', background: 'var(--surface)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <strong>{rev.buyer?.name || 'Anonymous'}</strong>
                                            <span style={{ color: 'var(--accent)' }}>{'★'.repeat(rev.rating)}{'☆'.repeat(5-rev.rating)}</span>
                                        </div>
                                        <p style={{ color: 'var(--text-main)', fontSize: '0.9rem' }}>"{rev.comment}"</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Marketplace;
