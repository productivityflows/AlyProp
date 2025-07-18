# Deployment Guide - PropertyAI Pro

This guide covers deploying the PropertyAI Pro platform to production.

## 🏗️ Infrastructure Overview

- **Web App**: Vercel (recommended) or Netlify
- **API Backend**: Railway, Heroku, or AWS/DigitalOcean
- **Database**: PostgreSQL (AWS RDS, Supabase, or Railway)
- **File Storage**: AWS S3 or Cloudinary
- **CDN**: Cloudflare or AWS CloudFront
- **Mobile Apps**: App Store and Google Play Store

## 🌐 Web Application Deployment

### Vercel (Recommended)

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login and deploy
   vercel login
   cd apps/web
   vercel
   ```

2. **Environment Variables**
   ```bash
   # Set in Vercel dashboard
   NEXT_PUBLIC_API_URL=https://your-api-domain.com
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
   ```

3. **Build Settings**
   - Build Command: `cd apps/web && npm run build`
   - Output Directory: `apps/web/.next`
   - Install Command: `npm install`

### Alternative: Netlify

1. **netlify.toml**
   ```toml
   [build]
     command = "cd apps/web && npm run build && npm run export"
     publish = "apps/web/out"
   
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

## 🚀 API Backend Deployment

### Railway (Recommended)

