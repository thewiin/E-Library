import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import './Header.css';

const Header = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="app-header">
            <div className="header-container">
                {/* Phần trái: Menu icon + Logo */}
                <div className="header-left">
                    <Menu size={28} className="hamburger-icon" onClick={toggleMobileMenu} />
                    <span className="logo">LIBRARY MANAGEMENT</span>
                </div>

                {/* Navigation */}
                <nav className={`header-nav ${isMobileMenuOpen ? 'open' : ''}`}>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/borrow">Mượn sách</a></li>
                        <li><a href="/return">Return Book</a></li>
                        <li><a href="/records">Borrow Records</a></li>
                    </ul>
                </nav>

                {/* Phần phải: Tài khoản */}
                <div className="header-right">
                    <button className="my-account-btn">My Account</button>
                </div>
            </div>
        </header>
    );
};

export default Header;
