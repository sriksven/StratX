import { Link, useLocation } from 'react-router-dom';
import { Flag } from 'lucide-react';
import './Header.css';

export default function Header() {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    <Link to="/" className="logo">
                        <Flag className="logo-icon" />
                        <span className="logo-text">StratX</span>
                    </Link>

                    <div className="header-subtitle">
                        {isHomePage ? (
                            <span>2025 F1 Season Hub</span>
                        ) : (
                            <span>Real-Time Race Analytics</span>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
