import { useQuery } from '@tanstack/react-query';
import type {
    LapPrediction,
    TyreWearPrediction,
    PitWindowRecommendation,
    OvertakeProbability,
    AnomalyDetection
} from '../types/index.ts';
import {
    fetchLapTimePrediction,
    fetchTyreWearPrediction,
    fetchPitWindowRecommendation,
    fetchOvertakeProbability,
    fetchAnomalyDetection
} from '../services/api.ts';

export function usePredictions(driver: string, isLive: boolean) {
    const lapTime = useQuery<LapPrediction>({
        queryKey: ['lapTime', driver, isLive],
        queryFn: () => fetchLapTimePrediction(driver),
        enabled: isLive,
        refetchInterval: isLive ? 5000 : false,
    });

    const tyreWear = useQuery<TyreWearPrediction>({
        queryKey: ['tyreWear', driver, isLive],
        queryFn: () => fetchTyreWearPrediction(driver),
        enabled: isLive,
        refetchInterval: isLive ? 5000 : false,
    });

    const pitWindow = useQuery<PitWindowRecommendation>({
        queryKey: ['pitWindow', driver, isLive],
        queryFn: () => fetchPitWindowRecommendation(driver),
        enabled: isLive,
        refetchInterval: isLive ? 5000 : false,
    });

    const overtake = useQuery<OvertakeProbability>({
        queryKey: ['overtake', driver, isLive],
        queryFn: () => fetchOvertakeProbability(driver),
        enabled: isLive,
        refetchInterval: isLive ? 3000 : false,
    });

    const anomaly = useQuery<AnomalyDetection>({
        queryKey: ['anomaly', driver, isLive],
        queryFn: () => fetchAnomalyDetection(driver),
        enabled: isLive,
        refetchInterval: isLive ? 2000 : false,
    });

    return {
        lapTime: lapTime.data,
        tyreWear: tyreWear.data,
        pitWindow: pitWindow.data,
        overtake: overtake.data,
        anomaly: anomaly.data,
        isLoading: lapTime.isLoading || tyreWear.isLoading || pitWindow.isLoading || overtake.isLoading || anomaly.isLoading,
    };
}
