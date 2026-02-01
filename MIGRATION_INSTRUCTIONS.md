# 🚀 Database Migration Instructions

## Migration: Intelligence Schema (sales_patterns + funnel_state)

**File**: `supabase/migrations/20260201_intelligence_schema.sql`

---

## 🎯 What This Creates

1. **`sales_patterns` table** - Stores learned sales strategies
2. **`funnel_state` column** in `leads` table - Tracks sales funnel progression
3. **RLS policies** - Secures access to service role only
4. **Indexes** - Optimizes query performance
5. **Documentation** - Comments for future developers

---

## 📋 HOW TO RUN THIS MIGRATION

### Option 1: Supabase Dashboard (RECOMMENDED)

1. **Open Supabase Dashboard**: https://supabase.com/dashboard
2. **Select Your Project**: `azzazafer/asistan` (or your project name)
3. **Go to SQL Editor**: Left sidebar → "SQL Editor"
4. **Click "New Query"**
5. **Paste Migration**: Copy entire contents of `supabase/migrations/20260201_intelligence_schema.sql`
6. **Click "Run"** (bottom right)
7. **Verify Success**: Check for green success message

**Expected Output**:
```
NOTICE:  Added funnel_state column to leads table
Success. No rows returned
```

---

### Option 2: Supabase CLI (Advanced)

```bash
# If you have Supabase CLI installed
supabase db push
```

---

## ✅ VERIFICATION

After running, verify tables exist:

```sql
-- Check sales_patterns table
SELECT * FROM pg_tables WHERE tablename = 'sales_patterns';

-- Check funnel_state column
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'leads' AND column_name = 'funnel_state';

-- Both should return results
```

---

## ⚠️ IMPORTANT

**RUN THIS MIGRATION BEFORE** deploying intelligence activation code, otherwise:
- `LearningService.analyzeWin()` will crash (no `sales_patterns` table)
- Funnel state tracking won't work (no `funnel_state` column)

---

## 🔄 ROLLBACK (If Needed)

If something goes wrong:

```sql
-- Remove funnel_state column
ALTER TABLE public.leads DROP COLUMN IF EXISTS funnel_state;

-- Remove sales_patterns table
DROP TABLE IF EXISTS public.sales_patterns CASCADE;
```

---

## 📊 POST-MIGRATION CHECKLIST

- [ ] Run migration in Supabase Dashboard
- [ ] Verify `sales_patterns` table exists
- [ ] Verify `funnel_state` column in `leads` table
- [ ] Check RLS policies are active
- [ ] Confirm indexes created
- [ ] Screenshot success message
- [ ] Proceed to code activation phase

---

**Status**: Ready to run  
**Risk**: Low (uses IF NOT EXISTS clauses)  
**Time**: ~5 seconds
