# AlyProp - AI-Powered Real Estate Deal Finder

An intelligent real estate investment platform that helps investors identify undervalued properties with clear ROI potential, powered by comprehensive property data from Estated API and advanced AI insights from Claude 3 Haiku.

## 🚀 Features

### Core Functionality
- **AI-Powered Deal Scoring**: Claude 3 Haiku analyzes properties and provides comprehensive deal scores with detailed explanations
- **Comprehensive Property Data**: Access detailed property information, ownership data, and market analytics powered by Estated API
- **Interactive Property Search**: Advanced filtering system with location-based search, price ranges, property types, and investment criteria
- **Investment Strategy Recommendations**: Personalized strategies including buy & hold, flip, BRRRR, and wholesale analysis
- **Real-Time Market Analysis**: Current market trends, comparable sales, and rental analysis
- **Smart Deal Alerts**: Automated alerts for properties matching your investment criteria

### AI-Powered Insights
- Property deal scores (0-100) with grade assignments (A+ to F)
- Automated property summaries explaining investment potential
- Risk factor identification and mitigation strategies
- ROI projections and cash flow analysis
- Market trend analysis and comparable property insights
- Investment strategy recommendations with estimated profits

### User Experience
- Responsive design optimized for desktop and mobile
- Interactive property cards with key metrics
- Advanced search filters and sorting options
- Property favorites and watchlist functionality
- Modern, intuitive interface with smooth animations

## 🛠 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Heroicons** - Beautiful SVG icons
- **React Hook Form** - Form handling and validation

### Backend & APIs
- **Next.js API Routes** - Serverless backend functions
- **Estated API** - Comprehensive real estate data
- **Claude 3 Haiku** - AI analysis and insights
- **Mapbox** - Interactive maps and geocoding

### Data & Analytics
- **SWR** - Data fetching and caching
- **Recharts** - Data visualization components
- **Numeral.js** - Number formatting
- **Date-fns** - Date manipulation

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18.0 or later
- npm or yarn package manager
- Git

## ⚡ Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/alyprop.git
cd alyprop
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Setup
Copy the environment variables template:
```bash
cp .env.example .env.local
```

Update `.env.local` with your API keys:
```env
# Required API Keys
ESTATED_API_KEY=your_estated_api_key_here
CLAUDE_API_KEY=your_claude_api_key_here
MAPBOX_ACCESS_TOKEN=your_mapbox_token_here

# App Configuration
NEXT_PUBLIC_APP_NAME=AlyProp
NEXT_PUBLIC_STATE_NAME=YourState
NEXT_PUBLIC_STATE_ABBREVIATION=YS

# Development
NODE_ENV=development
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
```

### 4. Start Development Server
```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 🔑 API Keys Setup

### Estated API
1. Visit [Estated](https://estated.com) and sign up for an account
2. Purchase a data license for your target state
3. Get your API key from the dashboard
4. Add to your `.env.local` file

### Claude API (Anthropic)
1. Visit [Anthropic](https://console.anthropic.com) and create an account
2. Generate an API key from the console
3. Add to your `.env.local` file

### Mapbox (Optional)
1. Sign up at [Mapbox](https://mapbox.com)
2. Get your access token
3. Add to your `.env.local` file

## 📁 Project Structure

```
alyprop/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API routes
│   │   ├── properties/     # Properties pages
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Homepage
│   ├── components/         # React components
│   │   ├── PropertyCard.tsx
│   │   └── ...
│   ├── lib/               # External service integrations
│   │   ├── estated.ts     # Estated API service
│   │   ├── claude.ts      # Claude AI service
│   │   └── ...
│   ├── types/             # TypeScript type definitions
│   │   ├── property.ts
│   │   ├── user.ts
│   │   └── ...
│   └── utils/             # Utility functions
│       ├── formatters.ts
│       └── ...
├── public/                # Static assets
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

## 🎯 Key Components

### PropertyCard
Displays property information with AI insights, deal scores, and investment metrics.

### Property Search
Advanced filtering system with real-time search and sorting capabilities.

### AI Analysis
Integration with Claude 3 Haiku for:
- Deal scoring and grading
- Investment strategy recommendations
- Market analysis and risk assessment
- Property summaries and insights

### Estated Integration
Comprehensive property data including:
- Property details and characteristics
- Market values and pricing history
- Ownership information
- Comparable sales data
- Tax and financial information

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Other Platforms
The application can be deployed on any platform that supports Next.js:
- Netlify
- AWS Amplify
- Digital Ocean App Platform
- Railway
- Heroku

## 📊 Business Model

### Target Market
- Real estate investors and flippers
- Small investment firms and wholesalers
- Real estate agents seeking competitive advantages
- Property management companies

### Revenue Streams
- Subscription tiers (Free, Basic, Professional, Enterprise)
- Per-property analysis fees
- API access for third-party integrations
- Premium market reports and insights

### Competitive Advantages
- Hyper-local focus with superior data depth
- Proprietary AI scoring powered by Claude 3 Haiku
- Combined web + mobile experience
- Scalable AI + data licensing model

## 🔒 Security & Privacy

- API keys are server-side only
- User data encryption in transit and at rest
- GDPR compliant data handling
- Secure authentication and authorization
- Regular security audits and updates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- Documentation: [docs.alyprop.com](https://docs.alyprop.com)
- Email: support@alyprop.com
- Discord: [AlyProp Community](https://discord.gg/alyprop)

## 🗺 Roadmap

### Phase 1 (Current)
- ✅ Core property search and analysis
- ✅ AI-powered deal scoring
- ✅ Basic investment strategies
- ✅ Responsive web application

### Phase 2 (Q1 2024)
- 📱 Mobile application (React Native)
- 🗺 Interactive map with property overlays
- 📊 Advanced analytics dashboard
- 🔔 Real-time deal alerts and notifications

### Phase 3 (Q2 2024)
- 👥 User accounts and authentication
- 💾 Saved searches and watchlists
- 📈 Portfolio tracking and management
- 🤖 Enhanced AI with market predictions

### Phase 4 (Q3 2024)
- 🔗 Third-party integrations (MLS, CRMs)
- 📊 Custom market reports
- 👥 Team collaboration features
- 🌐 Multi-market expansion

## 📞 Contact

For business inquiries or partnership opportunities:
- Website: [alyprop.com](https://alyprop.com)
- Email: hello@alyprop.com
- LinkedIn: [AlyProp](https://linkedin.com/company/alyprop)
- Twitter: [@AlyProp](https://twitter.com/alyprop)

---

**Built with ❤️ by the AlyProp team**

*Powered by Estated API and Claude 3 Haiku*