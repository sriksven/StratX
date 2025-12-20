import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchSeasonData } from '../services/ergast';
import './ResultsPage.css';

// 2025 Championship progression data - points after each race
const championshipProgression2025 = [
    { race: 0, norris: 0, verstappen: 0, piastri: 0, russell: 0, leclerc: 0, hamilton: 0 },
    { race: 1, norris: 25, verstappen: 18, piastri: 15, russell: 12, leclerc: 10, hamilton: 8 },
    { race: 2, norris: 43, verstappen: 36, piastri: 40, russell: 24, leclerc: 18, hamilton: 14 },
    { race: 3, norris: 58, verstappen: 61, piastri: 55, russell: 36, leclerc: 28, hamilton: 22 },
    { race: 4, norris: 76, verstappen: 79, piastri: 80, russell: 48, leclerc: 38, hamilton: 30 },
    { race: 5, norris: 94, verstappen: 104, piastri: 95, russell: 60, leclerc: 48, hamilton: 38 },
    { race: 6, norris: 109, verstappen: 129, piastri: 110, russell: 72, leclerc: 58, hamilton: 46 },
    { race: 7, norris: 134, verstappen: 141, piastri: 125, russell: 84, leclerc: 68, hamilton: 54 },
    { race: 8, norris: 152, verstappen: 153, piastri: 150, russell: 96, leclerc: 78, hamilton: 62 },
    { race: 9, norris: 167, verstappen: 165, piastri: 165, russell: 121, leclerc: 88, hamilton: 70 },
    { race: 10, norris: 192, verstappen: 177, piastri: 180, russell: 133, leclerc: 98, hamilton: 78 },
    { race: 11, norris: 207, verstappen: 202, piastri: 195, russell: 145, leclerc: 108, hamilton: 86 },
    { race: 12, norris: 225, verstappen: 214, piastri: 220, russell: 157, leclerc: 118, hamilton: 94 },
    { race: 13, norris: 250, verstappen: 226, piastri: 235, russell: 169, leclerc: 128, hamilton: 102 },
    { race: 14, norris: 268, verstappen: 251, piastri: 250, russell: 181, leclerc: 138, hamilton: 110 },
    { race: 15, norris: 286, verstappen: 263, piastri: 265, russell: 193, leclerc: 163, hamilton: 118 },
    { race: 16, norris: 304, verstappen: 275, piastri: 290, russell: 205, leclerc: 173, hamilton: 126 },
    { race: 17, norris: 329, verstappen: 287, piastri: 305, russell: 217, leclerc: 183, hamilton: 134 },
    { race: 18, norris: 347, verstappen: 312, piastri: 320, russell: 229, leclerc: 193, hamilton: 142 },
    { race: 19, norris: 365, verstappen: 324, piastri: 335, russell: 254, leclerc: 203, hamilton: 150 },
    { race: 20, norris: 383, verstappen: 349, piastri: 350, russell: 266, leclerc: 213, hamilton: 156 },
    { race: 21, norris: 398, verstappen: 374, piastri: 365, russell: 278, leclerc: 223, hamilton: 156 },
    { race: 22, norris: 423, verstappen: 386, piastri: 380, russell: 290, leclerc: 233, hamilton: 156 },
    { race: 23, norris: 423, verstappen: 398, piastri: 395, russell: 302, leclerc: 242, hamilton: 156 },
    { race: 24, norris: 423, verstappen: 421, piastri: 410, russell: 319, leclerc: 242, hamilton: 156 },
];

const driverColors = {
    norris: '#ff8700',
    verstappen: '#0600ef',
    piastri: '#ff8700',
    russell: '#00d2be',
    leclerc: '#dc0000',
    hamilton: '#dc0000',
};

