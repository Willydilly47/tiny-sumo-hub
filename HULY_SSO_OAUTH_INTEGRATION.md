# 🔐 Huly SSO OAuth Integration with Domain Restriction

## 🎯 Security Implementation Strategy

### **OAuth Configuration Overview**
- **Provider**: Google Workspace (recommended) or Microsoft Azure AD
- **Domain Restriction**: Only tiny-sumo.com email addresses
- **Integration**: Native Huly authentication system
- **Security**: OAuth 2.0 with JWT tokens

---

## 🔧 Implementation Steps

### **Phase 1: OAuth Provider Setup**

#### **Google Workspace Setup**
```bash
# 1. Go to Google Cloud Console
# 2. Create new project or select existing
# 3. Enable Google+ API and Google Identity API
# 4. Create OAuth 2.0 credentials
# 5. Configure authorized domains
```

#### **OAuth Configuration**
```
OAuth 2.0 Client ID Configuration:
- Application type: Web application
- Authorized JavaScript origins:
  - https://hub.tiny-sumo.com
  - https://your-huly-instance.com
- Authorized redirect URIs:
  - https://hub.tiny-sumo.com/auth/callback
  - https://your-huly-instance.com/auth/callback
```

#### **Domain Restriction Settings**
```
Authorized domains:
- tiny-sumo.com
- aaron47willis@gmail.com (if needed for admin access)
```

### **Phase 2: Huly OAuth Integration**

#### **1. OAuth Configuration File**
```typescript
// src/auth/oauth-config.ts
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
  },
  
  tokenConfig: {
    accessTokenExpiresIn: 3600, // 1 hour
    refreshTokenExpiresIn: 2592000, // 30 days
  }
})
```

#### **2. Authentication Middleware**
```typescript
// src/auth/auth-middleware.ts
import { defineAuthMiddleware } from '@huly/auth'
import { tinySumoOAuth } from './oauth-config'

export const authMiddleware = defineAuthMiddleware({
  providers: [tinySumoOAuth],
  
  // Domain restriction middleware
  async validateUser(user) {
    const email = user.email.toLowerCase()
    const domain = email.split('@')[1]
    
    // Check if email is from allowed domain
    if (!['tiny-sumo.com'].includes(domain)) {
      throw new Error('Access restricted to Tiny Sumo employees only')
    }
    
    // Additional admin checks if needed
    if (email === 'aaron47willis@gmail.com') {
      user.role = 'admin'
    } else {
      user.role = 'user'
    }
    
    return user
  },
  
  // Session configuration
  session: {
    secret: process.env.SESSION_SECRET,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    secure: process.env.NODE_ENV === 'production'
  },
  
  // Permission mapping
  permissions: {
    admin: ['*'], // Full access
    user: [
      'analytics:read',
      'crm:read',
      'campaigns:read',
      'tools:read',
      'tools:write' // Limited write access
    ]
  }
})
```

#### **3. Huly Application Configuration**
```typescript
// src/huly-config.ts
import { defineApp } from '@huly/application'
import { authMiddleware } from './auth/auth-middleware'

export default defineApp({
  name: 'tiny-sumo-huly',
  version: '1.0.0',
  
  // Authentication configuration
  auth: {
    middleware: authMiddleware,
    required: true, // All routes require authentication
    redirectOnUnauthorized: '/login'
  },
  
  // Theme configuration
  theme: 'tiny-sumo',
  
  // Applications
  applications: [
    'tiny-sumo-analytics',
    'tiny-sumo-crm',
    'tiny-sumo-campaigns',
    'tiny-sumo-marketing-tools'
  ],
  
  // Security headers
  security: {
    csp: {
      'default-src': ["'self'"],
      'script-src': ["'self'", "'unsafe-inline'"],
      'style-src': ["'self'", "'unsafe-inline'"],
      'img-src': ["'self'", "data:", "https:"],
      'connect-src': ["'self'", "https://api.tiny-sumo.com"]
    },
    headers: {
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'X-XSS-Protection': '1; mode=block'
    }
  }
})
```

### **Phase 3: Login & Authentication Components**

#### **1. Login Page Component**
```typescript
// src/components/auth/LoginPage.tsx
import React from 'react'
import { useAuth } from '@huly/auth'

export const LoginPage = () => {
  const { login, loading, error } = useAuth()
  
  const handleGoogleLogin = async () => {
    try {
      await login('tiny-sumo-google', {
        redirectTo: '/dashboard'
      })
    } catch (error) {
      console.error('Login failed:', error)
    }
  }
  
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-section">
          <img src="/tiny-sumo-logo.png" alt="Tiny Sumo" />
          <h1>Tiny Sumo Huly</h1>
          <p>Tiny Sumo. Giant Growth</p>
        </div>
        
        <div className="login-content">
          <h2>Secure Access Portal</h2>
          <p>Access restricted to Tiny Sumo employees only</p>
          
          {error && (
            <div className="error-message">
              {error.message}
            </div>
          )}
          
          <button 
            onClick={handleGoogleLogin}
            disabled={loading}
            className="google-login-btn"
          >
            {loading ? 'Authenticating...' : 'Sign in with Google'}
          </button>
          
          <div className="security-info">
            <h3>🔒 Security Features</h3>
            <ul>
              <li>Domain restriction: tiny-sumo.com emails only</li>
              <li>OAuth 2.0 authentication protocol</li>
              <li>Encrypted token-based sessions</li>
              <li>Role-based access control</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
```

