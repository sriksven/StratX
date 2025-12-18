import './TeamsPage.css';

interface Team {
    name: string;
    fullName: string;
    base: string;
    teamChief: string;
    chassis: string;
    powerUnit: string;
    color: string;
    drivers: string[];
}

const teams2025: Team[] = [
    {
        name: 'Red Bull Racing',
        fullName: 'Oracle Red Bull Racing',
        base: 'Milton Keynes, United Kingdom',
        teamChief: 'Christian Horner',
        chassis: 'RB21',
        powerUnit: 'Red Bull Powertrains',
        color: '3671C6',
        drivers: ['Max Verstappen', 'Sergio Perez']
    },
    {
        name: 'Mercedes',
        fullName: 'Mercedes-AMG Petronas F1 Team',
        base: 'Brackley, United Kingdom',
        teamChief: 'Toto Wolff',
        chassis: 'W16',
        powerUnit: 'Mercedes',
        color: '27F4D2',
        drivers: ['Lewis Hamilton', 'George Russell']
    },
    {
        name: 'Ferrari',
        fullName: 'Scuderia Ferrari',
        base: 'Maranello, Italy',
        teamChief: 'Frédéric Vasseur',
        chassis: 'SF-25',
        powerUnit: 'Ferrari',
        color: 'E8002D',
        drivers: ['Charles Leclerc', 'Carlos Sainz']
    },
    {
        name: 'McLaren',
        fullName: 'McLaren F1 Team',
        base: 'Woking, United Kingdom',
        teamChief: 'Andrea Stella',
        chassis: 'MCL39',
        powerUnit: 'Mercedes',
        color: 'FF8000',
        drivers: ['Lando Norris', 'Oscar Piastri']
    },
    {
        name: 'Aston Martin',
        fullName: 'Aston Martin Aramco F1 Team',
        base: 'Silverstone, United Kingdom',
        teamChief: 'Mike Krack',
        chassis: 'AMR25',
        powerUnit: 'Mercedes',
        color: '229971',
        drivers: ['Fernando Alonso', 'Lance Stroll']
    },
    {
        name: 'Alpine',
        fullName: 'BWT Alpine F1 Team',
        base: 'Enstone, United Kingdom',
        teamChief: 'Oliver Oakes',
        chassis: 'A525',
        powerUnit: 'Renault',
        color: 'FF87BC',
        drivers: ['Pierre Gasly', 'Jack Doohan']
    },
    {
        name: 'Williams',
        fullName: 'Williams Racing',
        base: 'Grove, United Kingdom',
        teamChief: 'James Vowles',
        chassis: 'FW47',
        powerUnit: 'Mercedes',
        color: '64C4FF',
        drivers: ['Alex Albon', 'Carlos Sainz']
    },
    {
        name: 'RB',
        fullName: 'Visa Cash App RB F1 Team',
        base: 'Faenza, Italy',
        teamChief: 'Laurent Mekies',
        chassis: 'VCARB 02',
        powerUnit: 'Red Bull Powertrains',
        color: '6692FF',
        drivers: ['Yuki Tsunoda', 'Liam Lawson']
    },
    {
        name: 'Kick Sauber',
        fullName: 'Stake F1 Team Kick Sauber',
        base: 'Hinwil, Switzerland',
        teamChief: 'Alessandro Alunni Bravi',
        chassis: 'C45',
        powerUnit: 'Ferrari',
        color: '52E252',
        drivers: ['Nico Hulkenberg', 'Gabriel Bortoleto']
    },
    {
        name: 'Haas',
        fullName: 'MoneyGram Haas F1 Team',
        base: 'Kannapolis, USA',
        teamChief: 'Ayao Komatsu',
        chassis: 'VF-25',
        powerUnit: 'Ferrari',
        color: 'B6BABD',
        drivers: ['Oliver Bearman', 'Esteban Ocon']
    }
];

export default function TeamsPage() {
    return (
        <div className="teams-page">
            <div className="page-header">
                <h1>2025 F1 TEAMS</h1>
                <p className="page-subtitle">The 10 teams competing in the 2025 Formula 1 World Championship</p>
            </div>

            <div className="teams-grid">
                {teams2025.map((team) => (
                    <div
                        key={team.name}
                        className="team-card"
                        style={{ borderTopColor: `#${team.color}` }}
                    >
                        <div className="team-header" style={{ background: `linear-gradient(135deg, #${team.color}22 0%, transparent 100%)` }}>
                            <div className="team-color-bar" style={{ backgroundColor: `#${team.color}` }}></div>
                            <h2 className="team-name">{team.name}</h2>
                            <p className="team-full-name">{team.fullName}</p>
                        </div>

                        <div className="team-details">
                            <div className="detail-row">
                                <span className="detail-label">Base</span>
                                <span className="detail-value">{team.base}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Team Chief</span>
                                <span className="detail-value">{team.teamChief}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Chassis</span>
                                <span className="detail-value">{team.chassis}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Power Unit</span>
                                <span className="detail-value">{team.powerUnit}</span>
                            </div>
                        </div>

                        <div className="team-drivers">
                            <div className="drivers-label">Drivers</div>
                            {team.drivers.map((driver, idx) => (
                                <div key={idx} className="driver-name">
                                    <span className="driver-bullet" style={{ backgroundColor: `#${team.color}` }}></span>
                                    {driver}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
