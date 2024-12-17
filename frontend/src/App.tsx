import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header.tsx';
import LiveTelemetry from './components/LiveTelemetry.tsx';
import PredictionCards from './components/PredictionCards.tsx';
import TelemetryCharts from './components/TelemetryCharts.tsx';
import DriverComparison from './components/DriverComparison.tsx';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 2000, // Refetch every 2 seconds for live data
      staleTime: 1000,
    },
  },
});

function App() {
  const [selectedDriver, setSelectedDriver] = useState<string>('VER');
  const [isLive, setIsLive] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <Header isLive={isLive} onToggleLive={() => setIsLive(!isLive)} />

        <main className="main-content">
          <div className="container">
            {/* Hero Section */}
            <section className="hero-section">
              <div className="hero-content">
                <h1 className="hero-title">
                  <span className="racing-gradient glow-text">StratX</span>
                </h1>
                <p className="hero-subtitle">
                  Real-Time F1 Telemetry & AI-Powered Race Strategy
                </p>
                <div className="hero-stats">
                  <div className="stat-item">
                    <div className="stat-value">5</div>
                    <div className="stat-label">ML Models</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">&lt;2s</div>
                    <div className="stat-label">Latency</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">Real-Time</div>
                    <div className="stat-label">Streaming</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Live Telemetry Gauges */}
            <section className="section">
              <h2 className="section-title">
                <span className="status-dot status-live"></span>
                Live Telemetry
              </h2>
              <LiveTelemetry driver={selectedDriver} isLive={isLive} />
            </section>

            {/* ML Predictions */}
            <section className="section">
              <h2 className="section-title">AI Predictions</h2>
              <PredictionCards driver={selectedDriver} isLive={isLive} />
            </section>

            {/* Telemetry Charts */}
            <section className="section">
              <h2 className="section-title">Performance Analytics</h2>
              <TelemetryCharts driver={selectedDriver} isLive={isLive} />
            </section>

            {/* Driver Comparison */}
            <section className="section">
              <h2 className="section-title">Driver Comparison</h2>
              <DriverComparison isLive={isLive} />
            </section>
          </div>
        </main>

        <footer className="footer">
          <div className="container">
            <p>
              Built with FastF1, OpenF1, Kafka, Feast, MLflow & React
            </p>
            <p className="footer-tech">
              Deployed on Vercel | Open Source on GitHub
            </p>
          </div>
        </footer>
      </div>
    </QueryClientProvider>
  );
}

export default App;
