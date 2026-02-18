import React from 'react'

/**
 * Presentational component for weather display.
 * Receives the `data` prop which is the OpenWeatherMap response.
 */
export default function WeatherCard({ data }) {
  if (!data) return null

  const { name, main, weather, wind } = data
  const icon = weather?.[0]?.icon
  const description = weather?.[0]?.description

  return (
    <div className="glass-card bg-white/20 border border-white/30 rounded-2xl shadow-lg p-6 w-full max-w-xl">
      <div className="flex items-center gap-6">
        <div className="flex-shrink-0">
          {icon && (
            <img
              src={icon}
              alt={description}
              className="w-28 h-28 object-contain"
            />
          )}
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-semibold">{name}</h2>
          <p className="text-6xl font-bold mt-2">{main.temp !== null ? Math.round(main.temp) : '—'}°C</p>
          <p className="capitalize mt-1 text-slate-200">{description}</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 text-sm text-slate-200">
        <div className="p-2 bg-white/5 rounded-md">
          <div className="font-medium">Humidity</div>
          <div>{main.humidity ?? '—'}%</div>
        </div>
        <div className="p-2 bg-white/5 rounded-md">
          <div className="font-medium">Wind</div>
          <div>{wind.speed ?? '—'} m/s</div>
        </div>
        <div className="p-2 bg-white/5 rounded-md">
          <div className="font-medium">Pressure</div>
          <div>{main.pressure ?? '—'} hPa</div>
        </div>
      </div>
    </div>
  )
}
