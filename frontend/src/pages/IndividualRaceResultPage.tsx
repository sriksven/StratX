import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, MapPin, Calendar, Flag, Timer } from 'lucide-react';
import { RACES_2025 } from '../constants/races';
import './IndividualRaceResultPage.css';

interface RaceResultDetail {
    position: number;
    driver: string;
    team: string;
    time: string;
    points: number;
    status?: string;
}

interface RaceInfo {
    round: number;
    raceName: string;
    country: string;
    circuit: string;
    date: string;
    laps: number;
    distance: string;
}

// Sample race data - in a real app, this would come from an API
const raceData: { [key: number]: { info: RaceInfo; results: RaceResultDetail[] } } = {};

// Populate race data from constants
RACES_2025.forEach(race => {
    raceData[race.round] = {
        info: {
            round: race.round,
            raceName: race.raceName,
            country: race.country,
            circuit: race.circuit,
            date: race.date,
            laps: race.laps || 0,
            distance: race.raceDistance || 'TBD'
        },
        // For demo purposes, we'll keep using the static results for now
        // In a real app, you'd fetch specific results for each race
        results: [
            { position: 1, driver: 'Lando Norris', team: 'McLaren-Mercedes', time: '1:28:45.123', points: 25 },
            { position: 2, driver: 'Max Verstappen', team: 'Red Bull Racing-Honda RBPT', time: '+3.456', points: 18 },
            { position: 3, driver: 'Oscar Piastri', team: 'McLaren-Mercedes', time: '+8.234', points: 15 },
            { position: 4, driver: 'George Russell', team: 'Mercedes', time: '+15.678', points: 12 },
            { position: 5, driver: 'Charles Leclerc', team: 'Ferrari', time: '+22.345', points: 10 },
            { position: 6, driver: 'Lewis Hamilton', team: 'Ferrari', time: '+28.901', points: 8 },
            { position: 7, driver: 'Kimi Antonelli', team: 'Mercedes', time: '+35.234', points: 6 },
            { position: 8, driver: 'Alexander Albon', team: 'Williams-Mercedes', time: '+42.567', points: 4 },
            { position: 9, driver: 'Fernando Alonso', team: 'Aston Martin-Honda RBPT', time: '+48.123', points: 2 },
            { position: 10, driver: 'Yuki Tsunoda', team: 'Racing Bulls-Honda RBPT', time: '+52.890', points: 1 },
            { position: 11, driver: 'Lance Stroll', team: 'Aston Martin-Honda RBPT', time: '+1 lap', points: 0 },
            { position: 12, driver: 'Nico Hulkenberg', team: 'Haas-Ferrari', time: '+1 lap', points: 0 },
            { position: 13, driver: 'Pierre Gasly', team: 'Alpine-Renault', time: '+1 lap', points: 0 },
            { position: 14, driver: 'Esteban Ocon', team: 'Haas-Ferrari', time: '+1 lap', points: 0 },
            { position: 15, driver: 'Franco Colapinto', team: 'Williams-Mercedes', time: '+1 lap', points: 0 },
            { position: 16, driver: 'Liam Lawson', team: 'Racing Bulls-Honda RBPT', time: '+2 laps', points: 0 },
            { position: 17, driver: 'Jack Doohan', team: 'Alpine-Renault', time: '+2 laps', points: 0 },
            { position: 18, driver: 'Valtteri Bottas', team: 'Sauber-Ferrari', time: 'DNF', points: 0, status: 'Mechanical' },
            { position: 19, driver: 'Zhou Guanyu', team: 'Sauber-Ferrari', time: 'DNF', points: 0, status: 'Collision' },
            { position: 20, driver: 'Sergio Perez', team: 'Red Bull Racing-Honda RBPT', time: 'DNF', points: 0, status: 'Engine' },
        ]
    };
});

