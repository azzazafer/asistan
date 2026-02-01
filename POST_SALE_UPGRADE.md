# 🚀 POST-SALE INFRASTRUCTURE UPGRADE PLAN

**CURRENT STATUS:**
- **Hosting**: Vercel Hobby (Free Tier)
- **Execution Timeout**: 10 seconds max
- **Vision Quality**: Low detail (`detail: "low"`)
- **Model**: GPT-4o-Mini (economy)
- **Strategy**: Synchronous webhook + Fast-path vision

---

## ⚠️ TRIGGER: FIRST CUSTOMER SALE ($$$)

When the first payment is received, execute the following upgrade sequence:

---

## 📋 REQUIRED ACTIONS

### 1. [ ] Upgrade Hosting Plan

**Option A: Vercel Pro** ($20/month)
- Enables 60s function execution (vs 10s)
- Allows background tasks without termination
- Pro support

**Option B: Railway/AWS**
- No timeout limits
- Pay-as-you-go pricing
- More complex setup

**Decision**: Choose based on budget and technical complexity tolerance.

---

### 2. [ ] Unlock High-Quality Vision

**File**: `src/lib/ai/vision-fast.ts`

**Change**:
```typescript
// FROM:
detail: "low" // 3x faster but lower accuracy

// TO:
detail: "high" // Full resolution analysis
```

**Impact**: More accurate dental diagnoses, better patient trust.

---

### 3. [ ] Upgrade to GPT-4o (Standard)

**File**: `src/lib/ai/vision-fast.ts`

**Change**:
```typescript
// FROM:
model: "gpt-4o-mini" // Economy model

// TO:
model: "gpt-4o" // Full capability model
```

**Impact**: Better reasoning, more detailed analysis, higher quality responses.

---

### 4. [ ] Re-enable Async Background Processing

**File**: `src/app/api/webhooks/whatsapp/route.ts`

**Change**: Revert to async IIFE pattern to allow complex multi-step processing without timeout constraints.

```typescript
// CURRENT (Sync):
await OmnichannelBridge.normalizeWhatsApp(payload);
await OmnichannelBridge.processIncoming(normalized);

// UPGRADE (Async):
(async () => {
  const normalized = await OmnichannelBridge.normalizeWhatsApp(payload);
  await OmnichannelBridge.processIncoming(normalized);
})(); // Non-blocking execution

return new NextResponse('<Response></Response>', { status: 200 });
```

---

### 5. [ ] Enable Full-Resolution Image Processing

**File**: `src/lib/ai/omnichannel.ts`

Remove any image compression or quality reduction applied for speed optimization.

---

## 💡 OPTIONAL ENHANCEMENTS (Post-Revenue)

- [ ] Add Redis for session management
- [ ] Implement queue system (Bull/BullMQ) for heavy tasks
- [ ] Enable GPT-4o with vision for ALL paths (not just fast-path)
- [ ] Add conversation history limits based on customer tier
- [ ] Implement CDN for faster media delivery

---

## 🚨 CRITICAL WARNING

**DO NOT** attempt these upgrades before securing first sale budget. The current free-tier setup is:
- ✅ Functional
- ✅ Fast enough (<9s)
- ✅ Cost-effective ($0/month)
- ✅ Production-ready for MVP

Premature optimization will waste money without proven ROI.

---

## 📊 SUCCESS METRICS

After upgrade, monitor:
- Response quality improvement (subjective user feedback)
- Conversion rate change (leads → appointments)
- System reliability (error rate decrease)
- Processing time (should remain <15s even with high quality)

---

**Last Updated**: Feb 1, 2026  
**Status**: Pre-Sale (Free Tier Active)
