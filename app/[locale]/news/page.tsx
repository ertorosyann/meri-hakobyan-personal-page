'use client'

import { useState, useEffect } from 'react'

export default function News() {
  const [loadedItems, setLoadedItems] = useState<number[]>([])
  
  const newsItems = [
    { id: 1, title: 'New Album Release', date: '2024-01-15', category: 'Music' },
    { id: 2, title: 'TV Show Premiere', date: '2024-01-10', category: 'Television' },
    { id: 3, title: 'Concert Announcement', date: '2024-01-05', category: 'Events' },
    { id: 4, title: 'Award Recognition', date: '2024-01-01', category: 'Achievement' },
  ]

  useEffect(() => {
    newsItems.forEach((_, index) => {
      setTimeout(() => {
        setLoadedItems(prev => [...prev, index])
      }, index * 120)
    })
  }, [])

  return (
    <div className="news-page">
      <div className="news-hero">
        <div className="news-hero-content">
          <h1 className="news-hero-title">News & Updates</h1>
          <p className="news-hero-description">Stay connected with the latest from Meri Hakobyan</p>
          <div className="news-hero-divider"></div>
        </div>
      </div>

      <div className="container news-content-wrapper">
        <div className="news-intro">
          <h2 className="news-intro-title">Latest News</h2>
          <p className="news-intro-text">
            Get the latest updates on performances, releases, and events featuring Meri Hakobyan.
            Stay connected with news from the world of Armenian music and television.
          </p>
        </div>
        
        <div className="news-list">
          {newsItems.map((item, index) => (
            <div
              key={item.id}
              className={`news-card ${loadedItems.includes(index) ? 'loaded' : ''}`}
              style={{ animationDelay: `${index * 0.12}s` }}
            >
              <div className="news-card-header">
                <span className="news-category">{item.category}</span>
                <span className="news-date">{item.date}</span>
              </div>
              <h3 className="news-card-title">{item.title}</h3>
              <p className="news-card-excerpt">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <button className="news-read-more">Read More →</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

