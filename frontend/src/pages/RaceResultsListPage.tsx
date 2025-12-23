import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import './RaceResultsListPage.css';

interface RaceWinner {
    round: number;
    raceName: string;
    country: string;
    circuit: string;
    date: string;
    winner: string;
    team: string;
}

// Fetch all 2025 race winners from backend
const fetchAllRaceWinners = async (): Promise<RaceWinner[]> => {
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

    const winners: RaceWinner[] = [];

    // Fetch all 24 races
    for (let round = 1; round <= 24; round++) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/results/2025/${round}`);
            if (response.ok) {
                const data = await response.json();
                const winnerResult = data.results[0]; // First position is the winner

                winners.push({
                    round: data.round,
                    raceName: data.race_name,
                    country: data.country,
                    circuit: data.circuit,
                    date: data.date,
                    winner: winnerResult.driver,
                    team: winnerResult.team
                });
            }
        } catch (error) {
            console.error(`Failed to fetch race ${round}:`, error);
        }
    }

    return winners;
};

export default function RaceResultsListPage() {
    const { year } = useParams<{ year: string }>();
    const seasonYear = year ? parseInt(year) : 2025;

    // Fetch real race winners from backend
    const { data: raceWinners, isLoading } = useQuery<RaceWinner[]>({
        queryKey: ['raceWinners', seasonYear],
        queryFn: fetchAllRaceWinners,
        enabled: seasonYear === 2025,
        staleTime: 1000 * 60 * 60, // Cache for 1 hour
    });

    // Handle Future Season (2026)
    if (seasonYear === 2026) {
        return (
            <div className="race-results-list-page">
                <div className="page-header">
                    <h1>{seasonYear} RACE RESULTS</h1>
                    <p className="page-subtitle">Season has not started yet</p>
                </div>
                <div className="error-container" style={{ minHeight: '50vh', justifyContent: 'flex-start', paddingTop: '4rem', textAlign: 'center', color: 'white' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⏳</div>
                    <h2>No Races Completed</h2>
                    <p style={{ maxWidth: '600px', margin: '0 auto', color: '#9ca3af' }}>Race results will appear here as each round of the 2026 season is completed.</p>
                    <Link to="/schedule/2026" className="back-link" style={{ marginTop: '2rem', display: 'inline-block', color: 'var(--accent-red)', textDecoration: 'none' }}>→ View 2026 Schedule</Link>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="race-results-list-page">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading race results...</p>
                </div>
            </div>
        );
    }

    const sortedRaces = raceWinners ? [...raceWinners].sort((a, b) => a.round - b.round) : [];

    // Count unique winners
    const uniqueWinners = new Set(sortedRaces.map(r => r.winner)).size;

    // Find champion (most wins)
    const winCounts = sortedRaces.reduce((acc, race) => {
        acc[race.winner] = (acc[race.winner] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const champion = Object.entries(winCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'TBD';

    return (
        <div className="race-results-list-page">
            <div className="page-header">
                <h1>{seasonYear} RACE RESULTS</h1>
                <p className="page-subtitle">Complete race results from all 24 rounds of the {seasonYear} Formula 1 World Championship</p>
                <div className="season-summary-bar">
                    <div className="summary-stat">
                        <span className="stat-value">{sortedRaces.length}</span>
                        <span className="stat-label">Races Completed</span>
                    </div>
                    <div className="summary-stat">
                        <span className="stat-value">{uniqueWinners}</span>
                        <span className="stat-label">Different Winners</span>
                    </div>
                    <div className="summary-stat">
                        <span className="stat-value">🏆</span>
                        <span className="stat-label">{champion} - Most Wins</span>
                    </div>
                </div>
            </div>

            <div className="races-container">
                <div className="races-grid">
                    {sortedRaces.map((race) => (
                        <Link
                            key={race.round}
                            to={`/results/${seasonYear}/race/${race.round}`}
                            className="race-card"
                        >
                            <div className="race-card-header">
                                <div className="round-badge">Round {race.round}</div>
                                <div className="race-date">{new Date(race.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                            </div>

                            <h3 className="race-name">{race.raceName}</h3>

                            <div className="race-location">
                                <span className="location-icon">📍</span>
                                {race.circuit}
                            </div>

                            <div className="race-country">{race.country}</div>

                            <div className="race-winner">
                                <div className="winner-label">Winner</div>
                                <div className="winner-name">🏆 {race.winner}</div>
                                <div className="winner-team">{race.team}</div>
                            </div>

                            <div className="view-details-btn">View Full Results →</div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
