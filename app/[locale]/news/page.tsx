'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'

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

export default function News() {
  const t = useTranslations()
  const [loadedItems, setLoadedItems] = useState<number[]>([])
  const [loadedVideos, setLoadedVideos] = useState<string[]>([])
  const [availableImages, setAvailableImages] = useState<string[]>([])
  const [defaultImage, setDefaultImage] = useState<string>('/images/mi.jpg')
  
  const newsItems = [
    { id: 1, title: 'New Album Release', date: '2024-01-15', category: 'Music' },
    { id: 2, title: 'TV Show Premiere', date: '2024-01-10', category: 'Television' },
    { id: 3, title: 'Concert Announcement', date: '2024-01-05', category: 'Events' },
    { id: 4, title: 'Award Recognition', date: '2024-01-01', category: 'Achievement' },
  ]

  const interviewVideoIds = [
    '5xyKMMozMo4',
    '4n06XUKN9RI',
    '5GD8xIOliwo',
    'kQkfYYisk2U',
    '6McZqc0_t_M',
    'kY0INbsEBzw',
    'KPSLUSPO_yE',
    'qGpV7-WlCm8',
    'bagaDBy4n1M',
  ]

  const [interviewVideos, setInterviewVideos] = useState<Video[]>(
    interviewVideoIds.map(id => ({ id, title: '', loading: true }))
  )
  
  // Video IDs that don't have YouTube thumbnails - use default images immediately
  const problematicVideoIds = new Set([
    '5GD8xIOliwo',
    'kQkfYYisk2U',
    'qGpV7-WlCm8',
    'bagaDBy4n1M',
    '5KorQ6AZYm8'
  ])

  useEffect(() => {
    newsItems.forEach((_, index) => {
      setTimeout(() => {
        setLoadedItems(prev => [...prev, index])
      }, index * 120)
    })

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
      const videoPromises = interviewVideoIds.map(async (videoId) => {
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
        return { id: videoId, title: `Interview ${interviewVideoIds.indexOf(videoId) + 1}`, loading: false }
      })

      const fetchedVideos = await Promise.all(videoPromises)
      setInterviewVideos(fetchedVideos)
    }

    fetchVideoTitles()

    // Animate videos on load
    interviewVideoIds.forEach((_, index) => {
      setTimeout(() => {
        setLoadedVideos(prev => [...prev, `video-${index}`])
      }, index * 100)
    })
  }, [])

  return (
    <div className="news-page">
      <div className="news-hero">
        <div className="news-hero-content">
          <h1 className="news-hero-title">{t('news.title')}</h1>
          <p className="news-hero-description">{t('news.subtitle')}</p>
          <div className="news-hero-divider"></div>
        </div>
      </div>

      <div className="container news-content-wrapper">
        {/* Media Interviews and Press Coverage Section */}
        <div className="interviews-section">
          <div className="interviews-intro">
            <h2 className="interviews-intro-title">{t('news.interviewsTitle')}</h2>
            <p className="interviews-intro-text">
              {t('news.interviewsDescription')}
            </p>
          </div>
          
          <div className="video-grid-enhanced">
            {interviewVideos.map((video, index) => (
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
                    {problematicVideoIds.has(video.id) ? (
                      // Use default image immediately for problematic videos
                      <img
                        src={availableImages.length > 0 
                          ? availableImages[interviewVideoIds.indexOf(video.id) % availableImages.length]
                          : defaultImage}
                        alt={video.title}
                        onError={(e) => {
                          const target = e.currentTarget as HTMLImageElement
                          target.src = defaultImage
                          target.onerror = () => {
                            target.style.display = 'none'
                            const placeholder = document.createElement('div')
                            placeholder.className = 'video-placeholder-default'
                            placeholder.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>'
                            target.parentElement?.appendChild(placeholder)
                          }
                        }}
                      />
                    ) : (
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
                            const imageIndex = interviewVideoIds.indexOf(video.id) % availableImages.length
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
                    )}
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
                      <span>{video.loading ? 'Loading...' : video.title || `Interview ${index + 1}`}</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

