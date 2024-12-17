# StratX Frontend

Modern, real-time F1 telemetry dashboard built with React, TypeScript, and Vite.

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:5173`

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI** (optional):
   ```bash
   npm install -g vercel
   ```

2. **Deploy via Vercel Dashboard**:
   - Push your code to GitHub
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite configuration
   - Click "Deploy"

3. **Deploy via CLI**:
   ```bash
   cd frontend
   vercel
   ```

4. **Environment Variables**:
   In Vercel dashboard, add:
   - `VITE_API_URL`: Your backend API URL (e.g., `https://your-api.vercel.app/api`)

### Deploy to GitHub Pages

1. **Update `vite.config.ts`**:
   ```typescript
   export default defineConfig({
     base: '/StratX/', // Your repo name
     // ... rest of config
   })
   ```

2. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Add deploy scripts to `package.json`**:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Select `gh-pages` branch
   - Save

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── components/        # React components
│   │   ├── Header.tsx
│   │   ├── LiveTelemetry.tsx
│   │   ├── PredictionCards.tsx
│   │   ├── TelemetryCharts.tsx
│   │   └── DriverComparison.tsx
│   ├── hooks/            # Custom React hooks
│   │   ├── useTelemetry.ts
│   │   ├── usePredictions.ts
│   │   └── useTelemetryHistory.ts
│   ├── services/         # API services
│   │   └── api.ts
│   ├── types/            # TypeScript types
│   │   └── index.ts
│   ├── App.tsx           # Main app component
│   ├── App.css
│   ├── index.css         # Global styles & design system
│   └── main.tsx          # Entry point
├── public/               # Static assets
├── index.html
├── vite.config.ts
├── vercel.json          # Vercel configuration
└── package.json
```

## 🎨 Features

- **Real-Time Telemetry**: Live speed, RPM, throttle, brake gauges
- **ML Predictions**: 5 AI models for race strategy
  - Lap time prediction
  - Tyre degradation
  - Pit window recommendations
  - Overtake probability
  - Anomaly detection
- **Performance Charts**: Speed, throttle, and tyre wear visualization
- **Driver Comparison**: Live standings table
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark Theme**: F1-inspired racing aesthetics

## 🔧 Configuration

### Environment Variables

Create a `.env` file:

```env
VITE_API_URL=http://localhost:8000/api
```

For production, set this to your deployed backend URL.

### API Integration

The app uses mock data by default for development. To connect to a real backend:

1. Deploy the FastAPI backend (see `/backend` directory)
2. Update `VITE_API_URL` in your environment variables
3. The app will automatically try to fetch from the API and fall back to mocks if unavailable

## 🎯 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TanStack Query** - Data fetching & caching
- **Recharts** - Data visualization
- **Axios** - HTTP client
- **Lucide React** - Icons

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## 🚦 Development Tips

### Mock Data

The app includes comprehensive mock data generators in `src/services/api.ts`. This allows you to:
- Develop the frontend independently
- Test UI without backend
- Demo the application

### Live Mode Toggle

Use the "Go Live" button to enable/disable real-time data fetching. When live mode is off, queries are paused.

### Customization

- **Colors**: Edit CSS custom properties in `src/index.css`
- **Refresh Rates**: Adjust `refetchInterval` in hooks
- **Components**: All components are modular and can be used independently

## 📄 License

MIT
