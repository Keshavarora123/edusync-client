import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                    <span role="img" aria-label="education" className="logo-icon">🎓</span>
                    <span className="brand-text">EduSync</span>
                </Link>

                <button
                    className={`mobile-menu-button ${isMobileMenuOpen ? 'active' : ''}`}
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <div className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
                    <Link
                        to="/about"
                        className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
                        onClick={closeMobileMenu}
                    >
                        About
                    </Link>
                    <Link
                        to="/login"
                        className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`}
                        onClick={closeMobileMenu}
                    >
                        Login
                    </Link>
                    <Link
                        to="/register"
                        className={`nav-link register ${location.pathname === '/register' ? 'active' : ''}`}
                        onClick={closeMobileMenu}
                    >
                        Register
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 