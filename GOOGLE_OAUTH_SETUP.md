# Google OAuth Configuration Guide

## 🔐 Setting Up Google OAuth

### 1. Google Cloud Console Setup
1. Go to https://console.cloud.google.com
2. Create new project or select existing
3. Enable Google+ API or Google Identity API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set authorized origins and redirect URIs

### 2. OAuth Configuration
Add these environment variables to your deployment platform:

```bash
GOOGLE_CLIENT_ID=[Your Google OAuth Client ID]
GOOGLE_CLIENT_SECRET=[Your Google OAuth Client Secret]
GOOGLE_ALLOWED_DOMAIN=tiny-sumo.com
```

### 3. Security Features
- ✅ Domain restriction: Only tiny-sumo.com emails
- ✅ Secure authentication flow
- ✅ Session management
- ✅ HTTPS required

### 4. Deployment Instructions
- **Render.com**: Add environment variables in dashboard
- **AWS Elastic Beanstalk**: Configure in environment properties
- **Any Platform**: Set as environment variables

### 5. Testing
- Visit your hub URL
- Click "Sign In with Google"
- Only tiny-sumo.com emails will be accepted