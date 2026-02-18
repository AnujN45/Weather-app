// Service to fetch weather data from Weatherstack and normalize shape
const BASE = 'http://api.weatherstack.com/current'
const CORS_PROXY = 'https://api.allorigins.win/raw?url='

/**
 * Fetch current weather for a city name using Weatherstack API.
 * Uses CORS proxy for browser compatibility.
 * Normalizes the response into a shape compatible with the UI.
 * @param {string} city
 * @returns {Promise<Object>} normalized weather data
 */
export async function fetchWeatherByCity(city) {
  const key = import.meta.env.VITE_WEATHER_API_KEY
  if (!key) throw new Error('Missing API key. Set VITE_WEATHER_API_KEY in .env')

  const apiUrl = `${BASE}?access_key=${encodeURIComponent(key)}&query=${encodeURIComponent(city)}`
  const proxiedUrl = CORS_PROXY + encodeURIComponent(apiUrl)
  const res = await fetch(proxiedUrl)
  const data = await res.json()

  // Error handling based on Weatherstack response
  if (data.error) {
    const msg = data.error.info || data.error.type || 'Failed to fetch weather'
    throw new Error(msg)
  }

  const location = data.location || {}
  const current = data.current || {}

  // Normalize to a structure similar to OpenWeatherMap so UI components remain simple
  return {
    name: location.name || city,
    main: {
      temp: current.temperature ?? null,
      humidity: current.humidity ?? null,
      pressure: current.pressure ?? null
    },
    weather: [
      {
        // Weatherstack provides full icon URLs in `weather_icons`
        icon: (current.weather_icons && current.weather_icons[0]) || null,
        description: (current.weather_descriptions && current.weather_descriptions[0]) || ''
      }
    ],
    wind: {
      speed: current.wind_speed ?? null
    }
  }
}
