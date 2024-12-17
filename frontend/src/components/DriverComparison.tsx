import { Trophy } from 'lucide-react';
import './DriverComparison.css';

interface DriverComparisonProps {
    isLive: boolean;
}

const mockDrivers = [
    { position: 1, driver: 'VER', team: 'Red Bull Racing', gap: 'LEADER', lastLap: 89.234, bestLap: 88.123 },
    { position: 2, driver: 'HAM', team: 'Mercedes', gap: '+2.456', lastLap: 89.567, bestLap: 88.456 },
    { position: 3, driver: 'LEC', team: 'Ferrari', gap: '+5.123', lastLap: 89.789, bestLap: 88.789 },
    { position: 4, driver: 'NOR', team: 'McLaren', gap: '+8.901', lastLap: 90.012, bestLap: 89.012 },
    { position: 5, driver: 'SAI', team: 'Ferrari', gap: '+12.345', lastLap: 90.234, bestLap: 89.234 },
];

export default function DriverComparison({ isLive }: DriverComparisonProps) {
    return (
        <div className="driver-comparison glass-card">
            <div className="comparison-header">
                <Trophy className="comparison-icon" />
                <h3 className="comparison-title">Live Standings</h3>
            </div>

            <div className="drivers-table">
                <div className="table-header">
                    <div className="col-pos">Pos</div>
                    <div className="col-driver">Driver</div>
                    <div className="col-team">Team</div>
                    <div className="col-gap">Gap</div>
                    <div className="col-last">Last Lap</div>
                    <div className="col-best">Best Lap</div>
                </div>

                <div className="table-body">
                    {mockDrivers.map((driver) => (
                        <div key={driver.position} className="table-row">
                            <div className="col-pos">
                                <span className={`position-badge ${driver.position <= 3 ? 'podium' : ''}`}>
                                    {driver.position}
                                </span>
                            </div>
                            <div className="col-driver">
                                <span className="driver-code">{driver.driver}</span>
                            </div>
                            <div className="col-team">{driver.team}</div>
                            <div className="col-gap">
                                <span className={driver.gap === 'LEADER' ? 'leader-badge' : 'gap-text'}>
                                    {driver.gap}
                                </span>
                            </div>
                            <div className="col-last">{driver.lastLap.toFixed(3)}s</div>
                            <div className="col-best">
                                <span className="best-lap">{driver.bestLap.toFixed(3)}s</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
