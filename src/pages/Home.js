import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const featuresRef = useRef(null);

    const scrollToFeatures = () => {
        featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px'
            }
        );

        if (featuresRef.current) {
            observer.observe(featuresRef.current);
        }

        return () => {
            if (featuresRef.current) {
                observer.unobserve(featuresRef.current);
            }
        };
    }, []);

    return (
        <div className="home">
            {/* Navbar */}
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo">
                        <span className="logo-text">EduSync</span>
                    </Link>
                    <div className="nav-links">
                        <Link to="/about" className="nav-link">About</Link>
                        <div className="auth-buttons">
                            <Link to="/login" className="nav-link login-btn">Login</Link>
                            <Link to="/register" className="nav-link register-btn">Get Started</Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="hero-section">
                <div className="hero-content">
                    <h1>Welcome to EduSync</h1>
                    <p className="hero-subtitle">Your all-in-one platform for educational content management</p>
                    <div className="cta-buttons">
                        <Link to="/register" className="cta-button primary">Get Started</Link>
                        <Link to="/about" className="cta-button secondary">Learn More</Link>
                    </div>
                </div>
                <div className="scroll-indicator" onClick={scrollToFeatures}>
                    <div className="mouse">
                        <div className="wheel"></div>
                    </div>
                    <div className="arrow">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="features-section" ref={featuresRef}>
                <h2>Why Choose EduSync?</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">📚</div>
                        <h3>Comprehensive Learning</h3>
                        <p>Access a wide range of courses and educational materials all in one place.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🎯</div>
                        <h3>Interactive Assessments</h3>
                        <p>Engage with dynamic quizzes and tests to enhance your learning experience.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">👥</div>
                        <h3>Community Learning</h3>
                        <p>Connect with instructors and fellow students in a collaborative environment.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📊</div>
                        <h3>Progress Tracking</h3>
                        <p>Monitor your learning journey with detailed progress reports and analytics.</p>
                    </div>
                </div>
            </div>

            {/* How It Works Section */}
            <div className="how-it-works">
                <h2>How It Works</h2>
                <div className="steps-container">
                    <div className="step">
                        <div className="step-number">1</div>
                        <h3>Create Your Account</h3>
                        <p>Sign up as a student or instructor to get started.</p>
                    </div>
                    <div className="step">
                        <div className="step-number">2</div>
                        <h3>Explore Courses</h3>
                        <p>Browse through our extensive collection of courses.</p>
                    </div>
                    <div className="step">
                        <div className="step-number">3</div>
                        <h3>Start Learning</h3>
                        <p>Begin your educational journey with interactive content.</p>
                    </div>
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="testimonials-section">
                <h2>What Our Users Say</h2>
                <div className="testimonials-grid">
                    <div className="testimonial-card">
                        <p className="testimonial-text">"EduSync has transformed how I manage my courses. The platform is intuitive and feature-rich."</p>
                        <div className="testimonial-author">- Sarah Johnson, Instructor</div>
                    </div>
                    <div className="testimonial-card">
                        <p className="testimonial-text">"As a student, I love how easy it is to track my progress and stay engaged with my courses."</p>
                        <div className="testimonial-author">- Michael Chen, Student</div>
                    </div>
                </div>
            </div>

            {/* Final CTA Section */}
            <div className="final-cta">
                <h2>Ready to Start Your Learning Journey?</h2>
                <p>Join thousands of students and instructors already using EduSync</p>
                <Link to="/register" className="cta-button primary large">Get Started Now</Link>
            </div>
        </div>
    );
};

export default Home; 