import random
import pandas as pd
import numpy as np
from typing import Dict, Any, List

class RacePredictor:
    """
    Mock ML models for live race predictions.
    In a real scenario, these would load trained models (e.g., specific .pkl files).
    """

    def __init__(self):
        # Initialize mock model states or load artifacts
        pass

    def predict_next_lap_time(self, driver_id: str, current_laps: List[Dict[str, Any]]) -> float:
        """
        Predict the time for the upcoming lap.
        Model: Exponential Moving Average of last 3 laps + random variance.
        """
        if not current_laps:
            return 90.0 # Default ~1:30.000
        
        # simple heuristic
        recent_times = [l['lap_duration'] for l in current_laps[-3:] if l.get('lap_duration')]
        if not recent_times:
            return 90.0
            
        avg_time = sum(recent_times) / len(recent_times)
        # Add small variance
        prediction = avg_time + random.uniform(-0.2, 0.2)
        return round(prediction, 3)

    def predict_tyre_life(self, driver_id: str, tyre_compound: str, laps_on_tyre: int) -> float:
        """
        Predict remaining tyre life percentage.
        Model: Non-linear decay curve based on compound.
        """
        max_laps = {
            "SOFT": 20,
            "MEDIUM": 35,
            "HARD": 50,
            "INTERMEDIATE": 30,
            "WET": 25
        }
        
        limit = max_laps.get(tyre_compound.upper(), 30)
        
        # Decay formula: 100 - ( (laps^1.2) / (limit^1.2) * 100 )
        # This creates a curve that accelerates wear near the end
        wear = (laps_on_tyre ** 1.5) / (limit ** 1.5) * 100
        remaining = 100 - wear
        return max(0.0, round(remaining, 1))

    def predict_pit_window(self, driver_id: str, current_lap: int, total_laps: int) -> Dict[str, Any]:
        """
        Suggest optimal pit window.
        Model: Statistical based on typical stint lengths.
        """
        # Determine strict window based on 1-stop strategy (assuming 50% distance)
        ideal_lap = total_laps // 2
        
        confidence = "HIGH"
        if abs(current_lap - ideal_lap) > 10:
            confidence = "LOW"
            
        return {
            "open_lap": ideal_lap - 2,
            "optimal_lap": ideal_lap,
            "close_lap": ideal_lap + 2,
            "confidence": confidence
        }

    def predict_overtake_probability(self, driver_gap: float, driver_compound: str, target_compound: str) -> float:
        """
        Predict probability of overtake in next 3 laps.
        Model: Logistic function of gap + tyre delta.
        """
        prob = 0.0
        
        # Base probability from gap (closer = higher)
        if driver_gap < 0.5:
            prob = 0.85
        elif driver_gap < 1.0:
            prob = 0.60
        elif driver_gap < 1.5:
            prob = 0.30
        else:
            prob = 0.05
            
        # Adjust for tyres (Soft vs Hard bonus)
        tyre_hierarchy = ["SOFT", "MEDIUM", "HARD"]
        try:
            d_idx = tyre_hierarchy.index(driver_compound.upper())
            t_idx = tyre_hierarchy.index(target_compound.upper())
            if d_idx < t_idx: # Driver on softer compound
                prob += 0.15
        except:
            pass
            
        return min(0.99, round(prob, 2))

    def detect_anomalies(self, telemetry_packet: Dict[str, Any]) -> List[str]:
        """
        Detect mechanical issues or weird data.
        """
        anomalies = []
        
        # Check RPM
        if telemetry_packet.get('rpm', 0) > 13000 and telemetry_packet.get('speed', 0) < 50:
            anomalies.append("High RPM / Low Speed Mismatch")
            
        # Check Throttle
        if telemetry_packet.get('throttle', 0) > 90 and telemetry_packet.get('speed', 0) == 0:
            anomalies.append("Stalled on Throttle")
            
        return anomalies
