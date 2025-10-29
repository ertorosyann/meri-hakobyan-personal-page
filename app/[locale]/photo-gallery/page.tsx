'use client'

import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'

interface ImageData {
  id: number
  filename: string
  path: string
  name: string
}

export default function PhotoGallery() {
  const [loadedItems, setLoadedItems] = useState<number[]>([])
  const [images, setImages] = useState<ImageData[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch images from API
  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch('/api/images')
        const data = await response.json()
        if (data.images && data.images.length > 0) {
          setImages(data.images)
        } else {
          // Fallback to placeholder images if no images found
          setImages(Array.from({ length: 12 }, (_, i) => ({
            id: i + 1,
            filename: `placeholder-${i + 1}.jpg`,
            path: '',
            name: `Photo ${i + 1}`
          })))
        }
      } catch (error) {
        console.error('Error fetching images:', error)
        // Fallback to placeholder images on error
        setImages(Array.from({ length: 12 }, (_, i) => ({
          id: i + 1,
          filename: `placeholder-${i + 1}.jpg`,
          path: '',
          name: `Photo ${i + 1}`
        })))
      } finally {
        setLoading(false)
      }
    }
    fetchImages()
  }, [])

  // Generate random sizes for each photo (stable across re-renders)
  const photoSizes = useMemo(() => {
    return images.map(() => Math.random() > 0.5 ? 'large' : 'small')
  }, [images])

  useEffect(() => {
    if (images.length > 0) {
      images.forEach((_, index) => {
        setTimeout(() => {
          setLoadedItems(prev => [...prev, index])
        }, index * 80)
      })
    }
  }, [images])

  return (
    <div className="photo-gallery-page">
      <div className="gallery-hero">
        <div className="gallery-hero-content">
          <h1 className="gallery-hero-title">Photo Gallery</h1>
          <p className="gallery-hero-description">Capturing moments from performances and events</p>
          <div className="gallery-hero-divider"></div>
        </div>
      </div>

      <div className="container gallery-content-wrapper">
        <div className="gallery-intro-section">

          
          <div className="gallery-intro-content">
            
            <h2 className="gallery-intro-title">
              Capturing <span className="gradient-text">Memories</span> & <span className="gradient-text">Moments</span>
            </h2>
            <p className="gallery-intro-text">
              A visual journey through live performances, events, and special occasions. 
              Each photograph preserves a moment in time, showcasing the passion and artistry 
              of Armenian entertainment culture.
            </p>
            <div className="gallery-features">
              <div className="feature-item">
                <div className="feature-dot"></div>
                <span>Live Performances</span>
              </div>
              <div className="feature-item">
                <div className="feature-dot"></div>
                <span>Special Events</span>
              </div>
              <div className="feature-item">
                <div className="feature-dot"></div>
                <span>Behind the Scenes</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="gallery-grid">
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading images...</p>
            </div>
          ) : (
            images.map((image, index) => {
              // Random size assignment (stable across re-renders)
              const sizeClass = photoSizes[index] === 'large' ? 'gallery-card-large' : 'gallery-card-small'
              
              return (
                <div
                  key={image.id}
                  className={`gallery-card ${sizeClass} ${loadedItems.includes(index) ? 'loaded' : ''}`}
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <div className="gallery-card-image">
                    {image.path ? (
                      <Image
                        src={image.path}
                        alt={image.name}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="photo-placeholder">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                          <circle cx="8.5" cy="8.5" r="1.5"/>
                          <polyline points="21 15 16 10 5 21"/>
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="gallery-card-overlay">
                    <div className="gallery-card-info">
                      <span className="photo-number">{image.name}</span>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

