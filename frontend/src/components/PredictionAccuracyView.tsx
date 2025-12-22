import { CheckCircle, AlertCircle } from 'lucide-react';
import './PredictionAccuracyView.css';

interface AccuracyMetric {
    label: string;
    predicted: string;
    actual: string;
    delta: string;
    accuracy: number; // 0-100
    status: 'good' | 'warning' | 'bad';
}

interface AccuracyData {
    score: number;
    metrics: AccuracyMetric[];
}

interface PredictionAccuracyViewProps {
    raceId: number;
}

// Helper to generate varied data based on race ID
const getAccuracyData = (round: number): AccuracyData => {
    // Seeded randomness for consistency
    const baseScore = 85 + (round * 3 % 13);

    // Vary strategy based on race type (implied by modulo)
    const strategyLaps = 18 + (round % 5);
    const actualStrategyLaps = strategyLaps + ((round % 2 === 0) ? 1 : -1);

    // Vary lap time
    const baseLapTime = 80 + (round * 1.5 % 15); // ~1:20 to 1:35
    const predLapTime = `1:${Math.floor(baseLapTime)}.${(100 + round * 10) % 999}`;
    const actLapTime = `1:${Math.floor(baseLapTime)}.${(100 + round * 10 + (round % 3 === 0 ? -150 : 120)) % 999}`;

    // Vary tyre life
    const predTyreLife = 20 + (round % 10);
    const actTyreLife = predTyreLife + (round % 3 === 0 ? -2 : 1);

    const metrics: AccuracyMetric[] = [
        {
            label: "Race Strategy",
            predicted: `1 Stop (Lap ${strategyLaps})`,
            actual: `1 Stop (Lap ${actualStrategyLaps})`,
            delta: `${actualStrategyLaps > strategyLaps ? '+' : ''}${actualStrategyLaps - strategyLaps} Lap Diff`,
            accuracy: 90 + (round % 8),
            status: Math.abs(actualStrategyLaps - strategyLaps) <= 1 ? 'good' : 'warning'
        },
        {
            label: "Fastest Lap",
            predicted: predLapTime,
            actual: actLapTime,
            delta: round % 2 === 0 ? "-0.124s" : "+0.089s",
            accuracy: 95 + (round % 4),
            status: 'good'
        },
        {
            label: "Tyre Life (Soft)",
            predicted: `${predTyreLife} Laps`,
            actual: `${actTyreLife} Laps`,
            delta: `${actTyreLife - predTyreLife} Laps`,
            accuracy: 85 + (round % 10),
            status: Math.abs(actTyreLife - predTyreLife) <= 2 ? 'warning' : 'good'
        },
        {
            label: "Overtake Success",
            predicted: `${80 + (round % 15)}% Predicted`,
            actual: `${82 + (round % 10)}% Success Rate`,
            delta: `${(82 + (round % 10)) - (80 + (round % 15))}% Var`,
            accuracy: 90 + (round % 5),
            status: 'good'
        }
    ];

    return {
        score: baseScore,
        metrics
    };
};

export default function PredictionAccuracyView({ raceId }: PredictionAccuracyViewProps) {
    const data = getAccuracyData(raceId);
    const score = data.score;
    const metrics = data.metrics;

    // Calculate stroke dasharray for the score circle
    const strokeDasharray = `${score}, 100`;

    return (
        <div className="accuracy-view">
            <div className="accuracy-header-card glass-card">
                <div className="accuracy-score-ring">
                    <svg viewBox="0 0 36 36" className="circular-chart">
                        <path className="circle-bg"
                            d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path className="circle"
                            strokeDasharray={strokeDasharray}
                            d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <text x="18" y="20.35" className="percentage">{score}%</text>
                    </svg>
                </div>
                <div className="accuracy-summary">
                    <h3>Model Performance</h3>
                    <p>The AI model correctly predicted the strategy and key race events with <strong>{score}% accuracy</strong> against actual telemetry data.</p>
                </div>
            </div>

            <div className="accuracy-grid">
                {metrics.map((metric, idx) => (
                    <div key={idx} className={`accuracy-card glass-card status-${metric.status}`}>
                        <div className="card-header">
                            <span className="metric-label">{metric.label}</span>
                            {metric.status === 'good' ? <CheckCircle size={18} className="icon-good" /> : <AlertCircle size={18} className="icon-warning" />}
                        </div>

                        <div className="metric-comparison">
                            <div className="comparison-row">
                                <span className="comp-label">Predicted</span>
                                <span className="comp-value">{metric.predicted}</span>
                            </div>
                            <div className="comparison-row">
                                <span className="comp-label">Actual</span>
                                <span className="comp-value highlight">{metric.actual}</span>
                            </div>
                        </div>

                        <div className="metric-footer">
                            <div className="delta-badge">
                                {metric.delta}
                            </div>
                            <div className="accuracy-bar-container">
                                <div className="accuracy-bar" style={{ width: `${metric.accuracy}%` }}></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
