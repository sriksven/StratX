
import fastf1
import pandas as pd
import numpy as np
import os
import joblib
import logging
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import mean_absolute_error

# Configure Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Constants
CACHE_DIR = '.cache'
MODEL_DIR = 'src/stratx/ml/models'
TRAIN_SEASONS = [2024, 2025] 

if not os.path.exists(CACHE_DIR):
    os.makedirs(CACHE_DIR)
fastf1.Cache.enable_cache(CACHE_DIR)

def get_race_data(round_num: int, season: int):
    try:
        session = fastf1.get_session(season, round_num, 'R')
        session.load(weather=True, telemetry=False, laps=True) # Telemetry false for speed
        return session
    except Exception as e:
        logger.error(f"Failed to load session {season} R{round_num}: {e}")
        return None

def get_all_rounds(year):
    try:
        schedule = fastf1.get_event_schedule(year)
        # Filter for completed races (conventional)
        # We assume if it has a session key or is in the past, we can try to load it.
        # fastf1 usually handles this. Let's just take all conventional races.
        round_numbers = schedule[schedule['EventFormat'] == 'conventional']['RoundNumber'].tolist()
        return round_numbers
    except Exception as e:
        logger.error(f"Error fetching schedule for {year}: {e}")
        return []

def prepare_dataset(seasons):
    all_laps = []
    
    for season in seasons:
        rounds = get_all_rounds(season)
        logger.info(f"Processing Season {season} ({len(rounds)} rounds)...")
        
        for r in rounds:
            logger.info(f"  -> Loading Round {r}...")
            session = get_race_data(r, season)
            if session is None:
                continue
                
            try:
                laps = session.laps
                if laps is None or laps.empty:
                    continue
                    
                # Filter mostly valid laps
                laps = laps.pick_quicklaps().reset_index(drop=True)
                
                # Features
                circuit_id = session.event.EventName 
                track_temp = session.weather_data['TrackTemp'].mean() if not session.weather_data.empty else 30.0
                air_temp = session.weather_data['AirTemp'].mean() if not session.weather_data.empty else 25.0
                
                # Prepare DataFrame
                df = pd.DataFrame({
                    'Driver': laps['Driver'],
                    'Team': laps['Team'],
                    'Circuit': circuit_id,
                    'Compound': laps['Compound'],
                    'TyreLife': laps['TyreLife'],
                    'LapNumber': laps['LapNumber'],
                    'TrackTemp': track_temp,
                    'AirTemp': air_temp,
                    'LapTime': laps['LapTime'].dt.total_seconds()
                })
                
                all_laps.append(df)
            except Exception as e:
                 logger.warning(f"Skipping Round {r} due to data error: {e}")

    if not all_laps:
        return pd.DataFrame()
        
    return pd.concat(all_laps, ignore_index=True)

def train_lap_time_model(df):
    logger.info("Training Lap Time Model...")
    
    # Drop rows with NaNs in critical columns
    df = df.dropna(subset=['LapTime', 'Compound', 'TyreLife'])
    
    # Convert types if necessary to ensure string format for categoricals
    df['Driver'] = df['Driver'].astype(str)
    df['Team'] = df['Team'].astype(str)
    df['Circuit'] = df['Circuit'].astype(str)
    df['Compound'] = df['Compound'].astype(str)
    
    X = df[['Driver', 'Team', 'Circuit', 'Compound', 'TyreLife', 'LapNumber', 'TrackTemp']]
    y = df['LapTime']
    
    # Preprocessing
    categorical_features = ['Driver', 'Team', 'Circuit', 'Compound']
    numerical_features = ['TyreLife', 'LapNumber', 'TrackTemp']
    
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', StandardScaler(), numerical_features),
            ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)
        ])
    
    # Increased complexity for better fitting on larger dataset
    model = Pipeline(steps=[
        ('preprocessor', preprocessor),
        ('regressor', GradientBoostingRegressor(n_estimators=200, max_depth=7, learning_rate=0.1))
    ])
    
    model.fit(X, y)
    
    # Evaluate briefly (on Training set - simplistic)
    preds = model.predict(X)
    mae = mean_absolute_error(y, preds)
    logger.info(f"Lap Time Model MAE (Train): {mae:.3f} s")
    
    if not os.path.exists(MODEL_DIR):
        os.makedirs(MODEL_DIR)
        
    joblib.dump(model, os.path.join(MODEL_DIR, 'lap_time_model.pkl'))
    return model

def main():
    logger.info("Starting Extensive Data Collection (2024-2025)...")
    logger.info("This may take a while if data is not cached.")
    
    df = prepare_dataset(TRAIN_SEASONS)
    logger.info(f"Dataset Shape: {df.shape}")
    
    if df.empty:
        logger.error("No data collected. Exiting.")
        return

    train_lap_time_model(df)
    logger.info("Extensive Training Complete.")

if __name__ == "__main__":
    main()
