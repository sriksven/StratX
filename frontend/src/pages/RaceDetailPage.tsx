import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Clock, Activity, Flag } from 'lucide-react';
import LiveTelemetry from '../components/LiveTelemetry';
import PredictionCards from '../components/PredictionCards';
import TelemetryCharts from '../components/TelemetryCharts';
import DriverComparison from '../components/DriverComparison';
import { DRIVERS } from '../constants/drivers';
import { RACES_2026 } from '../constants/races';
import './RaceDetailPage.css';

interface RaceInfo {
    meeting_key: number;
    meeting_name: string;
    country_name: string;
    location: string;
    circuit_short_name: string;
    date_start: string;
    year: number;
}

interface Session {
    session_key: number;
    session_name: string;
    session_type: string;
    date_start: string;
    date_end: string;
}

// Map Demo to Round 1 (Australia) 2026
const DEMO_ROUND_KEY = '1';

export default function RaceDetailPage() {
    const { raceId } = useParams<{ raceId: string }>();
    const navigate = useNavigate();

    const [raceInfo, setRaceInfo] = useState<RaceInfo | null>(null);
    const [sessions, setSessions] = useState<Session[]>([]);
    const [selectedDriver, setSelectedDriver] = useState<string>('VER');
    const [activeTab, setActiveTab] = useState<'telemetry' | 'predictions' | 'analytics'>('predictions');
    const [isLive, setIsLive] = useState(false);
    const [activeSessionKey, setActiveSessionKey] = useState<number | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [isComingSoon, setIsComingSoon] = useState(false);

    // Pre-look up race info from static constants so we don't show "TBD"
    const staticRaceData = useMemo(() => {
        if (!raceId) return null;
        return RACES_2026.find(r => r.round === parseInt(raceId));
    }, [raceId]);

    useEffect(() => {
        if (raceId) {
            fetchRaceData(raceId);
        }
    }, [raceId]);

    async function fetchRaceData(meetingKey: string) {
        try {
            if (meetingKey === DEMO_ROUND_KEY) {
                throw new Error("Demo Trigger");
            }

            // Fetch live/OpenF1 data
            const raceResponse = await fetch(`https://api.openf1.org/v1/meetings?meeting_key=${meetingKey}`);
            const raceData = await raceResponse.json();

            if (raceData.length > 0) {
                setRaceInfo(raceData[0]);

                const sessionsResponse = await fetch(`https://api.openf1.org/v1/sessions?meeting_key=${meetingKey}`);
                const sessionsData = await sessionsResponse.json();

                if (sessionsData.length === 0) {
                    // Race exists but no sessions -> Future
                    setIsComingSoon(true);
                } else {
                    const sortedSessions = sessionsData.sort((a: Session, b: Session) =>
                        new Date(a.date_start).getTime() - new Date(b.date_start).getTime()
                    );
                    setSessions(sortedSessions);

                    const now = Date.now();
                    const liveSession = sortedSessions.find((s: Session) => {
                        const start = new Date(s.date_start).getTime();
                        const end = new Date(s.date_end).getTime();
                        return now >= start && now <= end;
                    });

                    setIsLive(!!liveSession);
                    if (liveSession) setActiveSessionKey(liveSession.session_key);
                    else setActiveSessionKey(sortedSessions[sortedSessions.length - 1].session_key);

                    setIsComingSoon(false);
                }
            } else {
                // Not found in OpenF1 -> Future Race
                setIsComingSoon(true);

                // Use our static data if available
                if (staticRaceData) {
                    setRaceInfo({
                        meeting_key: parseInt(meetingKey),
                        meeting_name: staticRaceData.raceName,
                        country_name: staticRaceData.country,
                        location: staticRaceData.location,
                        circuit_short_name: staticRaceData.circuit,
                        date_start: new Date(staticRaceData.date).toISOString(),
                        year: 2026
                    });
                }
            }

        } catch (error) {
            console.warn('Race data fetch failed', error);

            // DEMO FALLBACK
            if (meetingKey === DEMO_ROUND_KEY) {
                const demoStart = new Date();

                setRaceInfo({
                    meeting_key: 9999,
                    meeting_name: "Australian Grand Prix (Live Demo)",
                    country_name: "Australia",
                    location: "Melbourne",
                    circuit_short_name: "Albert Park",
                    date_start: demoStart.toISOString(),
                    year: 2026
                });

                setSessions([
                    { session_key: 1001, session_name: "Practice 1", session_type: "Practice", date_start: new Date(Date.now() - 86400000).toISOString(), date_end: new Date(Date.now() - 82800000).toISOString() },
                    { session_key: 9999, session_name: "Race", session_type: "Race", date_start: new Date(Date.now() - 1800000).toISOString(), date_end: new Date(Date.now() + 5400000).toISOString() }
                ]);

                setIsLive(true);
                setActiveSessionKey(9999);
                setIsComingSoon(false);
            } else {
                // Future / Coming Soon
                setIsComingSoon(true);
                if (staticRaceData) {
                    setRaceInfo({
                        meeting_key: parseInt(meetingKey),
                        meeting_name: staticRaceData.raceName,
                        country_name: staticRaceData.country,
                        location: staticRaceData.location,
                        circuit_short_name: staticRaceData.circuit,
                        date_start: new Date(staticRaceData.date).toISOString(),
                        year: 2026
                    });
                }
            }
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="loading-screen">
                <div className="loading-spinner"></div>
                <p>Loading Race Data...</p>
            </div>
        );
    }

    const displayedRaceInfo = raceInfo;
    const raceDate = displayedRaceInfo ? new Date(displayedRaceInfo.date_start) : new Date();
    const isPast = !isLive && raceDate < new Date();

    return (
        <div className="race-detail-page">
            {/* Header */}
            <header className="race-header">
                <button className="back-button" onClick={() => navigate('/schedule/2026')}>
                    <ArrowLeft size={20} />
                    Back to Schedule
                </button>

                <div className="race-header-content">
                    <div className="race-status-badge">
                        {isLive ? (
                            <>
                                <span className="live-dot"></span>
                                LIVE NOW
                            </>
                        ) : isComingSoon ? (
                            'COMING SOON'
                        ) : isPast ? (
                            'COMPLETED'
                        ) : (
                            'UPCOMING'
                        )}
                    </div>

                    <h1 className="race-header-title">{displayedRaceInfo?.meeting_name || 'Grand Prix'}</h1>

                    <div className="race-header-meta">
                        <div className="meta-item">
                            <MapPin size={18} />
                            <span>{displayedRaceInfo?.circuit_short_name}, {displayedRaceInfo?.location}</span>
                        </div>
                        <div className="meta-item">
                            <Calendar size={18} />
                            <span>{formatDate(raceDate)}</span>
                        </div>
                    </div>
                </div>
            </header>

            {isComingSoon ? (
                <div className="coming-soon-container">
                    <div className="coming-soon-content glass-card">
                        <div className="flag-icon-container">
                            <Flag size={48} className="coming-soon-icon" />
                        </div>
                        <h2 className="coming-soon-title">Race Data Not Yet Available</h2>

                        <div className="coming-soon-info">
                            <p>Detailed telemetry and predictive models for the <strong>{displayedRaceInfo?.meeting_name}</strong> will be activated once the race weekend begins.</p>
                            <p className="highlight-text">
                                Scheduled Date: {formatDate(raceDate)}
                            </p>
                        </div>

                        <div className="coming-soon-actions">
                            <button className="primary-glass-btn" onClick={() => navigate('/race/1')}>
                                View Live Demo (Australia)
                            </button>
                            <button className="secondary-glass-btn" onClick={() => navigate('/schedule/2026')}>
                                Return to Schedule
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    {/* Sessions Timeline */}
                    <section className="sessions-section">
                        <h2>Weekend Schedule</h2>
                        <div className="sessions-timeline">
                            {sessions.map((session) => {
                                const sessionStart = new Date(session.date_start);
                                const sessionEnd = new Date(session.date_end);
                                const now = Date.now();
                                const isSessionLive = now >= sessionStart.getTime() && now <= sessionEnd.getTime();
                                const isSelected = activeSessionKey === session.session_key;

                                return (
                                    <div
                                        key={session.session_key}
                                        className={`session-card ${isSessionLive ? 'live' : ''} ${isSelected ? 'selected' : ''}`}
                                        onClick={() => setActiveSessionKey(session.session_key)}
                                    >
                                        {isSessionLive && <span className="session-live-badge">🔴 LIVE</span>}
                                        <div className="session-type">{session.session_name}</div>
                                        <div className="session-time">
                                            <Clock size={14} />
                                            {formatTime(sessionStart)}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* ... Rest of live content ... */}
                    <section className="race-content">
                        <div className="content-tabs">
                            <button
                                className={`tab ${activeTab === 'telemetry' ? 'active' : ''}`}
                                onClick={() => setActiveTab('telemetry')}
                            >
                                <Activity size={20} /> Live Telemetry
                            </button>
                            <button
                                className={`tab ${activeTab === 'predictions' ? 'active' : ''}`}
                                onClick={() => setActiveTab('predictions')}
                            >
                                🤖 AI Predictions
                            </button>
                            <button
                                className={`tab ${activeTab === 'analytics' ? 'active' : ''}`}
                                onClick={() => setActiveTab('analytics')}
                            >
                                📊 Analytics
                            </button>
                        </div>

                        <div className="content-body">
                            <div className="driver-selector">
                                <label>Select Driver:</label>
                                <select
                                    value={selectedDriver}
                                    onChange={(e) => setSelectedDriver(e.target.value)}
                                >
                                    {DRIVERS.map((driver) => (
                                        <option key={driver.code} value={driver.code}>
                                            {driver.name} ({driver.code})
                                        </option>
                                    ))}
                                </select>

                                <div className="session-info-badge">
                                    {sessions.find(s => s.session_key === activeSessionKey)?.session_name || 'Session'}
                                </div>
                            </div>

                            {activeTab === 'telemetry' && (
                                <div className="tab-content">
                                    <LiveTelemetry driver={selectedDriver} isLive={isLive} />
                                </div>
                            )}

                            {activeTab === 'predictions' && (
                                <div className="tab-content">
                                    <PredictionCards
                                        driver={selectedDriver}
                                        isLive={isLive}
                                        sessionKey={activeSessionKey}
                                    />
                                </div>
                            )}

                            {activeTab === 'analytics' && (
                                <div className="tab-content">
                                    <TelemetryCharts driver={selectedDriver} isLive={isLive} />
                                    <div style={{ marginTop: '2rem' }}>
                                        <h3 style={{ marginBottom: '1rem' }}>Live Driver Comparison</h3>
                                        <DriverComparison isLive={isLive} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                </>
            )}
        </div>
    );
}

function formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
}

function formatTime(date: Date): string {
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
    });
}
