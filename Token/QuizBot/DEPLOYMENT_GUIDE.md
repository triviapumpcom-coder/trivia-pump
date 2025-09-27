# 🚀 Deployment Guide - Trivia Pump Stream

## 📋 **Contract Address & Live Chat Configuration**

### **Tek Environment Variable Kontrolü**
✅ **Evet, tek bir `CONTRACT_ADDRESS` environment variable'ı hem token verilerini hem de live chat'i kontrol ediyor:**

```bash
# Bu adres hem token stats hem de Pump.fun chat için kullanılıyor
CONTRACT_ADDRESS=5wVtfsFhLjxm27K9mN3ziYWCCpQwXXq7HWUiRMW7pump
VITE_CONTRACT_ADDRESS=5wVtfsFhLjxm27K9mN3ziYWCCpQwXXq7HWUiRMW7pump
```

### **Farklı Token/Chat Adresi İçin Değişiklik Yerleri:**

#### **1. Backend (API) - Live Chat & Token Stats**
```typescript
// apps/api/src/index.ts (Line 184)
const contractAddress = process.env.CONTRACT_ADDRESS || "";

// Bu adres şu işlemler için kullanılıyor:
// ✅ Pump.fun live chat dinleme
// ✅ Token statistics (price, holders, market cap)
// ✅ Top holders listesi
```

#### **2. Frontend - Token Display**
```typescript
// apps/web/src/components/HeaderBar.tsx (Line 14)
const contract = (import.meta as any).env?.VITE_CONTRACT_ADDRESS;

// apps/web/src/components/TokenHoldersPanel.tsx (Line 5)
const mint = (import.meta as any).env?.VITE_CONTRACT_ADDRESS || "demo";
```

#### **3. Environment Files**
```bash
# Backend Environment
CONTRACT_ADDRESS=YOUR_NEW_TOKEN_ADDRESS

# Frontend Environment  
VITE_CONTRACT_ADDRESS=YOUR_NEW_TOKEN_ADDRESS
```

## 🌐 **Netlify Deployment Durumu**

### **✅ Deployment Ready - Sistem Hazır!**

#### **Netlify Konfigürasyonu Mevcut:**
```toml
# netlify.toml
[build]
  publish = "apps/web/dist"
  command = "pnpm build"

[[functions]]
  path = "apps/api/src"
  node_bundler = "esbuild"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
```

#### **Vercel Konfigürasyonu Mevcut:**
```json
// vercel.json
{
  "functions": {
    "apps/api/src/index.ts": {
      "maxDuration": 30,
      "memory": 1024,
      "regions": ["iad1"]
    }
  }
}
```

### **🔧 Deployment Adımları:**

#### **1. Environment Variables Ayarlama (Netlify/Vercel)**
```bash
# Required Variables
NODE_ENV=production
CONTRACT_ADDRESS=5wVtfsFhLjxm27K9mN3ziYWCCpQwXXq7HWUiRMW7pump
VITE_CONTRACT_ADDRESS=5wVtfsFhLjxm27K9mN3ziYWCCpQwXXq7HWUiRMW7pump
QUICKNODE_RPC=https://frosty-smart-mound.solana-mainnet.quiknode.pro/75dae04b7b364ea7f313486132f3f1c4ae170db0/
ROUND_DURATION_SEC=30

# Optional (Redis for better performance)
REDIS_URL=redis://your-redis-url

# Optional (Database for persistence)
DATABASE_URL=postgresql://your-db-url
```

#### **2. Netlify Deploy Komutu:**
```bash
# Repository'yi Netlify'a bağla
netlify deploy --prod

# Veya GitHub integration ile otomatik deploy
```

#### **3. Vercel Deploy Komutu:**
```bash
# Repository'yi Vercel'e bağla
vercel --prod
```

## 📊 **Leaderboard Veri Durumu**

### **✅ Gerçek Veriler Gelecek!**

#### **Veri Kaynakları:**
```typescript
// 1. Redis'te Real-time Scores
"scores:weekly" // Haftalık skorlar
"answers:{roundId}" // Round cevapları
"events:recent" // Son aktiviteler

// 2. PostgreSQL'de Persistent Data (Opsiyonel)
ScoreWeekly // Haftalık skorlar
RoundLog // Round logları
Payout // Ödeme kayıtları
```

#### **Leaderboard Populate Süreci:**
```typescript
// apps/api/src/game/answers.ts
export async function incrementWeeklyScores(winnerIds: string[], roundId: string, correct: ChoiceLetter) {
  for (const userId of winnerIds) {
    // Redis'e puan ekle
    await redis.zincrby("scores:weekly", 1, userId);
    
    // Database'e kaydet (opsiyonel)
    await updateDatabaseScore(userId, displayName, week, newScore);
  }
}
```

