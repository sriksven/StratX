import { Gauge, Zap, Wind, Disc } from 'lucide-react';
import { useTelemetry } from '../hooks/useTelemetry.ts';
import './LiveTelemetry.css';

interface LiveTelemetryProps {
    driver: string;
    isLive: boolean;
}

export default function LiveTelemetry({ driver, isLive }: LiveTelemetryProps) {
    const { data: telemetry, isLoading } = useTelemetry(driver, isLive);

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    const speed = telemetry?.speed || 0;
    const throttle = telemetry?.throttle || 0;
    const brake = telemetry?.brake || 0;
    const rpm = telemetry?.rpm || 0;
    const gear = telemetry?.gear || 0;
    const drs = telemetry?.drs || false;

    return (
        <div className="telemetry-grid">
            {/* Speed Gauge */}
            <div className="telemetry-card glass-card">
                <div className="telemetry-header">
                    <Wind className="telemetry-icon" />
                    <span className="telemetry-label">Speed</span>
                </div>
                <div className="gauge-container">
                    <svg className="circular-gauge" viewBox="0 0 200 200">
                        <circle
                            className="gauge-bg"
                            cx="100"
                            cy="100"
                            r="80"
                            fill="none"
                            strokeWidth="12"
                        />
                        <circle
                            className="gauge-progress"
                            cx="100"
                            cy="100"
                            r="80"
                            fill="none"
                            strokeWidth="12"
                            strokeDasharray={`${(speed / 350) * 502.4} 502.4`}
                            transform="rotate(-90 100 100)"
                        />
                    </svg>
                    <div className="gauge-value">
                        <span className="value-number">{Math.round(speed)}</span>
                        <span className="value-unit">km/h</span>
                    </div>
                </div>
            </div>

            {/* RPM Gauge */}
            <div className="telemetry-card glass-card">
                <div className="telemetry-header">
                    <Gauge className="telemetry-icon" />
                    <span className="telemetry-label">RPM</span>
                </div>
                <div className="gauge-container">
                    <svg className="circular-gauge" viewBox="0 0 200 200">
                        <circle
                            className="gauge-bg"
                            cx="100"
                            cy="100"
                            r="80"
                            fill="none"
                            strokeWidth="12"
                        />
                        <circle
                            className="gauge-progress gauge-rpm"
                            cx="100"
                            cy="100"
                            r="80"
                            fill="none"
                            strokeWidth="12"
                            strokeDasharray={`${(rpm / 15000) * 502.4} 502.4`}
                            transform="rotate(-90 100 100)"
                        />
                    </svg>
                    <div className="gauge-value">
                        <span className="value-number">{Math.round(rpm)}</span>
                        <span className="value-unit">RPM</span>
                    </div>
                </div>
            </div>

            {/* Throttle Bar */}
            <div className="telemetry-card glass-card">
                <div className="telemetry-header">
                    <Zap className="telemetry-icon" />
                    <span className="telemetry-label">Throttle</span>
                </div>
                <div className="bar-gauge-container">
                    <div className="bar-gauge">
                        <div
                            className="bar-fill bar-throttle"
                            style={{ height: `${throttle}%` }}
                        ></div>
                    </div>
                    <div className="bar-value">{Math.round(throttle)}%</div>
                </div>
            </div>

            {/* Brake Bar */}
            <div className="telemetry-card glass-card">
                <div className="telemetry-header">
                    <Disc className="telemetry-icon" />
                    <span className="telemetry-label">Brake</span>
                </div>
                <div className="bar-gauge-container">
                    <div className="bar-gauge">
                        <div
                            className="bar-fill bar-brake"
                            style={{ height: `${brake}%` }}
                        ></div>
                    </div>
                    <div className="bar-value">{Math.round(brake)}%</div>
                </div>
            </div>

            {/* Gear & DRS */}
            <div className="telemetry-card glass-card info-card">
                <div className="info-grid">
                    <div className="info-item">
                        <span className="info-label">Gear</span>
                        <span className="info-value gear-value">{gear}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">DRS</span>
                        <span className={`drs-indicator ${drs ? 'drs-active' : 'drs-inactive'}`}>
                            {drs ? 'OPEN' : 'CLOSED'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
