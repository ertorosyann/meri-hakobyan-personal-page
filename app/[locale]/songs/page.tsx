'use client'

import { useState, useEffect, useRef } from 'react'

interface Song {
  id: number
  title: string
  artist: string
  filename: string
  fileSize: string
}

export default function Songs() {
  const [songs, setSongs] = useState<Song[]>([])
  const [loading, setLoading] = useState(true)
  const [loadedItems, setLoadedItems] = useState<number[]>([])
  const [currentPlaying, setCurrentPlaying] = useState<number | null>(null)
  const [audioSrc, setAudioSrc] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    // Fetch songs from API
    fetch('/api/songs')
      .then(res => res.json())
      .then(data => {
        setSongs(data.songs || [])
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading songs:', err)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (!loading && songs.length > 0) {
      songs.forEach((_, index) => {
        setTimeout(() => {
          setLoadedItems(prev => [...prev, index])
        }, index * 100)
      })
    }
  }, [loading, songs])

  const handlePlay = (filename: string, id: number) => {
    const newSrc = `/music/${filename}`
    
    if (currentPlaying === id && audioSrc === newSrc) {
      // Pause if clicking the same song
      if (audioRef.current) {
        audioRef.current.pause()
        setCurrentPlaying(null)
        setAudioSrc(null)
      }
    } else {
      // Play new song
      setIsLoading(true)
      setCurrentPlaying(id)
      setAudioSrc(newSrc)
    }
  }

  const formatTime = (time: number) => {
    if (!time || !isFinite(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
      setIsLoading(false)
    }
  }

  const handleCanPlay = () => {
    setIsLoading(false)
    if (audioRef.current && currentPlaying !== null) {
      audioRef.current.play()
    }
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    if (audioRef.current && duration > 0) {
      const rect = e.currentTarget.getBoundingClientRect()
      const pos = (e.clientX - rect.left) / rect.width
      const newTime = pos * duration
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const handleDownload = (filename: string, e: React.MouseEvent) => {
    e.stopPropagation()
    
    // Create a temporary anchor element to trigger download
    const link = document.createElement('a')
    link.href = `/music/${filename}`
    link.download = filename
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="songs-page">
      {/* Hidden audio player */}
      {audioSrc && (
        <audio
          ref={audioRef}
          src={audioSrc}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onCanPlay={handleCanPlay}
          onEnded={() => {
            setCurrentPlaying(null)
            setAudioSrc(null)
            setCurrentTime(0)
            setDuration(0)
          }}
        />
      )}

      <div className="songs-hero">
        <div className="songs-hero-content">
          <h1 className="songs-hero-title">Discography</h1>
          <p className="songs-hero-description">Discover and download the musical works of Meri Hakobyan</p>
          <div className="songs-hero-divider"></div>
        </div>
      </div>

      <div className="container songs-content-wrapper">
        <div className="songs-intro">
          <h2 className="songs-intro-title">Music Collection</h2>
          <p className="songs-intro-text">
            Explore a curated collection of songs featuring the unique voice and artistry of Meri Hakobyan. 
            From powerful ballads to energetic performances, experience the diversity of Armenian music.
          </p>
        </div>
        
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading songs...</p>
          </div>
        ) : songs.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
            </div>
            <h3>No Songs Available</h3>
            <p>Add .mp3 files to the <code>public/music</code> folder to see them here.</p>
            <p className="empty-state-hint">Supported format: .mp3 files only</p>
          </div>
        ) : (
          <div className="songs-list-enhanced">
            {songs.map((song, index) => (
              <div
                key={song.id}
                className={`song-item-enhanced ${loadedItems.includes(index) ? 'loaded' : ''} ${currentPlaying === song.id ? 'playing' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div 
                  className="song-item-icon"
                  onClick={() => handlePlay(song.filename, song.id)}
                  style={{ cursor: 'pointer' }}
                >
                  {currentPlaying === song.id ? (
                    <svg viewBox="0 0 24 24" fill="currentColor" strokeWidth="2">
                      <rect x="6" y="4" width="4" height="16"/>
                      <rect x="14" y="4" width="4" height="16"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polygon points="10 8 16 12 10 16 10 8"/>
                    </svg>
                  )}
                </div>
                <div 
                  className="song-info-enhanced"
                  onClick={() => handlePlay(song.filename, song.id)}
                  style={{ cursor: 'pointer', flex: 1 }}
                >
                  <div className="song-title-enhanced">{song.title}</div>
                  <div className="song-artist-enhanced">{song.artist}</div>
                  <div className="song-meta-enhanced">
                    <span className="song-size">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '4px' }}>
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="17 8 12 3 7 8"/>
                        <line x1="12" y1="3" x2="12" y2="15"/>
                      </svg>
                      {song.fileSize}
                    </span>
                    {currentPlaying === song.id && !isLoading && (
                      <span className="playing-badge">Playing...</span>
                    )}
                    {currentPlaying === song.id && isLoading && (
                      <span className="loading-badge">
                        <span className="loading-dots">Loading</span>
                      </span>
                    )}
                  </div>
                  {currentPlaying === song.id && duration > 0 && (
                    <div className="song-progress-container">
                      <div 
                        className="song-progress-bar"
                        onClick={handleProgressClick}
                        onMouseEnter={(e) => e.currentTarget.style.cursor = 'pointer'}
                        onMouseLeave={(e) => e.currentTarget.style.cursor = 'default'}
                      >
                        <div 
                          className="song-progress-fill"
                          style={{ width: `${(currentTime / duration) * 100}%` }}
                        />
                      </div>
                      <div className="song-time-info">
                        <span className="song-current-time">{formatTime(currentTime)}</span>
                        <span className="song-separator">/</span>
                        <span className="song-duration">{formatTime(duration)}</span>
                      </div>
                    </div>
                  )}
                </div>
                <button 
                  className="download-button-enhanced"
                  onClick={(e) => handleDownload(song.filename, e)}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Download
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

