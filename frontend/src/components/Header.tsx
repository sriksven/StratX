import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useState, useRef } from 'react';
import stratxLogo from '../assets/stratx-logo.png';
import './Header.css';

export default function Header() {
    const [scheduleOpen, setScheduleOpen] = useState(false);
    const [resultsOpen, setResultsOpen] = useState(false);
    const [season2025Open, setSeason2025Open] = useState(false);
    const [season2026Open, setSeason2026Open] = useState(false);
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
                    <img src={stratxLogo} alt="StratX" className="logo-img" />
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
                                {/* 2026 Season Submenu */}
                                <div
                                    className="dropdown-item-parent"
                                    onMouseEnter={() => {
                                        setSeason2026Open(true);
                                        setSeason2025Open(false);
                                    }}
                                    onMouseLeave={() => setSeason2026Open(false)}
                                >
                                    <span className="dropdown-item-with-submenu">
                                        2026 Season <ChevronDown size={14} className="submenu-arrow" />
                                    </span>
                                    {season2026Open && (
                                        <div className="dropdown-submenu">
                                            <Link
                                                to="/results/2026"
                                                className="dropdown-item"
                                                onClick={() => {
                                                    setResultsOpen(false);
                                                    setSeason2026Open(false);
                                                }}
                                            >
                                                Season Overview
                                            </Link>
                                            <Link
                                                to="/results/2026/races"
                                                className="dropdown-item"
                                                onClick={() => {
                                                    setResultsOpen(false);
                                                    setSeason2026Open(false);
                                                }}
                                            >
                                                Race Results
                                            </Link>
                                            <Link
                                                to="/results/2026/drivers"
                                                className="dropdown-item"
                                                onClick={() => {
                                                    setResultsOpen(false);
                                                    setSeason2026Open(false);
                                                }}
                                            >
                                                Driver Standings
                                            </Link>
                                            <Link
                                                to="/results/2026/teams"
                                                className="dropdown-item"
                                                onClick={() => {
                                                    setResultsOpen(false);
                                                    setSeason2026Open(false);
                                                }}
                                            >
                                                Team Standings
                                            </Link>
                                        </div>
                                    )}
                                </div>

                                <div
                                    className="dropdown-item-parent"
                                    onMouseEnter={() => {
                                        setSeason2025Open(true);
                                        setSeason2026Open(false);
                                    }}
                                    onMouseLeave={() => setSeason2025Open(false)}
                                >
                                    <span className="dropdown-item-with-submenu">
                                        2025 Season <ChevronDown size={14} className="submenu-arrow" />
                                    </span>
                                    {season2025Open && (
                                        <div className="dropdown-submenu">
                                            <Link
                                                to="/results/2025"
                                                className="dropdown-item"
                                                onClick={() => {
                                                    setResultsOpen(false);
                                                    setSeason2025Open(false);
                                                }}
                                            >
                                                Season Overview
                                            </Link>
                                            <Link
                                                to="/results/2025/races"
                                                className="dropdown-item"
                                                onClick={() => {
                                                    setResultsOpen(false);
                                                    setSeason2025Open(false);
                                                }}
                                            >
                                                Race Results
                                            </Link>
                                            <Link
                                                to="/results/2025/drivers"
                                                className="dropdown-item"
                                                onClick={() => {
                                                    setResultsOpen(false);
                                                    setSeason2025Open(false);
                                                }}
                                            >
                                                Driver Standings
                                            </Link>
                                            <Link
                                                to="/results/2025/teams"
                                                className="dropdown-item"
                                                onClick={() => {
                                                    setResultsOpen(false);
                                                    setSeason2025Open(false);
                                                }}
                                            >
                                                Team Standings
                                            </Link>
                                        </div>
                                    )}
                                </div>
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
                    <Link to="/circuits" className="nav-link">CIRCUITS</Link>
                    <Link to="/news" className="nav-link">NEWS</Link>
                </nav>
            </div>
        </header>
    );
}
