import axios from 'axios';
import type {
    TelemetryData,
    LapPrediction,
    TyreWearPrediction,
    PitWindowRecommendation,
    OvertakeProbability,
    AnomalyDetection,
} from '../types/index.ts';

// API base URL - will be configured for production
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
});

// Mock data generators for development
const generateMockTelemetry = (driver: string): TelemetryData => ({
    driver,
    speed: Math.random() * 150 + 200, // 200-350 km/h
    throttle: Math.random() * 100,
    brake: Math.random() * 50,
    rpm: Math.random() * 5000 + 10000, // 10000-15000 RPM
    gear: Math.floor(Math.random() * 8) + 1,
    drs: Math.random() > 0.7,
    timestamp: new Date().toISOString(),
});

const generateMockLapPrediction = (driver: string): LapPrediction => ({
    driver,
    predictedLapTime: 88 + Math.random() * 3, // 88-91 seconds
    confidence: 0.7 + Math.random() * 0.25,
    factors: {
        tyreDegradation: Math.random() * 0.5,
        fuelLoad: Math.random() * 0.3,
        trackConditions: 0.8 + Math.random() * 0.2,
    },
});

const generateMockTyreWear = (driver: string): TyreWearPrediction => ({
    driver,
    compound: ['SOFT', 'MEDIUM', 'HARD'][Math.floor(Math.random() * 3)],
    lapNumber: Math.floor(Math.random() * 30) + 1,
    wearPercentage: Math.random() * 80,
    estimatedLapsRemaining: Math.floor(Math.random() * 20) + 5,
    degradationRate: 1.5 + Math.random() * 2,
});

const generateMockPitWindow = (driver: string): PitWindowRecommendation => ({
    driver,
    optimalLap: Math.floor(Math.random() * 10) + 20,
    currentLap: Math.floor(Math.random() * 25) + 1,
    confidence: 0.75 + Math.random() * 0.2,
    reasoning: [
        'Tyre degradation approaching critical threshold',
        'Traffic window opens in 3 laps',
        'Undercut opportunity available',
    ],
    alternativeWindows: [18, 22, 25],
});

const generateMockOvertake = (driver: string): OvertakeProbability => ({
    attacker: driver,
    defender: ['HAM', 'LEC', 'NOR', 'SAI'][Math.floor(Math.random() * 4)],
    probability: Math.random(),
    factors: {
        speedDelta: (Math.random() - 0.5) * 20,
        tyreAdvantage: Math.random(),
        drsAvailable: Math.random() > 0.5,
        trackPosition: 'Turn 1 Braking Zone',
    },
});

const generateMockAnomaly = (driver: string): AnomalyDetection => {
    const types: Array<'mechanical' | 'driver' | 'none'> = ['mechanical', 'driver', 'none', 'none', 'none'];
    const severities: Array<'low' | 'medium' | 'high'> = ['low', 'medium', 'high'];
    const type = types[Math.floor(Math.random() * types.length)];

    return {
        driver,
        anomalyType: type,
        severity: type === 'none' ? 'low' : severities[Math.floor(Math.random() * severities.length)],
        description: type === 'none'
            ? 'All systems operating normally'
            : type === 'mechanical'
                ? 'Unusual vibration detected in rear suspension'
                : 'Inconsistent braking points detected',
        confidence: 0.6 + Math.random() * 0.35,
        timestamp: new Date().toISOString(),
    };
};

// API functions
export const fetchTelemetry = async (driver: string): Promise<TelemetryData> => {
    try {
        const response = await api.get(`/telemetry/${driver}`);
        return response.data;
    } catch (error) {
        // Return mock data in development
        console.warn('Using mock telemetry data');
        return generateMockTelemetry(driver);
    }
};

export const fetchTelemetryHistory = async (driver: string): Promise<TelemetryData[]> => {
    try {
        const response = await api.get(`/telemetry/${driver}/history`);
        return response.data;
    } catch (error) {
        // Return mock data in development
        console.warn('Using mock telemetry history');
        return Array.from({ length: 20 }, () => generateMockTelemetry(driver));
    }
};

export const fetchLapTimePrediction = async (driver: string): Promise<LapPrediction> => {
    try {
        const response = await api.get(`/predictions/lap-time/${driver}`);
        return response.data;
    } catch (error) {
        console.warn('Using mock lap time prediction');
        return generateMockLapPrediction(driver);
    }
};

export const fetchTyreWearPrediction = async (driver: string): Promise<TyreWearPrediction> => {
    try {
        const response = await api.get(`/predictions/tyre-wear/${driver}`);
        return response.data;
    } catch (error) {
        console.warn('Using mock tyre wear prediction');
        return generateMockTyreWear(driver);
    }
};

export const fetchPitWindowRecommendation = async (driver: string): Promise<PitWindowRecommendation> => {
    try {
        const response = await api.get(`/predictions/pit-window/${driver}`);
        return response.data;
    } catch (error) {
        console.warn('Using mock pit window recommendation');
        return generateMockPitWindow(driver);
    }
};

export const fetchOvertakeProbability = async (driver: string): Promise<OvertakeProbability> => {
    try {
        const response = await api.get(`/predictions/overtake/${driver}`);
        return response.data;
    } catch (error) {
        console.warn('Using mock overtake probability');
        return generateMockOvertake(driver);
    }
};

export const fetchAnomalyDetection = async (driver: string): Promise<AnomalyDetection> => {
    try {
        const response = await api.get(`/predictions/anomaly/${driver}`);
        return response.data;
    } catch (error) {
        console.warn('Using mock anomaly detection');
        return generateMockAnomaly(driver);
    }
};
