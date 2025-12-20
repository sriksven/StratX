export interface LapRecord {
    time: string;
    driver: string;
    year: string;
}

export interface RaceEvent {
    round: number;
    country: string;
    location: string;
    circuit: string;
    raceName: string;
    date: string;
    circuitImage?: string;
    circuitLength?: string;
    laps?: number;
    raceDistance?: string;
    lapRecord?: LapRecord;
}

const getTrackImage = (location: string) => {
    // Clean location name for URL (lowercase, remove spaces/hyphens)
    // Pattern: https://media.formula1.com/image/upload/c_fit,h_704/q_auto/v1740000000/common/f1/2026/track/2026track[LOCATION]detailed.webp
    // Exceptions: Some might need manual mapping if simple cleaning doesn't work.
    const cleanLoc = location.toLowerCase().replace(/[\s-]/g, '');
    return `https://media.formula1.com/image/upload/c_fit,h_704/q_auto/v1740000000/common/f1/2026/track/2026track${cleanLoc}detailed.webp`;
}

export const RACES_2026: RaceEvent[] = [
    {
        round: 1, country: 'Australia', location: 'Melbourne', circuit: 'Albert Park Circuit', raceName: 'Australian Grand Prix', date: '2026-03-15',
        circuitImage: getTrackImage('Melbourne'),
        circuitLength: '5.278 km',
        laps: 58,
        raceDistance: '306.124 km',
        lapRecord: { time: '1:19.813', driver: 'Charles Leclerc', year: '2024' }
    },
    {
        round: 2, country: 'China', location: 'Shanghai', circuit: 'Shanghai International Circuit', raceName: 'Chinese Grand Prix', date: '2026-03-22',
        circuitImage: getTrackImage('Shanghai'),
        circuitLength: '5.451 km',
        laps: 56,
        raceDistance: '305.066 km',
        lapRecord: { time: '1:32.238', driver: 'Michael Schumacher', year: '2004' }
    },
    { round: 3, country: 'Japan', location: 'Suzuka', circuit: 'Suzuka Circuit', raceName: 'Japanese Grand Prix', date: '2026-04-05', circuitImage: getTrackImage('Suzuka') },
    { round: 4, country: 'Bahrain', location: 'Sakhir', circuit: 'Bahrain International Circuit', raceName: 'Bahrain Grand Prix', date: '2026-04-12', circuitImage: getTrackImage('Sakhir') },
    { round: 5, country: 'Saudi Arabia', location: 'Jeddah', circuit: 'Jeddah Corniche Circuit', raceName: 'Saudi Arabian Grand Prix', date: '2026-04-19', circuitImage: getTrackImage('Jeddah') },
    { round: 6, country: 'Italy', location: 'Imola', circuit: 'Autodromo Enzo e Dino Ferrari', raceName: 'Emilia Romagna Grand Prix', date: '2026-05-03', circuitImage: getTrackImage('Imola') },
    { round: 7, country: 'Monaco', location: 'Monte Carlo', circuit: 'Circuit de Monaco', raceName: 'Monaco Grand Prix', date: '2026-05-24', circuitImage: getTrackImage('Monte Carlo') },
    { round: 8, country: 'Spain', location: 'Barcelona', circuit: 'Circuit de Barcelona-Catalunya', raceName: 'Spanish Grand Prix', date: '2026-05-31', circuitImage: getTrackImage('Barcelona') },
    { round: 9, country: 'Canada', location: 'Montreal', circuit: 'Circuit Gilles Villeneuve', raceName: 'Canadian Grand Prix', date: '2026-06-14', circuitImage: getTrackImage('Montreal') },
    { round: 10, country: 'Austria', location: 'Spielberg', circuit: 'Red Bull Ring', raceName: 'Austrian Grand Prix', date: '2026-06-28', circuitImage: getTrackImage('Spielberg') },
    { round: 11, country: 'Great Britain', location: 'Silverstone', circuit: 'Silverstone Circuit', raceName: 'British Grand Prix', date: '2026-07-05', circuitImage: getTrackImage('Silverstone') },
    { round: 12, country: 'Belgium', location: 'Spa-Francorchamps', circuit: 'Circuit de Spa-Francorchamps', raceName: 'Belgian Grand Prix', date: '2026-07-26', circuitImage: getTrackImage('Spa-Francorchamps') },
    { round: 13, country: 'Hungary', location: 'Budapest', circuit: 'Hungaroring', raceName: 'Hungarian Grand Prix', date: '2026-08-02', circuitImage: getTrackImage('Budapest') },
    { round: 14, country: 'Netherlands', location: 'Zandvoort', circuit: 'Circuit Zandvoort', raceName: 'Dutch Grand Prix', date: '2026-08-30', circuitImage: getTrackImage('Zandvoort') },
    { round: 15, country: 'Italy', location: 'Monza', circuit: 'Autodromo Nazionale di Monza', raceName: 'Italian Grand Prix', date: '2026-09-06', circuitImage: getTrackImage('Monza') },
    { round: 16, country: 'Azerbaijan', location: 'Baku', circuit: 'Baku City Circuit', raceName: 'Azerbaijan Grand Prix', date: '2026-09-20', circuitImage: getTrackImage('Baku') },
    { round: 17, country: 'Singapore', location: 'Marina Bay', circuit: 'Marina Bay Street Circuit', raceName: 'Singapore Grand Prix', date: '2026-10-04', circuitImage: getTrackImage('Marina Bay') },
    { round: 18, country: 'USA', location: 'Austin', circuit: 'Circuit of the Americas', raceName: 'United States Grand Prix', date: '2026-10-18', circuitImage: getTrackImage('Austin') },
    { round: 19, country: 'Mexico', location: 'Mexico City', circuit: 'Autódromo Hermanos Rodríguez', raceName: 'Mexico City Grand Prix', date: '2026-10-25', circuitImage: getTrackImage('Mexico City') },
    { round: 20, country: 'Brazil', location: 'São Paulo', circuit: 'Autódromo José Carlos Pace', raceName: 'São Paulo Grand Prix', date: '2026-11-08', circuitImage: getTrackImage('Sao Paulo') },
    { round: 21, country: 'USA', location: 'Las Vegas', circuit: 'Las Vegas Street Circuit', raceName: 'Las Vegas Grand Prix', date: '2026-11-21', circuitImage: getTrackImage('Las Vegas') },
    { round: 22, country: 'Qatar', location: 'Lusail', circuit: 'Lusail International Circuit', raceName: 'Qatar Grand Prix', date: '2026-11-29', circuitImage: getTrackImage('Lusail') },
    { round: 23, country: 'UAE', location: 'Abu Dhabi', circuit: 'Yas Marina Circuit', raceName: 'Abu Dhabi Grand Prix', date: '2026-12-06', circuitImage: getTrackImage('Abu Dhabi') }
];
