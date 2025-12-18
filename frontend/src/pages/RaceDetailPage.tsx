import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Clock, Activity } from 'lucide-react';
import LiveTelemetry from '../components/LiveTelemetry';
import PredictionCards from '../components/PredictionCards';
import TelemetryCharts from '../components/TelemetryCharts';
import DriverComparison from '../components/DriverComparison';
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

export default function RaceDetailPage() {
    const { raceId } = useParams<{ raceId: string }>();
    const navigate = useNavigate();

    const [raceInfo, setRaceInfo] = useState<RaceInfo | null>(null);
    const [sessions, setSessions] = useState<Session[]>([]);
    const [selectedDriver, setSelectedDriver] = useState<string>('VER');
    const [activeTab, setActiveTab] = useState<'telemetry' | 'predictions' | 'analytics'>('telemetry');
    const [isLive, setIsLive] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (raceId) {
            fetchRaceData(raceId);
        }
    }, [raceId]);

    async function fetchRaceData(meetingKey: string) {
        try {
            // Fetch race info
            const raceResponse = await fetch(`https://api.openf1.org/v1/meetings?meeting_key=${meetingKey}`);
            const raceData = await raceResponse.json();

            if (raceData.length > 0) {
                setRaceInfo(raceData[0]);
            }

            // Fetch sessions for this race
            const sessionsResponse = await fetch(`https://api.openf1.org/v1/sessions?meeting_key=${meetingKey}`);
            const sessionsData = await sessionsResponse.json();

            // Sort sessions by date
            const sortedSessions = sessionsData.sort((a: Session, b: Session) =>
                new Date(a.date_start).getTime() - new Date(b.date_start).getTime()
            );

            setSessions(sortedSessions);

            // Check if any session is currently live
            const now = Date.now();
            const liveSession = sortedSessions.find((s: Session) => {
                const start = new Date(s.date_start).getTime();
                const end = new Date(s.date_end).getTime();
                return now >= start && now <= end;
            });

            setIsLive(!!liveSession);
        } catch (error) {
            console.error('Failed to fetch race data:', error);
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

    if (!raceInfo) {
        return (
            <div className="error-screen">
                <p>Race not found</p>
                <button onClick={() => navigate('/')}>Back to Home</button>
            </div>
        );
    }

    const raceDate = new Date(raceInfo.date_start);
    const isPast = raceDate < new Date();

    return (
        <div className="race-detail-page">
            {/* Header */}
            <header className="race-header">
                <button className="back-button" onClick={() => navigate('/')}>
                    <ArrowLeft size={20} />
                    Back to Calendar
                </button>

                <div className="race-header-content">
                    <div className="race-status-badge">
                        {isLive ? (
                            <>
                                <span className="live-dot"></span>
                                LIVE NOW
                            </>
                        ) : isPast ? (
                            'COMPLETED'
                        ) : (
                            'UPCOMING'
                        )}
                    </div>

                    <h1 className="race-header-title">{raceInfo.meeting_name}</h1>

                    <div className="race-header-meta">
                        <div className="meta-item">
                            <MapPin size={18} />
                            <span>{raceInfo.circuit_short_name}, {raceInfo.location}</span>
                        </div>
                        <div className="meta-item">
                            <Calendar size={18} />
                            <span>{formatDate(raceDate)}</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Sessions Timeline */}
            <section className="sessions-section">
                <h2>Weekend Schedule</h2>
                <div className="sessions-timeline">
                    {sessions.map((session) => {
                        const sessionStart = new Date(session.date_start);
                        const sessionEnd = new Date(session.date_end);
                        const now = Date.now();
                        const isSessionLive = now >= sessionStart.getTime() && now <= sessionEnd.getTime();
                        const isSessionPast = now > sessionEnd.getTime();

                        return (
                            <div
                                key={session.session_key}
                                className={`session-card ${isSessionLive ? 'live' : ''} ${isSessionPast ? 'past' : ''}`}
                            >
                                {isSessionLive && <span className="session-live-badge">🔴 LIVE</span>}

                                <div className="session-type">{session.session_name}</div>
                                <div className="session-time">
                                    <Clock size={14} />
                                    {formatTime(sessionStart)} - {formatTime(sessionEnd)}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Main Content Tabs */}
            <section className="race-content">
                <div className="content-tabs">
                    <button
                        className={`tab ${activeTab === 'telemetry' ? 'active' : ''}`}
                        onClick={() => setActiveTab('telemetry')}
                    >
                        <Activity size={20} />
                        Live Telemetry
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
                    {/* Driver Selector */}
                    <div className="driver-selector">
                        <label>Select Driver:</label>
                        <select
                            value={selectedDriver}
                            onChange={(e) => setSelectedDriver(e.target.value)}
                        >
                            <option value="VER">Max Verstappen (VER)</option>
                            <option value="HAM">Lewis Hamilton (HAM)</option>
                            <option value="LEC">Charles Leclerc (LEC)</option>
                            <option value="NOR">Lando Norris (NOR)</option>
                            <option value="SAI">Carlos Sainz (SAI)</option>
                            <option value="PER">Sergio Perez (PER)</option>
                            <option value="RUS">George Russell (RUS)</option>
                            <option value="ALO">Fernando Alonso (ALO)</option>
                            <option value="PIA">Oscar Piastri (PIA)</option>
                            <option value="OCO">Esteban Ocon (OCO)</option>
                        </select>

                        <label className="live-toggle">
                            <input
                                type="checkbox"
                                checked={isLive}
                                onChange={(e) => setIsLive(e.target.checked)}
                            />
                            <span>Live Mode</span>
                        </label>
                    </div>

                    {/* Tab Content */}
                    {activeTab === 'telemetry' && (
                        <div className="tab-content">
                            <LiveTelemetry driver={selectedDriver} isLive={isLive} />
                        </div>
                    )}

                    {activeTab === 'predictions' && (
                        <div className="tab-content">
                            <PredictionCards driver={selectedDriver} isLive={isLive} />
                        </div>
                    )}

                    {activeTab === 'analytics' && (
                        <div className="tab-content">
                            <TelemetryCharts driver={selectedDriver} isLive={isLive} />
                            <div style={{ marginTop: '2rem' }}>
                                <h3 style={{ marginBottom: '1rem' }}>Driver Comparison</h3>
                                <DriverComparison isLive={isLive} />
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

function formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
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
