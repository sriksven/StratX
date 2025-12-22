"""
Pre-cache all 2025 F1 race data using FastF1.
This downloads and caches race results for all 24 rounds of the 2025 season.
Run this once to avoid slow first-load times in the API.
"""
import fastf1
import os
from tqdm import tqdm

# Setup cache
cache_dir = '/tmp/fastf1_cache'
os.makedirs(cache_dir, exist_ok=True)
fastf1.Cache.enable_cache(cache_dir)

# 2025 season has 24 races
TOTAL_ROUNDS = 24

def download_race_data(round_number: int):
    """Download and cache data for a specific race round."""
    try:
        print(f"\n📥 Downloading Round {round_number}...")
        session = fastf1.get_session(2025, round_number, 'R')
        session.load()
        
        # Get basic info
        event = session.event
        results = session.results
        
        if not results.empty:
            winner = results.iloc[0]['Abbreviation']
            print(f"✅ Round {round_number}: {event['EventName']} - Winner: {winner}")
            return True
        else:
            print(f"⚠️  Round {round_number}: No results available yet")
            return False
            
    except Exception as e:
        print(f"❌ Round {round_number}: Failed - {str(e)}")
        return False

def main():
    print("=" * 60)
    print("🏎️  StratX - FastF1 Data Pre-Cache Script")
    print("=" * 60)
    print(f"Downloading 2025 F1 season data ({TOTAL_ROUNDS} rounds)")
    print(f"Cache directory: {cache_dir}")
    print("=" * 60)
    
    successful = 0
    failed = 0
    
    for round_num in tqdm(range(1, TOTAL_ROUNDS + 1), desc="Overall Progress"):
        if download_race_data(round_num):
            successful += 1
        else:
            failed += 1
    
    print("\n" + "=" * 60)
    print("📊 Summary:")
    print(f"   ✅ Successfully cached: {successful} races")
    print(f"   ❌ Failed/Unavailable: {failed} races")
    print("=" * 60)
    print("\n🎉 Pre-caching complete! API requests will now be fast.")

if __name__ == "__main__":
    main()
