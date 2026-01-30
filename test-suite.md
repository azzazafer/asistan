# 🧪 AURA OS - SYSTEM DIAGNOSTIC TEST SUITE

> **Purpose**: Manual verification checklist for critical system features after hotfix deployment.

---

## ✅ TASK 1: VISION CAPABILITY TEST (THE EYES)

### Test Case: Dental Photo Analysis

**Objective**: Verify AI can see and analyze dental images sent via WhatsApp.

**Steps**:
1. Send a dental photo via WhatsApp to the Aura OS number
2. Verify the webhook logs show `[WhatsApp] Image detected: <MediaUrl>`
3. Verify the orchestrator logs show vision processing
4. Confirm AI responds with dental analysis (not "I cannot see the photo")

**Expected Result**:
- ✅ AI provides detailed dental assessment
- ✅ AI mentions specific observations (discoloration, alignment, etc.)
- ✅ AI suggests treatment (Zirconia, Laminate, Implants, etc.)

**Pass Criteria**: AI must demonstrate it "saw" the image by providing specific visual observations.

---

## ⚡ TASK 2: LATENCY OPTIMIZATION TEST (THE REFLEXES)

### Test Case: Voice Message Response Time

**Objective**: Verify voice message processing completes in <5 seconds.

**Steps**:
1. Send a voice message via WhatsApp asking about treatment pricing
2. Start timer when message is sent
3. Wait for AI textual response
4. Stop timer when response is received

**Expected Result**:
- ✅ User receives typing indicator ("⏳ Analyzing...") immediately
- ✅ Transcription completes using `whisper-1` model
- ✅ Total response time < 5 seconds

**Pass Criteria**: End-to-end latency must be under 5 seconds for voice messages.

**Verification Commands**:
```bash
# Check whisper model in logs
grep "whisper-1" logs/production.log

# Check typing indicator sent
grep "Typing indicator sent" logs/production.log
```

---

## 💳 TASK 3: PAYMENT LINK GENERATION TEST

### Test Case: Stripe Deposit Link with Fee Splitting

**Objective**: Verify Stripe payment links are generated correctly and fees are split properly.

**Steps**:
1. Trigger payment intent via AI conversation
2. Verify Stripe Checkout link is generated
3. Inspect the link to confirm:
   - Correct deposit amount (e.g., 500 EUR)
   - Application fee is calculated correctly
   - Metadata includes `tenant_id`, `patient_id`

**Expected Result**:
- ✅ Stripe link format: `https://checkout.stripe.com/c/pay/cs_live_...`
- ✅ Fee split: 3% platform fee is deducted
- ✅ Metadata is attached for tracking

**Pass Criteria**: Payment link must be valid and fee calculation accurate.

**Verification**:
- Check Stripe Dashboard → Payments → View transaction details
- Confirm application fee matches expected percentage

---

## 🔒 TASK 4: PII ENCRYPTION VERIFICATION (SECURITY)

### Test Case: Personal Data Protection

**Objective**: Verify all PII (Personally Identifiable Information) is encrypted at rest.

**Steps**:
1. Create a new lead via WhatsApp with phone number and name
2. Query Supabase `leads` table directly
3. Inspect the `phone` and `name` columns

**Expected Result**:
- ✅ Phone numbers are hashed/encrypted (not plaintext)
- ✅ Sensitive fields use encryption functions
- ✅ AI logs redact PII (e.g., phone shows as `+90***1234`)

**Pass Criteria**: No plaintext PII in database or logs.

**Verification Commands**:
```sql
-- Check if encryption is applied
SELECT phone, name FROM leads LIMIT 5;

-- Verify redaction function exists
SELECT * FROM security_audit_logs WHERE event_type = 'pii_access';
```

**Compliance Note**: GDPR/HIPAA require encryption at rest for all medical and personal data.

---

## 📊 VERIFICATION STATUS

| Test | Status | Notes |
|------|--------|-------|
| Vision: Dental Photo | ⬜ Pending | |
| Voice: <5s Latency | ⬜ Pending | |
| Payment: Fee Splitting | ⬜ Pending | |
| Security: PII Encryption | ⬜ Pending | |

---

## 🚨 CRITICAL: PRODUCTION DEPLOYMENT CHECKLIST

Before marking this hotfix as COMPLETE:

- [ ] Vision test passed with real WhatsApp image
- [ ] Voice latency measured at <5 seconds
- [ ] Stripe link generated and verified in Stripe Dashboard
- [ ] PII encryption confirmed in Supabase
- [ ] All environment variables present in Vercel
- [ ] No errors in production logs for 1 hour post-deployment

**Sign-off**: Only deploy to production after all items checked.

---

## 🛠️ TROUBLESHOOTING

### Vision Still Failing?
- Check Twilio webhook logs for `MediaUrl0`
- Verify OpenAI API key has GPT-4o access
- Ensure `imageData` is passed to orchestrator

### Voice Still Slow?
- Check Whisper API latency in OpenAI dashboard
- Verify typing indicator is sent immediately
- Consider caching frequent queries

### Payment Issues?
- Verify Stripe secret key is `sk_live_...` (not `sk_test_...`)
- Check connected account ID is correct
- Review fee calculation logic in `/api/deposit/route.ts`

### PII Leakage?
- Audit `console.log` statements for phone numbers
- Review `security.ts` redaction functions
- Enable Supabase RLS (Row Level Security) policies

---

**Last Updated**: 2026-01-30 by Aura OS Hotfix Team