1. **Connect Repository**
   - Go to [Railway](https://railway.app)
   - Connect your GitHub repository
   - Select the `apps/api` directory

2. **Environment Variables**
   ```bash
   NODE_ENV=production
   PORT=3001
   DATABASE_URL=postgresql://...
   ANTHROPIC_API_KEY=sk-ant-...
   ESTATED_API_KEY=...
   STRIPE_SECRET_KEY=sk_live_...
   JWT_SECRET=your-super-secret-key
   ```

3. **Build Settings**
   - Build Command: `cd apps/api && npm run build`
   - Start Command: `cd apps/api && npm start`

### Alternative: Heroku

1. **heroku.yml**
   ```yaml
   build:
     docker:
       web: apps/api/Dockerfile
   ```

2. **Dockerfile for API**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY apps/api/package*.json ./
   RUN npm ci --only=production
   COPY apps/api/ ./
   RUN npm run build
   EXPOSE 3001
   CMD ["npm", "start"]
   ```

## 🗄️ Database Setup

### PostgreSQL on Railway

1. **Create Database**
   - Add PostgreSQL service in Railway
   - Note the connection string

2. **Run Migrations**
   ```bash
   # Create migration files (example)
   CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     email VARCHAR(255) UNIQUE NOT NULL,
     name VARCHAR(255) NOT NULL,
     created_at TIMESTAMP DEFAULT NOW()
   );
   
   CREATE TABLE analyses (
     id SERIAL PRIMARY KEY,
     user_id INTEGER REFERENCES users(id),
     address TEXT NOT NULL,
     strategy VARCHAR(50) NOT NULL,
     results JSONB NOT NULL,
     created_at TIMESTAMP DEFAULT NOW()
   );
   
   CREATE TABLE waitlist (
     id SERIAL PRIMARY KEY,
     email VARCHAR(255) UNIQUE NOT NULL,
     name VARCHAR(255) NOT NULL,
     investment_type VARCHAR(100),
     experience VARCHAR(100),
     interests JSONB,
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```

### Alternative: Supabase

1. **Create Project**: [Supabase Dashboard](https://supabase.com)
2. **Run Migrations**: Use Supabase SQL editor
3. **Environment**: Use provided connection string

## 📱 Mobile App Deployment

### iOS App Store

1. **Prepare for Release**
   ```bash
   cd apps/mobile
   
   # Install dependencies
   npm install
   cd ios && pod install && cd ..
   
   # Build for release
   npm run ios --configuration=Release
   ```

2. **Archive and Upload**
   - Open `apps/mobile/ios/mobile.xcworkspace` in Xcode
   - Product → Archive
   - Upload to App Store Connect

3. **App Store Connect**
   - Fill in app metadata
   - Add screenshots
   - Submit for review

### Google Play Store

1. **Build APK/AAB**
   ```bash
   cd apps/mobile
   
   # Generate signed APK
   npm run android --variant=release
   
   # Or generate App Bundle (recommended)
   cd android
   ./gradlew bundleRelease
   ```

2. **Upload to Play Console**
   - Go to [Google Play Console](https://play.google.com/console)
   - Create new app
   - Upload APK/AAB
   - Fill in store listing
   - Submit for review

## 🔧 Configuration & Secrets

### Environment Variables Checklist

**API Backend:**
- `NODE_ENV=production`
- `DATABASE_URL` - PostgreSQL connection string
- `ANTHROPIC_API_KEY` - Claude API key
- `ESTATED_API_KEY` - Property data API key
- `STRIPE_SECRET_KEY` - Payment processing
- `JWT_SECRET` - Authentication secret
- `SENDGRID_API_KEY` - Email service (optional)

**Web Frontend:**
- `NEXT_PUBLIC_API_URL` - API backend URL
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe public key

**Mobile Apps:**
- API URL configured in app settings
- Stripe keys for payment processing

## 🔐 Security Checklist

- [ ] Use HTTPS everywhere
- [ ] Set up CORS properly
- [ ] Enable rate limiting
- [ ] Use environment variables for secrets
- [ ] Set up monitoring and logging
- [ ] Configure database backups
- [ ] Enable API authentication
- [ ] Set up error tracking (Sentry)

## 📊 Monitoring & Analytics

### Application Monitoring

1. **Error Tracking**: Sentry
   ```bash
   npm install @sentry/node @sentry/react @sentry/react-native
   ```

2. **Performance Monitoring**: New Relic or DataDog

3. **Uptime Monitoring**: Pingdom or UptimeRobot

### Analytics

1. **Web Analytics**: Google Analytics 4
2. **Mobile Analytics**: Firebase Analytics
3. **Business Metrics**: Custom dashboard with Metabase

## 💰 Payment Processing

### Stripe Live Mode

1. **Enable Live Mode**
   - Complete Stripe account verification
   - Get live API keys
   - Update environment variables

2. **Webhook Configuration**
   ```bash
   # Stripe webhook endpoint
   POST /api/webhook/stripe
   
   # Events to listen for:
   - payment_intent.succeeded
   - payment_intent.payment_failed
   ```

## 🚀 CI/CD Pipeline

### GitHub Actions

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy-web:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: cd apps/web && npm run build
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          working-directory: apps/web

  deploy-api:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: cd apps/api && npm run build
      # Deploy to Railway or Heroku
```

## 📈 Performance Optimization

### Web App
- Enable Next.js optimization features
- Use CDN for static assets
- Implement image optimization
- Enable gzip compression

### API
- Implement caching (Redis)
- Database query optimization
- Rate limiting per user
- API response compression

### Mobile Apps
- Enable Hermes (React Native)
- Optimize bundle size
- Implement lazy loading
- Use native navigation

## 🔄 Backup Strategy

1. **Database Backups**
   - Daily automated backups
   - Cross-region replication
   - Point-in-time recovery

2. **File Storage Backups**
   - S3 versioning enabled
   - Cross-region replication

3. **Code Backups**
   - Git repository mirroring
   - Regular repository exports

## 📞 Support & Maintenance

### Monitoring Checklist
- [ ] API uptime monitoring
- [ ] Database performance monitoring
- [ ] Error rate tracking
- [ ] Payment success rate monitoring
- [ ] User activity analytics

### Regular Maintenance
- [ ] Security updates (monthly)
- [ ] Dependency updates (monthly)
- [ ] Database cleanup (weekly)
- [ ] Performance optimization (quarterly)
- [ ] Backup testing (monthly)

---

**Need Help?** 
- 📧 Email: devops@propertyaipro.com
- 📚 Docs: [Internal Documentation]
- 🔧 Support: [Support Portal]