import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:8000' : '');

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000, // Increased for FastF1 data loading
});

export interface RaceResult {
    position: number;
    driver: string;
    driver_number: number;
    team: string;
    time: string;
    points: number;
    status: string;
    grid_position?: number;
}

export interface RaceResultsResponse {
    round: number;
    race_name: string;
    country: string;
    location: string;
    circuit: string;
    date: string;
    results: RaceResult[];
    total_laps?: number;
}

export const fetchRaceResults = async (round: number): Promise<RaceResultsResponse> => {
    try {
        const response = await api.get(`/api/results/2025/${round}`);
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch race results for round ${round}:`, error);
        throw error;
    }
};

export const fetchDriverPerformance = async (driverCode: string, round: number) => {
    try {
        const response = await api.get(`/api/results/2025/driver/${driverCode}/performance`, {
            params: { round_number: round }
        });
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch driver performance:`, error);
        throw error;
    }
};
