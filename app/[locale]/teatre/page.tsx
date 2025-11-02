'use client'

import { useTranslations } from 'next-intl'

export default function Teatre() {
  const t = useTranslations()

  const performances = [
    // Los Angeles Performances
    {
      icon: 'comedy',
      title: t('teatre.performance6.title'),
      description: t('teatre.performance6.description'),
      author: t('teatre.performance6.author'),
      venue: t('teatre.performance6.venue'),
      role: t('teatre.performance6.role'),
      location: t('teatre.performance6.location'),
      year: 'Recent'
    },
    {
      icon: 'drama',
      title: t('teatre.performance7.title'),
      description: t('teatre.performance7.description'),
      author: t('teatre.performance7.author'),
      venue: t('teatre.performance7.venue'),
      role: t('teatre.performance7.role'),
      location: t('teatre.performance7.location'),
      year: 'Recent'
    },
    // Moscow Performances
    {
      icon: 'drama',
      title: t('teatre.performance8.title'),
      description: t('teatre.performance8.description'),
      author: t('teatre.performance8.author'),
      venue: t('teatre.performance8.venue'),
      role: t('teatre.performance8.role'),
      location: t('teatre.performance8.location'),
      year: 'Moscow'
    },
    {
      icon: 'drama',
      title: t('teatre.performance9.title'),
      description: t('teatre.performance9.description'),
      author: t('teatre.performance9.author'),
      venue: t('teatre.performance9.venue'),
      role: t('teatre.performance9.role'),
      location: t('teatre.performance9.location'),
      year: 'Moscow'
    },
    {
      icon: 'drama',
      title: t('teatre.performance10.title'),
      description: t('teatre.performance10.description'),
      author: t('teatre.performance10.author'),
      venue: t('teatre.performance10.venue'),
      role: t('teatre.performance10.role'),
      location: t('teatre.performance10.location'),
      year: 'Moscow'
    },
  ]

  return (
    <div className="bio-page">
      <div className="bio-hero">
        <div className="hero-content">
          <h1 className="hero-title">{t('teatre.title')}</h1>
          <h2 className="hero-subtitle">{t('teatre.subtitle')}</h2>
          <p className="hero-description">{t('teatre.description')}</p>
        </div>
      </div>

      <div className="bio-container">
        <div className="bio-content">
          <h2 className="bio-title">{t('teatre.heading')}</h2>
          <p className="bio-text">
            {t('teatre.intro')}
          </p>
        </div>

        <div className="notable-roles-section">
          <h2 className="section-title">{t('teatre.notableRolesTitle')}</h2>
        </div>

        <div className="achievements-grid">
          {performances.map((performance, index) => (
            <div key={index} className="achievement-card">
              <div className="achievement-icon-wrapper">
                {performance.icon === 'comedy' && (
                  <svg className="achievement-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M9 9h.01M15 9h.01M9.5 14a3.5 3.5 0 0 0 5 0"/>
                  </svg>
                )}
                {performance.icon === 'tragicomedy' && (
                  <svg className="achievement-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M9 9h.01M15 9h.01M9 15c.5 2 2.5 3 5 3s4.5-1 5-3"/>
                  </svg>
                )}
                {performance.icon === 'stage' && (
                  <svg className="achievement-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="7" width="20" height="15" rx="2" ry="2"/>
                    <path d="M6 7V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3"/>
                    <path d="M12 22v-6"/>
                    <path d="M8 22v-6"/>
                    <path d="M16 22v-6"/>
                  </svg>
                )}
                {performance.icon === 'theater' && (
                  <svg className="achievement-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 21h18"/>
                    <path d="M5 21V7l8-4v18"/>
                    <path d="M19 21V11l-6-4"/>
                    <path d="M9 9v0"/>
                    <path d="M9 15v0"/>
                    <path d="M9 21v0"/>
                  </svg>
                )}
                {performance.icon === 'drama' && (
                  <svg className="achievement-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M8 12h8M12 8v8"/>
                  </svg>
                )}
              </div>
              <div className="achievement-year">{performance.year}</div>
              <h3 className="achievement-title">{performance.title}</h3>
              {('date' in performance && (performance as any).date) && (
                <div className="performance-date">
                  <strong>{(performance as any).date}</strong> {('time' in performance && (performance as any).time) && `• ${(performance as any).time}`}
                </div>
              )}
              {('cast' in performance && (performance as any).cast) && (
                <div className="performance-cast">
                  <strong>Cast:</strong> {(performance as any).cast}
                </div>
              )}
              {('director' in performance && (performance as any).director) && (
                <div className="performance-director">
                  <strong>Director:</strong> {(performance as any).director}
                </div>
              )}
              {performance.location && (
                <div className="performance-location">
                  <strong>Location:</strong> {performance.location}
                </div>
              )}
              {performance.venue && (
                <div className="performance-venue">
                  <strong>Venue:</strong> {performance.venue}
                </div>
              )}
              {performance.author && (
                <div className="performance-author">
                  <strong>Author:</strong> {performance.author}
                </div>
              )}
              {performance.role && (
                <div className="performance-role">
                  <strong>Role:</strong> {performance.role}
                </div>
              )}
              {('ticketPhone' in performance && (performance as any).ticketPhone) && (
                <div className="performance-tickets">
                  <strong>Tickets:</strong> {(performance as any).ticketPhone} • {('ticketPlatform' in performance && (performance as any).ticketPlatform)}
                </div>
              )}
              <p className="achievement-description">{performance.description}</p>
            </div>
          ))}
        </div>

        <div className="timeline">
          <div className="timeline-header">
            <h2 className="timeline-title">{t('teatre.timelineTitle')}</h2>
            <p className="timeline-subtitle">{t('teatre.timelineSubtitle')}</p>
          </div>
          
          <div className="timeline-items">
            <div className="timeline-item">
              <div className="timeline-content">
                <div className="timeline-year">{t('teatre.timeline1.year')}</div>
                <p className="timeline-text">
                  {t('teatre.timeline1.text')}
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-content">
                <div className="timeline-year">{t('teatre.timeline2.year')}</div>
                <p className="timeline-text">
                  {t('teatre.timeline2.text')}
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-content">
                <div className="timeline-year">{t('teatre.timeline3.year')}</div>
                <p className="timeline-text">
                  {t('teatre.timeline3.text')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

