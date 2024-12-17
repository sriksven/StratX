import { Clock, TrendingDown, Flag, AlertTriangle, Target } from 'lucide-react';
import { usePredictions } from '../hooks/usePredictions.ts';
import './PredictionCards.css';

interface PredictionCardsProps {
    driver: string;
    isLive: boolean;
}

export default function PredictionCards({ driver, isLive }: PredictionCardsProps) {
    const {
        lapTime,
        tyreWear,
        pitWindow,
        overtake,
        anomaly,
        isLoading
    } = usePredictions(driver, isLive);

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    return (
        <div className="predictions-grid">
            {/* Lap Time Prediction */}
            <div className="prediction-card glass-card shimmer">
                <div className="prediction-header">
                    <Clock className="prediction-icon" />
                    <h3 className="prediction-title">Lap Time Prediction</h3>
                </div>
                <div className="prediction-content">
                    <div className="prediction-main-value">
                        {lapTime?.predictedLapTime ?
                            `${lapTime.predictedLapTime.toFixed(3)}s` :
                            'N/A'
                        }
                    </div>
                    <div className="confidence-bar">
                        <div className="confidence-label">Confidence</div>
                        <div className="confidence-track">
                            <div
                                className="confidence-fill"
                                style={{ width: `${(lapTime?.confidence || 0) * 100}%` }}
                            ></div>
                        </div>
                        <div className="confidence-value">
                            {((lapTime?.confidence || 0) * 100).toFixed(0)}%
                        </div>
                    </div>
                    <div className="prediction-factors">
                        <div className="factor">
                            <span className="factor-label">Tyre Deg</span>
                            <span className="factor-value">
                                {((lapTime?.factors.tyreDegradation || 0) * 100).toFixed(0)}%
                            </span>
                        </div>
                        <div className="factor">
                            <span className="factor-label">Fuel Load</span>
                            <span className="factor-value">
                                {((lapTime?.factors.fuelLoad || 0) * 100).toFixed(0)}%
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tyre Wear */}
            <div className="prediction-card glass-card shimmer">
                <div className="prediction-header">
                    <TrendingDown className="prediction-icon icon-warning" />
                    <h3 className="prediction-title">Tyre Degradation</h3>
                </div>
                <div className="prediction-content">
                    <div className="tyre-compound">
                        <span className={`compound-badge compound-${tyreWear?.compound?.toLowerCase() || 'soft'}`}>
                            {tyreWear?.compound || 'SOFT'}
                        </span>
                    </div>
                    <div className="wear-percentage">
                        {(tyreWear?.wearPercentage || 0).toFixed(1)}%
                    </div>
                    <div className="wear-details">
                        <div className="wear-stat">
                            <span className="wear-label">Laps Remaining</span>
                            <span className="wear-value">{tyreWear?.estimatedLapsRemaining || 0}</span>
                        </div>
                        <div className="wear-stat">
                            <span className="wear-label">Degradation Rate</span>
                            <span className="wear-value">
                                {(tyreWear?.degradationRate || 0).toFixed(2)}%/lap
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pit Window */}
            <div className="prediction-card glass-card shimmer">
                <div className="prediction-header">
                    <Flag className="prediction-icon icon-success" />
                    <h3 className="prediction-title">Pit Window</h3>
                </div>
                <div className="prediction-content">
                    <div className="pit-window-main">
                        <div className="optimal-lap">
                            <span className="optimal-label">Optimal Lap</span>
                            <span className="optimal-value">{pitWindow?.optimalLap || 'N/A'}</span>
                        </div>
                        <div className="current-lap">
                            <span className="current-label">Current Lap</span>
                            <span className="current-value">{pitWindow?.currentLap || 0}</span>
                        </div>
                    </div>
                    <div className="pit-reasoning">
                        {pitWindow?.reasoning?.map((reason, idx) => (
                            <div key={idx} className="reason-item">
                                • {reason}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Overtake Probability */}
            <div className="prediction-card glass-card shimmer">
                <div className="prediction-header">
                    <Target className="prediction-icon icon-purple" />
                    <h3 className="prediction-title">Overtake Probability</h3>
                </div>
                <div className="prediction-content">
                    <div className="overtake-probability">
                        {((overtake?.probability || 0) * 100).toFixed(0)}%
                    </div>
                    <div className="overtake-matchup">
                        <span className="attacker">{overtake?.attacker || driver}</span>
                        <span className="vs">vs</span>
                        <span className="defender">{overtake?.defender || 'N/A'}</span>
                    </div>
                    <div className="overtake-factors">
                        <div className="overtake-factor">
                            <span className="factor-icon">⚡</span>
                            <span className="factor-text">
                                Speed Δ: {overtake?.factors.speedDelta?.toFixed(1) || 0} km/h
                            </span>
                        </div>
                        <div className="overtake-factor">
                            <span className="factor-icon">🏁</span>
                            <span className="factor-text">
                                DRS: {overtake?.factors.drsAvailable ? 'Available' : 'N/A'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Anomaly Detection */}
            <div className={`prediction-card glass-card shimmer anomaly-card anomaly-${anomaly?.severity || 'low'}`}>
                <div className="prediction-header">
                    <AlertTriangle className="prediction-icon icon-danger" />
                    <h3 className="prediction-title">Anomaly Detection</h3>
                </div>
                <div className="prediction-content">
                    <div className={`anomaly-status status-${anomaly?.anomalyType || 'none'}`}>
                        {anomaly?.anomalyType === 'none' ? 'All Systems Normal' : anomaly?.anomalyType?.toUpperCase()}
                    </div>
                    {anomaly?.anomalyType !== 'none' && (
                        <>
                            <div className="anomaly-description">
                                {anomaly?.description}
                            </div>
                            <div className="anomaly-severity">
                                <span className={`severity-badge severity-${anomaly?.severity}`}>
                                    {anomaly?.severity?.toUpperCase()}
                                </span>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
