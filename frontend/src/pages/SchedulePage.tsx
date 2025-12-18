import { Calendar, MapPin } from 'lucide-react';
import './SchedulePage.css';

interface RaceEvent {
    round: number;
    country: string;
    location: string;
    circuit: string;
    raceName: string;
    date: string;
}

// 2026 F1 Calendar from official F1 website
const races2026: RaceEvent[] = [
    {
        round: 1,
        country: 'Australia',
        location: 'Melbourne',
        circuit: 'Albert Park Circuit',
        raceName: 'Australian Grand Prix',
        date: 'March 15, 2026'
    },
    {
        round: 2,
        country: 'China',
        location: 'Shanghai',
        circuit: 'Shanghai International Circuit',
        raceName: 'Chinese Grand Prix',
        date: 'March 22, 2026'
    },
    {
        round: 3,
        country: 'Japan',
        location: 'Suzuka',
        circuit: 'Suzuka Circuit',
        raceName: 'Japanese Grand Prix',
        date: 'April 5, 2026'
    },
    {
        round: 4,
        country: 'Bahrain',
        location: 'Sakhir',
        circuit: 'Bahrain International Circuit',
        raceName: 'Bahrain Grand Prix',
        date: 'April 12, 2026'
    },
    {
        round: 5,
        country: 'Saudi Arabia',
        location: 'Jeddah',
        circuit: 'Jeddah Corniche Circuit',
        raceName: 'Saudi Arabian Grand Prix',
        date: 'April 19, 2026'
    },
    {
        round: 6,
        country: 'Italy',
        location: 'Imola',
        circuit: 'Autodromo Enzo e Dino Ferrari',
        raceName: 'Emilia Romagna Grand Prix',
        date: 'May 3, 2026'
    },
    {
        round: 7,
        country: 'Monaco',
        location: 'Monte Carlo',
        circuit: 'Circuit de Monaco',
        raceName: 'Monaco Grand Prix',
        date: 'May 24, 2026'
    },
    {
        round: 8,
        country: 'Spain',
        location: 'Barcelona',
        circuit: 'Circuit de Barcelona-Catalunya',
        raceName: 'Spanish Grand Prix',
        date: 'May 31, 2026'
    },
    {
        round: 9,
        country: 'Canada',
        location: 'Montreal',
        circuit: 'Circuit Gilles Villeneuve',
        raceName: 'Canadian Grand Prix',
        date: 'June 14, 2026'
    },
    {
        round: 10,
        country: 'Austria',
        location: 'Spielberg',
        circuit: 'Red Bull Ring',
        raceName: 'Austrian Grand Prix',
        date: 'June 28, 2026'
    },
    {
        round: 11,
        country: 'Great Britain',
        location: 'Silverstone',
        circuit: 'Silverstone Circuit',
        raceName: 'British Grand Prix',
        date: 'July 5, 2026'
    },
    {
        round: 12,
        country: 'Belgium',
        location: 'Spa-Francorchamps',
        circuit: 'Circuit de Spa-Francorchamps',
        raceName: 'Belgian Grand Prix',
        date: 'July 26, 2026'
    },
    {
        round: 13,
        country: 'Hungary',
        location: 'Budapest',
        circuit: 'Hungaroring',
        raceName: 'Hungarian Grand Prix',
        date: 'August 2, 2026'
    },
    {
        round: 14,
        country: 'Netherlands',
        location: 'Zandvoort',
        circuit: 'Circuit Zandvoort',
        raceName: 'Dutch Grand Prix',
        date: 'August 30, 2026'
    },
    {
        round: 15,
        country: 'Italy',
        location: 'Monza',
        circuit: 'Autodromo Nazionale di Monza',
        raceName: 'Italian Grand Prix',
        date: 'September 6, 2026'
    },
    {
        round: 16,
        country: 'Azerbaijan',
        location: 'Baku',
        circuit: 'Baku City Circuit',
        raceName: 'Azerbaijan Grand Prix',
        date: 'September 20, 2026'
    },
    {
        round: 17,
        country: 'Singapore',
        location: 'Marina Bay',
        circuit: 'Marina Bay Street Circuit',
        raceName: 'Singapore Grand Prix',
        date: 'October 4, 2026'
    },
    {
        round: 18,
        country: 'USA',
        location: 'Austin',
        circuit: 'Circuit of the Americas',
        raceName: 'United States Grand Prix',
        date: 'October 18, 2026'
    },
    {
        round: 19,
        country: 'Mexico',
        location: 'Mexico City',
        circuit: 'Autódromo Hermanos Rodríguez',
        raceName: 'Mexico City Grand Prix',
        date: 'October 25, 2026'
    },
    {
        round: 20,
        country: 'Brazil',
        location: 'São Paulo',
        circuit: 'Autódromo José Carlos Pace',
        raceName: 'São Paulo Grand Prix',
        date: 'November 8, 2026'
    },
    {
        round: 21,
        country: 'USA',
        location: 'Las Vegas',
        circuit: 'Las Vegas Street Circuit',
        raceName: 'Las Vegas Grand Prix',
        date: 'November 21, 2026'
    },
    {
        round: 22,
        country: 'Qatar',
        location: 'Lusail',
        circuit: 'Lusail International Circuit',
        raceName: 'Qatar Grand Prix',
        date: 'November 29, 2026'
    },
    {
        round: 23,
        country: 'UAE',
        location: 'Abu Dhabi',
        circuit: 'Yas Marina Circuit',
        raceName: 'Abu Dhabi Grand Prix',
        date: 'December 6, 2026'
    }
];

export default function SchedulePage() {
    return (
        <div className="schedule-page">
            <div className="page-header">
                <h1>2026 RACE SCHEDULE</h1>
                <p className="page-subtitle">{races2026.length} races in the 2026 Formula 1 World Championship</p>
            </div>

            <div className="schedule-list">
                {races2026.map((race) => (
                    <div
                        key={race.round}
                        className="schedule-item upcoming"
                    >
                        <div className="race-round">
                            <div className="round-number">ROUND {race.round}</div>
                            <div className="upcoming-badge">2026</div>
                        </div>

                        <div className="race-info">
                            <h3 className="race-name">{race.raceName}</h3>
                            <div className="race-meta">
                                <div className="meta-item">
                                    <MapPin size={16} />
                                    <span>{race.circuit}, {race.location}</span>
                                </div>
                                <div className="meta-item">
                                    <Calendar size={16} />
                                    <span>{race.date}</span>
                                </div>
                            </div>
                        </div>

                        <div className="race-arrow">→</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
