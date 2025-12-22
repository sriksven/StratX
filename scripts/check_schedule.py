
import fastf1
import os

# Create cache directory
if not os.path.exists('.cache'):
    os.makedirs('.cache')

fastf1.Cache.enable_cache('.cache')

def check_schedule():
    try:
        schedule = fastf1.get_event_schedule(2025)
        # Filter for completed races or main races
        # In late 2025, we assume the season is done
        races = schedule[schedule['EventFormat'] == 'conventional'] # Ignore sprints for simplicity for now
        print(f"Total Events Found: {len(races)}")
        
        last_3 = races.iloc[-3:]
        print("Last 3 Races:")
        for i, row in last_3.iterrows():
            print(f"- {row['EventName']} (Round {row['RoundNumber']}) at {row['Location']}")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    check_schedule()
