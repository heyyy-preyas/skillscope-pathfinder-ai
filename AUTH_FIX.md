# Fix: Authentication Email Not Received

## Quick Solution (Recommended for Development)

### Option 1: Disable Email Confirmation (Fastest)

1. **Go to Supabase Dashboard**: https://supabase.com/dashboard
2. Select your **SkillScope project**
3. Navigate to: **Authentication** → **Settings** (left sidebar)
4. Scroll to **"Email Auth"** section
5. **Disable** "Confirm email" toggle
6. Click **Save**

Now users can sign up without email verification!

### Option 2: Use Test Email Account

If you want to keep email confirmation:
1. In Supabase Dashboard → **Authentication** → **Settings**
2. Scroll to **"SMTP Settings"**
3. Configure with a test email service like:
   - **Mailtrap.io** (free for testing)
   - **Gmail SMTP** (requires app password)

### Option 3: Direct Database User Creation (Demo Only)

For your presentation, create a test user directly:

1. Go to Supabase → **Authentication** → **Users**
2. Click **"Add User"**
3. Enter:
   - Email: `test@skillscope.com`
   - Password: `Test123!`
   - Auto Confirm: **YES**
4. Click **Save**

Now you can log in with these credentials!

## Quick Test User Credentials

After fixing auth, create a test account:
- Email: `demo@skillscope.com`
- Password: `Demo123!`

## Alternative: Skip Auth for Testing

Temporarily modify the Quiz page to skip auth check:

**File**: `src/pages/Quiz.tsx` (Line 74-77)

Comment out the redirect:
```typescript
// if (!user) {
//   navigate("/auth");
//   return;
// }
```

**⚠️ WARNING**: Remove this after testing! This bypasses security.

## Verify Fix Works

1. Go to http://localhost:8081
2. Click "Sign In"
3. Enter email and password
4. Should log in immediately (no email required)
5. Take quiz and complete assessment

## For Production

Remember to re-enable email confirmation before deploying!