export default function ResultsPage() {
    const { year } = useParams<{ year: string }>();
    const seasonYear = year ? parseInt(year) : 2025;

    // Handle Future Season (2026)
    if (seasonYear === 2026) {
        return (
            <div className="results-page">
                <div className="page-header">
                    <h1>{seasonYear} SEASON RESULTS</h1>
                    <p className="page-subtitle">Season has not started yet</p>
                </div>
                <div className="error-container" style={{ minHeight: '50vh', justifyContent: 'flex-start', paddingTop: '4rem' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⏳</div>
                    <h2>Waiting for Race Start</h2>
                    <p>Detailed results, standings, and telemetry analysis will be available here after the first race of the 2026 season.</p>
                    <Link to="/schedule/2026" className="back-link" style={{ marginTop: '2rem' }}>→ View 2026 Schedule</Link>
                </div>
            </div>
        );
    }

    // Fetch historical data for years before 2025
    const { data: seasonData, isLoading, error } = useQuery({
        queryKey: ['season', seasonYear],
        queryFn: () => fetchSeasonData(seasonYear),
        enabled: seasonYear < 2025,
        staleTime: Infinity, // Historical data doesn't change
    });

    if (isLoading && seasonYear < 2025) {
        return (
            <div className="results-page">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading {seasonYear} season data...</p>
                </div>
            </div>
        );
    }

    if (error && seasonYear < 2025) {
        return (
            <div className="results-page">
                <div className="error-container">
                    <h2>Error Loading Season Data</h2>
                    <p>Could not load data for {seasonYear} season.</p>
                    <Link to="/results/archive" className="back-link">← Back to Archive</Link>
                </div>
            </div>
        );
    }

    // Use 2025 hardcoded data or historical data
    const is2025 = seasonYear === 2025;
    const championDriver = is2025 ?
        { name: 'Lando Norris', team: 'McLaren-Mercedes', points: 423 } :
        seasonData?.driverChampion;
    const championConstructor = is2025 ?
        { name: 'McLaren-Mercedes', points: 833 } :
        seasonData?.constructorChampion;

    return (
        <div className="results-page">
            <div className="page-header">
                <h1>{seasonYear} SEASON RESULTS</h1>
                <p className="page-subtitle">Complete results from the {seasonYear} Formula 1 World Championship</p>
            </div>

            <div className="champions-section">
                <div className="champion-card drivers-champion">
                    <div className="champion-icon">🏆</div>
                    <h2>Drivers' World Champion</h2>
                    <div className="champion-name">{championDriver?.name || 'Loading...'}</div>
                    <div className="champion-team">{championDriver?.team || ''}</div>
                    <div className="champion-points">{championDriver?.points || 0} Points</div>
                    {is2025 && <p className="champion-note">Won by just 2 points over Max Verstappen</p>}
                </div>

                <div className="champion-card constructors-champion">
                    <div className="champion-icon">🏆</div>
                    <h2>Constructors' Champion</h2>
                    <div className="champion-name">{championConstructor?.name || 'Loading...'}</div>
                    <div className="champion-points">{championConstructor?.points || 0} Points</div>
                    {is2025 && <p className="champion-note">Second consecutive championship, 10th overall</p>}
                </div>
            </div>

            {/* Championship Progression Chart - Only for 2025 */}
            {is2025 && (
                <div className="championship-progression">
                    <h2>Championship Points Progression</h2>
                    <p className="chart-subtitle">Track how the top drivers accumulated points across all 24 races</p>

                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={500}>
                            <LineChart
                                data={championshipProgression2025}
                                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#38383f" />
                                <XAxis
                                    dataKey="race"
                                    stroke="#999"
                                    label={{ value: 'Race Number', position: 'insideBottom', offset: -10, fill: '#999' }}
                                />
                                <YAxis
                                    stroke="#999"
                                    label={{ value: 'Points', angle: -90, position: 'insideLeft', fill: '#999' }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1e1e28',
                                        border: '1px solid #38383f',
                                        borderRadius: '8px',
                                        color: '#fff'
                                    }}
                                    labelFormatter={(value) => `Race ${value}`}
                                    formatter={(value: any, name: string | undefined) => {
                                        if (!name) return [value, ''];
                                        const names: { [key: string]: string } = {
                                            norris: 'Lando Norris',
                                            verstappen: 'Max Verstappen',
                                            piastri: 'Oscar Piastri',
                                            russell: 'George Russell',
                                            leclerc: 'Charles Leclerc',
                                            hamilton: 'Lewis Hamilton'
                                        };
                                        return [value, names[name] || name];
                                    }}
                                    itemSorter={(item: any) => -item.value}
                                />
                                <Legend
                                    wrapperStyle={{ paddingTop: '20px' }}
                                    formatter={(value) => {
                                        const names: { [key: string]: string } = {
                                            norris: 'Lando Norris',
                                            verstappen: 'Max Verstappen',
                                            piastri: 'Oscar Piastri',
                                            russell: 'George Russell',
                                            leclerc: 'Charles Leclerc',
                                            hamilton: 'Lewis Hamilton'
                                        };
                                        return names[value] || value;
                                    }}
                                />
                                {/* Render lines in reverse order so highest points appear on top */}
                                <Line
                                    type="monotone"
                                    dataKey="hamilton"
                                    stroke={driverColors.hamilton}
                                    strokeWidth={2}
                                    strokeDasharray="5 5"
                                    dot={{ fill: driverColors.hamilton, r: 3 }}
                                    activeDot={{ r: 5 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="leclerc"
                                    stroke={driverColors.leclerc}
                                    strokeWidth={2}
                                    dot={{ fill: driverColors.leclerc, r: 3 }}
                                    activeDot={{ r: 5 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="russell"
                                    stroke={driverColors.russell}
                                    strokeWidth={2}
                                    dot={{ fill: driverColors.russell, r: 3 }}
                                    activeDot={{ r: 5 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="piastri"
                                    stroke={driverColors.piastri}
                                    strokeWidth={2}
                                    strokeDasharray="5 5"
                                    dot={{ fill: driverColors.piastri, r: 3 }}
                                    activeDot={{ r: 5 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="verstappen"
                                    stroke={driverColors.verstappen}
                                    strokeWidth={3}
                                    dot={{ fill: driverColors.verstappen, r: 4 }}
                                    activeDot={{ r: 6 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="norris"
                                    stroke={driverColors.norris}
                                    strokeWidth={3}
                                    dot={{ fill: driverColors.norris, r: 4 }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}

            <div className="standings-navigation">
                <h2>View Full Standings</h2>
                <div className="nav-cards">
                    <Link to={`/results/${seasonYear}/races`} className="nav-card">
                        <div className="nav-card-icon">🏁</div>
                        <h3>Race Results</h3>
                        <p>View results from all races</p>
                        <div className="nav-card-arrow">→</div>
                    </Link>

                    <Link to={`/results/${seasonYear}/drivers`} className="nav-card">
                        <div className="nav-card-icon">👤</div>
                        <h3>Driver Standings</h3>
                        <p>Complete driver championship standings</p>
                        <div className="nav-card-arrow">→</div>
                    </Link>

                    <Link to={`/results/${seasonYear}/teams`} className="nav-card">
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
                        <div className="stat-icon">🏁</div>
                        <div className="stat-value">24</div>
                        <div className="stat-label">Total Races</div>
                        <div className="stat-desc">Complete season</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">🏆</div>
                        <div className="stat-value">9</div>
                        <div className="stat-label">Different Winners</div>
                        <div className="stat-desc">Competitive field</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">🔥</div>
                        <div className="stat-value">14</div>
                        <div className="stat-label">McLaren Wins</div>
                        <div className="stat-desc">Dominant season</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">⚡</div>
                        <div className="stat-value">2</div>
                        <div className="stat-label">Point Gap</div>
                        <div className="stat-desc">Closest finish ever</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
