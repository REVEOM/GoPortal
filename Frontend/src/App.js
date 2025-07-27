import React, { useState } from 'react';
import './App.css';

function App() {
    const [activeSection, setActiveSection] = useState('game');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const sidebarItems = [
        { id: 'game', label: 'Oyun', icon: '🎮' },
        { id: 'scoreboard', label: 'Skor Tablosu', icon: '🏆' },
        { id: 'history', label: 'Geçmiş', icon: '📋' },
        { id: 'profile', label: 'Profil', icon: '👤' },
        { id: 'settings', label: 'Ayarlar', icon: '⚙️' }
    ];

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const handleMenuClick = (sectionId) => {
        setActiveSection(sectionId);
        closeMobileMenu(); // Mobil menüyü kapat
    };

    return (
        <div style={{
            display: 'flex',
            minHeight: '100vh',
            backgroundColor: '#1a1a1a',
            position: 'relative'
        }}>
            {/* Mobil Header */}
            <div style={{
                display: 'none',
                backgroundColor: '#2d2d2d',
                color: 'white',
                padding: '15px 20px',
                borderBottom: '1px solid #444',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                justifyContent: 'space-between',
                alignItems: 'center',
                '@media (max-width: 768px)': {
                    display: 'flex'
                }
            }} className="mobile-header">
                <h2 style={{ margin: 0, fontSize: '18px' }}>
                    <span style={{
                        backgroundColor: 'white',
                        color: 'black',
                        padding: '3px 6px',
                        borderRadius: '4px',
                        marginRight: '8px',
                        fontSize: '14px'
                    }}>Go</span>
                    Portal
                </h2>
                <button
                    onClick={toggleMobileMenu}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'white',
                        fontSize: '24px',
                        cursor: 'pointer',
                        padding: '5px'
                    }}
                >
                    {isMobileMenuOpen ? '✕' : '☰'}
                </button>
            </div>

            {/* Mobil Overlay */}
            {isMobileMenuOpen && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 999,
                        display: 'none'
                    }}
                    className="mobile-overlay"
                    onClick={closeMobileMenu}
                />
            )}

            {/* Sol Sidebar */}
            <div style={{
                width: '270px',
                backgroundColor: '#2d2d2d',
                color: 'white',
                position: 'fixed',
                height: '100vh',
                borderRight: '1px solid #444',
                zIndex: 1001,
                transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
                transition: 'transform 0.3s ease-in-out',
                boxShadow: '2px 0 10px rgba(0, 0, 0, 0.3)'
            }} className="sidebar">
                {/* Logo */}
                <div style={{
                    padding: '25px 20px',
                    borderBottom: '1px solid #444',
                    background: 'linear-gradient(135deg, #2d2d2d 0%, #3a3a3a 100%)'
                }}>
                    <h2 style={{
                        margin: 0,
                        fontSize: '24px',
                        fontWeight: '700',
                        letterSpacing: '0.5px'
                    }}>
                        <span style={{
                            backgroundColor: '#fff',
                            color: '#000',
                            padding: '6px 12px',
                            borderRadius: '8px',
                            marginRight: '10px',
                            fontSize: '20px',
                            fontWeight: '900',
                            boxShadow: '0 2px 8px rgba(255, 255, 255, 0.2)'
                        }}>Go</span>
                        Portal
                    </h2>
                    <p style={{
                        margin: '8px 0 0 0',
                        fontSize: '12px',
                        color: '#888',
                        fontWeight: '400'
                    }}>
                        Profesyonel Go Oyunu
                    </p>
                </div>

                {/* User Info */}
                <div style={{
                    padding: '20px',
                    borderBottom: '1px solid #444',
                    backgroundColor: '#323232'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                    }}>
                        <div style={{
                            width: '45px',
                            height: '45px',
                            backgroundColor: '#4a90e2',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            color: 'white',
                            boxShadow: '0 2px 8px rgba(74, 144, 226, 0.3)'
                        }}>
                            M
                        </div>
                        <div>
                            <p style={{
                                margin: 0,
                                fontSize: '16px',
                                fontWeight: '600',
                                color: '#fff'
                            }}>
                                Mami
                            </p>
                            <p style={{
                                margin: '2px 0 0 0',
                                fontSize: '12px',
                                color: '#888'
                            }}>
                                Rating: 1650 ⭐
                            </p>
                        </div>
                    </div>
                </div>

                {/* Menu */}
                <div style={{
                    padding: '20px 15px',
                    flex: 1,
                    overflowY: 'auto'
                }}>
                    <p style={{
                        margin: '0 0 15px 10px',
                        fontSize: '12px',
                        color: '#888',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}>
                        MENÜ
                    </p>
                    {sidebarItems.map((item, index) => (
                        <button
                            key={item.id}
                            onClick={() => handleMenuClick(item.id)}
                            style={{
                                width: '100%',
                                padding: '15px 18px',
                                margin: '3px 0',
                                backgroundColor: activeSection === item.id ? '#4a90e2' : 'transparent',
                                color: activeSection === item.id ? '#fff' : '#ccc',
                                border: 'none',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '15px',
                                fontWeight: '500',
                                transition: 'all 0.2s ease',
                                position: 'relative',
                                overflow: 'hidden',
                                boxShadow: activeSection === item.id
                                    ? '0 4px 12px rgba(74, 144, 226, 0.3)'
                                    : 'none',
                                transform: activeSection === item.id ? 'translateX(5px)' : 'translateX(0)'
                            }}
                            onMouseEnter={(e) => {
                                if (activeSection !== item.id) {
                                    e.target.style.backgroundColor = '#3a3a3a';
                                    e.target.style.color = '#fff';
                                    e.target.style.transform = 'translateX(3px)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (activeSection !== item.id) {
                                    e.target.style.backgroundColor = 'transparent';
                                    e.target.style.color = '#ccc';
                                    e.target.style.transform = 'translateX(0)';
                                }
                            }}
                        >
                            <span style={{
                                marginRight: '15px',
                                fontSize: '18px',
                                minWidth: '20px'
                            }}>
                                {item.icon}
                            </span>
                            {item.label}
                            {activeSection === item.id && (
                                <div style={{
                                    position: 'absolute',
                                    left: 0,
                                    top: 0,
                                    bottom: 0,
                                    width: '4px',
                                    backgroundColor: '#fff',
                                    borderRadius: '0 4px 4px 0'
                                }} />
                            )}
                        </button>
                    ))}
                </div>

                {/* Footer */}
                <div style={{
                    padding: '20px',
                    borderTop: '1px solid #444',
                    backgroundColor: '#323232'
                }}>
                    <button style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '600',
                        transition: 'all 0.2s ease'
                    }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#c82333';
                                e.target.style.transform = 'translateY(-1px)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = '#dc3545';
                                e.target.style.transform = 'translateY(0)';
                            }}>
                        🚪 Çıkış Yap
                    </button>
                </div>
            </div>

            {/* Ana İçerik Alanı */}
            <div style={{
                marginLeft: '270px',
                flex: 1,
                padding: '30px',
                paddingTop: '20px',
                minHeight: '100vh'
            }} className="main-content">
                <div style={{
                    backgroundColor: '#2d2d2d',
                    borderRadius: '15px',
                    padding: '40px',
                    color: 'white',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                    border: '1px solid #444'
                }}>
                    <h1 style={{
                        margin: '0 0 20px 0',
                        fontSize: '28px',
                        fontWeight: '700',
                        color: '#4a90e2'
                    }}>
                        {sidebarItems.find(item => item.id === activeSection)?.icon} {' '}
                        {sidebarItems.find(item => item.id === activeSection)?.label}
                    </h1>
                    <p style={{
                        color: '#888',
                        fontSize: '16px',
                        lineHeight: '1.6'
                    }}>
                        Bu bölümde <strong>{sidebarItems.find(item => item.id === activeSection)?.label}</strong>
                        {' '}ile ilgili içerikler görüntülenecek.
                        Sol menüden farklı bölümlere geçiş yapabilirsiniz.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default App;