from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import uvicorn

from data_pipeline.openf1_client import OpenF1Client
from ml_pipeline.race_predictor import RacePredictor

app = FastAPI(title="StratX Race Strategy Engine")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In prod, specify the frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = OpenF1Client()
predictor = RacePredictor()

class PredictionRequest(BaseModel):
    driver_number: int
    session_key: int

@app.get("/")
def health_check():
    return {"status": "online", "system": "StratX Engine"}

@app.get("/api/live/session")
def get_live_session():
    """Get the current live session key."""
    key = client.get_active_session_key()
    if not key:
        return {"status": "no_live_session", "session_key": None}
    return {"status": "live", "session_key": key}

@app.get("/api/predictions/lap_time")
def predict_lap_time(session_key: int, driver_number: int):
    """Predict next lap time for a driver."""
    # 1. Fetch recent laps
    laps = client.get_laps(session_key, driver_number)
    
    # 2. Run Inference
    prediction = predictor.predict_next_lap_time(str(driver_number), laps)
    
    return {
        "driver_number": driver_number,
        "predicted_next_lap": prediction,
        "unit": "seconds"
    }

@app.get("/api/predictions/tyre_life")
def predict_tyre_life(session_key: int, driver_number: int, compound: str = "SOFT"):
    """Predict tyre degradation."""
    # In a real app, we'd fetch the current stint's lap count from OpenF1
    # For now, we mock the stint lap count logic
    stint_laps = 12 # Mock value: assume 12 laps into the stint
    
    life_percentage = predictor.predict_tyre_life(str(driver_number), compound, stint_laps)
    
    return {
        "driver_number": driver_number,
        "compound": compound,
        "current_stint_laps": stint_laps,
        "predicted_life_remaining": life_percentage,
        "status": "CRITICAL" if life_percentage < 20 else "OK"
    }

@app.get("/api/predictions/strategy_window")
def strategy_window(session_key: int, driver_number: int, total_laps: int = 50):
    """Get pit stop window recommendation."""
    # Fetch current lap
    # Mocking current lap as 20
    current_lap = 20 
    
    window = predictor.predict_pit_window(str(driver_number), current_lap, total_laps)
    return window

@app.get("/api/race-control/feed")
def get_race_admin_feed(session_key: int):
    """Proxy for Race Control messages."""
    return client.get_race_control(session_key)

if __name__ == "__main__":
    uvicorn.run("src.api.main:app", host="0.0.0.0", port=8000, reload=True)
