import { Link, useParams } from 'react-router-dom';
import { Calendar, MapPin, Clock } from 'lucide-react';
import './SchedulePage.css';
import { RACES_2026, RACES_2025 } from '../constants/races';
import type { RaceEvent } from '../constants/races';

function getNextRace(races: RaceEvent[]): RaceEvent {
    const now = new Date();
    const upcomingRace = races.find(race => {
        const raceDate = new Date(race.date);
        const raceEnd = new Date(raceDate.getFullYear(), raceDate.getMonth(), raceDate.getDate(), 23, 59, 59);
        return raceEnd > now;
    });
    return upcomingRace || races[races.length - 1]; // Return last race if season is over
}

function formatDateLong(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
}

function getDaysUntilRace(dateString: string): number {
    const now = new Date();
    const raceDate = new Date(dateString);
    const diffTime = raceDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

export default function SchedulePage() {
    const { year } = useParams<{ year: string }>();
    const seasonYear = year ? parseInt(year) : 2026;

    // Select the correct race data based on year
    const races = seasonYear === 2025 ? RACES_2025 : RACES_2026;

    // Safety check just in case races is undefined (e.g. invalid year)
    // Default to 2026 if not found
    const displayedRaces = races || RACES_2026;
    const displayedYear = races ? seasonYear : 2026;

    const nextRace = getNextRace(displayedRaces);
    const daysUntil = getDaysUntilRace(nextRace.date);

    return (
        <div className="schedule-page">
            <div className="page-header">
                <h1>{displayedYear} RACE SCHEDULE</h1>
                <p className="page-subtitle">{displayedRaces.length} races in the {displayedYear} Formula 1 World Championship</p>
            </div>

            {/* Featured Next Race */}
            <Link to={`/race/${nextRace.round}`} style={{ textDecoration: 'none' }}>
                <div className="next-race-hero">
                    <div className="hero-label">NEXT RACE</div>
                    <h2 className="hero-race-name">{nextRace.raceName}</h2>
                    <div className="hero-details">
                        <div className="hero-detail-item">
                            <MapPin size={20} />
                            <span>{nextRace.circuit}</span>
                        </div>
                        <div className="hero-detail-item">
                            <MapPin size={20} />
                            <span>{nextRace.location}, {nextRace.country}</span>
                        </div>
                        <div className="hero-detail-item">
                            <Calendar size={20} />
                            <span>{formatDateLong(nextRace.date)}</span>
                        </div>
                        {daysUntil > 0 && (
                            <div className="hero-detail-item countdown">
                                <Clock size={20} />
                                <span>{daysUntil} days until race</span>
                            </div>
                        )}
                    </div>
                    <div className="hero-round">ROUND {nextRace.round}</div>
                </div>
            </Link>

            {/* Full Schedule Grid */}
            <div className="schedule-section-title">FULL {displayedYear} CALENDAR</div>
            <div className="schedule-grid">
                {displayedRaces.map((race) => {
                    const isPast = new Date(race.date) < new Date();
                    const isNext = race.round === nextRace.round;

                    return (
                        <Link
                            key={race.round}
                            to={`/race/${race.round}`}
                            className={`race-card ${isPast ? 'past' : ''} ${isNext ? 'next' : ''}`}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <div className="race-round-badge">
                                <div className="round-label">ROUND {race.round}</div>
                                {isNext && <div className="next-badge">NEXT</div>}
                                {!isNext && <div className="year-badge">{displayedYear}</div>}
                            </div>

                            <div className="race-details">
                                <h3 className="race-title">{race.raceName}</h3>
                                <div className="race-meta">
                                    <div className="meta-row">
                                        <MapPin size={14} />
                                        <span>{race.circuit}, {race.location}</span>
                                    </div>
                                    <div className="meta-row">
                                        <Calendar size={14} />
                                        <span>{formatDateLong(race.date)}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
