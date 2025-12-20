import axios from 'axios';
import type {
    TelemetryData,
    LapPrediction,
    TyreWearPrediction,
    PitWindowRecommendation,
    OvertakeProbability,
    AnomalyDetection,
} from '../types/index.ts';

// API base URL - configured for the FastAPI backend
const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
});

// Driver Code to Number Mapping (2025 Grid + 2024 references)
const DRIVER_MAP: Record<string, number> = {
    'VER': 1, 'NOR': 4, 'GAS': 10, 'PER': 11, 'ALO': 14, 'LEC': 16,
    'STR': 18, 'MAG': 20, 'TSU': 22, 'ALB': 23, 'ZHO': 24, 'HUL': 27,
    'OCO': 31, 'BEA': 38, 'HAM': 44, 'SAI': 55, 'RUS': 63, 'BOT': 77,
    'PIA': 81, 'LAW': 30, 'ANT': 12, 'DOO': 19
};

const getDriverNumber = (code: string): number => DRIVER_MAP[code] || 1; // Default to Max

// --- Adaptors ---
const adaptLapPrediction = (data: any, driver: string): LapPrediction => ({
    driver,
    predictedLapTime: data.predicted_next_lap || 0,
    confidence: 0.85, // Mock confidence for now
    factors: {
        tyreDegradation: 0.4,
        fuelLoad: 0.3,
        trackConditions: 0.9
    }
});

const adaptTyrePrediction = (data: any, driver: string): TyreWearPrediction => ({
    driver,
    compound: data.compound || 'SOFT',
    lapNumber: data.current_stint_laps || 10,
    wearPercentage: 100 - (data.predicted_life_remaining || 100),
    estimatedLapsRemaining: Math.floor((data.predicted_life_remaining || 0) / 3), // rough estimate
    degradationRate: 1.2
});

const adaptPitWindow = (data: any, driver: string): PitWindowRecommendation => ({
    driver,
    optimalLap: data.optimal_lap || 0,
    currentLap: 20, // Mocked in backend
    confidence: data.confidence === 'HIGH' ? 0.9 : 0.4,
    reasoning: ['Calculated from tyre degradation curve'],
    alternativeWindows: [data.open_lap, data.close_lap]
});

// Mock Generators for endpoints not yet implemented
const generateMockOvertake = (driver: string): OvertakeProbability => ({
    attacker: driver,
    defender: 'NOR',
    probability: Math.random(),
    factors: { speedDelta: 12.5, tyreAdvantage: 0.8, drsAvailable: true, trackPosition: 'Main Straight' },
});

const generateMockAnomaly = (driver: string): AnomalyDetection => ({
    driver,
    anomalyType: 'none',
    severity: 'low',
    description: 'All systems nominal',
    confidence: 0.95,
    timestamp: new Date().toISOString()
});

const generateMockTelemetry = (driver: string): TelemetryData => ({
    driver,
    speed: Math.random() * 150 + 200,
    throttle: Math.random() * 100,
    brake: Math.random() * 50,
    rpm: Math.random() * 5000 + 10000,
    gear: Math.floor(Math.random() * 8) + 1,
    drs: Math.random() > 0.7,
    timestamp: new Date().toISOString(),
});

// --- API Functions ---

export const fetchTelemetry = async (driver: string): Promise<TelemetryData> => {
    return generateMockTelemetry(driver);
};

export const fetchTelemetryHistory = async (driver: string): Promise<TelemetryData[]> => {
    return Array.from({ length: 20 }, () => generateMockTelemetry(driver));
};

export const fetchLapTimePrediction = async (driver: string, sessionKey: number = 9158): Promise<LapPrediction> => {
    try {
        const num = getDriverNumber(driver);
        const response = await api.get(`/predictions/lap_time`, {
            params: { session_key: sessionKey, driver_number: num }
        });
        return adaptLapPrediction(response.data, driver);
    } catch (error) {
        console.warn('Backend unavailable, using fallback', error);
        return adaptLapPrediction({ predicted_next_lap: 92.5 }, driver);
    }
};

export const fetchTyreWearPrediction = async (driver: string, sessionKey: number = 9158): Promise<TyreWearPrediction> => {
    try {
        const num = getDriverNumber(driver);
        const response = await api.get(`/predictions/tyre_life`, {
            params: { session_key: sessionKey, driver_number: num }
        });
        return adaptTyrePrediction(response.data, driver);
    } catch (error) {
        console.warn('Backend unavailable, using fallback');
        return adaptTyrePrediction({ predicted_life_remaining: 80, compound: 'MEDIUM' }, driver);
    }
};

export const fetchPitWindowRecommendation = async (driver: string, sessionKey: number = 9158): Promise<PitWindowRecommendation> => {
    try {
        const num = getDriverNumber(driver);
        const response = await api.get(`/predictions/strategy_window`, {
            params: { session_key: sessionKey, driver_number: num }
        });
        return adaptPitWindow(response.data, driver);
    } catch (error) {
        console.warn('Backend unavailable, using fallback');
        return adaptPitWindow({ optimal_lap: 25, confidence: 'HIGH', open_lap: 23, close_lap: 27 }, driver);
    }
};

export const fetchOvertakeProbability = async (driver: string, _sessionKey: number = 9158): Promise<OvertakeProbability> => {
    // Not implemented in backend yet
    return generateMockOvertake(driver);
};

export const fetchAnomalyDetection = async (driver: string, _sessionKey: number = 9158): Promise<AnomalyDetection> => {
    // Not implemented in backend yet
    return generateMockAnomaly(driver);
};
