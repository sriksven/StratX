import './CircuitsPage.css';

interface Circuit {
    name: string;
    country: string;
}

const allF1Circuits: Circuit[] = [
    { name: 'Adelaide Street Circuit', country: 'Australia' },
    { name: 'Ain Diab Circuit', country: 'Morocco' },
    { name: 'Aintree Circuit', country: 'United Kingdom' },
    { name: 'Albert Park Circuit', country: 'Australia' },
    { name: 'Autodromo Enzo e Dino Ferrari', country: 'Italy' },
    { name: 'Autodromo Hermanos Rodriguez', country: 'Mexico' },
    { name: 'Autodromo Jose Carlos Pace', country: 'Brazil' },
    { name: 'Autodromo Nazionale di Monza', country: 'Italy' },
    { name: 'Bahrain International Circuit', country: 'Bahrain' },
    { name: 'Baku City Circuit', country: 'Azerbaijan' },
    { name: 'Brands Hatch', country: 'United Kingdom' },
    { name: 'Buddh International Circuit', country: 'India' },
    { name: 'Circuit de Barcelona-Catalunya', country: 'Spain' },
    { name: 'Circuit de Monaco', country: 'Monaco' },
    { name: 'Circuit de Nevers Magny-Cours', country: 'France' },
    { name: 'Circuit de Spa-Francorchamps', country: 'Belgium' },
    { name: 'Circuit Gilles Villeneuve', country: 'Canada' },
    { name: 'Circuit of the Americas', country: 'United States' },
    { name: 'Circuit Paul Ricard', country: 'France' },
    { name: 'Circuit Zandvoort', country: 'Netherlands' },
    { name: 'Circuito de Jerez', country: 'Spain' },
    { name: 'Donington Park', country: 'United Kingdom' },
    { name: 'Fuji Speedway', country: 'Japan' },
    { name: 'Hockenheimring', country: 'Germany' },
    { name: 'Hungaroring', country: 'Hungary' },
    { name: 'Indianapolis Motor Speedway', country: 'United States' },
    { name: 'Istanbul Park', country: 'Turkey' },
    { name: 'Jeddah Corniche Circuit', country: 'Saudi Arabia' },
    { name: 'Korea International Circuit', country: 'South Korea' },
    { name: 'Las Vegas Street Circuit', country: 'United States' },
    { name: 'Losail International Circuit', country: 'Qatar' },
    { name: 'Marina Bay Street Circuit', country: 'Singapore' },
    { name: 'Miami International Autodrome', country: 'United States' },
    { name: 'Nürburgring', country: 'Germany' },
    { name: 'Österreichring / A1-Ring / Red Bull Ring', country: 'Austria' },
    { name: 'Pescara Circuit', country: 'Italy' },
    { name: 'Phoenix Street Circuit', country: 'United States' },
    { name: 'Reims-Gueux', country: 'France' },
    { name: 'Rouen-Les-Essarts', country: 'France' },
    { name: 'Sepang International Circuit', country: 'Malaysia' },
    { name: 'Shanghai International Circuit', country: 'China' },
    { name: 'Silverstone Circuit', country: 'United Kingdom' },
    { name: 'Sochi Autodrom', country: 'Russia' },
    { name: 'Suzuka Circuit', country: 'Japan' },
    { name: 'Valencia Street Circuit', country: 'Spain' },
    { name: 'Watkins Glen', country: 'United States' },
    { name: 'Yas Marina Circuit', country: 'United Arab Emirates' },
    { name: 'Zolder Circuit', country: 'Belgium' },
].sort((a, b) => a.name.localeCompare(b.name));

export default function CircuitsPage() {
    return (
        <div className="circuits-page">
            <div className="page-header">
                <h1>F1 CIRCUITS</h1>
                <p className="page-subtitle">All Formula 1 circuits throughout history</p>
            </div>

            <div className="circuits-grid">
                {allF1Circuits.map((circuit, index) => (
                    <div key={index} className="circuit-card">
                        <div className="circuit-name">{circuit.name}</div>
                        <div className="circuit-country">{circuit.country}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
