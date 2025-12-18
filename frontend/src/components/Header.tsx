import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useState, useRef } from 'react';
import './Header.css';

export default function Header() {
    const [scheduleOpen, setScheduleOpen] = useState(false);
    const [resultsOpen, setResultsOpen] = useState(false);
    const scheduleTimeoutRef = useRef<number | null>(null);
    const resultsTimeoutRef = useRef<number | null>(null);

    const handleScheduleEnter = () => {
        if (scheduleTimeoutRef.current) {
            clearTimeout(scheduleTimeoutRef.current);
        }
        setScheduleOpen(true);
    };

    const handleScheduleLeave = () => {
        scheduleTimeoutRef.current = window.setTimeout(() => {
            setScheduleOpen(false);
        }, 200);
    };

    const handleResultsEnter = () => {
        if (resultsTimeoutRef.current) {
            clearTimeout(resultsTimeoutRef.current);
        }
        setResultsOpen(true);
    };

    const handleResultsLeave = () => {
        resultsTimeoutRef.current = window.setTimeout(() => {
            setResultsOpen(false);
        }, 200);
    };

    return (
        <header className="header">
            <div className="header-container">
                <Link to="/" className="f1-logo">
                    <svg viewBox="0 0 120 30" className="logo-svg">
                        <path d="M0 0h120v30H0z" fill="#e10600" />
                        <text x="10" y="22" fill="white" fontSize="20" fontWeight="900" fontFamily="Formula1">F1</text>
                    </svg>
                </Link>

                <nav className="main-nav">
                    <div
                        className="nav-item dropdown"
                        onMouseEnter={handleScheduleEnter}
                        onMouseLeave={handleScheduleLeave}
                    >
                        <button className="nav-link">
                            SCHEDULE <ChevronDown size={16} />
                        </button>
                        {scheduleOpen && (
                            <div className="dropdown-menu">
                                <Link
                                    to="/schedule/2026"
                                    className="dropdown-item"
                                    onClick={() => setScheduleOpen(false)}
                                >
                                    2026 Season
                                </Link>
                            </div>
                        )}
                    </div>

                    <div
                        className="nav-item dropdown"
                        onMouseEnter={handleResultsEnter}
                        onMouseLeave={handleResultsLeave}
                    >
                        <button className="nav-link">
                            RESULTS <ChevronDown size={16} />
                        </button>
                        {resultsOpen && (
                            <div className="dropdown-menu">
                                <Link
                                    to="/results/2025"
                                    className="dropdown-item"
                                    onClick={() => setResultsOpen(false)}
                                >
                                    2025 Season
                                </Link>
                                <Link
                                    to="/results/2025/drivers"
                                    className="dropdown-item"
                                    onClick={() => setResultsOpen(false)}
                                >
                                    Driver Standings
                                </Link>
                                <Link
                                    to="/results/2025/teams"
                                    className="dropdown-item"
                                    onClick={() => setResultsOpen(false)}
                                >
                                    Team Standings
                                </Link>
                                <div className="dropdown-divider"></div>
                                <Link
                                    to="/results/archive"
                                    className="dropdown-item"
                                    onClick={() => setResultsOpen(false)}
                                >
                                    Archive (1950-2024)
                                </Link>
                            </div>
                        )}
                    </div>

                    <Link to="/drivers" className="nav-link">DRIVERS</Link>
                    <Link to="/teams" className="nav-link">TEAMS</Link>
                </nav>
            </div>
        </header>
    );
}
