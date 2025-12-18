import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomePage from './pages/HomePage';
import RaceDetailPage from './pages/RaceDetailPage';
import DriversPage from './pages/DriversPage';
import TeamsPage from './pages/TeamsPage';
import SchedulePage from './pages/SchedulePage';
import ResultsPage from './pages/ResultsPage';
import NewsPage from './pages/NewsPage';
import CircuitsPage from './pages/CircuitsPage';
import Header from './components/Header';
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
  return (
    <QueryClientProvider client={queryClient}>
      <Router basename="/StratX">
        <div className="app">
          <Header />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/race/:raceId" element={<RaceDetailPage />} />
            <Route path="/drivers" element={<DriversPage />} />
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/circuits" element={<CircuitsPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/schedule/:year" element={<SchedulePage />} />
            <Route path="/schedule/archive" element={<SchedulePage />} />
            <Route path="/results/:year" element={<ResultsPage />} />
            <Route path="/results/:year/drivers" element={<ResultsPage />} />
            <Route path="/results/:year/teams" element={<ResultsPage />} />
            <Route path="/results/archive" element={<ResultsPage />} />
          </Routes>

          <footer className="footer">
            <div className="footer-container">
              <p>&copy; 2025 StratX | F1 Analytics Platform</p>
              <p className="footer-tech">
                Powered by OpenF1 API & FastF1
              </p>
            </div>
          </footer>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
