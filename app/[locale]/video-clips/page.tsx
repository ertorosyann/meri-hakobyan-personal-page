'use client'

import { useState, useEffect } from 'react'

interface Video {
  id: string
  title: string
  loading?: boolean
}

interface ImageData {
  id: number
  filename: string
  path: string
  name: string
}

export default function VideoClips() {
  const [loadedVideos, setLoadedVideos] = useState<string[]>([])
  const [availableImages, setAvailableImages] = useState<string[]>([])
  const [defaultImage, setDefaultImage] = useState<string>('/images/mi.jpg')
  
  const videoIds = [
    'aOJUwvuEhrU',
    'PZR6y6kO4K0',
    'XLjo9w5M7PQ',
    'dGfU76VsBzc',
    '0wX9DsQts0c',
    'IanYOoBP7BU',
    'xzp_ouzdCH8',
    '5Or2phAjy4k',
    '5DFBGkKK4vw',
  ]

  const [videos, setVideos] = useState<Video[]>(
    videoIds.map(id => ({ id, title: '', loading: true }))
  )

  useEffect(() => {
    // Fetch available images from the project
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/images')
        const data = await response.json()
        if (data.images && data.images.length > 0) {
          const imagePaths = data.images.map((img: ImageData) => img.path)
          setAvailableImages(imagePaths)
          // Use first image as default, or mi.jpg if it exists
          const defaultImg = imagePaths.find((path: string) => path.includes('mi.jpg')) || imagePaths[0] || '/images/mi.jpg'
          setDefaultImage(defaultImg)
        } else {
          // If no images found, use mi.jpg as default
          setDefaultImage('/images/mi.jpg')
        }
      } catch (error) {
        console.error('Error fetching images:', error)
        setDefaultImage('/images/mi.jpg')
      }
    }

    fetchImages()

    // Fetch video titles from YouTube oEmbed API
    const fetchVideoTitles = async () => {
      const videoPromises = videoIds.map(async (videoId) => {
        try {
          const response = await fetch(
            `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
          )
          if (response.ok) {
            const data = await response.json()
            return { id: videoId, title: data.title, loading: false }
          }
        } catch (error) {
          console.error(`Error fetching title for video ${videoId}:`, error)
        }
        return { id: videoId, title: `Performance ${videoIds.indexOf(videoId) + 1}`, loading: false }
      })

      const fetchedVideos = await Promise.all(videoPromises)
      setVideos(fetchedVideos)
    }

    fetchVideoTitles()

    // Animate videos on load
    videoIds.forEach((_, index) => {
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
            Dive into a collection of captivating performances and music videos featuring Merri Hakobyan. 
            From intimate acoustic sessions to powerful stage performances, discover the artistry and passion 
            behind each musical creation.
          </p>
        </div>
        
        <div className="video-grid-enhanced">
          {videos.map((video, index) => (
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
                      const target = e.currentTarget as HTMLImageElement
                      // Try hqdefault first
                      if (!target.src.includes('hqdefault')) {
                        target.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`
                      } else if (availableImages.length > 0) {
                        // Use a project image as fallback (cycle through available images)
                        const imageIndex = videoIds.indexOf(video.id) % availableImages.length
                        target.src = availableImages[imageIndex]
                      } else {
                        // Final fallback to default image
                        target.src = defaultImage
                        target.onerror = () => {
                          // If default image also fails, show placeholder
                          target.style.display = 'none'
                          const placeholder = document.createElement('div')
                          placeholder.className = 'video-placeholder-default'
                          placeholder.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>'
                          target.parentElement?.appendChild(placeholder)
                        }
                      }
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
                    <span>{video.loading ? 'Loading...' : video.title || `Performance ${index + 1}`}</span>
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

