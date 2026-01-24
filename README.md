# Aura OS v2.0 (by Nextoria Digital)

> **The Unbreakable Global SaaS for Medical Tourism.**
> AI-powered management platform with medical vision, autonomous diagnostics, enterprise hardening, and cultural intelligence.

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-success.svg)](https://nextoriadigital.com)
[![Hardening](https://img.shields.io/badge/Security-Phase_6_Hardened-blue.svg)](https://nextoriadigital.com)

## 🚀 Features

### 💎 Ultimate Hardening (New in v2.0)
- **Zero-Bleed Tenancy** - Bulletproof data isolation with `DBTenancyWrapper`.
- **Advanced Shield v2.0** - Active circuit breakers and anti-fraud fingerprinting.
- **Secure Log Signature** - Cryptographically signed audit trails for forensic integrity.
- **Root Cause Analyzer (RCA)** - Autonomous diagnostic engine for system health.

### 🧠 Core Intelligence
- **Medical Bio-Vision** - Autonomous image analysis using Norwood and ICDAS scales.
- **AI Cultural Matrix** - Adapts tone and offers based on patient culture (EU, Middle East, Global, Turkey).
- **Multi-language Support** - 10+ languages with edge-optimized SEO.

## 📦 Quick Start

### Prerequisites
- Node.js 20+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/aura-health-os.git
cd aura-health-os

# Install dependencies
npm install

# Copy environment template
cp env.template .env.local

# Edit .env.local with your API keys
# OPENAI_API_KEY=your_key_here

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Docker

```bash
# Build and run with Docker Compose
docker compose up -d

# Or build manually
docker build -t aura-os .
docker run -p 3000:3000 aura-os
```

## 🔧 Configuration

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key for AI features | Yes |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | No |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | No |
| `TWILIO_ACCOUNT_SID` | Twilio account SID | No |
| `TWILIO_AUTH_TOKEN` | Twilio auth token | No |
| `STRIPE_SECRET_KEY` | Stripe secret key | No |

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/          # Main dashboard
│   ├── api/                # API routes
│   └── portal/             # Patient portal
├── lib/                    # Utilities
│   ├── security.ts         # AES-256, PII, Audit
│   ├── calendar.ts         # Doctor scheduling
│   ├── messaging.ts        # WhatsApp/SMS
│   ├── payments.ts         # Stripe integration
│   ├── gamification.ts     # Neural ranking
│   ├── culture-matrix.ts   # Cultural intelligence
│   └── persistence.ts      # Offline storage
└── public/
    ├── manifest.json       # PWA manifest
    ├── sw.js               # Service worker
    └── offline.html        # Offline page
```

## 🛡️ Security

- All sensitive data encrypted at rest (AES-256)
- PII automatically redacted in logs
- Role-based access control
- Regular security audits
- OWASP compliance

## 📄 License

Proprietary. All rights reserved.

## 🤝 Support

For support and licensing inquiries, contact: support@aura-health.app
