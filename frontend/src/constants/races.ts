export interface RaceEvent {
    round: number;
    country: string;
    location: string;
    circuit: string;
    raceName: string;
    date: string;
}

export const RACES_2026: RaceEvent[] = [
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
