/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove X-Powered-By header to hide Next.js fingerprint
  poweredByHeader: false,

  typescript: {
    ignoreBuildErrors: true,
  },
  
  images: {
    unoptimized: true,
  },

  // Security Headers - Protection against XSS, Clickjacking, MIME sniffing
  async headers() {
    return [
      {
        // Apply to all routes
        source: '/:path*',
        headers: [
          // XSS Protection (legacy but still useful for older browsers)
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          // Prevent clickjacking attacks
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          // Prevent MIME type sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          // Control referrer information
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          // Permissions Policy (formerly Feature-Policy)
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self), interest-cohort=()'
          },
          // Content Security Policy - Strict but functional
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              // Allow inline styles for Next.js and Tailwind, plus specific domains
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              // Allow scripts from self, Next.js chunks, and inline scripts (required for Next.js)
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              // Allow fonts from Google Fonts
              "font-src 'self' https://fonts.gstatic.com data:",
              // Allow images from self, data URIs, and common CDNs
              "img-src 'self' data: https: blob:",
              // Allow connections to self and APIs
              "connect-src 'self' https://api.openstreetmap.org https://*.tile.openstreetmap.org",
              // Allow frames only from same origin
              "frame-src 'self'",
              // Base URI restriction
              "base-uri 'self'",
              // Form action restriction
              "form-action 'self'",
              // Upgrade insecure requests
              "upgrade-insecure-requests"
            ].join('; ')
          }
        ],
      },
    ]
  },
}

export default nextConfig
