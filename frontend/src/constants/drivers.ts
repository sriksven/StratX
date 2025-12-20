// Full 2025/2026 Grid
export const DRIVERS = [
    { code: 'VER', number: 1, name: 'Max Verstappen', team: 'Red Bull Racing' },
    { code: 'NOR', number: 4, name: 'Lando Norris', team: 'McLaren' },
    { code: 'LEC', number: 16, name: 'Charles Leclerc', team: 'Ferrari' },
    { code: 'HAM', number: 44, name: 'Lewis Hamilton', team: 'Ferrari' },
    { code: 'PIA', number: 81, name: 'Oscar Piastri', team: 'McLaren' },
    { code: 'RUS', number: 63, name: 'George Russell', team: 'Mercedes' },
    { code: 'SAI', number: 55, name: 'Carlos Sainz', team: 'Williams' },
    { code: 'ALB', number: 23, name: 'Alexander Albon', team: 'Williams' },
    { code: 'ALO', number: 14, name: 'Fernando Alonso', team: 'Aston Martin' },
    { code: 'STR', number: 18, name: 'Lance Stroll', team: 'Aston Martin' },
    { code: 'GAS', number: 10, name: 'Pierre Gasly', team: 'Alpine' },
    { code: 'DOO', number: 10, name: 'Jack Doohan', team: 'Alpine' }, // 2025 Rookie
    { code: 'TSU', number: 22, name: 'Yuki Tsunoda', team: 'RB' },
    { code: 'LAW', number: 30, name: 'Liam Lawson', team: 'RB' },
    { code: 'HUL', number: 27, name: 'Nico Hulkenberg', team: 'Kick Sauber' },
    { code: 'BOR', number: 99, name: 'Gabriel Bortoleto', team: 'Kick Sauber' }, // 2025 Rookie
    { code: 'OCO', number: 31, name: 'Esteban Ocon', team: 'Haas' },
    { code: 'BEA', number: 87, name: 'Oliver Bearman', team: 'Haas' }, // 2025 Rookie
    { code: 'ANT', number: 12, name: 'Andrea Kimi Antonelli', team: 'Mercedes' }, // 2025 Rookie
    { code: 'HAD', number: 44, name: 'Isack Hadjar', team: 'Red Bull Racing' } // Potential Reserve
];

export const getDriverName = (code: string) => {
    const driver = DRIVERS.find(d => d.code === code);
    return driver ? driver.name : code;
};

export const getDriverTeam = (code: string) => {
    const driver = DRIVERS.find(d => d.code === code);
    return driver ? driver.team : '';
};
