import { useState } from 'react';
import './DriverStandingsPage.css';

interface DriverStanding {
    position: number;
    driver: string;
    team: string;
    points: number;
    wins?: number;
    podiums?: number;
}

const driver2025Standings: DriverStanding[] = [
    { position: 1, driver: 'Lando Norris', team: 'McLaren-Mercedes', points: 423, wins: 8, podiums: 18 },
    { position: 2, driver: 'Max Verstappen', team: 'Red Bull Racing-Honda RBPT', points: 421, wins: 9, podiums: 17 },
    { position: 3, driver: 'Oscar Piastri', team: 'McLaren-Mercedes', points: 410, wins: 6, podiums: 16 },
    { position: 4, driver: 'George Russell', team: 'Mercedes', points: 319, wins: 3, podiums: 11 },
    { position: 5, driver: 'Charles Leclerc', team: 'Ferrari', points: 242, wins: 2, podiums: 8 },
    { position: 6, driver: 'Lewis Hamilton', team: 'Ferrari', points: 156, wins: 1, podiums: 5 },
    { position: 7, driver: 'Kimi Antonelli', team: 'Mercedes', points: 150, wins: 0, podiums: 4 },
    { position: 8, driver: 'Alexander Albon', team: 'Williams-Mercedes', points: 73, wins: 0, podiums: 2 },
    { position: 9, driver: 'Yuki Tsunoda', team: 'Racing Bulls-Honda RBPT', points: 52, wins: 0, podiums: 1 },
    { position: 10, driver: 'Liam Lawson', team: 'Racing Bulls-Honda RBPT', points: 40, wins: 0, podiums: 0 },
    { position: 11, driver: 'Fernando Alonso', team: 'Aston Martin-Honda RBPT', points: 48, wins: 0, podiums: 1 },
    { position: 12, driver: 'Lance Stroll', team: 'Aston Martin-Honda RBPT', points: 42, wins: 0, podiums: 0 },
    { position: 13, driver: 'Nico Hulkenberg', team: 'Haas-Ferrari', points: 46, wins: 0, podiums: 0 },
    { position: 14, driver: 'Esteban Ocon', team: 'Haas-Ferrari', points: 34, wins: 0, podiums: 0 },
    { position: 15, driver: 'Franco Colapinto', team: 'Williams-Mercedes', points: 64, wins: 0, podiums: 1 },
    { position: 16, driver: 'Pierre Gasly', team: 'Alpine-Renault', points: 28, wins: 0, podiums: 0 },
    { position: 17, driver: 'Jack Doohan', team: 'Alpine-Renault', points: 18, wins: 0, podiums: 0 },
    { position: 18, driver: 'Valtteri Bottas', team: 'Sauber-Ferrari', points: 12, wins: 0, podiums: 0 },
    { position: 19, driver: 'Zhou Guanyu', team: 'Sauber-Ferrari', points: 8, wins: 0, podiums: 0 },
    { position: 20, driver: 'Sergio Perez', team: 'Red Bull Racing-Honda RBPT', points: 30, wins: 0, podiums: 1 },
];

export default function DriverStandingsPage() {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div className="standings-page">
            <div className="page-header">
                <h1>2025 DRIVER STANDINGS</h1>
                <p className="page-subtitle">Final standings from the 2025 Formula 1 World Championship</p>
                <p className="champion-banner">
                    🏆 <strong>World Champion:</strong> Lando Norris (McLaren-Mercedes) - 423 points
                </p>
            </div>

            <div className="standings-controls">
                <button
                    className={`toggle-btn ${showDetails ? 'active' : ''}`}
                    onClick={() => setShowDetails(!showDetails)}
                >
                    {showDetails ? 'Hide Details' : 'Show Details'}
                </button>
            </div>

            <div className="standings-container">
                <div className="standings-table">
                    <div className="table-header">
                        <div className="col-pos">POS</div>
                        <div className="col-driver">DRIVER</div>
                        <div className="col-team">TEAM</div>
                        <div className="col-points">POINTS</div>
                        {showDetails && (
                            <>
                                <div className="col-wins">WINS</div>
                                <div className="col-podiums">PODIUMS</div>
                            </>
                        )}
                    </div>

                    {driver2025Standings.map((standing) => (
                        <div
                            key={standing.position}
                            className={`table-row ${standing.position <= 3 ? 'podium-position' : ''}`}
                        >
                            <div className="col-pos">
                                <span className={`position-badge ${standing.position === 1 ? 'champion' : ''}`}>
                                    {standing.position}
                                </span>
                            </div>
                            <div className="col-driver">
                                {standing.position === 1 && <span className="trophy-icon">🏆</span>}
                                <strong>{standing.driver}</strong>
                            </div>
                            <div className="col-team">{standing.team}</div>
                            <div className="col-points">
                                <span className="points-value">{standing.points}</span>
                            </div>
                            {showDetails && (
                                <>
                                    <div className="col-wins">{standing.wins || 0}</div>
                                    <div className="col-podiums">{standing.podiums || 0}</div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="season-summary">
                <h2>Season Highlights</h2>
                <div className="highlights-grid">
                    <div className="highlight-card">
                        <div className="highlight-value">2</div>
                        <div className="highlight-label">Point Margin</div>
                        <div className="highlight-desc">Closest championship finish in years</div>
                    </div>
                    <div className="highlight-card">
                        <div className="highlight-value">9</div>
                        <div className="highlight-label">Race Wins</div>
                        <div className="highlight-desc">Max Verstappen (Runner-up)</div>
                    </div>
                    <div className="highlight-card">
                        <div className="highlight-value">8</div>
                        <div className="highlight-label">Race Wins</div>
                        <div className="highlight-desc">Lando Norris (Champion)</div>
                    </div>
                    <div className="highlight-card">
                        <div className="highlight-value">15</div>
                        <div className="highlight-label">Rounds Led</div>
                        <div className="highlight-desc">Oscar Piastri led championship</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
