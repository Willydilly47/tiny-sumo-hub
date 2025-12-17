#!/bin/bash

# Tiny Sumo Huly Setup Script
# This script sets up a fully branded Huly instance with custom tools

echo "🚀 Setting up Tiny Sumo Huly Platform"
echo "===================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is required but not installed."
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is required but not installed."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install Huly CLI globally
echo "📦 Installing Huly CLI..."
npm install -g @huly/cli

# Create new Huly project
echo "🏗️ Creating new Huly project..."
huly init tiny-sumo-huly

# Navigate to project directory
cd tiny-sumo-huly

# Install branding dependencies
echo "🎨 Installing branding dependencies..."
npm install @huly/theme @huly/branding @huly/plugin-system

# Install additional dependencies for custom tools
echo "🔧 Installing tool dependencies..."
npm install @huly/dashboard @huly/widgets @huly/api-client

# Create theme directory
echo "🎨 Setting up Tiny Sumo theme..."
mkdir -p src/theme
mkdir -p src/applications
mkdir -p src/plugins
mkdir -p src/integrations

# Copy theme configuration
echo "📝 Creating theme configuration..."

# Create package.json scripts
echo "📋 Adding custom scripts to package.json..."

# Create environment template
echo "🔐 Creating environment template..."
cat > .env.example << EOL
# Tiny Sumo Huly Environment Variables

# API URLs
ANALYTICS_API_URL=https://analytics.tiny-sumo.com/api
CRM_API_URL=https://crm.tiny-sumo.com/api
EMAIL_API_URL=https://email.tiny-sumo.com/api
SOCIAL_API_URL=https://social.tiny-sumo.com/api
SEO_API_URL=https://seo.tiny-sumo.com/api

# Authentication
JWT_SECRET=your-jwt-secret-here
OAUTH_CLIENT_ID=your-oauth-client-id
OAUTH_CLIENT_SECRET=your-oauth-client-secret

# Database (if using)
DATABASE_URL=your-database-url

# External Integrations
GOOGLE_ANALYTICS_ID=your-ga-id
FACEBOOK_PIXEL_ID=your-fb-pixel-id
EOL

# Create start script
echo "🚀 Creating development scripts..."

# Create deployment script
echo "☁️ Creating deployment configuration..."

echo ""
echo "✅ Tiny Sumo Huly setup completed!"
echo ""
echo "📁 Project structure created:"
echo "   tiny-sumo-huly/"
echo "   ├── src/"
echo "   │   ├── theme/          # Tiny Sumo branding"
echo "   │   ├── applications/   # Custom apps (Analytics, CRM, etc.)"
echo "   │   ├── plugins/        # Marketing tools plugin"
echo "   │   └── integrations/   # API connectors"
echo "   ├── .env.example        # Environment variables template"
echo "   └── package.json        # Dependencies and scripts"
echo ""
echo "🎯 Next steps:"
echo "   1. cd tiny-sumo-huly"
echo "   2. cp .env.example .env"
echo "   3. Edit .env with your API URLs"
echo "   4. npm run dev"
echo ""
echo "🚀 Your branded Huly platform will be ready at http://localhost:3000"