import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

export const locales = ['en', 'hy', 'ru'] as const
export type Locale = (typeof locales)[number]

export default getRequestConfig(async ({ locale, requestLocale }) => {
  // Get the requested locale or fallback to default
  const requested = await requestLocale
  const validLocale = (requested || locale || 'en') as Locale
  
  if (!locales.includes(validLocale)) {
    return {
      locale: 'en',
      messages: (await import(`../messages/en.json`)).default
    }
  }

  return {
    locale: validLocale,
    messages: (await import(`../messages/${validLocale}.json`)).default
  }
})

