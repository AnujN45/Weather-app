import React, { useState } from 'react'

/**
 * Search input component.
 * Props:
 * - onSearch(city)
 */
export default function SearchBar({ onSearch }) {
  const [text, setText] = useState('')

  const submit = (e) => {
    e.preventDefault()
    const q = text.trim()
    if (q) onSearch(q)
  }

  return (
    <form onSubmit={submit} className="w-full max-w-md flex items-center gap-2">
      <input
        aria-label="Search city"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Search city (e.g. Tokyo)"
        className="flex-1 px-4 py-2 rounded-lg bg-white/10 placeholder:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
      />
      <button
        type="submit"
        className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition shadow"
      >
        Search
      </button>
    </form>
  )
}
