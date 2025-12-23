"""
Generate static JSON files for all 2025 race results.
This allows the frontend to work without a backend API.
"""
import fastf1
import json
import os
from pathlib import Path

# Enable FastF1 cache
cache_dir = '/tmp/fastf1_cache'
os.makedirs(cache_dir, exist_ok=True)
fastf1.Cache.enable_cache(cache_dir)

# Output directory
output_dir = Path(__file__).parent.parent / 'frontend' / 'public' / 'data' / '2025'
output_dir.mkdir(parents=True, exist_ok=True)

print("🏎️  Generating static JSON files for all 2025 races...")

all_races = []

for round_number in range(1, 25):  # 24 races
    try:
        print(f"  Loading Round {round_number}...")
        session = fastf1.get_session(2025, round_number, 'R')
        session.load()
        
        results = session.results
        if results.empty:
            print(f"  ⚠️  Round {round_number}: No results")
            continue
        
        # Format results
        race_results = []
        for idx, row in results.iterrows():
            race_results.append({
                "position": int(row['Position']) if not row.isna()['Position'] else None,
                "driver": row['Abbreviation'],
                "driver_number": int(row['DriverNumber']),
                "team": row['TeamName'],
                "time": str(row['Time']) if not row.isna()['Time'] else 'DNF',
                "points": int(row['Points']) if not row.isna()['Points'] else 0,
                "status": row['Status'] if not row.isna()['Status'] else 'Finished',
                "grid_position": int(row['GridPosition']) if not row.isna()['GridPosition'] else None,
            })
        
        event = session.event
        
        race_data = {
            "round": round_number,
            "race_name": event['EventName'],
            "country": event['Country'],
            "location": event['Location'],
            "circuit": event['OfficialEventName'],
            "date": str(event['EventDate']),
            "results": race_results,
            "total_laps": int(session.total_laps) if hasattr(session, 'total_laps') else None,
        }
        
        # Save individual race file
        race_file = output_dir / f'race_{round_number}.json'
        with open(race_file, 'w') as f:
            json.dump(race_data, f, indent=2)
        
        all_races.append(race_data)
        print(f"  ✅ Round {round_number}: {event['EventName']} ({len(race_results)} drivers)")
        
    except Exception as e:
        print(f"  ❌ Round {round_number}: Failed - {str(e)}")

# Save all races in one file
all_races_file = output_dir / 'all_races.json'
with open(all_races_file, 'w') as f:
    json.dump(all_races, f, indent=2)

print(f"\n🎉 Generated {len(all_races)} race files!")
print(f"📁 Output directory: {output_dir}")
