import { useParams } from 'react-router-dom';
import './ResultsPage.css';

export default function ResultsPage() {
    const { year } = useParams<{ year?: string }>();
    const currentYear = year || '2025';

    // Mock data for 2025 results
    const results2025 = [
        { round: 1, race: 'Bahrain Grand Prix', date: 'Mar 2', winner: 'Max Verstappen', team: 'Red Bull Racing', laps: 57, time: '1:32:15.456' },
        { round: 2, race: 'Saudi Arabian Grand Prix', date: 'Mar 9', winner: 'Sergio Perez', team: 'Red Bull Racing', laps: 50, time: '1:24:19.293' },
        { round: 3, race: 'Australian Grand Prix', date: 'Mar 23', winner: 'Max Verstappen', team: 'Red Bull Racing', laps: 58, time: '1:30:58.894' },
        { round: 4, race: 'Japanese Grand Prix', date: 'Apr 6', winner: 'Max Verstappen', team: 'Red Bull Racing', laps: 53, time: '1:26:50.277' },
        { round: 5, race: 'Chinese Grand Prix', date: 'Apr 20', winner: 'Lando Norris', team: 'McLaren', laps: 56, time: '1:40:52.554' },
    ];

    return (
        <div className="results-page">
            <div className="page-header">
                <h1>{currentYear} RACE RESULTS</h1>
                <p className="page-subtitle">Complete race results from the {currentYear} Formula 1 World Championship</p>
            </div>

            <div className="results-container">
                <div className="results-table-wrapper">
                    <table className="results-table">
                        <thead>
                            <tr>
                                <th>ROUND</th>
                                <th>GRAND PRIX</th>
                                <th>DATE</th>
                                <th>WINNER</th>
                                <th>TEAM</th>
                                <th>LAPS</th>
                                <th>TIME</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results2025.map((result) => (
                                <tr key={result.round}>
                                    <td className="round-cell">{result.round}</td>
                                    <td className="race-cell">{result.race}</td>
                                    <td>{result.date}</td>
                                    <td className="winner-cell">{result.winner}</td>
                                    <td className="team-cell">{result.team}</td>
                                    <td>{result.laps}</td>
                                    <td className="time-cell">{result.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="standings-section">
                    <h2>DRIVER STANDINGS</h2>
                    <div className="standings-list">
                        <div className="standing-item">
                            <span className="position">1</span>
                            <span className="driver-name">Max Verstappen</span>
                            <span className="points">145 PTS</span>
                        </div>
                        <div className="standing-item">
                            <span className="position">2</span>
                            <span className="driver-name">Sergio Perez</span>
                            <span className="points">98 PTS</span>
                        </div>
                        <div className="standing-item">
                            <span className="position">3</span>
                            <span className="driver-name">Lando Norris</span>
                            <span className="points">87 PTS</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
