'use client'

import { useState, useEffect } from 'react'

interface Video {
  id: string
  title: string
}

export default function VideoClips() {
  const [loadedVideos, setLoadedVideos] = useState<string[]>([])
  
  const youtubeVideos: Video[] = [
    { id: 'aOJUwvuEhrU', title: 'Performance 1' },
    { id: 'PZR6y6kO4K0', title: 'Performance 2' },
    { id: 'XLjo9w5M7PQ', title: 'Performance 3' },
    { id: 'dGfU76VsBzc', title: 'Performance 4' },
    { id: '0wX9DsQts0c', title: 'Performance 5' },
    { id: 'IanYOoBP7BU', title: 'Performance 6' },
    { id: 'xzp_ouzdCH8', title: 'Performance 7' },
    { id: '5Or2phAjy4k', title: 'Performance 8' },
    { id: '5DFBGkKK4vw', title: 'Performance 9' },
  ]

  useEffect(() => {
    // Animate videos on load
    youtubeVideos.forEach((_, index) => {
      setTimeout(() => {
        setLoadedVideos(prev => [...prev, `video-${index}`])
      }, index * 100)
    })
  }, [])

  return (
    <div className="video-clips-page">
      <div className="video-hero">
        <div className="video-hero-content">
          <h1 className="video-hero-title">Video Clips</h1>
          <p className="video-hero-description">Experience the magic of live performances and music videos</p>
          <div className="video-hero-divider"></div>
        </div>
      </div>

      <div className="container video-content-wrapper">
        <div className="video-intro">
          <h2 className="video-intro-title">Music Videos & Performances</h2>
          <p className="video-intro-text">
            Dive into a collection of captivating performances and music videos featuring Meri Hakobyan. 
            From intimate acoustic sessions to powerful stage performances, discover the artistry and passion 
            behind each musical creation.
          </p>
        </div>
        
        <div className="video-grid-enhanced">
          {youtubeVideos.map((video, index) => (
            <a
              key={video.id}
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`video-card-enhanced ${loadedVideos.includes(`video-${index}`) ? 'loaded' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="video-card-wrapper">
                <div className="video-thumbnail-enhanced">
                  <img
                    src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                    alt={video.title}
                    onError={(e) => {
                      e.currentTarget.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`
                    }}
                  />
                  <div className="video-overlay">
                    <div className="video-play-button-enhanced">
                      <svg viewBox="0 0 68 48">
                        <path d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.63-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#f00"></path>
                        <path d="M 45,24 27,14 27,34" fill="#fff"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="video-duration">Watch Now</div>
                </div>
                <div className="video-info">
                  <div className="video-title-enhanced">
                    <svg className="video-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                    <span>{video.title}</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

