import { Link } from 'react-router-dom';
import './ResultsPage.css';

export default function ResultsPage() {
    return (
        <div className="results-page">
            <div className="page-header">
                <h1>2025 SEASON RESULTS</h1>
                <p className="page-subtitle">Complete results from the 2025 Formula 1 World Championship</p>
            </div>

            <div className="champions-section">
                <div className="champion-card drivers-champion">
                    <div className="champion-icon">🏆</div>
                    <h2>Drivers' World Champion</h2>
                    <div className="champion-name">Lando Norris</div>
                    <div className="champion-team">McLaren-Mercedes</div>
                    <div className="champion-points">423 Points</div>
                    <p className="champion-note">Won by just 2 points over Max Verstappen</p>
                </div>

                <div className="champion-card constructors-champion">
                    <div className="champion-icon">🏆</div>
                    <h2>Constructors' Champion</h2>
                    <div className="champion-name">McLaren-Mercedes</div>
                    <div className="champion-points">833 Points</div>
                    <p className="champion-note">Second consecutive championship, 10th overall</p>
                </div>
            </div>

            <div className="standings-navigation">
                <h2>View Full Standings</h2>
                <div className="nav-cards">
                    <Link to="/results/2025/races" className="nav-card">
                        <div className="nav-card-icon">🏁</div>
                        <h3>Race Results</h3>
                        <p>View results from all 24 races</p>
                        <div className="nav-card-arrow">→</div>
                    </Link>

                    <Link to="/results/2025/drivers" className="nav-card">
                        <div className="nav-card-icon">👤</div>
                        <h3>Driver Standings</h3>
                        <p>Complete driver championship standings</p>
                        <div className="nav-card-arrow">→</div>
                    </Link>

                    <Link to="/results/2025/teams" className="nav-card">
                        <div className="nav-card-icon">🏁</div>
                        <h3>Team Standings</h3>
                        <p>Complete constructor championship standings</p>
                        <div className="nav-card-arrow">→</div>
                    </Link>
                </div>
            </div>

            <div className="season-stats">
                <h2>2025 Season Statistics</h2>
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-value">24</div>
                        <div className="stat-label">Total Races</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-value">9</div>
                        <div className="stat-label">Different Winners</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-value">14</div>
                        <div className="stat-label">McLaren Wins</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-value">2</div>
                        <div className="stat-label">Point Gap (Drivers)</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
