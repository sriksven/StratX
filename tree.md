StratX/
├── README.md
├── docker-compose.yml
├── pyproject.toml
├── requirements.txt
│
├── configs/
│   ├── base.yaml
│   ├── dev.yaml
│   └── prod.yaml
│
├── data/
│   ├── raw/                     # FastF1 & OpenF1 dumps (offline)
│   └── features_offline/        # Parquet/CSV training features
│
├── notebooks/
│   ├── 01_explore_fastf1.ipynb
│   ├── 02_build_training_sets.ipynb
│   └── 03_model_prototyping.ipynb
│
├── infra/
│   ├── k8s/                      # (Optional) KServe/Seldon, Kafka, Feast on Kubernetes
│   └── terraform/                # (Optional) Cloud infrastructure
│
├── src/
│   ├── common/
│   │   ├── config.py
│   │   ├── logging.py
│   │   ├── schemas.py            # Pydantic models (telemetry, features, predictions)
│   │   └── kafka_utils.py
│   │
│   ├── ingestion/
│   │   ├── openf1_client.py      # Pull live data from OpenF1 API
│   │   ├── fastf1_loader.py      # Load historical FastF1 data
│   │   ├── kafka_producer.py     # Push events to Kafka
│   │   └── __main__.py           # Entrypoint: start ingestion service
│   │
│   ├── feature_pipeline/
│   │   ├── streaming/
│   │   │   ├── faust_app.py      # Real-time rolling features
│   │   │   └── feature_defs.py
│   │   ├── batch/
│   │   │   ├── build_offline_features.py
│   │   │   └── label_generation.py
│   │   └── feast_repo/
│   │       ├── feature_store.yaml
│   │       ├── data_sources.py
│   │       ├── entities.py
│   │       └── feature_views.py
│   │
│   ├── models/
│   │   ├── lap_time/
│   │   │   ├── model.py
│   │   │   ├── train.py
│   │   │   └── infer.py
│   │   ├── tyre_wear/
│   │   │   ├── model.py
│   │   │   ├── train.py
│   │   │   └── infer.py
│   │   ├── pit_window/
│   │   │   ├── model.py
│   │   │   ├── train.py
│   │   │   └── infer.py
│   │   ├── overtake_prob/
│   │   │   ├── model.py
│   │   │   ├── train.py
│   │   │   └── infer.py
│   │   └── anomaly/
│   │       ├── model.py
│   │       ├── train.py
│   │       └── infer.py
│   │
│   ├── training/
│   │   ├── pipeline_lap_time.py
│   │   ├── pipeline_tyre_wear.py
│   │   ├── pipeline_pit_window.py
│   │   ├── pipeline_overtake.py
│   │   └── pipeline_anomaly.py
│   │
│   ├── serving/
│   │   ├── api_gateway/
│   │   │   ├── main.py           # FastAPI endpoint for all predictions
│   │   │   └── routers/
│   │   │       ├── lap_time.py
│   │   │       ├── tyre_wear.py
│   │   │       ├── pit_window.py
│   │   │       ├── overtake.py
│   │   │       └── anomaly.py
│   │   ├── seldon/               # Optional: Seldon Core deployment
│   │   └── bento/                # Optional: BentoML deployment
│   │
│   ├── monitoring/
│   │   ├── metrics_exporter.py   # Prometheus metrics
│   │   ├── drift_evidently.py    # Data & prediction drift monitoring
│   │   └── validation_checks.py  # Data validation with Great Expectations
│   │
│   └── dashboards/
│       ├── grafana/
│       │   ├── stratx_dashboard.json
│       │   └── datasources.yaml
│       └── streamlit_app/
│           ├── app.py
│           ├── components/
│           │   ├── gauges.py
│           │   ├── prediction_cards.py
│           │   └── charts.py
│           └── services/
│               ├── api_client.py
│               ├── telemetry_client.py
│               └── state.py
│
└── tests/
    ├── test_ingestion.py
    ├── test_feature_pipeline.py
    ├── test_models.py
    ├── test_serving.py
    └── test_monitoring.py