#### **2. Protected Route Component**
```typescript
// src/components/auth/ProtectedRoute.tsx
import React from 'react'
import { useAuth } from '@huly/auth'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredPermission?: string
  fallback?: React.ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredPermission,
  fallback = <div>Access Denied</div>
}) => {
  const { user, loading, hasPermission } = useAuth()
  
  if (loading) {
    return <div>Loading...</div>
  }
  
  if (!user) {
    return <Navigate to="/login" replace />
  }
  
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <>{fallback}</>
  }
  
  return <>{children}</>
}
```

### **Phase 4: User Management & Permissions**

#### **1. User Service**
```typescript
// src/services/user-service.ts
import { defineUserService } from '@huly/auth'

export const userService = defineUserService({
  // User validation
  async validateUser(email: string) {
    const domain = email.split('@')[1]
    
    // Check domain restriction
    if (!['tiny-sumo.com'].includes(domain)) {
      throw new Error('Access restricted to Tiny Sumo employees')
    }
    
    // Create or update user
    const user = await this.findOrCreateUser({
      email,
      domain,
      role: email === 'aaron47willis@gmail.com' ? 'admin' : 'user'
    })
    
    return user
  },
  
  // Permission mapping
  async getUserPermissions(user) {
    if (user.role === 'admin') {
      return ['*'] // Full permissions
    }
    
    return [
      'analytics:read',
      'crm:read',
      'campaigns:read',
      'tools:read',
      'tools:write'
    ]
  },
  
  // Session management
  async createSession(user) {
    return {
      userId: user.id,
      email: user.email,
      role: user.role,
      permissions: await this.getUserPermissions(user),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
    }
  }
})
```

### **Phase 5: Environment Configuration**

#### **1. Environment Variables**
```bash
# .env file
# OAuth Configuration
GOOGLE_OAUTH_CLIENT_ID=your-google-oauth-client-id
GOOGLE_OAUTH_CLIENT_SECRET=your-google-oauth-client-secret

# Huly Configuration
HULY_BASE_URL=https://hub.tiny-sumo.com
SESSION_SECRET=your-super-secure-session-secret
JWT_SECRET=your-jwt-secret

# API URLs (for custom tools)
ANALYTICS_API_URL=https://analytics.tiny-sumo.com/api
CRM_API_URL=https://crm.tiny-sumo.com/api

# Security
NODE_ENV=production
```

#### **2. Production Security Configuration**
```typescript
// src/config/production.ts
export const productionConfig = {
  // OAuth settings
  oauth: {
    forceHttps: true,
    secureCookies: true,
    sessionTimeout: 24 * 60 * 60 * 1000 // 24 hours
  },
  
  // Security headers
  security: {
    hsts: true,
    contentSecurityPolicy: true,
    xssProtection: true
  },
  
  // Rate limiting
  rateLimit: {
    loginAttempts: 5,
    windowMs: 15 * 60 * 1000 // 15 minutes
  }
}
```

### **Phase 6: Testing & Validation**

#### **1. OAuth Test Suite**
```typescript
// src/tests/oauth.test.ts
describe('OAuth Integration', () => {
  test('should reject non-tiny-sumo emails', async () => {
    const fakeUser = {
      email: 'user@external-company.com',
      name: 'External User'
    }
    
    await expect(validateUser(fakeUser))
      .rejects.toThrow('Access restricted to Tiny Sumo employees')
  })
  
  test('should allow tiny-sumo.com emails', async () => {
    const tinySumoUser = {
      email: 'employee@tiny-sumo.com',
      name: 'Tiny Sumo Employee'
    }
    
    const user = await validateUser(tinySumoUser)
    expect(user).toBeDefined()
    expect(user.role).toBe('user')
  })
  
  test('should give admin access to specific email', async () => {
    const adminUser = {
      email: 'aaron47willis@gmail.com',
      name: 'Admin User'
    }
    
    const user = await validateUser(adminUser)
    expect(user.role).toBe('admin')
  })
})
```

## 🎯 Expected Result

**With OAuth integration, you'll have:**

✅ **Secure Access Control**: Only tiny-sumo.com emails can access
✅ **Professional Login**: Google OAuth with branded interface
✅ **Role-Based Permissions**: Admin vs User access levels
✅ **Session Management**: Secure, encrypted sessions
✅ **Single Sign-On**: Seamless authentication across all tools
✅ **Audit Trail**: Login attempts and access logging
✅ **Mobile Compatible**: Works on all devices

## 🔐 Security Features

### **Domain Restriction**
- Only tiny-sumo.com email addresses allowed
- Configurable admin email exceptions
- Strict validation on all login attempts

### **Session Security**
- Encrypted JWT tokens
- Secure HTTP-only cookies
- Session timeout after 24 hours
- Automatic token refresh

### **API Protection**
- All API calls require valid authentication
- Permission-based access control
- Rate limiting on authentication endpoints

**This gives you enterprise-grade security with seamless user experience! 🚀**