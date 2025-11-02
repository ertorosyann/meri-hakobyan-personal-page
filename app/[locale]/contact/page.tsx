'use client'

import { useTranslations } from 'next-intl'

export default function Contact() {
  const t = useTranslations()

  return (
    <div className="bio-page">
      <div className="bio-hero">
        <div className="hero-content">
          <h1 className="hero-title">{t('contactPage.title')}</h1>
          <h2 className="hero-subtitle">{t('contactPage.subtitle')}</h2>
          <p className="hero-description">{t('contactPage.description')}</p>
        </div>
      </div>

      <div className="bio-container">
        <div className="bio-content">
          <h2 className="bio-title">{t('contactPage.heading')}</h2>
          <p className="bio-text">
            {t('contactPage.intro')}
          </p>
        </div>

        {/* Contact Information */}
        <div className="contact-info-section">
          <div className="contact-info-grid">
            {/* Email */}
            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=merihakobyan999@gmail.com"
              className="contact-info-card email-card"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="achievement-card">
                <div className="achievement-icon-wrapper">
                  <div className="contact-icon-page email">
                    <svg viewBox="0 0 24 24" fill="white">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                </div>
                <h3 className="achievement-title">{t('contactPage.email')}</h3>
                <div className="contact-number-page">merihakobyan999@gmail.com</div>
                <p className="achievement-description">{t('contactPage.emailDescription')}</p>
              </div>
            </a>

            {/* US Phone */}
            <a 
              href="tel:+18188606808"
              className="contact-info-card phone-card"
            >
              <div className="achievement-card">
                <div className="achievement-icon-wrapper">
                  <div className="contact-icon-page mobile">
                    <svg viewBox="0 0 24 24" fill="white">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                  </div>
                </div>
                <h3 className="achievement-title">{t('contactPage.usPhone')}</h3>
                <div className="contact-number-page">+1 (818) 860-6808</div>
                <p className="achievement-description">{t('contactPage.usPhoneDescription')}</p>
              </div>
            </a>

            {/* Address */}
            <div className="contact-info-card address-card">
              <div className="achievement-card">
                <div className="achievement-icon-wrapper">
                  <div className="contact-icon-page address">
                    <svg viewBox="0 0 24 24" fill="white">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                </div>
                <h3 className="achievement-title">{t('contactPage.address')}</h3>
                <div className="contact-address-details">
                  <p className="contact-address-line">1522 Gordon Street, Apt 903</p>
                  <p className="contact-address-line">Los Angeles, California</p>
                  <p className="contact-address-line">ZIP Code 90028</p>
                </div>
                <p className="achievement-description">{t('contactPage.addressDescription')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="map-section">
          <h2 className="map-section-title">{t('contactPage.mapTitle')}</h2>
          <p className="map-section-subtitle">{t('contactPage.mapSubtitle')}</p>
          <div className="map-container">
            <iframe
              src="https://maps.google.com/maps?q=1522+Gordon+Street,+Los+Angeles,+CA+90028&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="450"
              style={{ border: 0, borderRadius: '16px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location Map"
              className="contact-map-iframe"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}

