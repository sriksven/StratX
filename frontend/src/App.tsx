import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomePage from './pages/HomePage';
import RaceDetailPage from './pages/RaceDetailPage';
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
      <Router>
        <div className="app">
          <Header />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/race/:raceId" element={<RaceDetailPage />} />
          </Routes>

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
      </Router>
    </QueryClientProvider>
  );
}

export default App;
