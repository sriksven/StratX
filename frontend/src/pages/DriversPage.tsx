import './DriversPage.css';

interface Driver {
    number: number;
    firstName: string;
    lastName: string;
    team: string;
    teamColor: string;
    country: string;
}

const drivers2025: Driver[] = [
    { number: 81, firstName: 'OSCAR', lastName: 'PIASTRI', team: 'MCLAREN', teamColor: 'FF8000', country: 'AUS' },
    { number: 4, firstName: 'LANDO', lastName: 'NORRIS', team: 'MCLAREN', teamColor: 'FF8000', country: 'GBR' },
    { number: 63, firstName: 'GEORGE', lastName: 'RUSSELL', team: 'MERCEDES', teamColor: '27F4D2', country: 'GBR' },
    { number: 12, firstName: 'KIMI', lastName: 'ANTONELLI', team: 'MERCEDES', teamColor: '27F4D2', country: 'ITA' },
    { number: 1, firstName: 'MAX', lastName: 'VERSTAPPEN', team: 'RED BULL RACING', teamColor: '3671C6', country: 'NED' },
    { number: 22, firstName: 'YUKI', lastName: 'TSUNODA', team: 'RED BULL RACING', teamColor: '3671C6', country: 'JPN' },
    { number: 16, firstName: 'CHARLES', lastName: 'LECLERC', team: 'FERRARI', teamColor: 'E8002D', country: 'MON' },
    { number: 44, firstName: 'LEWIS', lastName: 'HAMILTON', team: 'FERRARI', teamColor: 'E8002D', country: 'GBR' },
    { number: 23, firstName: 'ALEXANDER', lastName: 'ALBON', team: 'WILLIAMS', teamColor: '64C4FF', country: 'THA' },
    { number: 55, firstName: 'CARLOS', lastName: 'SAINZ', team: 'WILLIAMS', teamColor: '64C4FF', country: 'ESP' },
    { number: 30, firstName: 'LIAM', lastName: 'LAWSON', team: 'RACING BULLS', teamColor: '6692FF', country: 'NZL' },
    { number: 6, firstName: 'ISACK', lastName: 'HADJAR', team: 'RACING BULLS', teamColor: '6692FF', country: 'FRA' },
    { number: 18, firstName: 'LANCE', lastName: 'STROLL', team: 'ASTON MARTIN', teamColor: '229971', country: 'CAN' },
    { number: 14, firstName: 'FERNANDO', lastName: 'ALONSO', team: 'ASTON MARTIN', teamColor: '229971', country: 'ESP' },
    { number: 31, firstName: 'ESTEBAN', lastName: 'OCON', team: 'HAAS F1 TEAM', teamColor: 'B6BABD', country: 'FRA' },
    { number: 87, firstName: 'OLIVER', lastName: 'BEARMAN', team: 'HAAS F1 TEAM', teamColor: 'B6BABD', country: 'GBR' },
    { number: 27, firstName: 'NICO', lastName: 'HULKENBERG', team: 'KICK SAUBER', teamColor: '52E252', country: 'GER' },
    { number: 5, firstName: 'GABRIEL', lastName: 'BORTOLETO', team: 'KICK SAUBER', teamColor: '52E252', country: 'BRA' },
    { number: 10, firstName: 'PIERRE', lastName: 'GASLY', team: 'ALPINE', teamColor: 'FF87BC', country: 'FRA' },
    { number: 43, firstName: 'FRANCO', lastName: 'COLAPINTO', team: 'ALPINE', teamColor: 'FF87BC', country: 'ARG' },
];

export default function DriversPage() {
    return (
        <div className="drivers-page">
            <div className="page-header">
                <h1>2025 F1 DRIVERS</h1>
                <p className="page-subtitle">Find the current Formula 1 drivers for the 2025 season</p>
            </div>

            <div className="drivers-grid">
                {drivers2025.map((driver) => (
                    <div
                        key={driver.number}
                        className="driver-card"
                        style={{ borderTopColor: `#${driver.teamColor}` }}
                    >
                        <div className="driver-number" style={{ backgroundColor: `#${driver.teamColor}` }}>
                            {driver.number}
                        </div>

                        <div className="driver-info">
                            <div className="driver-name">
                                <span className="first-name">{driver.firstName}</span>
                                <span className="last-name">{driver.lastName}</span>
                            </div>
                            <div className="driver-team">{driver.team}</div>
                            <div className="driver-country">{driver.country}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
