import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import './HomePage.css';
import f1CarBg from '../assets/f1-car-bg.png';

interface RaceEvent {
    round: number;
    country: string;
    location: string;
    circuit: string;
    raceName: string;
    date: string;
}

const races2026: RaceEvent[] = [
    { round: 1, country: 'Australia', location: 'Melbourne', circuit: 'Albert Park Circuit', raceName: 'Australian Grand Prix', date: '2026-03-15' },
    { round: 2, country: 'China', location: 'Shanghai', circuit: 'Shanghai International Circuit', raceName: 'Chinese Grand Prix', date: '2026-03-22' },
    { round: 3, country: 'Japan', location: 'Suzuka', circuit: 'Suzuka Circuit', raceName: 'Japanese Grand Prix', date: '2026-04-05' },
    { round: 4, country: 'Bahrain', location: 'Sakhir', circuit: 'Bahrain International Circuit', raceName: 'Bahrain Grand Prix', date: '2026-04-12' },
    { round: 5, country: 'Saudi Arabia', location: 'Jeddah', circuit: 'Jeddah Corniche Circuit', raceName: 'Saudi Arabian Grand Prix', date: '2026-04-19' },
    { round: 6, country: 'Italy', location: 'Imola', circuit: 'Autodromo Enzo e Dino Ferrari', raceName: 'Emilia Romagna Grand Prix', date: '2026-05-03' },
    { round: 7, country: 'Monaco', location: 'Monte Carlo', circuit: 'Circuit de Monaco', raceName: 'Monaco Grand Prix', date: '2026-05-24' },
    { round: 8, country: 'Spain', location: 'Barcelona', circuit: 'Circuit de Barcelona-Catalunya', raceName: 'Spanish Grand Prix', date: '2026-05-31' },
    { round: 9, country: 'Canada', location: 'Montreal', circuit: 'Circuit Gilles Villeneuve', raceName: 'Canadian Grand Prix', date: '2026-06-14' },
    { round: 10, country: 'Austria', location: 'Spielberg', circuit: 'Red Bull Ring', raceName: 'Austrian Grand Prix', date: '2026-06-28' },
    { round: 11, country: 'Great Britain', location: 'Silverstone', circuit: 'Silverstone Circuit', raceName: 'British Grand Prix', date: '2026-07-05' },
    { round: 12, country: 'Belgium', location: 'Spa-Francorchamps', circuit: 'Circuit de Spa-Francorchamps', raceName: 'Belgian Grand Prix', date: '2026-07-26' },
    { round: 13, country: 'Hungary', location: 'Budapest', circuit: 'Hungaroring', raceName: 'Hungarian Grand Prix', date: '2026-08-02' },
    { round: 14, country: 'Netherlands', location: 'Zandvoort', circuit: 'Circuit Zandvoort', raceName: 'Dutch Grand Prix', date: '2026-08-30' },
    { round: 15, country: 'Italy', location: 'Monza', circuit: 'Autodromo Nazionale di Monza', raceName: 'Italian Grand Prix', date: '2026-09-06' },
    { round: 16, country: 'Azerbaijan', location: 'Baku', circuit: 'Baku City Circuit', raceName: 'Azerbaijan Grand Prix', date: '2026-09-20' },
    { round: 17, country: 'Singapore', location: 'Marina Bay', circuit: 'Marina Bay Street Circuit', raceName: 'Singapore Grand Prix', date: '2026-10-04' },
    { round: 18, country: 'USA', location: 'Austin', circuit: 'Circuit of the Americas', raceName: 'United States Grand Prix', date: '2026-10-18' },
    { round: 19, country: 'Mexico', location: 'Mexico City', circuit: 'Autódromo Hermanos Rodríguez', raceName: 'Mexico City Grand Prix', date: '2026-10-25' },
    { round: 20, country: 'Brazil', location: 'São Paulo', circuit: 'Autódromo José Carlos Pace', raceName: 'São Paulo Grand Prix', date: '2026-11-08' },
    { round: 21, country: 'USA', location: 'Las Vegas', circuit: 'Las Vegas Street Circuit', raceName: 'Las Vegas Grand Prix', date: '2026-11-21' },
    { round: 22, country: 'Qatar', location: 'Lusail', circuit: 'Lusail International Circuit', raceName: 'Qatar Grand Prix', date: '2026-11-29' },
    { round: 23, country: 'UAE', location: 'Abu Dhabi', circuit: 'Yas Marina Circuit', raceName: 'Abu Dhabi Grand Prix', date: '2026-12-06' }
];

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
    const upcomingRace = races.find(race => new Date(race.date) > now);
    return upcomingRace || races[0];
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
    const nextRace = getNextRace(races2026);
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
