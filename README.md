# PropertyAI Pro - AI-Powered Real Estate Investment Platform

A comprehensive real estate investment analysis platform powered by AI that provides deep insights, ROI calculations, and market analysis for properties nationwide.

## 🌟 Features

- **AI-Powered Property Analysis**: Claude 3 Haiku provides detailed investment insights
- **Pay-As-You-Go Model**: $5 per property analysis with no subscription required
- **Comprehensive Financial Analysis**: ROI, cash flow, cap rates, and more
- **Market Context**: Local comparables, price trends, and neighborhood insights
- **Risk Assessment**: AI identifies potential red flags and risks
- **Multiple Investment Strategies**: Support for rental, flip, BRRRR, and wholesale strategies
- **Cross-Platform**: Web application and mobile app (React Native)
- **Nationwide Coverage**: Property data from all 50 states

## 🏗️ Architecture

This is a monorepo containing:

- **Web App** (`apps/web`): Next.js 14 with React, TypeScript, and Tailwind CSS
- **Mobile App** (`apps/mobile`): React Native for iOS and Android
- **API Backend** (`apps/api`): Node.js with Express, TypeScript, and PostgreSQL
- **Shared Packages** (`packages/`): Common utilities and configurations

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- PostgreSQL 14+
- Redis (optional, for caching)
- Yarn or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd real-estate-ai-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Database Setup**
   ```bash
   # Create PostgreSQL database
   createdb propertyai_pro
   
   # Run migrations (when available)
   cd apps/api
   npm run migrate
   ```

5. **Start Development Servers**
   ```bash
   # Start all services
   npm run dev
   
   # Or start individually:
   cd apps/web && npm run dev      # Web app on :3000
   cd apps/api && npm run dev      # API on :3001
   cd apps/mobile && npm run start # Mobile app
   ```

## 🔧 Configuration

### Required API Keys

1. **Estated API** - For property data
   - Sign up at [Estated.com](https://estated.com)
   - Add `ESTATED_API_KEY` to your `.env`

2. **Anthropic Claude** - For AI analysis
   - Get API key from [Anthropic](https://console.anthropic.com)
   - Add `ANTHROPIC_API_KEY` to your `.env`

3. **Stripe** - For payment processing
   - Create account at [Stripe](https://stripe.com)
   - Add `STRIPE_SECRET_KEY` and `STRIPE_PUBLISHABLE_KEY`

### Optional Services

- **SendGrid** or **Mailchimp** - For email marketing/waitlist
- **Redis** - For caching and session management

## 📱 Mobile App Setup

### iOS Development

1. **Install Xcode** (Mac only)
2. **Install iOS dependencies**
   ```bash
   cd apps/mobile/ios
   pod install
   ```
3. **Run on iOS**
   ```bash
   cd apps/mobile
   npm run ios
   ```

### Android Development

1. **Install Android Studio**
2. **Set up Android SDK**
3. **Run on Android**
   ```bash
   cd apps/mobile
   npm run android
   ```

## 🎯 Business Model

### Pay-As-You-Go ($5/search)
- Perfect for casual investors
- No subscription required
- Instant property analysis
- Full AI insights included

### Pro Subscription ($39.99/month) - Coming Soon
- Unlimited property searches
- Real-time deal alerts
- Portfolio management tools
- Advanced market analytics
- API access
- Export capabilities

## 🤖 AI Integration

### Claude 3 Haiku Analysis

The platform uses Claude 3 Haiku to analyze properties and provide:

- **Deal Scoring**: 1-10 rating based on investment potential
- **Strategy-Specific Insights**: Tailored to rental, flip, BRRRR, etc.
- **Risk Assessment**: Identifies potential red flags
- **Market Context**: Explains local market conditions
- **Actionable Recommendations**: Specific next steps for investors

### Prompt Engineering

AI prompts are optimized for:
- Real estate investment terminology
- Market-specific nuances
- Risk factor identification
- ROI optimization strategies

## 🗄️ Database Schema

### Core Tables

- `properties` - Property basic information
- `analyses` - AI analysis results
- `users` - User accounts and preferences
- `payments` - Transaction records
- `waitlist` - Subscription waitlist signups

## 🔒 Security

- Rate limiting on all endpoints
- JWT authentication
- Input validation and sanitization
- Secure payment processing with Stripe
- Environment variable protection
- CORS configuration

## 🚀 Deployment

### Production Deployment

1. **Environment Variables**
   ```bash
   NODE_ENV=production
   DATABASE_URL=your_production_db_url
   # Add all other production keys
   ```

2. **Build Applications**
   ```bash
   npm run build
   ```

3. **Deploy Options**
   - **Vercel** (recommended for web app)
   - **Railway** or **Heroku** (for API)
   - **App Store/Google Play** (for mobile)

### Infrastructure Requirements

- **Database**: PostgreSQL 14+ (AWS RDS, Supabase, etc.)
- **Cache**: Redis (AWS ElastiCache, Redis Cloud)
- **CDN**: For static assets
- **Monitoring**: Application performance monitoring

## 📊 Analytics & Monitoring

- User behavior tracking
- Property search analytics
- Payment conversion metrics
- API performance monitoring
- Error tracking and alerting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is proprietary software. All rights reserved.

## 🆘 Support

- Documentation: `/docs` (when available)
- Issues: GitHub Issues
- Email: support@propertyaipro.com

## 🎯 Roadmap

### Phase 1 (Current)
- [x] Basic property analysis
- [x] Pay-as-you-go payments
- [x] Web application
- [x] Mobile app foundation

### Phase 2 (Next 3 months)
- [ ] Pro subscription launch
- [ ] Deal alerts system
- [ ] Portfolio management
- [ ] API for developers

### Phase 3 (6 months)
- [ ] Advanced market analytics
- [ ] Multi-market analysis
- [ ] Partnership integrations
- [ ] White-label solutions

---

**PropertyAI Pro** - Democratizing real estate investment intelligence with AI.