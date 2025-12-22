"""
Race Results API endpoints using FastF1 for real historical data.
"""
import fastf1
from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
import pandas as pd
import os

router = APIRouter(prefix="/api/results", tags=["results"])

# Enable FastF1 cache
cache_dir = '/tmp/fastf1_cache'
os.makedirs(cache_dir, exist_ok=True)
fastf1.Cache.enable_cache(cache_dir)

@router.get("/2025/{round_number}")
async def get_race_results(round_number: int) -> Dict[str, Any]:
    """
    Fetch real 2025 race results using FastF1.
    Returns race winner, podium, and full classification.
    """
    try:
        # Load the race session
        session = fastf1.get_session(2025, round_number, 'R')
        session.load()
        
        # Get race results
        results = session.results
        
        if results.empty:
            raise HTTPException(status_code=404, detail=f"No results found for round {round_number}")
        
        # Format results
        race_results = []
        for idx, row in results.iterrows():
            race_results.append({
                "position": int(row['Position']) if pd.notna(row['Position']) else None,
                "driver": row['Abbreviation'],
                "driver_number": int(row['DriverNumber']),
                "team": row['TeamName'],
                "time": str(row['Time']) if pd.notna(row['Time']) else 'DNF',
                "points": int(row['Points']) if pd.notna(row['Points']) else 0,
                "status": row['Status'] if pd.notna(row['Status']) else 'Finished',
                "grid_position": int(row['GridPosition']) if pd.notna(row['GridPosition']) else None,
            })
        
        # Get race info
        event = session.event
        
        return {
            "round": round_number,
            "race_name": event['EventName'],
            "country": event['Country'],
            "location": event['Location'],
            "circuit": event['OfficialEventName'],
            "date": str(event['EventDate']),
            "results": race_results,
            "total_laps": int(session.total_laps) if hasattr(session, 'total_laps') else None,
        }
        
    except Exception as e:
        # Fallback for races that haven't happened or data unavailable
        raise HTTPException(
            status_code=404, 
            detail=f"Could not load race data for round {round_number}: {str(e)}"
        )


@router.get("/2025/driver/{driver_code}/performance")
async def get_driver_race_performance(driver_code: str, round_number: int) -> Dict[str, Any]:
    """
    Get detailed performance metrics for a specific driver in a race.
    Used for model validation.
    """
    try:
        session = fastf1.get_session(2025, round_number, 'R')
        session.load()
        
        # Get driver laps
        driver_laps = session.laps.pick_driver(driver_code)
        
        if driver_laps.empty:
            raise HTTPException(status_code=404, detail=f"No data for driver {driver_code}")
        
        # Calculate metrics
        fastest_lap = driver_laps['LapTime'].min()
        avg_lap = driver_laps['LapTime'].mean()
        
        # Tyre stints
        stints = driver_laps.groupby('Stint').agg({
            'Compound': 'first',
            'LapNumber': ['min', 'max', 'count']
        }).reset_index()
        
        stint_info = []
        for _, stint in stints.iterrows():
            stint_info.append({
                "stint_number": int(stint['Stint']),
                "compound": stint['Compound']['first'],
                "start_lap": int(stint['LapNumber']['min']),
                "end_lap": int(stint['LapNumber']['max']),
                "total_laps": int(stint['LapNumber']['count'])
            })
        
        return {
            "driver": driver_code,
            "round": round_number,
            "fastest_lap": str(fastest_lap),
            "average_lap": str(avg_lap),
            "total_laps": len(driver_laps),
            "stints": stint_info,
            "finish_position": int(driver_laps.iloc[-1]['Position']) if 'Position' in driver_laps.columns else None
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
