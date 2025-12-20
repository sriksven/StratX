import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import './HomePage.css';
import f1CarBg from '../assets/f1-car-bg.png';
import { RACES_2026 } from '../constants/races';
import type { RaceEvent } from '../constants/races';

const featureDetails = {
    regulations: {
        title: 'New Regulations',
        icon: '🏛️',
        subtitle: 'Revolutionary technical changes',
        details: [
            'Smaller, lighter cars - 30kg weight reduction to 768kg',
            'Reduced dimensions: 200mm shorter wheelbase, 100mm narrower cars',
            'Active aerodynamics with movable front and rear wings',
            'Simplified front wing design for better racing',
            'Mandatory sustainable materials in chassis construction'
        ]
    },
    power: {
        title: 'Sustainable Power',
        icon: '⚡',
        subtitle: '100% sustainable fuels',
        details: [
            '100% sustainable fuels - fully carbon-neutral',
            'Increased electrical power: 350kW (up from 120kW)',
            'Power unit split: 50% combustion, 50% electrical',
            'Removal of MGU-H for cost reduction',
            'Enhanced energy recovery systems',
            'Target: 1000+ horsepower with zero carbon footprint'
        ]
    },
    aero: {
        title: 'Advanced Aerodynamics',
        icon: '🔧',
        subtitle: 'Next-generation car design',
        details: [
            'Active aerodynamics - adjustable wings for overtaking',
            'Reduced downforce for closer racing',
            'Improved ground effect with stricter regulations',
            'Simplified bodywork to reduce costs',
            'Better wheel wake management',
            'Enhanced safety structures and crash testing'
        ]
    }
};

function getNextRace(races: RaceEvent[]): RaceEvent {
    const now = new Date();
    return races.find(race => {
        // Create a date object for the race date at 23:59:59 (End of Day)
        // detailed race time should arguably be used if available, but for now date-based is safer for "whole weekend" logic.
        const raceDate = new Date(race.date);
        const raceEnd = new Date(raceDate.getFullYear(), raceDate.getMonth(), raceDate.getDate(), 23, 59, 59);
        return raceEnd > now;
    }) || races[0];
}

function formatDateLong(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function getDaysUntilRace(dateString: string): number {
    const now = new Date();
    const raceDate = new Date(dateString);
    const diffTime = raceDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

export default function HomePage() {
    const nextRace = getNextRace(RACES_2026);
    const daysUntil = getDaysUntilRace(nextRace.date);
    const [expandedCard, setExpandedCard] = useState<string | null>(null);

    const toggleCard = (cardId: string) => {
        setExpandedCard(expandedCard === cardId ? null : cardId);
    };

    return (
        <div className="homepage-2026" style={{
            backgroundImage: `url(${f1CarBg})`,
            backgroundPosition: 'center 20%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '120%'
        }}>
            <div className="coming-soon-container">
                <div className="year-display">2026</div>
                <h1 className="coming-soon-title">COMING SOON</h1>
                <p className="coming-soon-subtitle">
                    The future of Formula 1 is on its way
                </p>

                {/* Next Race Hero */}
                <Link to={`/race/${nextRace.round}`} className="next-race-hero-home">
                    <div className="hero-badge">NEXT RACE</div>
                    <h2 className="hero-race-title">{nextRace.raceName}</h2>
                    <div className="hero-race-details">
                        <div className="hero-detail">
                            <MapPin size={18} />
                            <span>{nextRace.circuit}, {nextRace.location}</span>
                        </div>
                        <div className="hero-detail">
                            <Calendar size={18} />
                            <span>{formatDateLong(nextRace.date)}</span>
                        </div>
                        {daysUntil > 0 && (
                            <div className="hero-detail countdown">
                                <Clock size={18} />
                                <span>{daysUntil} days until race</span>
                            </div>
                        )}
                    </div>
                    <div className="hero-cta">View Race Central →</div>
                </Link>

                <div className="feature-grid">
                    <div
                        className={`feature-item ${expandedCard === 'regulations' ? 'expanded' : ''}`}
                        onClick={() => toggleCard('regulations')}
                    >
                        <div className="feature-icon">{featureDetails.regulations.icon}</div>
                        <h3>{featureDetails.regulations.title}</h3>
                        <p>{featureDetails.regulations.subtitle}</p>
                        {expandedCard === 'regulations' ? (
                            <ChevronUp className="expand-icon" size={20} />
                        ) : (
                            <ChevronDown className="expand-icon" size={20} />
                        )}
                        {expandedCard === 'regulations' && (
                            <div className="feature-details">
                                <ul>
                                    {featureDetails.regulations.details.map((detail, idx) => (
                                        <li key={idx}>{detail}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div
                        className={`feature-item ${expandedCard === 'power' ? 'expanded' : ''}`}
                        onClick={() => toggleCard('power')}
                    >
                        <div className="feature-icon">{featureDetails.power.icon}</div>
                        <h3>{featureDetails.power.title}</h3>
                        <p>{featureDetails.power.subtitle}</p>
                        {expandedCard === 'power' ? (
                            <ChevronUp className="expand-icon" size={20} />
                        ) : (
                            <ChevronDown className="expand-icon" size={20} />
                        )}
                        {expandedCard === 'power' && (
                            <div className="feature-details">
                                <ul>
                                    {featureDetails.power.details.map((detail, idx) => (
                                        <li key={idx}>{detail}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div
                        className={`feature-item ${expandedCard === 'aero' ? 'expanded' : ''}`}
                        onClick={() => toggleCard('aero')}
                    >
                        <div className="feature-icon">{featureDetails.aero.icon}</div>
                        <h3>{featureDetails.aero.title}</h3>
                        <p>{featureDetails.aero.subtitle}</p>
                        {expandedCard === 'aero' ? (
                            <ChevronUp className="expand-icon" size={20} />
                        ) : (
                            <ChevronDown className="expand-icon" size={20} />
                        )}
                        {expandedCard === 'aero' && (
                            <div className="feature-details">
                                <ul>
                                    {featureDetails.aero.details.map((detail, idx) => (
                                        <li key={idx}>{detail}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {/* Link to News for Full Details */}
                <div className="news-cta">
                    <h3>Want to know more about 2026?</h3>
                    <Link to="/news" className="news-btn">
                        Read Full Article on 2026 Rules →
                    </Link>
                </div>
            </div>
        </div>
    );
}
