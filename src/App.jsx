import React, { useEffect, useState } from 'react'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import { fetchWeatherByCity } from './services/weatherService'

export default function App() {
  // App state
  const [city, setCity] = useState('San Francisco') // default city
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Fetch when city changes
  useEffect(() => {
    let active = true
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const result = await fetchWeatherByCity(city)
        if (!active) return
        setData(result)
      } catch (err) {
        if (!active) return
        setError(err.message)
        setData(null)
      } finally {
        if (active) setLoading(false)
      }
    }
    load()
    return () => { active = false }
  }, [city])

  const handleSearch = (q) => {
    setCity(q)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="app-bg" />
      <div className="w-full max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Weather</h1>
          <p className="text-slate-200">Search current weather by city — glassmorphic UI</p>
        </div>

        <div className="flex justify-center mb-6">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="flex justify-center">
          {loading && (
            <div className="p-8 glass-card bg-white/6 border border-white/20 rounded-xl">
              <svg className="animate-spin h-8 w-8 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-600/20 border border-red-600/30 text-red-100 rounded-md">{error}</div>
          )}

          {!loading && !error && data && <WeatherCard data={data} />}
        </div>
      </div>
    </div>
  )
}
