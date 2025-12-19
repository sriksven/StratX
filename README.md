
# StratX  
### **Real-Time F1 Telemetry and Machine Learning Race Strategy Engine**

StratX is an **end-to-end, fully open-source, real-time Formula 1 race strategy platform** that transforms live telemetry into actionable race insights using **streaming pipelines**, **feature stores**, **machine learning models**, and an interactive **race strategy dashboard**.

Built with **FastF1**, **OpenF1**, **Ergast API**, **Kafka**, **Flink/Faust**, **Feast**, **MLflow**, **Seldon**, **Prometheus**, and **Grafana**.

---

## Features

### 📊 Historical F1 Data (1950-2024)
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

### 🏎️ 2025 Season Features
- **Live Season Tracking**: Real-time championship standings
- **Championship Progression Chart**: Interactive visualization of points accumulation
- **Race Results**: Detailed results for all 24 races
- **Podium Visualization**: Stunning race winner displays
- **Driver & Team Standings**: Complete championship tables

### 🔴 Real-Time Streaming
- Ingest live telemetry from **OpenF1 API**
- Replay historical sessions using **FastF1**
- Stream raw data → Kafka topics in real time

### ⚙️ Real-Time Feature Engineering
- Rolling lap features  
- Stint metrics  
- Pace deltas  
- Driver aggression metrics  
- Gap computations  

### 🤖 5 ML Prediction Models
StratX includes **five independent models**, trained offline and served in real-time:

| Model | Description |
|-------|-------------|
| **Lap-Time Prediction** | Predicts next lap time |
| **Tyre Degradation** | Predicts tyre falloff score |
| **Pit Window Recommendation** | Suggests optimal pit timing |
| **Overtake Probability** | Predicts overtaking chances in 1–3 laps |
| **Anomaly Detection** | Detects mechanical/driver irregularities |

### 📱 Live Strategy Dashboard
Interactive UI (React + TypeScript):
- Telemetry gauges (speed, throttle, RPM)
- Live ML model predictions
- Wear curves & pace falloff charts
- Traffic gaps visualization
- Alerts for tyre cliff, anomalies, pit window
- Historical data exploration

### 🛠️ MLOps & Observability
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
├── README.md
├── docker-compose.yml
├── requirements.txt
│
├── configs/
│   ├── base.yaml
│   └── dev.yaml
│
├── data/
│   ├── raw/
│   └── features_offline/
│
├── notebooks/
│   ├── 01_explore_fastf1.ipynb
│   ├── 02_build_training_sets.ipynb
│   └── 03_model_prototyping.ipynb
│
├── infra/
│   ├── k8s/
│   └── terraform/
│
├── src/
│   ├── common/
│   ├── ingestion/
│   ├── feature_pipeline/
│   ├── models/
│   ├── training/
│   ├── serving/
│   ├── monitoring/
│   └── dashboards/
│
└── tests/
```

---

## Getting Started

### **1. Clone the project**
```bash
git clone https://github.com/yourname/stratx.git
cd stratx
```

### **2. Start the frontend**
```bash
cd frontend
npm install
npm run dev
```

The dashboard will be available at `http://localhost:5173`

### **3. (Optional) Start backend services**
```bash
docker-compose up -d
```

### **4. (Optional) Run ingestion**
```bash
python -m src.ingestion
```

### **5. (Optional) Start streaming feature pipeline**
```bash
python src/feature_pipeline/streaming/faust_app.py
```

### **6. (Optional) Train models**
```bash
python src/models/lap_time/train.py
```

> **Note**: The frontend works with mock data by default, so you can explore the dashboard without setting up the backend infrastructure.

---

## Deployment

### GitHub Pages

This project is configured to automatically deploy to GitHub Pages on every push to the `main` branch.

#### **Setup GitHub Pages (One-time)**

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. The workflow will automatically deploy on the next push

#### **Access Your Deployed Site**

After the workflow completes, your site will be available at:
```
https://[your-username].github.io/StratX/
```

#### **Manual Deployment**

You can also trigger a deployment manually:
1. Go to the **Actions** tab in your GitHub repository
2. Select the **Deploy to GitHub Pages** workflow
3. Click **Run workflow**

#### **Local Build Test**

To test the production build locally before deploying:
```bash
cd frontend
npm run build
npm run preview
```

---

## License

MIT License.

---

## If you like this project, give it a star!
