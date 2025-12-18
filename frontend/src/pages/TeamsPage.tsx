import './TeamsPage.css';

interface Team {
    name: string;
    fullName: string;
    color: string;
    drivers: string[];
}

const teams2025: Team[] = [
    {
        name: 'McLaren',
        fullName: 'McLaren F1 Team',
        color: 'FF8000',
        drivers: ['Oscar PIASTRI', 'Lando NORRIS']
    },
    {
        name: 'Mercedes',
        fullName: 'Mercedes-AMG Petronas F1 Team',
        color: '27F4D2',
        drivers: ['George RUSSELL', 'Kimi ANTONELLI']
    },
    {
        name: 'Red Bull Racing',
        fullName: 'Oracle Red Bull Racing',
        color: '3671C6',
        drivers: ['Max VERSTAPPEN', 'Yuki TSUNODA']
    },
    {
        name: 'Ferrari',
        fullName: 'Scuderia Ferrari',
        color: 'E8002D',
        drivers: ['Charles LECLERC', 'Lewis HAMILTON']
    },
    {
        name: 'Williams',
        fullName: 'Williams Racing',
        color: '64C4FF',
        drivers: ['Alexander ALBON', 'Carlos SAINZ']
    },
    {
        name: 'Racing Bulls',
        fullName: 'Visa Cash App RB F1 Team',
        color: '6692FF',
        drivers: ['Liam LAWSON', 'Isack HADJAR']
    },
    {
        name: 'Aston Martin',
        fullName: 'Aston Martin Aramco F1 Team',
        color: '229971',
        drivers: ['Lance STROLL', 'Fernando ALONSO']
    },
    {
        name: 'Haas F1 Team',
        fullName: 'MoneyGram Haas F1 Team',
        color: 'B6BABD',
        drivers: ['Esteban OCON', 'Oliver BEARMAN']
    },
    {
        name: 'Kick Sauber',
        fullName: 'Stake F1 Team Kick Sauber',
        color: '52E252',
        drivers: ['Nico HULKENBERG', 'Gabriel BORTOLETO']
    },
    {
        name: 'Alpine',
        fullName: 'BWT Alpine F1 Team',
        color: 'FF87BC',
        drivers: ['Pierre GASLY', 'Franco COLAPINTO']
    }
];

export default function TeamsPage() {
    return (
        <div className="teams-page">
            <div className="page-header">
                <h1>F1 TEAMS 2025</h1>
                <p className="page-subtitle">Find the current Formula 1 teams for the 2025 season</p>
            </div>

            <div className="teams-grid">
                {teams2025.map((team) => (
                    <div
                        key={team.name}
                        className="team-card"
                        style={{ backgroundColor: `#${team.color}` }}
                    >
                        <div className="team-header">
                            <h2 className="team-name">{team.name}</h2>
                        </div>

                        <div className="team-drivers">
                            {team.drivers.map((driver, idx) => (
                                <div key={idx} className="team-driver">
                                    <span className="driver-icon">👤</span>
                                    <span className="driver-name">{driver}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
