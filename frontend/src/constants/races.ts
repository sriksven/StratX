
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
    const cleanLoc = location.toLowerCase().replace(/[\s-]/g, '');
    return `https://media.formula1.com/image/upload/c_fit,h_704/q_auto/v1740000000/common/f1/2025/track/2025track${cleanLoc}detailed.webp`;
}

const CIRCUIT_STATS: Record<string, { length: string, laps: number, distance: string, record: LapRecord }> = {
    'Bahrain': { length: '5.412 km', laps: 57, distance: '308.238 km', record: { time: '1:31.447', driver: 'Pedro de la Rosa', year: '2005' } },
    'Saudi Arabia': { length: '6.174 km', laps: 50, distance: '308.450 km', record: { time: '1:30.734', driver: 'Lewis Hamilton', year: '2021' } },
    'Australia': { length: '5.278 km', laps: 58, distance: '306.124 km', record: { time: '1:19.813', driver: 'Charles Leclerc', year: '2024' } },
    'Japan': { length: '5.807 km', laps: 53, distance: '307.471 km', record: { time: '1:30.983', driver: 'Lewis Hamilton', year: '2019' } },
    'China': { length: '5.451 km', laps: 56, distance: '305.066 km', record: { time: '1:32.238', driver: 'Michael Schumacher', year: '2004' } },
    'Miami': { length: '5.412 km', laps: 57, distance: '308.326 km', record: { time: '1:29.708', driver: 'Max Verstappen', year: '2023' } },
    'Emilia Romagna': { length: '4.909 km', laps: 63, distance: '309.049 km', record: { time: '1:15.484', driver: 'Lewis Hamilton', year: '2020' } },
    'Monaco': { length: '3.337 km', laps: 78, distance: '260.286 km', record: { time: '1:12.909', driver: 'Lewis Hamilton', year: '2021' } },
    'Spain': { length: '4.657 km', laps: 66, distance: '307.236 km', record: { time: '1:16.330', driver: 'Max Verstappen', year: '2023' } },
    'Canada': { length: '4.361 km', laps: 70, distance: '305.270 km', record: { time: '1:13.078', driver: 'Valtteri Bottas', year: '2019' } },
    'Austria': { length: '4.318 km', laps: 71, distance: '306.452 km', record: { time: '1:05.619', driver: 'Carlos Sainz', year: '2020' } },
    'Great Britain': { length: '5.891 km', laps: 52, distance: '306.198 km', record: { time: '1:27.097', driver: 'Max Verstappen', year: '2020' } },
    'Belgium': { length: '7.004 km', laps: 44, distance: '308.052 km', record: { time: '1:46.286', driver: 'Valtteri Bottas', year: '2018' } },
    'Hungary': { length: '4.381 km', laps: 70, distance: '306.630 km', record: { time: '1:16.627', driver: 'Lewis Hamilton', year: '2020' } },
    'Netherlands': { length: '4.259 km', laps: 72, distance: '306.587 km', record: { time: '1:11.097', driver: 'Lewis Hamilton', year: '2021' } },
    'Italy': { length: '5.793 km', laps: 53, distance: '306.720 km', record: { time: '1:21.046', driver: 'Rubens Barrichello', year: '2004' } },
    'Azerbaijan': { length: '6.003 km', laps: 51, distance: '306.049 km', record: { time: '1:43.009', driver: 'Charles Leclerc', year: '2019' } },
    'Singapore': { length: '4.940 km', laps: 62, distance: '306.143 km', record: { time: '1:35.867', driver: 'Lewis Hamilton', year: '2023' } },
    'USA': { length: '5.513 km', laps: 56, distance: '308.405 km', record: { time: '1:36.169', driver: 'Charles Leclerc', year: '2019' } },
    'Mexico': { length: '4.304 km', laps: 71, distance: '305.354 km', record: { time: '1:17.774', driver: 'Valtteri Bottas', year: '2021' } },
    'Brazil': { length: '4.309 km', laps: 71, distance: '305.879 km', record: { time: '1:10.540', driver: 'Valtteri Bottas', year: '2018' } },
    'Las Vegas': { length: '6.201 km', laps: 50, distance: '309.958 km', record: { time: '1:35.490', driver: 'Oscar Piastri', year: '2023' } },
    'Qatar': { length: '5.419 km', laps: 57, distance: '308.611 km', record: { time: '1:24.319', driver: 'Max Verstappen', year: '2023' } },
    'Abu Dhabi': { length: '5.281 km', laps: 58, distance: '306.183 km', record: { time: '1:26.103', driver: 'Max Verstappen', year: '2021' } }
};

