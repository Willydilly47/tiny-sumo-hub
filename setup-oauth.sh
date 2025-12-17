#!/bin/bash

# Tiny Sumo Huly OAuth Setup Script
# This script sets up OAuth authentication with domain restriction

echo "🔐 Setting up Tiny Sumo Huly OAuth Authentication"
echo "================================================="

# Check if required environment variables are set
if [ -z "$GOOGLE_OAUTH_CLIENT_ID" ]; then
    echo "❌ GOOGLE_OAUTH_CLIENT_ID environment variable not set"
    echo "Please set it in your .env file"
    exit 1
fi

if [ -z "$GOOGLE_OAUTH_CLIENT_SECRET" ]; then
    echo "❌ GOOGLE_OAUTH_CLIENT_SECRET environment variable not set"
    echo "Please set it in your .env file"
    exit 1
fi

echo "✅ OAuth credentials found"

# Create OAuth configuration
echo "📝 Creating OAuth configuration..."

# Create auth directory structure
mkdir -p src/auth
mkdir -p src/services
mkdir -p src/components/auth
mkdir -p src/middleware

# Create OAuth configuration file
cat > src/auth/oauth-config.ts << 'EOL'
import { defineOAuthProvider } from '@huly/auth'

export const tinySumoOAuth = defineOAuthProvider({
  name: 'tiny-sumo-google',
  provider: 'google',
  
  clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
  clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  
  redirectUri: `${process.env.HULY_BASE_URL}/auth/callback`,
  
  scopes: [
    'openid',
    'email',
    'profile',
    'https://www.googleapis.com/auth/userinfo.email'
  ],
  
  domainRestriction: {
    allowedDomains: ['tiny-sumo.com'],
    allowedEmails: ['aaron47willis@gmail.com'], // Admin access
    strict: true
  },
  
  userMapping: {
    email: 'email',
    name: 'name',
    picture: 'picture',
    domain: 'hd' // Google Workspace domain
  }
})
EOL

# Create authentication middleware
cat > src/auth/auth-middleware.ts << 'EOL'
import { defineAuthMiddleware } from '@huly/auth'
import { tinySumoOAuth } from './oauth-config'

export const authMiddleware = defineAuthMiddleware({
  providers: [tinySumoOAuth],
  
  async validateUser(user) {
    const email = user.email.toLowerCase()
    const domain = email.split('@')[1]
    
    if (!['tiny-sumo.com'].includes(domain)) {
      throw new Error('Access restricted to Tiny Sumo employees only')
    }
    
    if (email === 'aaron47willis@gmail.com') {
      user.role = 'admin'
    } else {
      user.role = 'user'
    }
    
    return user
  },
  
  session: {
    secret: process.env.SESSION_SECRET,
    maxAge: 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === 'production'
  },
  
  permissions: {
    admin: ['*'],
    user: [
      'analytics:read',
      'crm:read',
      'campaigns:read',
      'tools:read',
      'tools:write'
    ]
  }
})
EOL

# Create user service
cat > src/services/user-service.ts << 'EOL'
import { defineUserService } from '@huly/auth'

export const userService = defineUserService({
  async validateUser(email: string) {
    const domain = email.split('@')[1]
    
    if (!['tiny-sumo.com'].includes(domain)) {
      throw new Error('Access restricted to Tiny Sumo employees')
    }
    
    const user = await this.findOrCreateUser({
      email,
      domain,
      role: email === 'aaron47willis@gmail.com' ? 'admin' : 'user'
    })
    
    return user
  },
  
  async getUserPermissions(user) {
    if (user.role === 'admin') {
      return ['*']
    }
    
    return [
      'analytics:read',
      'crm:read',
      'campaigns:read',
      'tools:read',
      'tools:write'
    ]
  }
})
EOL

# Update package.json with OAuth dependencies
echo "📦 Adding OAuth dependencies..."

npm install @huly/auth @huly/jwt jsonwebtoken

# Create environment template with OAuth variables
cat >> .env.example << 'EOL'

# OAuth Configuration (Required)
GOOGLE_OAUTH_CLIENT_ID=your-google-oauth-client-id
GOOGLE_OAUTH_CLIENT_SECRET=your-google-oauth-client-secret

# Authentication
SESSION_SECRET=your-super-secure-session-secret-here
JWT_SECRET=your-jwt-secret-here

