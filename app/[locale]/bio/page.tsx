'use client'

import { useTranslations } from 'next-intl'

export default function Bio() {
  const t = useTranslations()

  const achievements = [
    {
      icon: 'music',
      title: 'Music Career',
      description: 'Dedicated singers with a passion for Armenian music and culture'
    },
    {
      icon: 'television',
      title: 'Television',
      description: 'Featured in numerous television programs and shows'
    },
    {
      icon: 'stage',
      title: 'Performances',
      description: 'Captivating live performances that inspire audiences worldwide'
    }
  ]

  return (
    <div className="bio-page">
      <div className="bio-hero">
        <div className="hero-content">
          <h1 className="hero-title">BIO</h1>
          <h2 className="hero-subtitle">{t('bio.subtitle')}</h2>
          <p className="hero-description">{t('bio.description')}</p>
        </div>
      </div>

      <div className="bio-container">
        <div className="bio-content">
          <h2 className="bio-title">About Meri Hakobyan</h2>
          <p className="bio-text">
            Meri Hakobyan is a <span className="bio-highlight">celebrated Armenian singer</span> known for her 
            exceptional talent and contribution to Armenian music and culture. With a deep passion for music, 
            she continues to inspire audiences worldwide.
          </p>
          <p className="bio-text">
            Throughout her career, she has collaborated on numerous projects, television programs, and 
            musical performances that have touched the hearts of countless fans. Her dedication to preserving 
            and promoting Armenian musical heritage has made her a beloved figure in the cultural landscape.
          </p>
        </div>

        <div className="achievements-grid">
          {achievements.map((achievement, index) => (
            <div key={index} className="achievement-card">
              <div className="achievement-icon-wrapper">
                {achievement.icon === 'music' && (
                  <svg className="achievement-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18V5l12-2v13"/>
                    <circle cx="6" cy="18" r="3"/>
                    <circle cx="18" cy="16" r="3"/>
                  </svg>
                )}
                {achievement.icon === 'television' && (
                  <svg className="achievement-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="7" width="20" height="15" rx="2" ry="2"/>
                    <polyline points="17 2 12 7 7 2"/>
                  </svg>
                )}
                {achievement.icon === 'stage' && (
                  <svg className="achievement-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/>
                    <path d="M10 11h4M8 17h8"/>
                  </svg>
                )}
              </div>
              <h3 className="achievement-title">{achievement.title}</h3>
              <p className="achievement-description">{achievement.description}</p>
            </div>
          ))}
        </div>

        <div className="timeline">
          <div className="timeline-header">
            <h2 className="timeline-title">Career Highlights</h2>
            <p className="timeline-subtitle">A Journey Through Music & Culture</p>
          </div>
          
          <div className="timeline-items">
            <div className="timeline-item">
              <div className="timeline-content">
                <div className="timeline-year">Early Career</div>
                <p className="timeline-text">
                  Began her musical journey with a passion for Armenian traditional and contemporary music, 
                  quickly gaining recognition for her exceptional vocal talents.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-content">
                <div className="timeline-year">Television</div>
                <p className="timeline-text">
                  Featured in numerous television programs and shows, bringing Armenian music to wider audiences 
                  and helping preserve cultural heritage.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-content">
                <div className="timeline-year">Live Performances</div>
                <p className="timeline-text">
                  Captivated audiences worldwide with powerful live performances that showcase the beauty and 
                  richness of Armenian musical traditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