#### **Test Verisi vs Gerçek Veri:**
```typescript
// apps/api/src/http/routes.ts (Line 28-35)
// Eğer Redis boşsa test verisi ekler:
if (!exists) {
  await redis.zadd("scores:weekly", 150, "user1");
  await redis.zadd("scores:weekly", 120, "user2");
  // ...
}

// Gerçek kullanım sırasında:
// ✅ Live chat'ten gelen cevaplar otomatik puan ekler
// ✅ Doğru cevap verenlerin puanı artar
// ✅ Haftalık leaderboard güncellenir
```

## 🎮 **Sistem Hazırlık Durumu**

### **✅ Tüm Sistemler Operasyonel!**

#### **Backend Hazır:**
- ✅ **Live Chat Integration**: Pump.fun chat dinleme aktif
- ✅ **Token Stats API**: QuickNode ile gerçek veri
- ✅ **Top Holders API**: Solana RPC ile gerçek holder verisi
- ✅ **Game Engine**: 30 saniyelik roundlar, 275 soru
- ✅ **Flood Protection**: Rate limiting, spam koruması
- ✅ **Redis Caching**: Performans optimizasyonu
- ✅ **WebSocket**: Real-time updates

#### **Frontend Hazır:**
- ✅ **Real-time UI**: Socket.io ile canlı güncellemeler
- ✅ **Token Display**: Gerçek fiyat, market cap, holder sayısı
- ✅ **Speed Competition**: Milisaniye hassasiyeti
- ✅ **Background System**: Live chat komutları
- ✅ **Sound System**: Ses efektleri
- ✅ **Mobile Responsive**: Tüm cihazlarda çalışır

#### **Production Features:**
- ✅ **Error Handling**: Graceful degradation
- ✅ **Memory Management**: Auto cleanup
- ✅ **Security**: CORS, rate limiting, input validation
- ✅ **Performance**: Caching, optimization
- ✅ **Monitoring**: Logging, error tracking

## 🔄 **Token Değiştirme Süreci**

### **Yeni Token İçin Adımlar:**

#### **1. Environment Variables Güncelle:**
```bash
# Yeni token adresi
CONTRACT_ADDRESS=NEW_TOKEN_ADDRESS_HERE
VITE_CONTRACT_ADDRESS=NEW_TOKEN_ADDRESS_HERE
```

#### **2. Deployment Platformunda Güncelle:**
```bash
# Netlify
netlify env:set CONTRACT_ADDRESS NEW_TOKEN_ADDRESS_HERE
netlify env:set VITE_CONTRACT_ADDRESS NEW_TOKEN_ADDRESS_HERE

# Vercel
vercel env add CONTRACT_ADDRESS
vercel env add VITE_CONTRACT_ADDRESS
```

#### **3. Redeploy:**
```bash
# Otomatik redeploy tetiklenir
git push origin main
```

### **⚠️ Önemli Notlar:**
- **Pump.fun Chat**: Yeni token'ın Pump.fun'da aktif chat'i olmalı
- **Solana Mainnet**: Token Solana mainnet'te olmalı
- **Valid Address**: 32+ karakter geçerli Solana adresi olmalı

## 🚀 **Final Deployment Checklist**

### **✅ Hazır Durumda:**
- [x] **Monorepo Structure**: Apps/web + apps/api
- [x] **Build Scripts**: pnpm build çalışıyor
- [x] **Environment Validation**: Zod ile validation
- [x] **Error Handling**: Production-ready
- [x] **Performance**: Optimized
- [x] **Security**: Rate limiting, CORS
- [x] **Real-time**: WebSocket connections
- [x] **Token Integration**: QuickNode RPC
- [x] **Live Chat**: Pump.fun integration
- [x] **Leaderboard**: Redis + PostgreSQL
- [x] **Mobile Support**: Responsive design

### **🎯 Deploy Komutu:**
```bash
# Netlify
netlify deploy --prod

# Veya Vercel
vercel --prod
```

## 📈 **Post-Deployment**

### **Monitoring:**
- ✅ **Real-time Stats**: Token fiyat, holder sayısı
- ✅ **Game Metrics**: Round başarı oranı, katılım
- ✅ **Performance**: Response time, error rate
- ✅ **User Activity**: Live chat, cevap hızı

### **Scaling:**
- ✅ **Redis**: Production Redis servisi önerilir
- ✅ **Database**: PostgreSQL production instance
- ✅ **CDN**: Static assets için
- ✅ **Monitoring**: Sentry, LogRocket gibi tools

**🎉 Sistem tamamen deployment'a hazır! Tek yapmanız gereken environment variables'ları set edip deploy etmek!** 🚀
