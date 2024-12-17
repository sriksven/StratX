import { useQuery } from '@tanstack/react-query';
import type { TelemetryData } from '../types/index.ts';
import { fetchTelemetry } from '../services/api.ts';

export function useTelemetry(driver: string, isLive: boolean) {
    return useQuery<TelemetryData>({
        queryKey: ['telemetry', driver, isLive],
        queryFn: () => fetchTelemetry(driver),
        enabled: isLive,
        refetchInterval: isLive ? 2000 : false,
    });
}
