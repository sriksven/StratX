import { Flag, Zap, Radio } from 'lucide-react';
import './Header.css';

interface HeaderProps {
    isLive: boolean;
    onToggleLive: () => void;
}

export default function Header({ isLive, onToggleLive }: HeaderProps) {
    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    <div className="header-left">
                        <div className="logo">
                            <Flag className="logo-icon" />
                            <span className="logo-text">StratX</span>
                        </div>
                        <nav className="nav">
                            <a href="#telemetry" className="nav-link">Telemetry</a>
                            <a href="#predictions" className="nav-link">Predictions</a>
                            <a href="#analytics" className="nav-link">Analytics</a>
                        </nav>
                    </div>

                    <div className="header-right">
                        <div className="live-indicator">
                            {isLive ? (
                                <>
                                    <Radio className="live-icon pulse-glow" />
                                    <span className="live-text">LIVE</span>
                                </>
                            ) : (
                                <>
                                    <Zap className="live-icon" />
                                    <span className="live-text">REPLAY</span>
                                </>
                            )}
                        </div>

                        <button
                            className={`btn ${isLive ? 'btn-live' : 'btn-primary'}`}
                            onClick={onToggleLive}
                        >
                            {isLive ? 'Stop Live' : 'Go Live'}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
