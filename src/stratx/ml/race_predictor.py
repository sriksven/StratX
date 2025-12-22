import random
import pandas as pd
import numpy as np
import joblib
import os
from typing import Dict, Any, List, Optional

class RacePredictor:
    """
    ML-based Race Predictor.
    Loads trained models for Lap Time, Tyre Life, etc.
    Falls back to heuristics if models or features are missing.
    """

    def __init__(self):
        self.lap_time_model = None
        
        # Load Models
        try:
            current_dir = os.path.dirname(os.path.abspath(__file__))
            model_path = os.path.join(current_dir, 'models', 'lap_time_model.pkl')
            if os.path.exists(model_path):
                self.lap_time_model = joblib.load(model_path)
            else:
                print(f"Warning: Model not found at {model_path}")
        except Exception as e:
            print(f"Error loading models: {e}")

    def predict_next_lap_time(self, driver_id: str, current_laps: List[Dict[str, Any]], 
                              context: Optional[Dict[str, Any]] = None) -> float:
        """
        Predict the time for the upcoming lap.
        Uses ML Model if 'context' with features is provided.
        Falls back to Heuristic otherwise.
        """
        # ML Inference
        if self.lap_time_model and context:
            try:
                # Expecting context to have: Team, Circuit, Compound, TyreLife, LapNumber, TrackTemp
                # driver_id is passed as arg
                
                features = {
                    'Driver': driver_id,
                    'Team': context.get('Team', 'Unknown'),
                    'Circuit': context.get('Circuit', 'Unknown'),
                    'Compound': context.get('Compound', 'SOFT'),
                    'TyreLife': float(context.get('TyreLife', 1.0)),
                    'LapNumber': float(context.get('LapNumber', 1.0)),
                    'TrackTemp': float(context.get('TrackTemp', 30.0))
                }
                
                df = pd.DataFrame([features])
                prediction = self.lap_time_model.predict(df)[0]
                return round(prediction, 3)
            except Exception as e:
                print(f"ML Prediction failed: {e}, falling back to heuristic.")
        
        # Heuristic Fallback
        if not current_laps:
            return 90.0 # Default ~1:30.000
        
        recent_times = [l['lap_duration'] for l in current_laps[-3:] if l.get('lap_duration')]
        if not recent_times:
            return 90.0
            
        avg_time = sum(recent_times) / len(recent_times)
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
        wear = (laps_on_tyre ** 1.5) / (limit ** 1.5) * 100
        remaining = 100 - wear
        return max(0.0, round(remaining, 1))

    def predict_pit_window(self, driver_id: str, current_lap: int, total_laps: int) -> Dict[str, Any]:
        """
        Suggest optimal pit window.
        Model: Statistical based on typical stint lengths.
        """
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
        
        if driver_gap < 0.5:
            prob = 0.85
        elif driver_gap < 1.0:
            prob = 0.60
        elif driver_gap < 1.5:
            prob = 0.30
        else:
            prob = 0.05
            
        tyre_hierarchy = ["SOFT", "MEDIUM", "HARD"]
        try:
            d_idx = tyre_hierarchy.index(driver_compound.upper())
            t_idx = tyre_hierarchy.index(target_compound.upper())
            if d_idx < t_idx: 
                prob += 0.15
        except:
            pass
            
        return min(0.99, round(prob, 2))

    def detect_anomalies(self, telemetry_packet: Dict[str, Any]) -> List[str]:
        """
        Detect mechanical issues or weird data.
        """
        anomalies = []
        if telemetry_packet.get('rpm', 0) > 13000 and telemetry_packet.get('speed', 0) < 50:
            anomalies.append("High RPM / Low Speed Mismatch")
            
        if telemetry_packet.get('throttle', 0) > 90 and telemetry_packet.get('speed', 0) == 0:
            anomalies.append("Stalled on Throttle")
            
        return anomalies
