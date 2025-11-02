'use client'

import { useTranslations } from 'next-intl'

export default function Award() {
  const t = useTranslations()

  const awards = [
    {
      icon: 'trophy',
      title: t('award.award1.title'),
      description: t('award.award1.description'),
      year: '2020'
    },
    {
      icon: 'star',
      title: t('award.award2.title'),
      description: t('award.award2.description'),
      year: '2019'
    },
    {
      icon: 'medal',
      title: t('award.award3.title'),
      description: t('award.award3.description'),
      year: '2018'
    }
  ]

  return (
    <div className="bio-page">
      <div className="bio-hero">
        <div className="hero-content">
          <h1 className="hero-title">{t('award.title')}</h1>
          <h2 className="hero-subtitle">{t('award.subtitle')}</h2>
          <p className="hero-description">{t('award.description')}</p>
        </div>
      </div>

      <div className="bio-container">
        <div className="bio-content">
          <h2 className="bio-title">{t('award.heading')}</h2>
          <p className="bio-text">
            {t('award.intro')}
          </p>
        </div>

        <div className="achievements-grid">
          {awards.map((award, index) => (
            <div key={index} className="achievement-card">
              <div className="achievement-icon-wrapper">
                {award.icon === 'trophy' && (
                  <svg className="achievement-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M6 9v6M18 9v6M6 15h12M9 21h6M12 15v6"/>
                    <path d="M12 3v12"/>
                  </svg>
                )}
                {award.icon === 'star' && (
                  <svg className="achievement-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                )}
                {award.icon === 'medal' && (
                  <svg className="achievement-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2v6M6 6l6 6M18 6l-6 6M12 14v8"/>
                    <circle cx="12" cy="14" r="4"/>
                  </svg>
                )}
              </div>
              <div className="achievement-year">{award.year}</div>
              <h3 className="achievement-title">{award.title}</h3>
              <p className="achievement-description">{award.description}</p>
            </div>
          ))}
        </div>

        <div className="timeline">
          <div className="timeline-header">
            <h2 className="timeline-title">{t('award.timelineTitle')}</h2>
            <p className="timeline-subtitle">{t('award.timelineSubtitle')}</p>
          </div>
          
          <div className="timeline-items">
            <div className="timeline-item">
              <div className="timeline-content">
                <div className="timeline-year">{t('award.timeline1.year')}</div>
                <p className="timeline-text">
                  {t('award.timeline1.text')}
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-content">
                <div className="timeline-year">{t('award.timeline2.year')}</div>
                <p className="timeline-text">
                  {t('award.timeline2.text')}
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-content">
                <div className="timeline-year">{t('award.timeline3.year')}</div>
                <p className="timeline-text">
                  {t('award.timeline3.text')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

