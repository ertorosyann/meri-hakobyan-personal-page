'use client'

import { useState, useEffect } from 'react'

export default function TVProgrammes() {
  const [loadedItems, setLoadedItems] = useState<number[]>([])
  
  const programs = [
    { id: 1, name: 'Show 1', schedule: 'Monday - Friday, 8:00 PM' },
    { id: 2, name: 'Show 2', schedule: 'Saturday, 10:00 PM' },
    { id: 3, name: 'Show 3', schedule: 'Sunday, 3:00 PM' },
    { id: 4, name: 'Show 4', schedule: 'Weekdays, 6:00 PM' },
    { id: 5, name: 'Show 5', schedule: 'Weekdays, 7:00 PM' },
    { id: 6, name: 'Show 6', schedule: 'Monday, 9:00 PM' },
  ]

  useEffect(() => {
    programs.forEach((_, index) => {
      setTimeout(() => {
        setLoadedItems(prev => [...prev, index])
      }, index * 100)
    })
  }, [])

  return (
    <div className="tv-programmes-page">
      <div className="programmes-hero">
        <div className="programmes-hero-content">
          <h1 className="programmes-hero-title">TV Programmes</h1>
          <p className="programmes-hero-description">Watch our exciting television shows and programs</p>
          <div className="programmes-hero-divider"></div>
        </div>
      </div>

      <div className="container programmes-content-wrapper">
        <div className="programmes-intro">
          <h2 className="programmes-intro-title">Featured Programs</h2>
          <p className="programmes-intro-text">
            Explore our lineup of television programs featuring entertaining content, 
            news segments, and special shows with Meri Hakobyan as host.
          </p>
        </div>
        
        <div className="programmes-list">
          {programs.map((program, index) => (
            <div
              key={program.id}
              className={`programme-card ${loadedItems.includes(index) ? 'loaded' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="programme-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="M10 4v16M14 4v16"/>
                </svg>
              </div>
              <div className="programme-card-content">
                <h3 className="programme-card-title">{program.name}</h3>
                <p className="programme-card-schedule">{program.schedule}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

