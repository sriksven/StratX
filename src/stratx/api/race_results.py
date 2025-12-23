"""
Race Results API endpoints using FastF1 for real historical data.
Optimized with in-memory caching for instant retrieval.
"""
import fastf1
from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any, Optional
import pandas as pd
import os
from functools import lru_cache

router = APIRouter(prefix="/api/results", tags=["results"])

# Enable FastF1 cache
cache_dir = '/tmp/fastf1_cache'
os.makedirs(cache_dir, exist_ok=True)
fastf1.Cache.enable_cache(cache_dir)

# In-memory cache for all 2025 race data
_RACE_DATA_CACHE: Dict[int, Dict[str, Any]] = {}
_RACE_SESSIONS_CACHE: Dict[int, Any] = {}  # Store FastF1 session objects
_CACHE_LOADED = False

def load_all_2025_races():
    """
    Pre-load all 2025 race data into memory on startup.
    This makes subsequent API calls instant.
    Includes: race results, lap data, and session information.
    """
    global _CACHE_LOADED
    
    if _CACHE_LOADED:
        return
    
    # Skip pre-loading on Vercel (serverless) - load on-demand instead
    import os
    if os.getenv('VERCEL'):
        print("⚠️  Running on Vercel - skipping pre-load, will load on-demand")
        _CACHE_LOADED = True  # Mark as "loaded" to prevent re-attempts
        return
    
    print("🏎️  Loading all 2025 race data into memory...")
    
    for round_number in range(1, 25):  # 24 races
        try:
            session = fastf1.get_session(2025, round_number, 'R')
            session.load()
            
            results = session.results
            if results.empty:
                continue
            
            # Store the session object for detailed queries
            _RACE_SESSIONS_CACHE[round_number] = session
            
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
            
            event = session.event
            
            # Cache basic race info
            _RACE_DATA_CACHE[round_number] = {
                "round": round_number,
                "race_name": event['EventName'],
                "country": event['Country'],
                "location": event['Location'],
                "circuit": event['OfficialEventName'],
                "date": str(event['EventDate']),
                "results": race_results,
                "total_laps": int(session.total_laps) if hasattr(session, 'total_laps') else None,
            }
            
            print(f"  ✅ Round {round_number}: {event['EventName']} ({len(race_results)} drivers, {session.total_laps if hasattr(session, 'total_laps') else '?'} laps)")
            
        except Exception as e:
            print(f"  ⚠️  Round {round_number}: Failed - {str(e)}")
    
    _CACHE_LOADED = True
    print(f"🎉 Loaded {len(_RACE_DATA_CACHE)} races into memory!")
    print(f"📊 Total data cached: {len(_RACE_SESSIONS_CACHE)} full sessions with lap data")

@router.get("/2025/all")
async def get_all_race_results() -> List[Dict[str, Any]]:
    """
    Get all 2025 race results in a single request.
    Optimized for bulk data fetching.
    """
    if not _CACHE_LOADED:
        load_all_2025_races()
    
    return [_RACE_DATA_CACHE[round_num] for round_num in sorted(_RACE_DATA_CACHE.keys())]

@router.get("/2025/{round_number}")
async def get_race_results(round_number: int) -> Dict[str, Any]:
    """
    Fetch real 2025 race results using FastF1.
    Returns race winner, podium, and full classification.
    Data is served from in-memory cache for instant response.
    """
    # Load cache on first request
    if not _CACHE_LOADED:
        load_all_2025_races()
    
    # Serve from cache if available
    if round_number in _RACE_DATA_CACHE:
        return _RACE_DATA_CACHE[round_number]
    
    # On Vercel (serverless), load individual race on-demand
    import os
    if os.getenv('VERCEL'):
        try:
            session = fastf1.get_session(2025, round_number, 'R')
            session.load()
            
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
            raise HTTPException(status_code=500, detail=f"Failed to load race data: {str(e)}")
    
    raise HTTPException(
        status_code=404,
        detail=f"No results found for round {round_number}"
    )

@router.get("/2025/driver/{driver_code}/performance")
async def get_driver_race_performance(driver_code: str, round_number: int) -> Dict[str, Any]:
    """
    Get detailed performance metrics for a specific driver in a race.
    Used for model validation. Served from in-memory cache for instant response.
    """
    # Ensure cache is loaded
    if not _CACHE_LOADED:
        load_all_2025_races()
    
    # Check if we have this race cached
    if round_number not in _RACE_SESSIONS_CACHE:
        raise HTTPException(status_code=404, detail=f"No data for round {round_number}")
    
    try:
        session = _RACE_SESSIONS_CACHE[round_number]
        
        # Get driver laps from cached session
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
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
