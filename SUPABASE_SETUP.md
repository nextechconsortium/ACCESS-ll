# Supabase Configuration Guide

## Overview
ACCESS uses Supabase for authentication and user profile management. This guide walks you through setting up Supabase for local development and Vercel deployment.

## Prerequisites
- A Supabase account (free at https://supabase.com)
- Access to your Supabase project dashboard

## Local Development Setup

### Step 1: Create Supabase Project
1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Fill in project name and database password
4. Select region closest to you
5. Click "Create new project" (may take a few minutes)

### Step 2: Get API Keys
1. In your Supabase project, go to **Settings → API**
2. Copy the **Project URL** (looks like `https://xxxxxxxxxxxx.supabase.co`)
3. Copy the **anon public** key (starts with `eyJhbGc...`)
4. Copy the **service_role secret** key (scroll down to find it - starts with `eyJhbGc...` and is different from anon key)

### Step 3: Create .env.local
1. In the project root, create a file named `.env.local` (copy from .env.example)
2. Paste your values:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### Step 4: Create Database Tables
1. In Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Paste the contents of `scripts/supabase-setup.sql`
4. Click "Run"

### Step 5: Restart Development Server
```bash
# Stop your dev server (Ctrl+C)
# Then restart it
npm run dev
# or
yarn dev
```

### Step 6: Test Authentication
1. Go to http://localhost:3000/(auth)/signup
2. Create a test account
3. You should be able to sign up and access protected routes

## Vercel Deployment Setup

### Step 1: Connect Vercel to GitHub
1. Go to https://vercel.com/dashboard
2. Import your GitHub repository
3. Follow the prompts

### Step 2: Add Environment Variables
1. In Vercel, go to **Project Settings → Environment Variables**
2. Add the same three variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. Make sure they're set for all environments (Production, Preview, Development)

### Step 3: Redeploy
1. Either push a new commit to trigger redeployment
2. Or manually trigger a redeployment in Vercel dashboard

### Step 4: Verify Production
1. Go to your production URL
2. Test signup and login flows

## Troubleshooting

### White Screen of Death / Middleware Error
**Problem**: App shows blank white screen or middleware crashes
**Cause**: Supabase environment variables are not set
**Solution**:
- Check that `.env.local` exists in project root
- Verify all three environment variables are correctly copied (no typos, no extra spaces)
- Restart the development server
- Check browser console for error messages

### Auth Routes Not Working
**Problem**: Signup/login page loads but buttons don't work
**Cause**: Supabase URL or key is incorrect
**Solution**:
- Double-check the keys from Supabase dashboard
- Make sure you copied the `anon public` key, not the service role key
- Clear browser cache and try again

### "User not found" Error on Signup
**Problem**: Getting auth errors when trying to sign up
**Cause**: Database tables may not be created
**Solution**:
- Run the SQL migration from `scripts/supabase-setup.sql` in Supabase SQL Editor
- Refresh the page and try again

### Production Not Working
**Problem**: Works locally but fails on Vercel
**Cause**: Environment variables not set in Vercel
**Solution**:
- Go to Vercel project settings
- Verify all three Supabase variables are set
- Ensure they're set for Production environment
- Trigger a redeployment

## Key Files

- `.env.example` - Template for environment variables
- `.env.local` - Your local environment (create this, don't commit)
- `lib/supabase-client.ts` - Browser-side Supabase client
- `lib/supabase-server.ts` - Server-side Supabase client
- `middleware.ts` - Authentication middleware
- `scripts/supabase-setup.sql` - Database schema and RLS policies

## Important Security Notes

1. **Never commit .env.local to Git** - It's in .gitignore for a reason
2. **Never expose SUPABASE_SERVICE_ROLE_KEY to the client** - It's server-only
3. **NEXT_PUBLIC_* variables are public** - They're visible in browser, so they're safe
4. **Supabase handles password hashing** - Don't try to hash passwords yourself
5. **RLS policies are enforced** - Users can only access their own data by default

## Support

If you encounter issues:
1. Check the error message in browser console
2. Check the application logs (Vercel → Deployments → Logs)
3. Verify Supabase variables are correctly set
4. Check Supabase documentation: https://supabase.com/docs
