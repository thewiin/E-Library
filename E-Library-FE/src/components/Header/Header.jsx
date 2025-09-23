import React from 'react';
import { Menu } from 'lucide-react'; // Icon menu từ thư viện bạn đang dùng
import './Header.css';

const Header = () => {
    return (
        <header className="app-header">
            <div className="header-container">
                <div className="header-left">
                    <Menu size={28} className="hamburger-icon" />
                    <span className="logo">LIBRARY MANAGEMENT</span>
                </div>
                <nav className="header-nav">
                    <ul>
                        <li><a href="/home">Home</a></li>
                        <li><a href="/news">News</a></li>
                        <li><a href="/favorite">My favorite</a></li>
                    </ul>
                </nav>
                <div className="header-right">
                    <button className="my-account-btn">My account</button>
                </div>
            </div>
        </header>
    );
};

export default Header;