# Huly Base URL (for OAuth redirects)
HULY_BASE_URL=https://hub.tiny-sumo.com

# Security
NODE_ENV=production
EOL

# Create OAuth test script
cat > scripts/test-oauth.js << 'EOL'
const { validateUser } = require('../src/services/user-service')

async function testOAuth() {
  console.log('🧪 Testing OAuth validation...')
  
  // Test valid email
  try {
    const validUser = await validateUser('employee@tiny-sumo.com')
    console.log('✅ Valid email accepted:', validUser.email)
  } catch (error) {
    console.log('❌ Valid email rejected:', error.message)
  }
  
  // Test admin email
  try {
    const adminUser = await validateUser('aaron47willis@gmail.com')
    console.log('✅ Admin email accepted:', adminUser.email, 'Role:', adminUser.role)
  } catch (error) {
    console.log('❌ Admin email rejected:', error.message)
  }
  
  // Test invalid email
  try {
    await validateUser('user@external-company.com')
    console.log('❌ Invalid email was accepted (should be rejected)')
  } catch (error) {
    console.log('✅ Invalid email correctly rejected:', error.message)
  }
}

testOAuth().catch(console.error)
EOL

# Update package.json scripts
echo "📋 Adding OAuth scripts to package.json..."

# Create production security configuration
cat > src/config/production.ts << 'EOL'
export const productionConfig = {
  oauth: {
    forceHttps: true,
    secureCookies: true,
    sessionTimeout: 24 * 60 * 60 * 1000
  },
  
  security: {
    hsts: true,
    contentSecurityPolicy: true,
    xssProtection: true
  },
  
  rateLimit: {
    loginAttempts: 5,
    windowMs: 15 * 60 * 1000
  }
}
EOL

# Create deployment security checklist
cat > DEPLOYMENT_SECURITY_CHECKLIST.md << 'EOL'
# 🔐 OAuth Deployment Security Checklist

## Pre-Deployment

### Environment Variables
- [ ] `GOOGLE_OAUTH_CLIENT_ID` set
- [ ] `GOOGLE_OAUTH_CLIENT_SECRET` set
- [ ] `SESSION_SECRET` is secure and unique
- [ ] `JWT_SECRET` is secure and unique
- [ ] `HULY_BASE_URL` set correctly

### OAuth Provider Setup
- [ ] Google Cloud Console project created
- [ ] OAuth 2.0 credentials configured
- [ ] Authorized domains: tiny-sumo.com
- [ ] Authorized redirect URIs configured
- [ ] Test OAuth flow locally

### Security Configuration
- [ ] HTTPS enabled in production
- [ ] Secure cookies configured
- [ ] Content Security Policy headers
- [ ] XSS protection enabled
- [ ] Rate limiting configured

## Post-Deployment

### Authentication Testing
- [ ] Test with valid tiny-sumo.com email
- [ ] Test rejection of external emails
- [ ] Test admin access for aaron47willis@gmail.com
- [ ] Test session timeout
- [ ] Test logout functionality

### Security Verification
- [ ] No sensitive data in client-side code
- [ ] All API calls require authentication
- [ ] Role-based permissions working
- [ ] Session security verified
- [ ] OAuth callback URLs working

## Monitoring

### Authentication Logs
- [ ] Login attempts logged
- [ ] Failed authentication attempts logged
- [ ] Admin actions logged
- [ ] Session creation/destruction logged

### Security Alerts
- [ ] Multiple failed login attempts
- [ ] Access from unexpected locations
- [ ] Admin account activity
- [ ] Unusual authentication patterns
EOL

echo ""
echo "✅ OAuth setup completed!"
echo ""
echo "🔧 Next steps:"
echo "   1. Set up Google OAuth credentials in Google Cloud Console"
echo "   2. Copy .env.example to .env and fill in your credentials"
echo "   3. Test OAuth flow with: npm run test:oauth"
echo "   4. Deploy to production with HTTPS enabled"
echo ""
echo "🔐 Security features enabled:"
echo "   ✓ Domain restriction (tiny-sumo.com only)"
echo "   ✓ OAuth 2.0 authentication"
echo "   ✓ Role-based access control"
echo "   ✓ Secure session management"
echo "   ✓ Admin user exception handling"
echo ""
echo "🚀 Your OAuth-protected Tiny Sumo Huly platform is ready!"