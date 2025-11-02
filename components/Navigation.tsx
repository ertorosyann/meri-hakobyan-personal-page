'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations()
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const locales: Record<string, string> = {
    en: 'English',
    hy: 'Հայերեն',
    ru: 'Русский'
  }

  const navItems = [
    { key: 'home', href: '/' },
    { key: 'bio', href: '/bio' },
    { key: 'award', href: '/award' },
    { key: 'teatre', href: '/teatre' },
    { key: 'tvSerials', href: '/tv-serials' },
    { key: 'news', href: '/news' },
    { key: 'videoClips', href: '/video-clips' },
    { key: 'songs', href: '/songs' },
    { key: 'photoGallery', href: '/photo-gallery' },
    { key: 'tvProgrammes', href: '/tv-programmes' },
    { key: 'contact', href: '/contact' },
  ]

  const switchLanguage = (newLocale: string) => {
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', newLocale)
    }
    
    // Use client-side navigation to reload with new language
    router.refresh()
    
    // Trigger language change via cookie
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`
    
    // Reload the page to apply language
    window.location.reload()
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <>
      <button 
        className={`hamburger-button ${isOpen ? 'hidden' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <div className="hamburger-icon">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      <div className={`side-menu ${isOpen ? 'open' : ''}`}>
        <div className="side-menu-overlay" onClick={() => setIsOpen(false)}></div>
        <div className="side-menu-content">
          <div className="side-menu-header">
            <h2>Merri Hakobyan</h2>
            <button 
              className="close-button"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>
          <ul className="side-menu-list">
            {navItems.map((item) => (
              <li key={item.key}>
                <Link href={`/${locale}${item.href}`} className="side-menu-link" onClick={handleLinkClick}>
                  {t(`nav.${item.key}`)}
                </Link>
              </li>
            ))}
          </ul>

          {/* Language Switcher */}
          <div className="language-switcher">
            {(Object.keys(locales) as Array<keyof typeof locales>).map((loc) => (
              <button
                key={loc}
                className={`lang-button ${locale === loc ? 'active' : ''}`}
                onClick={() => {
                  switchLanguage(loc)
                  handleLinkClick()
                }}
              >
                {locales[loc]}
              </button>
            ))}
          </div>

          {/* Social Media Links */}
          <div className="side-menu-footer">
            <div className="social-links">
              <a href="https://www.facebook.com/merihakobyan99/" target="_blank" rel="noopener noreferrer" className="social-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/meri_hakobyan_official/?hl=en" target="_blank" rel="noopener noreferrer" className="social-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/c/merihakobyan" target="_blank" rel="noopener noreferrer" className="social-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="https://open.spotify.com/artist/5k98PPt19lvf4xhmGKMUCA" target="_blank" rel="noopener noreferrer" className="social-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.899 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.66.24 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
              </a>
              <a href="https://www.tiktok.com/@meri_hakobyan_official?lang=en" target="_blank" rel="noopener noreferrer" className="social-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.53.02C13.84 0 15.14.01 16.44.02c.08 1.53.35 3.07.62 4.59.73 4.1 3.19 7.31 7.21 8.89v5.23c-2.43.75-5.2-.11-7.04-2.04-.29-.3-.56-.63-.83-.98-.39-.54-.69-1.12-.99-1.69-.24-.54-.48-1.09-.69-1.65-.29-.72-.46-1.46-.61-2.22-.15-.78-.18-1.56-.11-2.35.23-2.41 1.15-4.55 2.68-6.35.79-1.18 1.76-2.18 2.85-3.04zm0 3.66c-1.31 0-2.61.01-3.92.02.15 1.08.33 2.14.57 3.18.56 2.47 1.73 4.54 3.79 5.88-.75.31-1.54.52-2.34.7-.57.11-1.15.18-1.73.22v3.16c1.06.04 2.11.08 3.16.09.13-.84.35-1.67.69-2.45.54-1.23 1.26-2.35 2.15-3.34-.39-.76-.75-1.54-1.07-2.35V3.66zm-1.56 7.56c-.82 0-1.64.05-2.45.1 0 .84-.01 1.68.02 2.52.01.94.06 1.87.16 2.8.08.75.2 1.48.38 2.19.17.72.42 1.42.72 2.09.29.63.63 1.23 1.03 1.79-.02.01-.05.02-.07.04-.03-.09-.06-.19-.09-.29-.12-.92-.16-1.86-.13-2.81.01-.94.05-1.88.13-2.81.01-.16.04-.31.05-.47-.6-.24-1.16-.57-1.67-.97-.82-.65-1.46-1.43-1.94-2.33-.29-.66-.49-1.36-.61-2.08-.13-.73-.18-1.47-.15-2.22.01-.25.04-.5.06-.75.03.02.06.04.1.07.22.14.43.29.63.45.49.42.93.91 1.32 1.44.56.74 1.03 1.55 1.39 2.42.23.56.41 1.15.53 1.76.13.63.2 1.27.21 1.92.01.13 0 .26-.01.39-.01.27-.03.54-.07.81 0 0 .01 0 0 0z"/>
                </svg>
              </a>
            </div>
            
            <div className="designer-credit">
              {t('designer')}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

