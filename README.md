# 🥋 Tiny Sumo Marketing Hub

**Complete Marketing Operations Center with Native Huly and Twenty CRM Integration**

A production-ready web application built with React, TypeScript, and Vite, featuring Tiny Sumo branding and AWS Amplify deployment.

## 🎯 Features

### 🚀 Native Integration
- **Twenty CRM Backend**: Full integration with Twenty CRM's backend API
- **Huly Platform Ready**: Prepared for Huly platform integration
- **Real Backend Connection**: Connects to Twenty's actual backend services

### 📊 Marketing Operations
- **📊 Dashboard**: Real-time marketing metrics and KPIs
- **👥 Twenty CRM**: Complete CRM interface with contact management
- **📈 Analytics**: Advanced analytics with performance tracking
- **📢 Campaigns**: Marketing campaign creation and management

### 🛠️ Technical Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Emotion CSS-in-JS with CSS variables
- **Routing**: React Router v6
- **State Management**: React hooks with service layer
- **Backend**: Twenty CRM backend API integration
- **Deployment**: AWS Amplify ready

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

### Environment Setup

```bash
# Copy environment template (create .env.local)
VITE_TWENTY_API_URL=https://your-twenty-instance.com
VITE_TWENTY_API_KEY=your-api-key
```

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   External      │
│   (React/Vite)  │◄──►│   (Twenty CRM)  │◄──►│   Services      │
│                 │    │                 │    │                 │
│ • Dashboard     │    │ • Contacts API  │    │ • Huly Platform │
│ • Twenty CRM    │    │ • Analytics API │    │ • Email Service │
│ • Analytics     │    │ • Campaigns API │    │ • Storage       │
│ • Campaigns     │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🎨 Design System

### Tiny Sumo Branding
- **Primary Color**: `#8b0000` (Tiny Sumo Red)
- **Background**: `#1a1a1a` (Dark theme)
- **Typography**: Sora + Inter fonts
- **Components**: Custom styled components with CSS variables

### Color Palette
```css
--color-primary: #8b0000          /* Tiny Sumo Red */
--background-primary: #1a1a1a     /* Dark background */
--background-secondary: #2d2d2d   /* Card backgrounds */
--text-primary: #ffffff           /* Primary text */
--text-secondary: #b0b0b0         /* Secondary text */
```

## 📦 Deployment

### AWS Amplify
The application is configured for AWS Amplify deployment:

1. **Repository**: Connect GitHub repository
2. **Build Settings**: Auto-detected via `amplify.yml`
3. **Environment Variables**: Set in Amplify console
4. **Domain**: Custom domain setup available

### Build Commands
```bash
# Build for production
npm run build

# Preview build locally
npm run preview

# Deploy to AWS Amplify
# (handled automatically by Amplify)
```

## 🔗 API Integration

### Twenty CRM Backend
- **Contacts API**: CRUD operations for contact management
- **Analytics API**: Performance metrics and reporting
- **Campaigns API**: Marketing campaign tracking
- **Mock Data**: Fallback data for development

### Example API Usage
```typescript
import { twentyCRMService } from './services/api'

// Get contacts
const contacts = await twentyCRMService.getContacts()

// Create contact
const newContact = await twentyCRMService.createContact({
  name: 'John Doe',
  email: 'john@example.com',
  company: 'TechCorp'
})
```

## 🛠️ Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Project Structure
```
src/
├── components/          # Reusable UI components
│   └── Layout.tsx      # Main layout wrapper
├── pages/              # Page components
│   ├── Dashboard.tsx   # Main dashboard
│   ├── TwentyCRM.tsx   # CRM interface
│   ├── Analytics.tsx   # Analytics page
│   └── Campaigns.tsx   # Campaign management
├── services/           # API services
│   └── api.ts          # Backend integration
├── App.tsx             # Main app component
├── main.tsx           # App entry point
└── index.css          # Global styles
```

## 📊 Pages Overview

### Dashboard
- Real-time marketing metrics
- Quick action buttons
- Performance overview cards

### Twenty CRM
- Contact list with search and filtering
- Contact details and management
- Integration with Twenty CRM backend

### Analytics
- Marketing performance metrics
- Lead source analysis
- Conversion tracking

### Campaigns
- Campaign creation and management
- Budget tracking
- Performance metrics

## 🚀 Performance

- **Vite**: Fast development and optimized builds
- **Code Splitting**: Automatic optimization
- **Tree Shaking**: Remove unused code
- **Lazy Loading**: On-demand component loading

## 🔒 Security

- **Environment Variables**: Secure API key management
- **CORS Configuration**: Proper cross-origin setup
- **Input Validation**: Client-side validation
- **Authentication**: Ready for OAuth integration

## 📄 License

MIT License - see LICENSE file for details.

## 🆘 Support

- **Documentation**: This README and inline comments
- **Issues**: GitHub Issues for bug reports
- **Email**: support@tiny-sumo.com

---

**Built with ❤️ for the Tiny Sumo Team**

*Ready to dominate the marketing game!* 🥋
