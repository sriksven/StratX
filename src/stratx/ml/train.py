
import fastf1
import pandas as pd
import numpy as np
import os
import joblib
import logging
from sklearn.ensemble import GradientBoostingRegressor, RandomForestRegressor
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.metrics import mean_absolute_error

# Configure Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Constants
CACHE_DIR = '.cache'
MODEL_DIR = 'src/stratx/ml/models'
TRAIN_ROUNDS = [1, 2, 3, 4, 5]  # Train on first 5 races of 2025
SEASON = 2025

if not os.path.exists(CACHE_DIR):
    os.makedirs(CACHE_DIR)
fastf1.Cache.enable_cache(CACHE_DIR)

def get_race_data(round_num: int, season: int = 2025):
    try:
        session = fastf1.get_session(season, round_num, 'R')
        session.load(weather=True, telemetry=False, laps=True) # Telemetry false for speed
        return session
    except Exception as e:
        logger.error(f"Failed to load session {season} R{round_num}: {e}")
        return None

def prepare_dataset(rounds):
    all_laps = []
    
    for r in rounds:
        logger.info(f"Processing Round {r}...")
        session = get_race_data(r, SEASON)
        if session is None:
            continue
            
        laps = session.laps
        # Filter mostly valid laps
        laps = laps.pick_quicklaps().reset_index(drop=True)
        
        # Features
        # We need: Driver, Team, Circuit, Compound, TyreLife, LapNumber, TrackTemp
        
        # Circuit Info
        circuit_id = session.event.EventName # Use Name as proxy for ID
        
        track_temp = session.weather_data['TrackTemp'].mean()
        air_temp = session.weather_data['AirTemp'].mean()
        
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
        
    if not all_laps:
        return pd.DataFrame()
        
    return pd.concat(all_laps, ignore_index=True)

def train_lap_time_model(df):
    logger.info("Training Lap Time Model...")
    
    # Drop rows with NaNs in critical columns
    df = df.dropna(subset=['LapTime', 'Compound', 'TyreLife'])
    
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
        
    model = Pipeline(steps=[
        ('preprocessor', preprocessor),
        ('regressor', GradientBoostingRegressor(n_estimators=100, max_depth=5))
    ])
    
    model.fit(X, y)
    
    # Evaluate briefly
    preds = model.predict(X)
    mae = mean_absolute_error(y, preds)
    logger.info(f"Lap Time Model MAE (Train): {mae:.3f} s")
    
    joblib.dump(model, os.path.join(MODEL_DIR, 'lap_time_model.pkl'))
    return model

def main():
    logger.info("Starting Data Collection for Training...")
    df = prepare_dataset(TRAIN_ROUNDS)
    logger.info(f"Dataset Shape: {df.shape}")
    
    if df.empty:
        logger.error("No data collected. Exiting.")
        return

    train_lap_time_model(df)
    logger.info("Training Complete.")

if __name__ == "__main__":
    main()
