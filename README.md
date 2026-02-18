# Weather App (Vite + React + Tailwind)

Glassmorphic, responsive weather app using OpenWeatherMap API. Ready for Vercel and Netlify.

**Quick start**

1. Install deps:

```bash
npm install
```

2. Add your API key in `.env`:

```
VITE_WEATHER_API_KEY=your_api_key_here
```

3. Run dev server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

Deployment:
- Vercel: just import the repo and set `VITE_WEATHER_API_KEY` in project env vars. Build command: `npm run build`.
- Netlify: set `VITE_WEATHER_API_KEY` in Netlify UI. Build command: `npm run build`; publish directory: `dist`.

Files of interest:
- `src/App.jsx` - main app logic
- `src/components/WeatherCard.jsx` - UI card
- `src/components/SearchBar.jsx` - search input
- `src/services/weatherService.js` - API calls
