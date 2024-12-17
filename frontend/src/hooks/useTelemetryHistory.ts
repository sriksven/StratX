import { useQuery } from '@tanstack/react-query';
import type { TelemetryData } from '../types/index.ts';
import { fetchTelemetryHistory } from '../services/api.ts';

export function useTelemetryHistory(driver: string, isLive: boolean) {
    return useQuery<TelemetryData[]>({
        queryKey: ['telemetryHistory', driver, isLive],
        queryFn: () => fetchTelemetryHistory(driver),
        enabled: isLive,
        refetchInterval: isLive ? 5000 : false,
    });
}
