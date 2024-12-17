export interface TelemetryData {
    driver: string;
    speed: number;
    throttle: number;
    brake: number;
    rpm: number;
    gear: number;
    drs: boolean;
    timestamp: string;
}

export interface LapPrediction {
    driver: string;
    predictedLapTime: number;
    confidence: number;
    factors: {
        tyreDegradation: number;
        fuelLoad: number;
        trackConditions: number;
    };
}

export interface TyreWearPrediction {
    driver: string;
    compound: string;
    lapNumber: number;
    wearPercentage: number;
    estimatedLapsRemaining: number;
    degradationRate: number;
}

export interface PitWindowRecommendation {
    driver: string;
    optimalLap: number;
    currentLap: number;
    confidence: number;
    reasoning: string[];
    alternativeWindows: number[];
}

export interface OvertakeProbability {
    attacker: string;
    defender: string;
    probability: number;
    factors: {
        speedDelta: number;
        tyreAdvantage: number;
        drsAvailable: boolean;
        trackPosition: string;
    };
}

export interface AnomalyDetection {
    driver: string;
    anomalyType: 'mechanical' | 'driver' | 'none';
    severity: 'low' | 'medium' | 'high';
    description: string;
    confidence: number;
    timestamp: string;
}

export interface DriverStanding {
    position: number;
    driver: string;
    team: string;
    gap: string;
    lastLapTime: number;
    bestLapTime: number;
}
