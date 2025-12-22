
import io
import sys
import os
import fastf1
import pandas as pd
import numpy as np
from typing import List

# Add src to path
sys.path.append(os.path.join(os.getcwd(), 'src'))
from stratx.ml.race_predictor import RacePredictor

# Formatting
pd.set_option('display.max_columns', None)
pd.set_option('display.width', 1000)

CACHE_DIR = '.cache'
if not os.path.exists(CACHE_DIR):
    os.makedirs(CACHE_DIR)
fastf1.Cache.enable_cache(CACHE_DIR)

TARGET_ROUNDS = [20, 22, 24] # Mexico, Vegas, Abu Dhabi
SEASON = 2025

def evaluate_race(round_num: int):
    print(f"\n--- Loading 2025 Round {round_num} ---")
    try:
        session = fastf1.get_session(SEASON, round_num, 'R')
        session.load(weather=True, telemetry=False, laps=True)
    except Exception as e:
        print(f"Failed to load session: {e}")
        return

    predictor = RacePredictor()
    if not predictor.lap_time_model:
        print("Model not loaded! Cannot validate.")
        return

    # Pick the winner or a top driver to validate against
    # sorting by position
    results = session.results
    if results is None or results.empty:
        # Fallback if results not ready directly
        drivers = session.drivers[:3]
    else:
        drivers = results.iloc[:3]['DriverNumber'].tolist() # Top 3

    print(f"Evaluating predictions for Top 3 Drivers: {drivers}")
    
    circuit_name = session.event.EventName
    track_temp = session.weather_data['TrackTemp'].mean()
    
    total_mae = 0
    count = 0
    
    print(f"{'Driver':<8} {'Lap':<5} {'Actual':<10} {'Predicted':<10} {'Diff':<10}")
    print("-" * 50)
    
    for driver_id in drivers:
        driver_laps = session.laps.pick_driver(driver_id).pick_quicklaps().reset_index(drop=True)
        if driver_laps.empty:
            continue
            
        driver_team = driver_laps['Team'].iloc[0] if 'Team' in driver_laps.columns else "Unknown"
        
        for i, lap in driver_laps.iterrows():
            # Build Context
            # We skip the first lap usually as it's a standing start and model might be trained on flying laps mostly?
            # But the model has 'LapNumber' as feature, so it might handle it.
            # However, 'pick_quicklaps' removes slow/pit laps.
            
            context = {
                'Team': driver_team,
                'Circuit': circuit_name,
                'Compound': lap['Compound'],
                'TyreLife': lap['TyreLife'],
                'LapNumber': lap['LapNumber'],
                'TrackTemp': track_temp
            }
            
            pred = predictor.predict_next_lap_time(str(driver_id), [], context=context)
            actual = lap['LapTime'].total_seconds()
            
            diff = pred - actual
            total_mae += abs(diff)
            count += 1
            
            # Print sample every 10 laps
            if i % 15 == 0:
                 print(f"{driver_id:<8} {lap['LapNumber']:<5.0f} {actual:<10.3f} {pred:<10.3f} {diff:+.3f}")
    
    if count > 0:
        avg_mae = total_mae / count
        print(f"\nRound {round_num} Mean Absolute Error: {avg_mae:.3f} seconds over {count} laps.")
    else:
        print("No valid laps found.")

def main():
    print("Starting Model Validation on Last 3 Races of 2025...")
    for r in TARGET_ROUNDS:
        evaluate_race(r)

if __name__ == "__main__":
    main()
