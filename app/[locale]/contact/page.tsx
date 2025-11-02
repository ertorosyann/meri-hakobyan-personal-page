'use client'

import { useTranslations } from 'next-intl'

export default function Contact() {
  const t = useTranslations()

  const contactMethods = [
    {
      icon: 'mobile',
      title: t('contact.mobile'),
      number: '+374 11 123456',
      href: 'tel:+37495528992',
      description: t('contactPage.mobileDescription')
    },
    {
      icon: 'viber',
      title: t('contact.viber'),
      number: '+374 10 123456',
      href: 'viber://chat?number=37495528992',
      description: t('contactPage.viberDescription')
    },
    {
      icon: 'whatsapp',
      title: t('contact.whatsapp'),
      number: '+374 10 123456',
      href: 'https://wa.me/37495528992',
      description: t('contactPage.whatsappDescription')
    },
    {
      icon: 'telegram',
      title: t('contact.telegram'),
      number: '+374 10 123456',
      href: 'https://t.me/+37495528992',
      description: t('contactPage.telegramDescription')
    }
  ]

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

        <div className="achievements-grid">
          {contactMethods.map((method, index) => (
            <a 
              key={index} 
              href={method.href}
              className="contact-option-link-page"
              target={method.href.startsWith('http') ? '_blank' : undefined}
              rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              <div className="achievement-card">
                <div className="achievement-icon-wrapper">
                  {method.icon === 'mobile' && (
                    <div className="contact-icon-page mobile">
                      <svg viewBox="0 0 24 24" fill="white">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                      </svg>
                    </div>
                  )}
                  {method.icon === 'viber' && (
                    <div className="contact-icon-page viber">
                      <svg viewBox="0 0 24 24" fill="white">
                        <path d="M13.715 1.998c-2.275 0-4.548.3-6.51 1.45-1.962 1.15-3.55 2.84-4.185 4.973-.635 2.132.775 3.625 1.162 3.925.388.3 1.137-.075 1.137-.075L8.75 8.448c0 0 .225-.15.45 0l1.35 1.575c.225.15 0 .45 0 .45l-2.925 3.3c0 0-.15.225 0 .45l.675.675c.225.225.45 0 .6 0l3.15-1.5c0 0 .15 0 .3.15l1.5 1.65c.15.15.3.225.6.075l2.85-1.95c.3-.15.6-.075.6-.075l5.025 1.275c.975.225 1.65-1.425 2.1-3.225.45-1.8.3-4.05-.675-6.225-1.575-2.7-3.975-4.35-6.975-4.8-.75-.15-1.425-.225-2.025-.225z"/>
                      </svg>
                    </div>
                  )}
                  {method.icon === 'whatsapp' && (
                    <div className="contact-icon-page whatsapp">
                      <svg viewBox="0 0 24 24" fill="white">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                    </div>
                  )}
                  {method.icon === 'telegram' && (
                    <div className="contact-icon-page telegram">
                      <svg viewBox="0 0 24 24" fill="white">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.06 3.345-.478.332-.913.494-1.302.485-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                      </svg>
                    </div>
                  )}
                </div>
                <h3 className="achievement-title">{method.title}</h3>
                <div className="contact-number-page">{method.number}</div>
                <p className="achievement-description">{method.description}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Office Location & Contact Information */}
        <div className="contact-info-section">
          <div className="contact-info-grid">
            {/* Email */}
            <a 
              href="mailto:merihakobyan999@gmail.com"
              className="contact-info-card email-card"
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

