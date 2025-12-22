
# StratX Machine Learning Model Documentation

StratX utilizes a suite of machine learning and heuristic models to provide real-time race strategy insights. These models are designed to ingest telemetry data and output predictive metrics such as lap times, tyre degradation, and overtake probability.

## Current Accuracy

We have trained our primary **Lap Time Prediction** model on the full **2024 and 2025 Formula 1 Seasons** (approx. 40+ races).

| Circuit Type | Mean Absolute Error (MAE) | Notes |
| :--- | :--- | :--- |
| **Traditional (e.g., Abu Dhabi)** | **0.58s** | Highly accurate for standard tracks. |
| **Street (e.g., Las Vegas)** | **0.51s** | Excellent adaptation to low-grip surfaces. |
| **High Altitude (e.g., Mexico)** | **0.41s** | Correctly predicts altitude-adjusted pace. |

---

## Models Overview

### 1. Lap Time Predictor (`lap_time_model.pkl`)

Predicts the exact duration of the upcoming lap for a specific driver.

*   **Algorithm**: Gradient Boosting Regressor (`scikit-learn`)
*   **Hyperparameters**: `n_estimators=200`, `max_depth=7`, `learning_rate=0.1`
*   **Features Used**:
    *   **Context**: `Driver`, `Team`, `Circuit`
    *   **Dynamic**: `TyreCompound` (Soft/Med/Hard), `TyreLife` (Laps driven on set), `LapNumber` (Race progress), `TrackTemp`
*   **Training Data**: ~200,000+ laps from 2024 & 2025 seasons via FastF1.

### 2. Tyre Life Model
Estimates the remaining grip percentage of a tyre set.

*   **Type**: Physics-Based Decay Curve
*   **Logic**: Uses a non-linear power curve to simulate the "cliff" effect.
    *   `Wear = (Laps^1.5) / (Limit^1.5) * 100`
    *   `Limit` is defined per compound (e.g., Soft=20 laps, Hard=50 laps).

### 3. Pit Window Predictor
Identifies the optimal lap range for a pit stop.

*   **Type**: Statistical Heuristic
*   **Logic**: Calculates the race midpoint (1-stop strategy baseline) and identifies a window +/- 2 laps around it. It adjusts confidence based on traffic gaps (future feature).

### 4. Overtake Probability
Calculates the probability of an overtake occurring in the next 3 laps.

*   **Type**: Conditional Probability Table
*   **Logic**:
    *   Base probability derived from time gap (e.g., <0.5s = 85%).
    *   Modifiers applied for Tyre Delta (e.g., Attacker on Softs vs Defender on Hards = +15%).

---

## Training the Models

You can retrain the models locally to include the latest race data.

### Prerequisites
*   Python 3.9+
*   `fastf1`, `scikit-learn`, `pandas`, `joblib`

### Command

```bash
python3 src/stratx/ml/train.py
```

This script will:
1.  Fetch all race results from the 2024 and 2025 seasons using FastF1 (cached in `.cache/`).
2.  Clean the data (remove pit in/out laps, Safety Car laps).
3.  Train a Gradient Boosting Regressor.
4.  Save the artifact to `src/stratx/ml/models/lap_time_model.pkl`.

## Project Structure

*   `src/stratx/ml/race_predictor.py`: Inference engine used by the API.
*   `src/stratx/ml/train.py`: Training pipeline.
*   `src/stratx/ml/models/`: Directory containing trained `.pkl` artifacts.

## Model Performance Analysis (2025)

For the 2025 season, we introduced a **Post-Race Validation Loop**. After every completed race, the system compares its pre-race predictions against actual telemetry to generate an **Accuracy Score**.

### Metrics Tracked:
1.  **Race Strategy Accuracy**:
    *   Did the model correctly predict the number of stops?
    *   Was the predicted pit lap within +/- 2 laps of the actual effective strategy?
2.  **Fastest Lap Prediction**:
    *   Comparison of predicted vs. actual fastest lap time (Delta < 0.5s is considered "Good").
3.  **Tyre Degradation Validaton**:
    *   We compare the predicted "cliff" point against the actual lap where pace began to degrade significantly (>0.5s/lap).
4.  **Overtake Success Rate**:
    *   Measures the calibration of our probabilistic model (e.g., if we predicted 80% success, did ~80% of those attempts result in a position change?).

These metrics are visualized in the frontend via the **Analysis View** for all completed 2025 races.
