'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'

export default function Home() {
  const t = useTranslations()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [displayedText, setDisplayedText] = useState('')
  const [particles, setParticles] = useState<Array<{ left: string; delay: string; duration: string }>>([])
  const fullText = t('homepage.subtitle')

  const carouselImages = [
    {
      url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1200',
      title: t('homepage.title'),
      subtitle: t('homepage.subtitle'),
      description: t('homepage.description')
    },
    {
      url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200',
      title: 'Live Performance',
      subtitle: 'Entertainment',
      description: 'Amazing Performances'
    },
    {
      url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200',
      title: 'Music & Culture',
      subtitle: 'Armenian Heritage',
      description: 'Preserving Traditions'
    }
  ]

  // Generate particles with fixed values on client-side only
  useEffect(() => {
    const particleData = Array.from({ length: 20 }, () => ({
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${5 + Math.random() * 5}s`
    }))
    setParticles(particleData)
  }, [])

  // Typing effect animation
  useEffect(() => {
    // Reset displayed text when fullText changes (language change)
    setDisplayedText('')
    
    let index = 0
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(typingInterval)
      }
    }, 150)

    return () => clearInterval(typingInterval)
  }, [currentSlide, fullText])

  // Auto-slide animation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
        setIsAnimating(false)
      }, 300)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
      setIsAnimating(false)
    }, 300)
  }

  const prevSlide = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
      setIsAnimating(false)
    }, 300)
  }

  return (
    <div className="carousel-container">
      {/* Floating particles background */}
      {particles.length > 0 && (
        <div className="particles">
          {particles.map((particle, i) => (
            <div key={i} className="particle" style={{
              left: particle.left,
              animationDelay: particle.delay,
              animationDuration: particle.duration
            }} />
          ))}
        </div>
      )}

      <div 
        className={`carousel-slide ${isAnimating ? 'sliding' : ''}`}
        style={{ backgroundImage: `url(${carouselImages[currentSlide].url})` }}
      >
        <div className="carousel-overlay">
          <div className="carousel-content">
            <h1 className="animated-title">{carouselImages[currentSlide].title}</h1>
            <h2 className="animated-subtitle">
              {currentSlide === 0 ? (
                <span className="typing-effect">{displayedText}<span className="cursor">|</span></span>
              ) : (
                carouselImages[currentSlide].subtitle
              )}
            </h2>
            <p className="animated-description">{carouselImages[currentSlide].description}</p>
          </div>
        </div>
      </div>
      
      <button className="carousel-button prev" onClick={prevSlide} aria-label="Previous slide">
        ‹
      </button>
      <button className="carousel-button next" onClick={nextSlide} aria-label="Next slide">
        ›
      </button>

      <div className="carousel-dots">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
