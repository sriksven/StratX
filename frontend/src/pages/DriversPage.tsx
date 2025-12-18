import { useEffect, useState } from 'react';
import './DriversPage.css';

interface Driver {
    driver_number: number;
    name_acronym: string;
    full_name: string;
    team_name: string;
    team_colour: string;
    headshot_url: string;
    country_code: string;
}

export default function DriversPage() {
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDrivers();
    }, []);

    async function fetchDrivers() {
        try {
            const response = await fetch('https://api.openf1.org/v1/drivers?session_key=latest');
            const data = await response.json();

            const uniqueDrivers = Array.from(
                new Map(data.map((d: Driver) => [d.driver_number, d])).values()
            );

            setDrivers(uniqueDrivers as Driver[]);
        } catch (error) {
            console.error('Failed to fetch drivers:', error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    return (
        <div className="drivers-page">
            <div className="page-header">
                <h1>2025 F1 DRIVERS</h1>
                <p className="page-subtitle">Meet the drivers competing in the 2025 Formula 1 World Championship</p>
            </div>

            <div className="drivers-grid">
                {drivers.map((driver) => (
                    <div
                        key={driver.driver_number}
                        className="driver-card"
                        style={{ borderTopColor: `#${driver.team_colour}` }}
                    >
                        <div className="driver-image-container">
                            <img
                                src={driver.headshot_url || '/default-driver.png'}
                                alt={driver.full_name}
                                className="driver-image"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = '/default-driver.png';
                                }}
                            />
                            <div className="driver-number-badge" style={{ backgroundColor: `#${driver.team_colour}` }}>
                                {driver.driver_number}
                            </div>
                        </div>

                        <div className="driver-info">
                            <div className="driver-acronym">{driver.name_acronym}</div>
                            <div className="driver-full-name">{driver.full_name}</div>
                            <div className="driver-team">{driver.team_name}</div>
                            <div className="driver-country">
                                <span className="flag-icon">{getFlagEmoji(driver.country_code)}</span>
                                {driver.country_code}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function getFlagEmoji(countryCode: string): string {
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
}