const commonStats = (key: string) => ({
    circuitLength: CIRCUIT_STATS[key]?.length || 'TBD',
    laps: CIRCUIT_STATS[key]?.laps || 50,
    raceDistance: CIRCUIT_STATS[key]?.distance || '300 km',
    lapRecord: CIRCUIT_STATS[key]?.record
});

export const RACES_2025: RaceEvent[] = [
    { round: 1, country: 'Australia', location: 'Melbourne', circuit: 'Albert Park Circuit', raceName: 'Australian Grand Prix', date: '2025-03-16', circuitImage: getTrackImage('Melbourne'), ...commonStats('Australia') },
    { round: 2, country: 'China', location: 'Shanghai', circuit: 'Shanghai International Circuit', raceName: 'Chinese Grand Prix', date: '2025-03-23', circuitImage: getTrackImage('Shanghai'), ...commonStats('China') },
    { round: 3, country: 'Japan', location: 'Suzuka', circuit: 'Suzuka Circuit', raceName: 'Japanese Grand Prix', date: '2025-04-06', circuitImage: getTrackImage('Suzuka'), ...commonStats('Japan') },
    { round: 4, country: 'Bahrain', location: 'Sakhir', circuit: 'Bahrain International Circuit', raceName: 'Bahrain Grand Prix', date: '2025-04-13', circuitImage: getTrackImage('Sakhir'), ...commonStats('Bahrain') },
    { round: 5, country: 'Saudi Arabia', location: 'Jeddah', circuit: 'Jeddah Corniche Circuit', raceName: 'Saudi Arabian Grand Prix', date: '2025-04-20', circuitImage: getTrackImage('Jeddah'), ...commonStats('Saudi Arabia') },
    { round: 6, country: 'USA', location: 'Miami', circuit: 'Miami International Autodrome', raceName: 'Miami Grand Prix', date: '2025-05-04', circuitImage: getTrackImage('Miami'), ...commonStats('Miami') },
    { round: 7, country: 'Italy', location: 'Imola', circuit: 'Autodromo Enzo e Dino Ferrari', raceName: 'Emilia Romagna Grand Prix', date: '2025-05-18', circuitImage: getTrackImage('Imola'), ...commonStats('Emilia Romagna') },
    { round: 8, country: 'Monaco', location: 'Monte Carlo', circuit: 'Circuit de Monaco', raceName: 'Monaco Grand Prix', date: '2025-05-25', circuitImage: getTrackImage('Monte Carlo'), ...commonStats('Monaco') },
    { round: 9, country: 'Spain', location: 'Barcelona', circuit: 'Circuit de Barcelona-Catalunya', raceName: 'Spanish Grand Prix', date: '2025-06-01', circuitImage: getTrackImage('Barcelona'), ...commonStats('Spain') },
    { round: 10, country: 'Canada', location: 'Montreal', circuit: 'Circuit Gilles Villeneuve', raceName: 'Canadian Grand Prix', date: '2025-06-15', circuitImage: getTrackImage('Montreal'), ...commonStats('Canada') },
    { round: 11, country: 'Austria', location: 'Spielberg', circuit: 'Red Bull Ring', raceName: 'Austrian Grand Prix', date: '2025-06-29', circuitImage: getTrackImage('Spielberg'), ...commonStats('Austria') },
    { round: 12, country: 'Great Britain', location: 'Silverstone', circuit: 'Silverstone Circuit', raceName: 'British Grand Prix', date: '2025-07-06', circuitImage: getTrackImage('Silverstone'), ...commonStats('Great Britain') },
    { round: 13, country: 'Belgium', location: 'Spa-Francorchamps', circuit: 'Circuit de Spa-Francorchamps', raceName: 'Belgian Grand Prix', date: '2025-07-27', circuitImage: getTrackImage('Spa-Francorchamps'), ...commonStats('Belgium') },
    { round: 14, country: 'Hungary', location: 'Budapest', circuit: 'Hungaroring', raceName: 'Hungarian Grand Prix', date: '2025-08-03', circuitImage: getTrackImage('Budapest'), ...commonStats('Hungary') },
    { round: 15, country: 'Netherlands', location: 'Zandvoort', circuit: 'Circuit Zandvoort', raceName: 'Dutch Grand Prix', date: '2025-08-31', circuitImage: getTrackImage('Zandvoort'), ...commonStats('Netherlands') },
    { round: 16, country: 'Italy', location: 'Monza', circuit: 'Autodromo Nazionale di Monza', raceName: 'Italian Grand Prix', date: '2025-09-07', circuitImage: getTrackImage('Monza'), ...commonStats('Italy') },
    { round: 17, country: 'Azerbaijan', location: 'Baku', circuit: 'Baku City Circuit', raceName: 'Azerbaijan Grand Prix', date: '2025-09-21', circuitImage: getTrackImage('Baku'), ...commonStats('Azerbaijan') },
    { round: 18, country: 'Singapore', location: 'Marina Bay', circuit: 'Marina Bay Street Circuit', raceName: 'Singapore Grand Prix', date: '2025-10-05', circuitImage: getTrackImage('Marina Bay'), ...commonStats('Singapore') },
    { round: 19, country: 'USA', location: 'Austin', circuit: 'Circuit of the Americas', raceName: 'United States Grand Prix', date: '2025-10-19', circuitImage: getTrackImage('Austin'), ...commonStats('USA') },
    { round: 20, country: 'Mexico', location: 'Mexico City', circuit: 'Autódromo Hermanos Rodríguez', raceName: 'Mexico City Grand Prix', date: '2025-10-26', circuitImage: getTrackImage('Mexico City'), ...commonStats('Mexico') },
    { round: 21, country: 'Brazil', location: 'São Paulo', circuit: 'Autódromo José Carlos Pace', raceName: 'São Paulo Grand Prix', date: '2025-11-09', circuitImage: getTrackImage('Sao Paulo'), ...commonStats('Brazil') },
    { round: 22, country: 'USA', location: 'Las Vegas', circuit: 'Las Vegas Street Circuit', raceName: 'Las Vegas Grand Prix', date: '2025-11-22', circuitImage: getTrackImage('Las Vegas'), ...commonStats('Las Vegas') },
    { round: 23, country: 'Qatar', location: 'Lusail', circuit: 'Lusail International Circuit', raceName: 'Qatar Grand Prix', date: '2025-11-30', circuitImage: getTrackImage('Lusail'), ...commonStats('Qatar') },
    { round: 24, country: 'UAE', location: 'Abu Dhabi', circuit: 'Yas Marina Circuit', raceName: 'Abu Dhabi Grand Prix', date: '2025-12-07', circuitImage: getTrackImage('Abu Dhabi'), ...commonStats('Abu Dhabi') }
];