export default function IndividualRaceResultPage() {
    const { raceId } = useParams<{ raceId: string }>();
    const raceNumber = parseInt(raceId || '1');
    const race = raceData[raceNumber];

    if (!race) {
        return (
            <div className="individual-race-page">
                <div className="page-header">
                    <h1>Race Not Found</h1>
                    <Link to="/results/2025/races" className="back-link">← Back to All Races</Link>
                </div>
            </div>
        );
    }

    const podium = race.results.slice(0, 3);
    const fullResults = race.results;

    return (
        <div className="individual-race-page">
            <div className="race-hero">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <div className="hero-top-bar">
                        <Link to="/results/2025/races" className="back-btn">
                            <ChevronLeft size={20} />
                            <span>All Races</span>
                        </Link>
                        <div className="round-pill">Round {race.info.round}</div>
                    </div>

                    <div className="hero-title-section">
                        <h1>{race.info.raceName}</h1>
                        <p className="circuit-name">{race.info.circuit}</p>
                    </div>

                    <div className="hero-stats-bar">
                        <div className="stat-item">
                            <MapPin className="stat-icon" size={20} />
                            <div className="stat-detail">
                                <span className="label">Location</span>
                                <span className="value">{race.info.country}</span>
                            </div>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <Calendar className="stat-icon" size={20} />
                            <div className="stat-detail">
                                <span className="label">Date</span>
                                <span className="value">{new Date(race.info.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <Flag className="stat-icon" size={20} />
                            <div className="stat-detail">
                                <span className="label">Laps</span>
                                <span className="value">{race.info.laps}</span>
                            </div>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <Timer className="stat-icon" size={20} />
                            <div className="stat-detail">
                                <span className="label">Distance</span>
                                <span className="value">{race.info.distance}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Podium Section */}
            <div className="podium-section">
                <h2>Podium</h2>
                <div className="podium-container">
                    {/* 2nd Place */}
                    <div className="podium-position second">
                        <div className="position-number">2</div>
                        <div className="podium-medal">🥈</div>
                        <div className="driver-name">{podium[1].driver}</div>
                        <div className="team-name">{podium[1].team}</div>
                        <div className="race-time">{podium[1].time}</div>
                        <div className="points-earned">{podium[1].points} pts</div>
                    </div>

                    {/* 1st Place */}
                    <div className="podium-position first">
                        <div className="position-number">1</div>
                        <div className="podium-medal">🏆</div>
                        <div className="driver-name">{podium[0].driver}</div>
                        <div className="team-name">{podium[0].team}</div>
                        <div className="race-time">{podium[0].time}</div>
                        <div className="points-earned">{podium[0].points} pts</div>
                    </div>

                    {/* 3rd Place */}
                    <div className="podium-position third">
                        <div className="position-number">3</div>
                        <div className="podium-medal">🥉</div>
                        <div className="driver-name">{podium[2].driver}</div>
                        <div className="team-name">{podium[2].team}</div>
                        <div className="race-time">{podium[2].time}</div>
                        <div className="points-earned">{podium[2].points} pts</div>
                    </div>
                </div>
            </div>

            {/* Full Results Table */}
            <div className="results-section">
                <h2>Full Race Results</h2>
                <div className="results-table">
                    <div className="table-header">
                        <div className="col-pos">POS</div>
                        <div className="col-driver">DRIVER</div>
                        <div className="col-team">TEAM</div>
                        <div className="col-time">TIME/RETIRED</div>
                        <div className="col-points">PTS</div>
                    </div>

                    {fullResults.map((result) => (
                        <div
                            key={result.position}
                            className={`table-row ${result.position <= 3 ? 'podium-row' : ''} ${result.status ? 'dnf-row' : ''}`}
                        >
                            <div className="col-pos">
                                <span className={`position-badge ${result.position === 1 ? 'winner' : ''}`}>
                                    {result.position}
                                </span>
                            </div>
                            <div className="col-driver">
                                {result.position === 1 && <span className="trophy-icon">🏆</span>}
                                <strong>{result.driver}</strong>
                            </div>
                            <div className="col-team">{result.team}</div>
                            <div className="col-time">
                                {result.status ? (
                                    <span className="dnf-status">DNF - {result.status}</span>
                                ) : (
                                    result.time
                                )}
                            </div>
                            <div className="col-points">
                                {result.points > 0 && (
                                    <span className="points-badge">{result.points}</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
