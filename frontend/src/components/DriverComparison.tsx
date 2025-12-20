import { Trophy } from 'lucide-react';
import './DriverComparison.css';
import { DRIVERS } from '../constants/drivers';

interface DriverComparisonProps {
    isLive: boolean;
}

export default function DriverComparison({ isLive }: DriverComparisonProps) {
    // Generate full grid standings (Mock logic for demo)
    // We shuffle the drivers a bit to make it look like a race
    const standings = [...DRIVERS]
        .map((driver) => {
            const baseLap = 88.000;
            // Add some "random" variance based on team performance tiers roughly
            let tier = 0;
            if (['McLaren', 'Ferrari', 'Red Bull Racing'].includes(driver.team)) tier = 1;
            else if (['Mercedes', 'Aston Martin'].includes(driver.team)) tier = 2;
            else tier = 3;

            return {
                driver: driver.code,
                team: driver.team,
                tier, // used for sorting/gap
                lastLap: baseLap + Math.random() + (tier * 0.1),
                bestLap: baseLap + (Math.random() * 0.5) + (tier * 0.05)
            };
        })
        .sort((a, b) => {
            // Sort by 'speed' (mocked by tier + random)
            return (a.tier - b.tier) + (Math.random() - 0.5);
        })
        .map((data, index) => {
            const gapSeconds = index === 0 ? 0 : (index * 1.5) + Math.random();
            return {
                ...data,
                position: index + 1,
                gap: index === 0 ? 'LEADER' : `+${gapSeconds.toFixed(3)}s`
            };
        });

    return (
        <div className="driver-comparison glass-card">
            <div className="comparison-header">
                <Trophy className="comparison-icon" />
                <h3 className="comparison-title">{isLive ? 'Live Standings' : 'Race Standings'}</h3>
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
                    {standings.map((driver) => (
                        <div key={driver.driver} className="table-row">
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
