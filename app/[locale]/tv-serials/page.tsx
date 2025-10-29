'use client'

import { useState, useEffect } from 'react'

export default function TVSerials() {
  const [loadedItems, setLoadedItems] = useState<number[]>([])
  
  const serials = [
    { name: 'Serial 1', desc: 'A compelling drama series featuring captivating storylines and dynamic characters. Follow the journey through love, loss, and triumph.' },
    { name: 'Serial 2', desc: 'An emotional television serial that explores deep human connections and the power of family bonds. A must-watch drama series.' },
    { name: 'Serial 3', desc: 'An engaging serial with rich narrative and unforgettable characters. Experience the beauty of Armenian storytelling.' },
  ]

  useEffect(() => {
    serials.forEach((_, index) => {
      setTimeout(() => {
        setLoadedItems(prev => [...prev, index])
      }, index * 150)
    })
  }, [])

  return (
    <div className="tv-serials-page">
      <div className="serials-hero">
        <div className="serials-hero-content">
          <h1 className="serials-hero-title">TV Serials</h1>
          <p className="serials-hero-description">Dive into captivating television serials and stories</p>
          <div className="serials-hero-divider"></div>
        </div>
      </div>

      <div className="container serials-content-wrapper">
        <div className="serials-intro">
          <h2 className="serials-intro-title">Featured Serials</h2>
          <p className="serials-intro-text">
            Discover our collection of television serials featuring compelling narratives, 
            dynamic characters, and powerful storytelling in Armenian television.
          </p>
        </div>
        
        <div className="serials-grid">
          {serials.map((serial, index) => (
            <div
              key={index}
              className={`serial-card ${loadedItems.includes(index) ? 'loaded' : ''}`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="serial-card-header">
                <div className="serial-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="7" width="20" height="15" rx="2"/>
                    <path d="M17 7v10M7 7v10"/>
                  </svg>
                </div>
                <h3 className="serial-card-title">{serial.name}</h3>
              </div>
              <p className="serial-card-desc">{serial.desc}</p>
              <button className="serial-watch-btn">
                Watch Now →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

