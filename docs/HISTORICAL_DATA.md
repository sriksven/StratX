# Historical F1 Data Integration

## Overview

StratX now includes comprehensive historical Formula 1 data from **1950 to 2024** (75 years) using the **Ergast API**.

---

## Features

### 📅 **Archive Page**
- **URL**: `/results/archive`
- **Display**: Grid of all F1 seasons from 2024 (top-left) to 1950
- **Interaction**: Click any year to view that season's complete results

### 🏆 **Season Pages** (Dynamic)
- **URL**: `/results/{year}` (e.g., `/results/2024`, `/results/2000`, `/results/1950`)
- **Content**:
  - Drivers' World Champion (name, team, points)
  - Constructors' Champion (name, points)
  - Navigation to full standings and race results

### 📊 **Data Available**

For each season (1950-2024), the following data is fetched from Ergast API:

#### **Champions**
- Driver Champion: Name, Team, Points
- Constructor Champion: Name, Points

#### **Race Results**
- All races for the season
- Race name, circuit, country, date
- Winner and winning team

#### **Standings**
- Complete driver standings (position, driver, team, points, wins)
- Complete constructor standings (position, constructor, points, wins)

---

## API Integration

### **Ergast API**
- **Base URL**: `https://ergast.com/api/f1`
- **Documentation**: http://ergast.com/mrd/
- **Rate Limit**: 4 requests per second, 200 per hour
- **Data Coverage**: 1950-2024 (updated after each race)

### **Endpoints Used**

```typescript
// Get all races and results for a season
GET /f1/{year}/results.json?limit=100

// Get driver standings
GET /f1/{year}/driverStandings.json

// Get constructor standings
GET /f1/{year}/constructorStandings.json

// Get specific race results
GET /f1/{year}/{round}/results.json
```

---

## Implementation Details

### **Service Layer** (`ergast.ts`)

```typescript
import { fetchSeasonData } from '../services/ergast';

// Fetch complete season data
const seasonData = await fetchSeasonData(2024);
```

**Returns**:
```typescript
{
  year: number;
  driverChampion: {
    name: string;
    team: string;
    points: number;
  };
  constructorChampion: {
    name: string;
    points: number;
  };
  races: Array<{
    round: number;
    name: string;
    circuit: string;
    country: string;
    date: string;
    winner: string;
    team: string;
  }>;
  driverStandings: Array<{
    position: number;
    driver: string;
    team: string;
    points: number;
    wins: number;
  }>;
  constructorStandings: Array<{
    position: number;
    constructor: string;
    points: number;
    wins: number;
  }>;
}
```

### **React Query Integration**

```typescript
const { data: seasonData, isLoading, error } = useQuery({
    queryKey: ['season', year],
    queryFn: () => fetchSeasonData(year),
    enabled: year < 2025,
    staleTime: Infinity, // Historical data doesn't change
});
```

---

## User Experience

### **Loading States**
- Spinner animation while fetching data
- "Loading {year} season data..." message

### **Error Handling**
- Error message if data fetch fails
- "Back to Archive" link to return to year grid

### **Performance**
- **Caching**: Historical data cached indefinitely (staleTime: Infinity)
- **Lazy Loading**: Data only fetched when year is selected
- **Optimized**: Only enabled for historical years (< 2025)

---

## Future Enhancements

### **Planned Features**
1. **Championship Progression Charts** for historical seasons
2. **Head-to-Head Comparisons** across different eras
3. **Circuit Statistics** over time
4. **Driver Career Statistics** aggregated across seasons
5. **Team Evolution** tracking across decades
6. **Record Breakers** highlighting historical achievements

### **Data Expansion**
- Qualifying results
- Fastest laps
- Pole positions
- DNF statistics
- Weather conditions
- Lap-by-lap data (where available)

---

## Technical Notes

### **2025 Season**
- Uses hardcoded data (current season)
- Includes championship progression chart
- Will transition to API when season completes

### **Historical Seasons (1950-2024)**
- Fetched from Ergast API
- Cached indefinitely
- No progression chart (data not available)

### **Data Accuracy**
- Ergast API is the official F1 historical data source
- Data updated regularly
- Covers all Formula 1 World Championship seasons

---

## Usage Examples

### **View 2024 Season**
```
Navigate to: /results/2024
```

### **Browse All Seasons**
```
Navigate to: /results/archive
Click on any year (e.g., 2010, 1988, 1950)
```

### **Access from Header**
```
RESULTS dropdown → Archive (1950-2024)
```

---

## Credits

- **Ergast API**: http://ergast.com/mrd/
- **Data Source**: Formula 1 World Championship
- **Maintained by**: Chris Newell

---

## License

Historical F1 data provided by Ergast API under their terms of use.
StratX implementation: MIT License
