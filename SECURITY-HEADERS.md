# 🛡️ Security Headers Implementation

## Overview
This document details the HTTP security headers implemented to protect against common web vulnerabilities.

## Implemented Headers

### 1. **X-Powered-By: (Removed)**
- **Purpose**: Hide technology stack fingerprinting
- **Implementation**: `poweredByHeader: false` in Next.js config
- **Impact**: Prevents attackers from knowing you're using Next.js

### 2. **X-XSS-Protection: 1; mode=block**
- **Purpose**: Enable browser's built-in XSS filter
- **Protection**: Cross-Site Scripting (XSS) attacks
- **Browser Support**: Legacy browsers (modern browsers use CSP)

### 3. **X-Frame-Options: DENY**
- **Purpose**: Prevent clickjacking attacks
- **Protection**: Blocks your site from being embedded in iframes
- **Impact**: Protects users from UI redressing attacks

### 4. **X-Content-Type-Options: nosniff**
- **Purpose**: Prevent MIME type sniffing
- **Protection**: Stops browsers from interpreting files as different MIME types
- **Impact**: Prevents execution of malicious scripts disguised as images/other files

### 5. **Referrer-Policy: strict-origin-when-cross-origin**
- **Purpose**: Control referrer information leakage
- **Behavior**: 
  - Same-origin: Full URL sent
  - Cross-origin HTTPS: Only origin sent
  - Cross-origin HTTP: No referrer sent

### 6. **Permissions-Policy**
- **Purpose**: Control browser features and APIs
- **Restrictions**:
  - `camera=()`: Blocks camera access
  - `microphone=()`: Blocks microphone access
  - `geolocation=(self)`: Allows geolocation only from same origin
  - `interest-cohort=()`: Blocks FLoC tracking

### 7. **Content-Security-Policy (CSP)**
Comprehensive policy to prevent XSS and data injection attacks:

```
default-src 'self'
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com
script-src 'self' 'unsafe-eval' 'unsafe-inline'
font-src 'self' https://fonts.gstatic.com data:
img-src 'self' data: https: blob:
connect-src 'self' https://api.openstreetmap.org https://*.tile.openstreetmap.org
frame-src 'self'
base-uri 'self'
form-action 'self'
upgrade-insecure-requests
```

#### CSP Directives Explained:

- **default-src 'self'**: Only allow resources from same origin by default
- **style-src**: Allows inline styles (required for Tailwind/Next.js) + Google Fonts
- **script-src**: Allows inline scripts and eval (required for Next.js hydration)
- **font-src**: Allows fonts from Google Fonts and data URIs
- **img-src**: Allows images from any HTTPS source (for external images)
- **connect-src**: Allows API calls to OpenStreetMap (for Leaflet maps)
- **frame-src**: Only allows iframes from same origin
- **base-uri**: Restricts `<base>` tag to same origin
- **form-action**: Forms can only submit to same origin
- **upgrade-insecure-requests**: Automatically upgrades HTTP to HTTPS

## Security Score Impact

### Before Implementation:
- ❌ Missing X-Frame-Options
- ❌ Missing X-Content-Type-Options
- ❌ Missing Referrer-Policy
- ❌ Exposed X-Powered-By header
- ❌ No Content Security Policy
- ❌ No XSS Protection

### After Implementation:
- ✅ X-Frame-Options: DENY
- ✅ X-Content-Type-Options: nosniff
- ✅ Referrer-Policy: strict-origin-when-cross-origin
- ✅ X-Powered-By: Removed
- ✅ Content Security Policy: Implemented
- ✅ XSS Protection: Enabled

**Expected Security Headers Score: A**

## Testing

### Local Testing (Development Server)
```bash
npm run dev
curl -I http://localhost:3000
```

### Production Testing
```bash
# After deployment
curl -I https://anarisorlange.alessandrosantos.dev/

# Or use online tools:
# - https://securityheaders.com/
# - https://observatory.mozilla.org/
```

### Expected Response Headers:
```
X-XSS-Protection: 1; mode=block
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(self), interest-cohort=()
Content-Security-Policy: default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; ...
```

## Known Limitations

### CSP Considerations:
1. **'unsafe-inline' for scripts**: Required for Next.js client-side hydration
   - **Future improvement**: Use nonces or hashes for stricter CSP
2. **'unsafe-eval'**: Required for Next.js development mode
   - **Production**: Can be removed if not using dynamic code evaluation
3. **img-src https:**: Allows all HTTPS images
   - **Future improvement**: Restrict to specific CDN domains if known

## Additional Recommendations

### For Production Deployment (Traefik/Coolify):

1. **HSTS (Strict-Transport-Security)**
   - Should be configured at Traefik level
   - Recommended: `max-age=63072000; includeSubDomains; preload`

2. **SSL/TLS Configuration**
   - Ensure TLS 1.2+ only
   - Disable weak ciphers
   - Enable OCSP stapling

3. **Rate Limiting**
   - Implement at Traefik level to prevent DoS

4. **WAF (Web Application Firewall)**
   - Consider Cloudflare or similar for additional protection

## Maintenance

- **Review CSP violations**: Monitor browser console for CSP errors
- **Update CSP**: Add new domains as needed (e.g., analytics, CDNs)
- **Test after updates**: Always verify headers after Next.js upgrades
- **Security audits**: Run quarterly scans with tools like:
  - `npm audit`
  - OWASP ZAP
  - Nikto
  - Wapiti

## References

- [OWASP Secure Headers Project](https://owasp.org/www-project-secure-headers/)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [Next.js Security Headers](https://nextjs.org/docs/advanced-features/security-headers)
- [Content Security Policy Reference](https://content-security-policy.com/)
