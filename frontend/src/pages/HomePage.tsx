import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, Trophy, Clock } from 'lucide-react';
import './HomePage.css';

interface RaceEvent {
  meeting_key: number;
  round: number;
  country_name: string;
  location: string;
  circuit_short_name: string;
  meeting_name: string;
  date_start: string;
  year: number;
}

interface Driver {
  driver_number: number;
  name_acronym: string;
  full_name: string;
  team_name: string;
  team_colour: string;
  headshot_url: string;
  country_code: string;
}

export default function HomePage() {
  const navigate = useNavigate();
  const [races, setRaces] = useState<RaceEvent[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [nextRace, setNextRace] = useState<RaceEvent | null>(null);
  const [countdown, setCountdown] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSeasonData();
  }, []);

  // Countdown timer for next race
  useEffect(() => {
    if (!nextRace) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const raceTime = new Date(nextRace.date_start).getTime();
      const diff = raceTime - now;

      if (diff <= 0) {
        setCountdown('RACE LIVE NOW!');
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [nextRace]);

  async function fetchSeasonData() {
    try {
      // Fetch 2025 calendar
      const racesResponse = await fetch('https://api.openf1.org/v1/meetings?year=2025');
      const racesData = await racesResponse.json();
      
      // Sort by date
      const sortedRaces = racesData.sort((a: RaceEvent, b: RaceEvent) => 
        new Date(a.date_start).getTime() - new Date(b.date_start).getTime()
      );

      setRaces(sortedRaces);

      // Find next race
      const now = Date.now();
      const upcoming = sortedRaces.find((race: RaceEvent) => 
        new Date(race.date_start).getTime() > now
      );
      setNextRace(upcoming || sortedRaces[0]);

      // Fetch drivers from most recent session
      // Note: We'll use 2024 data as 2025 might not be available yet
      const driversResponse = await fetch('https://api.openf1.org/v1/drivers?session_key=latest');
      const driversData = await driversResponse.json();
      
      // Get unique drivers
      const uniqueDrivers = Array.from(
        new Map(driversData.map((d: Driver) => [d.driver_number, d])).values()
      );
      
      setDrivers(uniqueDrivers as Driver[]);
    } catch (error) {
      console.error('Failed to fetch season data:', error);
      // Use mock data for development
      setNextRace({
        meeting_key: 1,
        round: 1,
        country_name: 'Bahrain',
        location: 'Sakhir',
        circuit_short_name: 'Bahrain',
        meeting_name: 'Bahrain Grand Prix',
        date_start: '2025-03-02T15:00:00Z',
        year: 2025
      });
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading 2025 F1 Season...</p>
      </div>
    );
  }

  return (
    <div className="homepage">
      {/* Hero Section - Next Race */}
      <section className="next-race-hero">
        <div className="hero-background"></div>
        <div className="hero-content">
          <div className="hero-badge">
            <span className="live-pulse"></span>
            NEXT RACE
          </div>
          
          <h1 className="race-name">{nextRace?.meeting_name}</h1>
          
          <div className="race-meta">
            <div className="meta-item">
              <MapPin size={20} />
              <span>{nextRace?.location}, {nextRace?.country_name}</span>
            </div>
            <div className="meta-item">
              <Calendar size={20} />
              <span>{nextRace && formatDate(new Date(nextRace.date_start))}</span>
            </div>
          </div>

          <div className="countdown-display">
            <Clock size={32} />
            <div className="countdown-time">{countdown}</div>
          </div>

          <button 
            className="cta-button"
            onClick={() => nextRace && navigate(`/race/${nextRace.meeting_key}`)}
          >
            View Race Hub
          </button>
        </div>
      </section>

      {/* 2025 Drivers Grid */}
      <section className="drivers-section">
        <div className="section-header">
          <Users size={32} />
          <h2>2025 F1 Drivers</h2>
        </div>

        <div className="drivers-grid">
          {drivers.map((driver) => (
            <div 
              key={driver.driver_number}
              className="driver-card"
              style={{ borderColor: `#${driver.team_colour}` }}
            >
              <div className="driver-image">
                <img 
                  src={driver.headshot_url || '/default-driver.png'} 
                  alt={driver.full_name}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/default-driver.png';
                  }}
                />
              </div>
              
              <div className="driver-info">
                <div className="driver-number" style={{ backgroundColor: `#${driver.team_colour}` }}>
                  {driver.driver_number}
                </div>
                <h3>{driver.name_acronym}</h3>
                <p className="driver-name">{driver.full_name}</p>
                <p className="team-name">{driver.team_name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2025 Calendar */}
      <section className="calendar-section">
        <div className="section-header">
          <Trophy size={32} />
          <h2>2025 F1 Calendar</h2>
          <span className="race-count">{races.length} Races</span>
        </div>

        <div className="calendar-grid">
          {races.map((race, index) => {
            const raceDate = new Date(race.date_start);
            const isPast = raceDate < new Date();
            const isNext = race.meeting_key === nextRace?.meeting_key;

            return (
              <div 
                key={race.meeting_key}
                className={`race-card ${isPast ? 'past' : ''} ${isNext ? 'next' : ''}`}
                onClick={() => navigate(`/race/${race.meeting_key}`)}
              >
                {isNext && <div className="next-badge">NEXT</div>}
                
                <div className="race-round">Round {index + 1}</div>
                
                <h3 className="race-title">{race.meeting_name}</h3>
                
                <div className="race-details">
                  <div className="detail-row">
                    <MapPin size={16} />
                    <span>{race.circuit_short_name}</span>
                  </div>
                  <div className="detail-row">
                    <Calendar size={16} />
                    <span>{formatDate(raceDate)}</span>
                  </div>
                </div>

                <div className="race-status">
                  {isPast ? (
                    <span className="status-past">Completed</span>
                  ) : isNext ? (
                    <span className="status-next">Up Next</span>
                  ) : (
                    <span className="status-upcoming">Upcoming</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}
