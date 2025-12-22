
# StratX  
### **Real-Time F1 Telemetry and Machine Learning Race Strategy Engine**

StratX is an **end-to-end, fully open-source, real-time Formula 1 race strategy platform** that transforms live telemetry into actionable race insights using **streaming pipelines**, **feature stores**, **machine learning models**, and an interactive **race strategy dashboard**.

Built with **FastF1**, **OpenF1**, **Ergast API**, **Kafka**, **Flink/Faust**, **Feast**, **MLflow**, **Seldon**, **Prometheus**, and **Grafana**.

---

## Features

### Historical F1 Data (1950-2024)
- **Complete Archive**: Access 75 years of Formula 1 history via Ergast API
- **Season Overview**: Champions, race results, and standings for every season
- **Interactive Archive Grid**: Browse all seasons from 1950-2024
- **Historical Analysis**:
  - Season-long performance trends
  - Circuit-specific statistics
  - Head-to-head driver comparisons
  - Qualifying vs race pace analysis
  - Tyre degradation patterns
  - Pit stop efficiency

### 2025 Season Features
- **Live Season Tracking**: Real-time championship standings
- **Championship Progression Chart**: Interactive visualization of points accumulation
- **Race Results**: Detailed results for all 24 races
- **Podium Visualization**: Stunning race winner displays
- **Driver & Team Standings**: Complete championship tables

### Real-Time Streaming
- Ingest live telemetry from **OpenF1 API**
- Replay historical sessions using **FastF1**
- Stream raw data → Kafka topics in real time

### Real-Time Feature Engineering
- Rolling lap features  
- Stint metrics  
- Pace deltas  
- Driver aggression metrics  
- Gap computations  

### ML Prediction Models
StratX includes **advanced predictive models**, trained on **40+ races from the 2024-2025 seasons**:

> **[Read the Full ML Documentation](docs/ml_readme.md)**

| Model | Type | Accuracy (MAE) | Description |
|-------|------|----------------|-------------|
| **Lap-Time Prediction** | **Gradient Boosting** | **~0.5s** | Predicts next lap time based on tyre life, track temp, and driver pace. |
| **Tyre Degradation** | Physics Decay | N/A | Simulates non-linear grip falloff and "cliff" points. |
| **Pit Window** | Statistical | N/A | Suggests optimal 1-stop strategy windows. |
| **Overtake Probability** | Probabilistic | N/A | Estimates pass chance based on gap & tyre delta. |
| **Anomaly Detection** | Rules Engine | N/A | Flags mechanical issues (e.g., High RPM + Low Speed). |

### Live Strategy Dashboard
Interactive UI (React + TypeScript):
- Telemetry gauges (speed, throttle, RPM)
- Live ML model predictions
- Wear curves & pace falloff charts
- Traffic gaps visualization
- Alerts for tyre cliff, anomalies, pit window
- Historical data exploration

### MLOps & Observability
- MLflow for experiment tracking & model registry  
- Feast for feature store (online/offline)  
- Seldon/FastAPI for live inference  
- Prometheus metrics & Grafana dashboards  
- Evidently AI for drift monitoring  
- Great Expectations for data quality  

---

## Architecture Overview

```
FastF1 (Historical)      OpenF1 (Live API)
         │                       │
         ▼                       ▼
                 Ingestion Service
                        │
                        ▼
                    Kafka Streams
                        │
                        ▼
          Streaming Feature Pipeline (Flink/Faust)
                        │
               ┌────────┴────────┐
               ▼                 ▼
        Feast Online Store   MLflow Registry
               │                 │
               └──────┬──────────┘
                      ▼
             Model Serving (Seldon/FastAPI)
                      ▼
             StratX Live Strategy Dashboard
```

---

## Project Structure

```
StratX/
├── .github/workflows/    # CI/CD Workflows
├── api/                  # Vercel Serverless Entry Points
├── configs/              # Configuration files
├── docs/                 # Documentation
├── frontend/             # React Application
├── notebooks/            # Jupyter Notebooks for Analysis
├── src/
│   └── stratx/
│       ├── api/          # FastAPI Backend Application
│       ├── data/         # Data Ingestion & Processing
│       └── ml/           # Machine Learning Pipelines
├── tests/                # Unit & Integration Tests
├── Makefile              # Project Management Commands
├── pyproject.toml        # Python Package & Dependency Management
├── README.md             # Project Documentation
└── vercel.json           # Vercel Deployment Config
```

---

## Getting Started

### **1. Clone the project**
```bash
git clone https://github.com/yourname/stratx.git
cd stratx
```

### **2. Install Dependencies**
```bash
# Install backend package in editable mode
make install
```

### **3. Start the Backend**
```bash
make run-backend
```
The API will be available at `http://localhost:8000`.

### **4. Start the Frontend**
```bash
make run-frontend
```
The dashboard will be available at `http://localhost:5173`.

---

## Deployment

### Frontend (GitHub Pages)

This project is configured to automatically deploy to GitHub Pages on every push to the `main` branch.

1. Go to **Settings** → **Pages** in your repository.
2. Select **GitHub Actions** as the source.

### Backend (Vercel)

The backend is configured for serverless deployment on Vercel.

1. **Install Vercel CLI**: `npm i -g vercel`
2. **Deploy**:
   ```bash
   make deploy-backend
   ```

**GitHub Actions Automation**:
To enable the automated workflow:
1. Get your Vercel Token from Account Settings.
2. Get your `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` from the Vercel project settings (or run `vercel link` locally to see them in `.vercel`).
3. Add these as Repository Secrets in GitHub: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.

---

## License

MIT License.

---

## If you like this project, give it a star!
