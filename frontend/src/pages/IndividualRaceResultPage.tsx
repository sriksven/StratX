import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, MapPin, Calendar, Flag, Timer, Sparkles } from 'lucide-react';
import { RACES_2025 } from '../constants/races';
import PredictionAccuracyView from '../components/PredictionAccuracyView';
import { fetchRaceResults, type RaceResultsResponse } from '../services/raceResults';
import './IndividualRaceResultPage.css';

export default function IndividualRaceResultPage() {
    const { raceId } = useParams<{ raceId: string }>();
    const raceNumber = parseInt(raceId || '1');

    // Fetch real race results from backend
    const { data: raceData, isLoading, error } = useQuery<RaceResultsResponse>({
        queryKey: ['raceResults', raceNumber],
        queryFn: () => fetchRaceResults(raceNumber),
        staleTime: 1000 * 60 * 60, // Cache for 1 hour (historical data doesn't change)
    });

    // Get static race info for fallback
    const staticRaceInfo = RACES_2025.find(r => r.round === raceNumber);

    if (isLoading) {
        return (
            <div className="individual-race-page">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading race results...</p>
                </div>
            </div>
        );
    }

    if (error || !raceData) {
        return (
            <div className="individual-race-page">
                <div className="page-header">
                    <h1>Race Results Unavailable</h1>
                    <p>Could not load results for Round {raceNumber}. The race may not have occurred yet or data is unavailable.</p>
                    <Link to="/results/2025/races" className="back-link">← Back to All Races</Link>
                </div>
            </div>
        );
    }

    const podium = raceData.results.slice(0, 3);
    const fullResults = raceData.results;

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
                        <div className="round-pill">Round {raceData.round}</div>
                    </div>

                    <div className="hero-title-section">
                        <h1>{raceData.race_name}</h1>
                        <p className="circuit-name">{raceData.circuit}</p>
                    </div>

                    <div className="hero-stats-bar">
                        <div className="stat-item">
                            <MapPin className="stat-icon" size={20} />
                            <div className="stat-detail">
                                <span className="label">Location</span>
                                <span className="value">{raceData.country}</span>
                            </div>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <Calendar className="stat-icon" size={20} />
                            <div className="stat-detail">
                                <span className="label">Date</span>
                                <span className="value">{new Date(raceData.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <Flag className="stat-icon" size={20} />
                            <div className="stat-detail">
                                <span className="label">Laps</span>
                                <span className="value">{raceData.total_laps || staticRaceInfo?.laps || 'N/A'}</span>
                            </div>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <Timer className="stat-icon" size={20} />
                            <div className="stat-detail">
                                <span className="label">Distance</span>
                                <span className="value">{staticRaceInfo?.raceDistance || 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* AI Predictions Section */}
            <div className="predictions-section">
                <div className="section-header">
                    <Sparkles className="section-icon" size={24} />
                    <h2>Model Performance Analysis</h2>
                </div>
                <div className="predictions-container">
                    <PredictionAccuracyView raceId={raceData.round} />
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
                            className={`table-row ${result.position <= 3 ? 'podium-row' : ''} ${result.status !== 'Finished' && result.status !== '+1 Lap' ? 'dnf-row' : ''}`}
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
                                {result.time === 'DNF' || result.status !== 'Finished' ? (
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
