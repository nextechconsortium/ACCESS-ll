# Authentication Troubleshooting Guide

## Issue: "An error has occurred" on signup

### Step 1: Check Console Logs
Open browser DevTools (F12) → Console tab. Look for:
- `[v0] Auth signup error:` - Shows exact Supabase auth error
- `[v0] Profile creation error:` - Shows database insert error

### Step 2: Verify Supabase Configuration
Ensure these environment variables are set in your Vercel dashboard:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key

To get these:
1. Go to https://supabase.com/dashboard
2. Select your project
3. Settings → API → Copy the credentials

### Step 3: Check Database Connection
Run this in Supabase SQL Editor to verify the profiles table exists:
```sql
SELECT * FROM public.profiles LIMIT 1;
```

If table doesn't exist, run the migration in `scripts/supabase-setup.sql`

### Step 4: Verify RLS Policies
In Supabase Dashboard → Authentication → Policies, verify these policies exist for the profiles table:
- "Users can insert own profile" - for INSERT
- "Users can view own profile" - for SELECT
- "Users can update own profile" - for UPDATE

**If policies are missing, add them manually:**

Create a new policy for INSERT:
```sql
CREATE POLICY "Users can insert own profile"
ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = id);
```

For SELECT:
```sql
CREATE POLICY "Users can view own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = id);
```

For UPDATE:
```sql
CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = id);
```

## Issue: "Failed to initiate Google sign up"

### Step 1: Enable Google Provider
1. Go to Supabase Dashboard → Authentication → Providers
2. Find "Google" and click it
3. Enable it and add your Google OAuth credentials:
   - **Client ID**: From Google Cloud Console
   - **Client Secret**: From Google Cloud Console

To get Google OAuth credentials:
1. Go to https://console.cloud.google.com
2. Create a new project (or select existing)
3. Enable "Google+ API"
4. Create OAuth 2.0 Client ID (Application type: Web application)
5. Add authorized redirect URIs: `https://yourdomain.com/auth/callback`

### Step 2: Configure Redirect URLs
In Supabase Dashboard → Authentication → URL Configuration:
- **Site URL**: `https://yourdomain.com` (production) or `http://localhost:3000` (development)
- **Redirect URLs**: Add `https://yourdomain.com/auth/callback`

### Step 3: Verify Callback Handler
The callback page `/auth/callback/page.tsx` should:
1. Get session from URL
2. Check if user profile exists
3. Redirect to profile completion or dashboard

Check server logs for: `[v0] Processing OAuth callback...`

## Issue: User data not stored in database

### Step 1: Check Auth User Created
In Supabase Dashboard → Authentication → Users, verify:
- User appears in the list
- Email is correct
- User created at timestamp is recent

### Step 2: Check RLS Policies
If user is created but profile is missing, RLS policies are blocking the insert.

Verify in Supabase Dashboard → Tables → profiles → Policies that:
- Row Level Security is **enabled**
- INSERT policy exists with `WITH CHECK (auth.uid() = id)`

### Step 3: Manual Insert Test
In Supabase SQL Editor, test the policy:
```sql
-- Get a valid user ID from auth.users
SELECT id, email FROM auth.users LIMIT 1;

-- Try to insert a profile with that user ID
INSERT INTO public.profiles (id, full_name, username, email, education_level, career_interests)
VALUES (
  'USER_ID_HERE',
  'Test User',
  'testuser',
  'user@example.com',
  'Bachelor\'s Degree',
  '["Technology"]'::text[]
);
```

If this fails with permission error, RLS policies are not configured correctly.

## Issue: Session not persisting

### Step 1: Check Browser Cookies
Open DevTools → Application → Cookies → Look for:
- `sb-*-auth-token` - Session cookie
- Should be HttpOnly (more secure)

If missing, session isn't being created.

### Step 2: Verify Auth Provider
In `components/auth-provider.tsx`, check:
- `useAuth()` hook returns `session` and `loading`
- Layout wraps app with `<AuthProvider>`

Test with console:
```javascript
// In browser console, inside app
import { useAuth } from "@/components/auth-provider"
const { session } = useAuth()
console.log("Session:", session)
```

### Step 3: Check Supabase Session
In browser console:
```javascript
import { supabase } from "@/lib/supabase-client"
const { data: { session } } = await supabase.auth.getSession()
console.log("Supabase session:", session)
```

## Issue: Username already taken

### Step 1: Check Database
In Supabase SQL Editor:
```sql
SELECT username, email FROM public.profiles WHERE username = 'yourusername';
```

If it shows a result, username is taken.

### Step 2: Verify Unique Constraint
Check that the username column has a UNIQUE constraint:
```sql
SELECT constraint_name FROM information_schema.table_constraints 
WHERE table_name = 'profiles' AND constraint_type = 'UNIQUE';
```

Should show a constraint on the username column.

## Production Deployment Checklist

Before deploying to production:

### 1. Supabase Setup
- [ ] Create Supabase project
- [ ] Run migration script: `scripts/supabase-setup.sql`
- [ ] Configure RLS policies (or run migration which creates them)
- [ ] Set up Google OAuth provider with production domain
- [ ] Set Site URL and Redirect URLs to production domain

### 2. Environment Variables
In Vercel Dashboard → Settings → Environment Variables:
- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] `NEXT_PUBLIC_APP_URL` (set to your production domain)

### 3. URL Configuration
In Supabase Dashboard → Authentication → URL Configuration:
- [ ] Site URL: `https://yourdomain.com`
- [ ] Redirect URLs: `https://yourdomain.com/auth/callback`

### 4. Google OAuth
In Google Cloud Console:
- [ ] Add production domain to authorized redirect URIs
- [ ] Use production Client ID and Secret in Supabase

### 5. Test Flow
- [ ] Email signup works end-to-end
- [ ] Profile data appears in database
- [ ] Session persists after refresh
- [ ] Google OAuth redirects correctly
- [ ] New OAuth users see profile completion page
- [ ] Logout and session clearing works

## Debug Logging

The app includes comprehensive logging with `[v0]` prefix. Check server logs for:

### Signup Flow
```
[v0] Auth signup error: ...
[v0] User created successfully: { userId: ..., email: ... }
[v0] Profile insert error: ...
```

### Google OAuth Flow
```
[v0] Initiating Google OAuth with redirect: ...
[v0] Google OAuth error: ...
[v0] Google OAuth URL generated: true/false
[v0] Processing OAuth callback...
[v0] Session error: ...
[v0] OAuth session established: { userId: ..., email: ... }
[v0] Profile check error: ...
[v0] New user detected, redirecting to profile completion
[v0] Existing user detected, redirecting to dashboard
```

All errors include detailed information to aid debugging.

## Support

If issues persist:
1. Check all error messages in console and server logs
2. Verify all environment variables are set
3. Ensure Supabase project is active (not frozen)
4. Check database quotas in Supabase Dashboard
5. Verify RLS policies exactly match the setup script
