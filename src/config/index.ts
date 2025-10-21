export const config = {
  useBackend: process.env.NEXT_PUBLIC_USE_BACKEND === 'true',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  cdnUrl: process.env.NEXT_PUBLIC_CDN_URL || '',
  googleClientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
  razorpayKey: process.env.NEXT_PUBLIC_RAZORPAY_KEY || '',
  defaultCurrency: '₹',
  defaultLocale: 'en-IN',
  maxFileSize: 5 * 1024 * 1024, // 5MB
  allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp'],
};