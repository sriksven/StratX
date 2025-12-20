import { Link, useParams } from 'react-router-dom';
import './RaceResultsListPage.css';

interface RaceResult {
    round: number;
    raceName: string;
    country: string;
    circuit: string;
    date: string;
    winner: string;
    team: string;
    completed: boolean;
}

const races2025: RaceResult[] = [
    { round: 1, raceName: 'Australian Grand Prix', country: 'Australia', circuit: 'Albert Park Circuit', date: '2025-03-16', winner: 'Lando Norris', team: 'McLaren-Mercedes', completed: true },
    { round: 2, raceName: 'Chinese Grand Prix', country: 'China', circuit: 'Shanghai International Circuit', date: '2025-03-23', winner: 'Oscar Piastri', team: 'McLaren-Mercedes', completed: true },
    { round: 3, raceName: 'Japanese Grand Prix', country: 'Japan', circuit: 'Suzuka Circuit', date: '2025-04-06', winner: 'Max Verstappen', team: 'Red Bull Racing-Honda RBPT', completed: true },
    { round: 4, raceName: 'Bahrain Grand Prix', country: 'Bahrain', circuit: 'Bahrain International Circuit', date: '2025-04-13', winner: 'Oscar Piastri', team: 'McLaren-Mercedes', completed: true },
    { round: 5, raceName: 'Saudi Arabian Grand Prix', country: 'Saudi Arabia', circuit: 'Jeddah Corniche Circuit', date: '2025-04-20', winner: 'Max Verstappen', team: 'Red Bull Racing-Honda RBPT', completed: true },
    { round: 6, raceName: 'Emilia Romagna Grand Prix', country: 'Italy', circuit: 'Autodromo Enzo e Dino Ferrari', date: '2025-05-18', winner: 'Max Verstappen', team: 'Red Bull Racing-Honda RBPT', completed: true },
    { round: 7, raceName: 'Monaco Grand Prix', country: 'Monaco', circuit: 'Circuit de Monaco', date: '2025-05-25', winner: 'Lando Norris', team: 'McLaren-Mercedes', completed: true },
    { round: 8, raceName: 'Spanish Grand Prix', country: 'Spain', circuit: 'Circuit de Barcelona-Catalunya', date: '2025-06-01', winner: 'Oscar Piastri', team: 'McLaren-Mercedes', completed: true },
    { round: 9, raceName: 'Canadian Grand Prix', country: 'Canada', circuit: 'Circuit Gilles Villeneuve', date: '2025-06-15', winner: 'George Russell', team: 'Mercedes', completed: true },
    { round: 10, raceName: 'Austrian Grand Prix', country: 'Austria', circuit: 'Red Bull Ring', date: '2025-06-29', winner: 'Lando Norris', team: 'McLaren-Mercedes', completed: true },
    { round: 11, raceName: 'British Grand Prix', country: 'Great Britain', circuit: 'Silverstone Circuit', date: '2025-07-06', winner: 'Max Verstappen', team: 'Red Bull Racing-Honda RBPT', completed: true },
    { round: 12, raceName: 'Belgian Grand Prix', country: 'Belgium', circuit: 'Circuit de Spa-Francorchamps', date: '2025-07-27', winner: 'Oscar Piastri', team: 'McLaren-Mercedes', completed: true },
    { round: 13, raceName: 'Hungarian Grand Prix', country: 'Hungary', circuit: 'Hungaroring', date: '2025-08-03', winner: 'Lando Norris', team: 'McLaren-Mercedes', completed: true },
    { round: 14, raceName: 'Dutch Grand Prix', country: 'Netherlands', circuit: 'Circuit Zandvoort', date: '2025-08-31', winner: 'Max Verstappen', team: 'Red Bull Racing-Honda RBPT', completed: true },
    { round: 15, raceName: 'Italian Grand Prix', country: 'Italy', circuit: 'Autodromo Nazionale di Monza', date: '2025-09-07', winner: 'Charles Leclerc', team: 'Ferrari', completed: true },
    { round: 16, raceName: 'Azerbaijan Grand Prix', country: 'Azerbaijan', circuit: 'Baku City Circuit', date: '2025-09-21', winner: 'Oscar Piastri', team: 'McLaren-Mercedes', completed: true },
    { round: 17, raceName: 'Singapore Grand Prix', country: 'Singapore', circuit: 'Marina Bay Street Circuit', date: '2025-10-05', winner: 'Lando Norris', team: 'McLaren-Mercedes', completed: true },
    { round: 18, raceName: 'United States Grand Prix', country: 'USA', circuit: 'Circuit of the Americas', date: '2025-10-19', winner: 'Max Verstappen', team: 'Red Bull Racing-Honda RBPT', completed: true },
    { round: 19, raceName: 'Mexico City Grand Prix', country: 'Mexico', circuit: 'Autódromo Hermanos Rodríguez', date: '2025-10-26', winner: 'George Russell', team: 'Mercedes', completed: true },
    { round: 20, raceName: 'São Paulo Grand Prix', country: 'Brazil', circuit: 'Autódromo José Carlos Pace', date: '2025-11-09', winner: 'Max Verstappen', team: 'Red Bull Racing-Honda RBPT', completed: true },
    { round: 21, raceName: 'Las Vegas Grand Prix', country: 'USA', circuit: 'Las Vegas Street Circuit', date: '2025-11-22', winner: 'Max Verstappen', team: 'Red Bull Racing-Honda RBPT', completed: true },
    { round: 22, raceName: 'Qatar Grand Prix', country: 'Qatar', circuit: 'Lusail International Circuit', date: '2025-11-30', winner: 'Lando Norris', team: 'McLaren-Mercedes', completed: true },
    { round: 23, raceName: 'Abu Dhabi Grand Prix', country: 'UAE', circuit: 'Yas Marina Circuit', date: '2025-12-07', winner: 'Charles Leclerc', team: 'Ferrari', completed: true },
    { round: 24, raceName: 'Miami Grand Prix', country: 'USA', circuit: 'Miami International Autodrome', date: '2025-05-04', winner: 'George Russell', team: 'Mercedes', completed: true },
];

// Sort by round number
const sortedRaces = [...races2025].sort((a, b) => a.round - b.round);

export default function RaceResultsListPage() {
    const { year } = useParams<{ year: string }>();
    const seasonYear = year ? parseInt(year) : 2025;

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

    const completedRaces = sortedRaces.filter(race => race.completed);

    return (
        <div className="race-results-list-page">
            <div className="page-header">
                <h1>{seasonYear} RACE RESULTS</h1>
                <p className="page-subtitle">Complete race results from all 24 rounds of the {seasonYear} Formula 1 World Championship</p>
                <div className="season-summary-bar">
                    <div className="summary-stat">
                        <span className="stat-value">{completedRaces.length}</span>
                        <span className="stat-label">Races Completed</span>
                    </div>
                    <div className="summary-stat">
                        <span className="stat-value">9</span>
                        <span className="stat-label">Different Winners</span>
                    </div>
                    <div className="summary-stat">
                        <span className="stat-value">🏆</span>
                        <span className="stat-label">Lando Norris - Champion</span>
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

                            {race.completed && (
                                <div className="race-winner">
                                    <div className="winner-label">Winner</div>
                                    <div className="winner-name">🏆 {race.winner}</div>
                                    <div className="winner-team">{race.team}</div>
                                </div>
                            )}

                            <div className="view-details-btn">View Full Results →</div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
