import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useTelemetryHistory } from '../hooks/useTelemetryHistory.ts';
import './TelemetryCharts.css';

interface TelemetryChartsProps {
    driver: string;
    isLive: boolean;
}

export default function TelemetryCharts({ driver, isLive }: TelemetryChartsProps) {
    const { data: history, isLoading } = useTelemetryHistory(driver, isLive);

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    const speedData = history?.map((point: any, idx: number) => ({
        lap: idx + 1,
        speed: point.speed,
        throttle: point.throttle,
    })) || [];

    const tyreData = history?.map((_point: any, idx: number) => ({
        lap: idx + 1,
        wear: Math.min(100, (idx + 1) * 2.5), // Mock tyre wear progression
    })) || [];

    return (
        <div className="charts-grid">
            {/* Speed & Throttle Chart */}
            <div className="chart-card glass-card">
                <h3 className="chart-title">Speed & Throttle Analysis</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={speedData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis
                            dataKey="lap"
                            stroke="#6b6b76"
                            style={{ fontSize: '0.75rem' }}
                        />
                        <YAxis
                            stroke="#6b6b76"
                            style={{ fontSize: '0.75rem' }}
                        />
                        <Tooltip
                            contentStyle={{
                                background: 'rgba(26, 26, 36, 0.95)',
                                border: '1px solid rgba(225, 6, 0, 0.3)',
                                borderRadius: '8px',
                                color: '#ffffff'
                            }}
                        />
                        <Legend
                            wrapperStyle={{
                                fontSize: '0.875rem',
                                color: '#b0b0b8'
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="speed"
                            stroke="#e10600"
                            strokeWidth={2}
                            dot={false}
                            name="Speed (km/h)"
                        />
                        <Line
                            type="monotone"
                            dataKey="throttle"
                            stroke="#00ff41"
                            strokeWidth={2}
                            dot={false}
                            name="Throttle (%)"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Tyre Wear Chart */}
            <div className="chart-card glass-card">
                <h3 className="chart-title">Tyre Degradation Curve</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={tyreData}>
                        <defs>
                            <linearGradient id="wearGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#e10600" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#e10600" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis
                            dataKey="lap"
                            stroke="#6b6b76"
                            style={{ fontSize: '0.75rem' }}
                        />
                        <YAxis
                            stroke="#6b6b76"
                            style={{ fontSize: '0.75rem' }}
                            domain={[0, 100]}
                        />
                        <Tooltip
                            contentStyle={{
                                background: 'rgba(26, 26, 36, 0.95)',
                                border: '1px solid rgba(225, 6, 0, 0.3)',
                                borderRadius: '8px',
                                color: '#ffffff'
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="wear"
                            stroke="#e10600"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#wearGradient)"
                            name="Tyre Wear (%)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