export const RACES_2026: RaceEvent[] = [
    { round: 1, country: 'Australia', location: 'Melbourne', circuit: 'Albert Park Circuit', raceName: 'Australian Grand Prix', date: '2026-03-15', circuitImage: getTrackImage('Melbourne'), ...commonStats('Australia') },
    { round: 2, country: 'China', location: 'Shanghai', circuit: 'Shanghai International Circuit', raceName: 'Chinese Grand Prix', date: '2026-03-22', circuitImage: getTrackImage('Shanghai'), ...commonStats('China') },
    { round: 3, country: 'Japan', location: 'Suzuka', circuit: 'Suzuka Circuit', raceName: 'Japanese Grand Prix', date: '2026-04-05', circuitImage: getTrackImage('Suzuka'), ...commonStats('Japan') },
    { round: 4, country: 'Bahrain', location: 'Sakhir', circuit: 'Bahrain International Circuit', raceName: 'Bahrain Grand Prix', date: '2026-04-12', circuitImage: getTrackImage('Sakhir'), ...commonStats('Bahrain') },
    { round: 5, country: 'Saudi Arabia', location: 'Jeddah', circuit: 'Jeddah Corniche Circuit', raceName: 'Saudi Arabian Grand Prix', date: '2026-04-19', circuitImage: getTrackImage('Jeddah'), ...commonStats('Saudi Arabia') },
    { round: 6, country: 'USA', location: 'Miami', circuit: 'Miami International Autodrome', raceName: 'Miami Grand Prix', date: '2026-05-03', circuitImage: getTrackImage('Miami'), ...commonStats('Miami') },
    { round: 7, country: 'Italy', location: 'Imola', circuit: 'Autodromo Enzo e Dino Ferrari', raceName: 'Emilia Romagna Grand Prix', date: '2026-05-17', circuitImage: getTrackImage('Imola'), ...commonStats('Emilia Romagna') },
    { round: 8, country: 'Monaco', location: 'Monte Carlo', circuit: 'Circuit de Monaco', raceName: 'Monaco Grand Prix', date: '2026-05-24', circuitImage: getTrackImage('Monte Carlo'), ...commonStats('Monaco') },
    { round: 9, country: 'Spain', location: 'Barcelona', circuit: 'Circuit de Barcelona-Catalunya', raceName: 'Spanish Grand Prix', date: '2026-05-31', circuitImage: getTrackImage('Barcelona'), ...commonStats('Spain') },
    { round: 10, country: 'Canada', location: 'Montreal', circuit: 'Circuit Gilles Villeneuve', raceName: 'Canadian Grand Prix', date: '2026-06-14', circuitImage: getTrackImage('Montreal'), ...commonStats('Canada') },
    { round: 11, country: 'Austria', location: 'Spielberg', circuit: 'Red Bull Ring', raceName: 'Austrian Grand Prix', date: '2026-06-28', circuitImage: getTrackImage('Spielberg'), ...commonStats('Austria') },
    { round: 12, country: 'Great Britain', location: 'Silverstone', circuit: 'Silverstone Circuit', raceName: 'British Grand Prix', date: '2026-07-05', circuitImage: getTrackImage('Silverstone'), ...commonStats('Great Britain') },
    { round: 13, country: 'Belgium', location: 'Spa-Francorchamps', circuit: 'Circuit de Spa-Francorchamps', raceName: 'Belgian Grand Prix', date: '2026-07-26', circuitImage: getTrackImage('Spa-Francorchamps'), ...commonStats('Belgium') },
    { round: 14, country: 'Hungary', location: 'Budapest', circuit: 'Hungaroring', raceName: 'Hungarian Grand Prix', date: '2026-08-02', circuitImage: getTrackImage('Budapest'), ...commonStats('Hungary') },
    { round: 15, country: 'Netherlands', location: 'Zandvoort', circuit: 'Circuit Zandvoort', raceName: 'Dutch Grand Prix', date: '2026-08-30', circuitImage: getTrackImage('Zandvoort'), ...commonStats('Netherlands') },
    { round: 16, country: 'Italy', location: 'Monza', circuit: 'Autodromo Nazionale di Monza', raceName: 'Italian Grand Prix', date: '2026-09-06', circuitImage: getTrackImage('Monza'), ...commonStats('Italy') },
    { round: 17, country: 'Azerbaijan', location: 'Baku', circuit: 'Baku City Circuit', raceName: 'Azerbaijan Grand Prix', date: '2026-09-20', circuitImage: getTrackImage('Baku'), ...commonStats('Azerbaijan') },
    { round: 18, country: 'Singapore', location: 'Marina Bay', circuit: 'Marina Bay Street Circuit', raceName: 'Singapore Grand Prix', date: '2026-10-04', circuitImage: getTrackImage('Marina Bay'), ...commonStats('Singapore') },
    { round: 19, country: 'USA', location: 'Austin', circuit: 'Circuit of the Americas', raceName: 'United States Grand Prix', date: '2026-10-18', circuitImage: getTrackImage('Austin'), ...commonStats('USA') },
    { round: 20, country: 'Mexico', location: 'Mexico City', circuit: 'Autódromo Hermanos Rodríguez', raceName: 'Mexico City Grand Prix', date: '2026-10-25', circuitImage: getTrackImage('Mexico City'), ...commonStats('Mexico') },
    { round: 21, country: 'Brazil', location: 'São Paulo', circuit: 'Autódromo José Carlos Pace', raceName: 'São Paulo Grand Prix', date: '2026-11-08', circuitImage: getTrackImage('Sao Paulo'), ...commonStats('Brazil') },
    { round: 22, country: 'USA', location: 'Las Vegas', circuit: 'Las Vegas Street Circuit', raceName: 'Las Vegas Grand Prix', date: '2026-11-21', circuitImage: getTrackImage('Las Vegas'), ...commonStats('Las Vegas') },
    { round: 23, country: 'Qatar', location: 'Lusail', circuit: 'Lusail International Circuit', raceName: 'Qatar Grand Prix', date: '2026-11-29', circuitImage: getTrackImage('Lusail'), ...commonStats('Qatar') },
    { round: 24, country: 'UAE', location: 'Abu Dhabi', circuit: 'Yas Marina Circuit', raceName: 'Abu Dhabi Grand Prix', date: '2026-12-06', circuitImage: getTrackImage('Abu Dhabi'), ...commonStats('Abu Dhabi') }
];
