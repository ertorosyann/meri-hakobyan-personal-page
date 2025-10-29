import createMiddleware from 'next-intl/middleware'
import { locales } from './i18n/request'

export default createMiddleware({
  locales: locales,
  defaultLocale: 'en',
  localePrefix: 'never' // This makes language preference stored instead of URL-based
})

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}

