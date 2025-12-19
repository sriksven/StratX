import fastf1
from fastf1.ergast import Ergast
import json
import os
import pandas as pd
import time
import numpy as np

# Configuration
START_YEAR = 2019
END_YEAR = 2024
SEASONS_DIR = "frontend/public/data/seasons"
RACES_DIR = "frontend/public/data/races"

for d in [SEASONS_DIR, RACES_DIR, "scripts/cache"]:
    os.makedirs(d, exist_ok=True)

# Enable cache for persistence/speed
fastf1.Cache.enable_cache('scripts/cache')
ergast = Ergast()

# Helper functions for safe type conversion
def safe_int(val, default=0):
    try:
        if pd.isna(val): return default
        return int(val)
    except:
        return default

def safe_float(val, default=0.0):
    try:
        if pd.isna(val): return default
        return float(val)
    except:
        return default

def fetch_year(year):
    print(f"Processing {year}...", end=" ", flush=True)
    try:
        # 1. Fetch Schedule
        schedule = fastf1.get_event_schedule(year)
        
        # 3. Fetch Standings
        drivers_resp = ergast.get_driver_standings(season=year, limit=100)
        drivers_df = drivers_resp.content[0]
        
        constructors_df = pd.DataFrame()
        if year >= 1958:
            const_resp = ergast.get_constructor_standings(season=year, limit=100)
            constructors_df = const_resp.content[0]

        # --- PROCESS RACES (Iterate Schedule) ---
        formatted_races = []
        
        for _, event in schedule.iterrows():
            # Skip testing events
            r = safe_int(event.get('RoundNumber'), 0)
            if r == 0: continue
            
            # Fetch results for this specific round
            try:
                res_resp = ergast.get_race_results(season=year, round=r, limit=100)
                if not res_resp.content: continue
                race_res = res_resp.content[0]
            except Exception as e:
                continue
                
            if race_res.empty: continue

            # Find winner (position 1)
            winner = race_res[race_res['position'] == 1]
            winner = winner.iloc[0] if not winner.empty else None
            
            race_name = event.get('EventName', f"Round {r}")
            circuit_name = event.get('Location', "Unknown")
            country = event.get('Country', "Unknown")
            date = str(event.get('EventDate', "Unknown")).split(' ')[0]
            
            winner_name = f"{winner['givenName']} {winner['familyName']}" if winner is not None else "Unknown"
            winner_team = "Unknown"
            if winner is not None:
                winner_team = winner.get('constructorName', 'Unknown')

            formatted_races.append({
                "round": r,
                "name": race_name,
                "circuit": circuit_name,
                "country": country,
                "date": date,
                "winner": winner_name,
                "team": winner_team
            })
            
            # --- SAVE INDIVIDUAL RACE DETAILS ---
            race_simple_results = []
            for _, row in race_res.iterrows():
                status = row.get('status', 'Finished')
                time_val = status
                # If time column exists (needs checking probe or structure)
                
                race_simple_results.append({
                    "position": safe_int(row['position']),
                    "driver": f"{row['givenName']} {row['familyName']}",
                    "team": row.get('constructorName', 'Unknown'),
                    "time": time_val, 
                    "points": safe_float(row['points']),
                    "status": status
                })
            
            race_detail_json = {
                "raceName": race_name,
                "circuit": circuit_name,
                "country": country,
                "date": date,
                "results": race_simple_results
            }
            
            path = f"{RACES_DIR}/{year}"
            os.makedirs(path, exist_ok=True)
            with open(f"{path}/{r}.json", "w") as f:
                json.dump(race_detail_json, f, indent=2)

        # Process Standings
        format_drivers = []
        for _, d in drivers_df.iterrows():
             team = "Unknown"
             if 'constructorName' in d: team = d['constructorName']
             elif 'constructorNames' in d: 
                 val = d['constructorNames']
                 team = val[0] if isinstance(val, list) and len(val) > 0 else str(val)
             
             format_drivers.append({
                 "position": safe_int(d['position']),
                 "driver": f"{d['givenName']} {d['familyName']}",
                 "team": team,
                 "points": safe_float(d['points']),
                 "wins": safe_int(d['wins'])
             })

        format_constructors = []
        for _, c in constructors_df.iterrows():
            format_constructors.append({
                "position": safe_int(c['position']),
                "constructor": c.get('constructorName', 'Unknown'),
                "points": safe_float(c['points']),
                "wins": safe_int(c['wins'])
            })

        # Identify Champions
        d_champ = format_drivers[0] if format_drivers else None
        c_champ = format_constructors[0] if format_constructors else None

        season_data = {
            "year": year,
            "driverChampion": {
                "name": d_champ['driver'] if d_champ else "Unknown",
                "team": d_champ['team'] if d_champ else "Unknown",
                "points": d_champ['points'] if d_champ else 0
            },
            "constructorChampion": {
                "name": c_champ['constructor'] if c_champ else "Unknown",
                "points": c_champ['points'] if c_champ else 0
            },
            "races": formatted_races,
            "driverStandings": format_drivers,
            "constructorStandings": format_constructors
        }
        
        with open(f"{SEASONS_DIR}/{year}.json", "w") as f:
            json.dump(season_data, f, indent=2)
            
        print("✅")
        return True

    except Exception as e:
        print(f"❌ {e}")
        # import traceback
        # traceback.print_exc()
        return False

print("Starting FastF1 download...")
for y in range(START_YEAR, END_YEAR + 1):
    fetch_year(y)
    time.sleep(3) # Be very polite to avoid 429

print("Download complete!")
