# Supabase Connection Troubleshooting Guide

## Quick Fix Steps

### 1. Check Environment Variables
```bash
# Verify these are set in your .env file:
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 2. Test Connection
In browser console or dev tools:
```javascript
import { testSupabaseConnectionDetailed } from '@/integrations/supabase/client';

const result = await testSupabaseConnectionDetailed();
console.log('Connection Status:', result);
```

### 3. Check CORS Settings
1. Go to Supabase Dashboard → Settings → API
2. Add your domain to "Allowed Origins"
3. Development: `http://localhost:5173`
4. Production: `https://yourdomain.com`

## Common Error Messages

| Error Message | Cause | Solution |
|---------------|-------|----------|
| "Missing environment variables" | No .env configuration | Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY |
| "Invalid URL format" | Wrong URL pattern | Use: `https://project-ref.supabase.co` |
| "Failed to fetch" | Network/CORS issue | Check CORS settings and network |
| "Permission denied" | RLS policies blocking | Review Supabase RLS settings |

## Development Workflow

1. **Clone repository**
2. **Set up environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your Supabase credentials
   ```
3. **Start development server:**
   ```bash
   npm run dev
   ```
4. **Test connection** (open browser console)
5. **Check for errors** in console

## Production Deployment

1. Set production environment variables on your hosting platform
2. Update CORS settings with production domain
3. Test connection in production environment
4. Monitor logs for connection issues

## Emergency Contacts

- **Supabase Status**: https://status.supabase.com
- **Dashboard**: https://app.supabase.com/project/[your-project]/settings/api
- **Documentation**: See SUPABASE_CONNECTION_SOLUTION.md

---
**Quick Test URL**: Run `testSupabaseConnectionDetailed()` in browser console