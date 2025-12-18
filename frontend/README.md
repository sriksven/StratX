# StratX - 2025 F1 Season Hub

## 🎯 New Structure

The application has been redesigned with a modern, race-focused layout:

### **Homepage** (`/`)
- **2025 F1 Season Overview**
  - Next race hero section with countdown timer
  - Complete 2025 driver grid
  - Full 2025 race calendar (24 races)
  - Click any race to view details

### **Race Detail Page** (`/race/:raceId`)
- **Weekend Schedule** - All sessions (FP1, FP2, FP3, Qualifying, Race)
- **Live Telemetry** - Real-time car data (speed, RPM, throttle, brake)
- **AI Predictions** - 5 ML models:
  1. Lap Time Prediction
  2. Tyre Degradation
  3. Pit Window Recommendation
  4. Overtake Probability
  5. Anomaly Detection
- **Analytics** - Performance charts and driver comparison

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
src/
├── pages/
│   ├── HomePage.tsx          # 2025 season overview
│   ├── HomePage.css
│   ├── RaceDetailPage.tsx    # Individual race hub
│   └── RaceDetailPage.css
├── components/
│   ├── Header.tsx            # Navigation header
│   ├── LiveTelemetry.tsx     # Real-time gauges
│   ├── PredictionCards.tsx   # ML predictions
│   ├── TelemetryCharts.tsx   # Performance charts
│   └── DriverComparison.tsx  # Standings table
├── services/
│   └── api.ts                # OpenF1 API integration
├── types/
│   └── index.ts              # TypeScript types
└── App.tsx                   # Main app with routing
```

## 🔌 API Integration

### OpenF1 API Endpoints Used:

- `GET /v1/meetings?year=2025` - Race calendar
- `GET /v1/sessions?meeting_key={id}` - Session schedule
- `GET /v1/drivers?session_key=latest` - Driver list
- `GET /v1/car_data?session_key=latest` - Live telemetry
- `GET /v1/location?session_key=latest` - Car positions
- `GET /v1/intervals?session_key=latest` - Race gaps
- `GET /v1/weather?session_key=latest` - Weather data

## 🎨 Features

### Homepage
- ✅ Next race countdown timer
- ✅ 2025 driver grid with team colors
- ✅ Full race calendar with status badges
- ✅ Responsive design

### Race Detail Page
- ✅ Live/upcoming/completed race detection
- ✅ Session timeline with live indicators
- ✅ Tabbed interface (Telemetry/Predictions/Analytics)
- ✅ Driver selector
- ✅ Live mode toggle

## 🛠️ Tech Stack

- **React 19** + **TypeScript**
- **React Router** - Page navigation
- **TanStack Query** - Data fetching
- **Recharts** - Data visualization
- **Lucide React** - Icons
- **OpenF1 API** - Live F1 data

## 📱 Responsive Design

- Desktop: Full layout with all features
- Tablet: Optimized grid layouts
- Mobile: Single column, touch-friendly

## 🔮 Future Enhancements

- [ ] Live circuit map with car positions
- [ ] Real-time race commentary
- [ ] Historical race comparison
- [ ] Driver performance trends
- [ ] Team strategy analysis
- [ ] Push notifications for race events

## 📄 License

MIT
