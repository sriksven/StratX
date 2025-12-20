import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './TeamStandingsPage.css';

interface TeamStanding {
    position: number;
    team: string;
    engine: string;
    points: number;
    wins?: number;
    podiums?: number;
}

const team2025Standings: TeamStanding[] = [
    { position: 1, team: 'McLaren', engine: 'Mercedes', points: 833, wins: 14, podiums: 34 },
    { position: 2, team: 'Mercedes', engine: 'Mercedes', points: 469, wins: 3, podiums: 15 },
    { position: 3, team: 'Red Bull Racing', engine: 'Honda RBPT', points: 451, wins: 9, podiums: 18 },
    { position: 4, team: 'Ferrari', engine: 'Ferrari', points: 398, wins: 3, podiums: 13 },
    { position: 5, team: 'Williams', engine: 'Mercedes', points: 137, wins: 0, podiums: 3 },
    { position: 6, team: 'Racing Bulls', engine: 'Honda RBPT', points: 92, wins: 0, podiums: 1 },
    { position: 7, team: 'Aston Martin', engine: 'Honda RBPT', points: 90, wins: 0, podiums: 1 },
    { position: 8, team: 'Haas', engine: 'Ferrari', points: 80, wins: 0, podiums: 0 },
    { position: 9, team: 'Alpine', engine: 'Renault', points: 46, wins: 0, podiums: 0 },
    { position: 10, team: 'Sauber', engine: 'Ferrari', points: 20, wins: 0, podiums: 0 },
];

export default function TeamStandingsPage() {
    const { year } = useParams<{ year: string }>();
    const seasonYear = year ? parseInt(year) : 2025;
    const [showDetails, setShowDetails] = useState(false);

    // Handle Future Season (2026)
    if (seasonYear === 2026) {
        return (
            <div className="standings-page">
                <div className="page-header">
                    <h1>{seasonYear} CONSTRUCTOR STANDINGS</h1>
                    <p className="page-subtitle">Season has not started yet</p>
                </div>
                <div className="error-container" style={{ minHeight: '50vh', justifyContent: 'flex-start', paddingTop: '4rem', textAlign: 'center', color: 'white' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⏳</div>
                    <h2>No Standings Available</h2>
                    <p style={{ maxWidth: '600px', margin: '0 auto', color: '#9ca3af' }}>Constructor standings will update here after the first race of the 2026 season.</p>
                    <Link to="/schedule/2026" className="back-link" style={{ marginTop: '2rem', display: 'inline-block', color: 'var(--accent-red)', textDecoration: 'none' }}>→ View 2026 Schedule</Link>
                </div>
            </div>
        );
    }

    const is2025 = seasonYear === 2025;

    return (
        <div className="standings-page">
            <div className="page-header">
                <h1>{seasonYear} CONSTRUCTOR STANDINGS</h1>
                <p className="page-subtitle">Final standings from the {seasonYear} Formula 1 World Championship</p>
                {is2025 && (
                    <p className="champion-banner">
                        🏆 <strong>Constructors' Champion:</strong> McLaren-Mercedes - 833 points
                    </p>
                )}
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
                        <div className="col-team">TEAM</div>
                        <div className="col-engine">ENGINE</div>
                        <div className="col-points">POINTS</div>
                        {showDetails && (
                            <>
                                <div className="col-wins">WINS</div>
                                <div className="col-podiums">PODIUMS</div>
                            </>
                        )}
                    </div>

                    {team2025Standings.map((standing) => (
                        <div
                            key={standing.position}
                            className={`table-row ${standing.position <= 3 ? 'podium-position' : ''}`}
                        >
                            <div className="col-pos">
                                <span className={`position-badge ${standing.position === 1 ? 'champion' : ''}`}>
                                    {standing.position}
                                </span>
                            </div>
                            <div className="col-team">
                                {standing.position === 1 && <span className="trophy-icon">🏆</span>}
                                <strong>{standing.team}</strong>
                            </div>
                            <div className="col-engine">{standing.engine}</div>
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
                        <div className="highlight-value">2nd</div>
                        <div className="highlight-label">Consecutive Title</div>
                        <div className="highlight-desc">McLaren's back-to-back championships</div>
                    </div>
                    <div className="highlight-card">
                        <div className="highlight-value">10th</div>
                        <div className="highlight-label">Overall Title</div>
                        <div className="highlight-desc">McLaren's constructors' championships</div>
                    </div>
                    <div className="highlight-card">
                        <div className="highlight-value">364</div>
                        <div className="highlight-label">Point Margin</div>
                        <div className="highlight-desc">McLaren's dominance over 2nd place</div>
                    </div>
                    <div className="highlight-card">
                        <div className="highlight-value">14</div>
                        <div className="highlight-label">Race Wins</div>
                        <div className="highlight-desc">McLaren's winning season</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
