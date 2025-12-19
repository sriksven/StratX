import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './TeamsPage.css';

interface Team {
    name: string;
    fullName: string;
    color: string;
    drivers: string[];
    teamPrincipal: string;
    description?: string;
}

const teams2026: Team[] = [
    {
        name: 'McLaren',
        fullName: 'McLaren F1 Team',
        color: 'FF8000',
        drivers: ['Lando NORRIS', 'Oscar PIASTRI'],
        teamPrincipal: 'Andrea Stella',
        description: 'McLaren continues with their successful driver pairing of Lando Norris and Oscar Piastri for 2026.'
    },
    {
        name: 'Mercedes',
        fullName: 'Mercedes-AMG Petronas F1 Team',
        color: '27F4D2',
        drivers: ['George RUSSELL', 'Kimi ANTONELLI'],
        teamPrincipal: 'Toto Wolff',
        description: 'Mercedes pairs George Russell with young talent Kimi Antonelli for the 2026 season.'
    },
    {
        name: 'Red Bull Racing',
        fullName: 'Oracle Red Bull Racing',
        color: '3671C6',
        drivers: ['Max VERSTAPPEN', 'Isack HADJAR'],
        teamPrincipal: 'Laurent Mekies',
        description: 'Max Verstappen leads Red Bull Racing alongside rookie Isack Hadjar for 2026.'
    },
    {
        name: 'Ferrari',
        fullName: 'Scuderia Ferrari',
        color: 'E8002D',
        drivers: ['Charles LECLERC', 'Lewis HAMILTON'],
        teamPrincipal: 'Fred Vasseur',
        description: 'Ferrari fields an all-star lineup with Charles Leclerc and Lewis Hamilton for 2026.'
    },
    {
        name: 'Williams',
        fullName: 'Williams Racing',
        color: '64C4FF',
        drivers: ['Alex ALBON', 'Carlos SAINZ'],
        teamPrincipal: 'James Vowles',
        description: 'Williams strengthens their lineup with Alex Albon and Carlos Sainz for 2026.'
    },
    {
        name: 'Racing Bulls',
        fullName: 'Visa Cash App RB F1 Team',
        color: '6692FF',
        drivers: ['Liam LAWSON', 'Arvid LINDBLAD'],
        teamPrincipal: 'Alan Permane',
        description: 'Racing Bulls fields Liam Lawson alongside rookie Arvid Lindblad for 2026.'
    },
    {
        name: 'Aston Martin',
        fullName: 'Aston Martin Aramco F1 Team',
        color: '229971',
        drivers: ['Fernando ALONSO', 'Lance STROLL'],
        teamPrincipal: 'Adrian Newey',
        description: 'Aston Martin continues with Fernando Alonso and Lance Stroll, now led by Adrian Newey.'
    },
    {
        name: 'Haas F1 Team',
        fullName: 'MoneyGram Haas F1 Team',
        color: 'B6BABD',
        drivers: ['Esteban OCON', 'Ollie BEARMAN'],
        teamPrincipal: 'Ayao Komatsu',
        description: 'Haas brings in Esteban Ocon alongside rookie Ollie Bearman for 2026.'
    },
    {
        name: 'Audi',
        fullName: 'Audi F1 Team',
        color: '000000',
        drivers: ['Nico HULKENBERG', 'Gabriel BORTOLETO'],
        teamPrincipal: 'Jonathan Wheatley',
        description: 'Audi enters F1 with Nico Hulkenberg and rookie Gabriel Bortoleto for 2026.'
    },
    {
        name: 'Alpine',
        fullName: 'BWT Alpine F1 Team',
        color: 'FF87BC',
        drivers: ['Pierre GASLY', 'Franco COLAPINTO'],
        teamPrincipal: 'TBC',
        description: 'Alpine fields Pierre Gasly and Franco Colapinto for the 2026 season.'
    },
    {
        name: 'Cadillac',
        fullName: 'Cadillac F1 Team',
        color: '000000',
        drivers: ['Valtteri BOTTAS', 'Sergio PEREZ'],
        teamPrincipal: 'Graeme Lowdon',
        description: 'New entry Cadillac joins F1 with experienced drivers Valtteri Bottas and Sergio Perez.'
    }
];

export default function TeamsPage() {
    const [expandedTeam, setExpandedTeam] = useState<string | null>(null);

    const toggleTeam = (teamName: string) => {
        setExpandedTeam(expandedTeam === teamName ? null : teamName);
    };

    return (
        <div className="teams-page">
            <div className="page-header">
                <h1>F1 TEAMS 2026</h1>
                <p className="page-subtitle">Find the current Formula 1 teams for the 2026 season</p>
            </div>

            <div className="teams-grid">
                {teams2026.map((team) => (
                    <div
                        key={team.name}
                        className={`team-card ${expandedTeam === team.name ? 'expanded' : ''}`}
                        style={{ backgroundColor: `#${team.color}` }}
                        onClick={() => toggleTeam(team.name)}
                    >
                        <div className="team-header">
                            <h2 className="team-name">{team.name}</h2>
                            <span className="expand-icon">
                                {expandedTeam === team.name ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                            </span>
                        </div>

                        <div className="team-drivers">
                            {team.drivers.map((driver, idx) => (
                                <div key={idx} className="team-driver">
                                    <span className="driver-icon">👤</span>
                                    <span className="driver-name">{driver}</span>
                                </div>
                            ))}
                        </div>

                        {expandedTeam === team.name && (
                            <div className="team-details">
                                <div className="team-principal">
                                    <strong>Team Principal:</strong> {team.teamPrincipal}
                                </div>
                                {team.description && (
                                    <div className="team-description">
                                        {team.description}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
