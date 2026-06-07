# 🔧 ToolSphere Troubleshooting Guide

## ❌ Error: "useTheme must be used within a ThemeProvider"

### Problem
The ThemeToggle component is trying to use the theme context before the providers are loaded.

### Solution

**Option 1: Restart Dev Server (Recommended)**

1. Stop both frontend and backend servers (Ctrl+C)
2. Clear Next.js cache:
   ```bash
   cd client
   rm -rf .next
   ```
3. Restart servers:
   ```bash
   # Terminal 1
   cd server && npm run dev
   
   # Terminal 2
   cd client && npm run dev
   ```

**Option 2: Use Restart Script**

Windows:
```bash
restart-dev.bat
```

Mac/Linux:
```bash
chmod +x restart-dev.sh
./restart-dev.sh
```

Then start servers again.

**Option 3: Hard Refresh Browser**
- Windows/Linux: `Ctrl + Shift + R`
- Mac: `Cmd + Shift + R`

---

## ❌ Error: "useBookmarks must be used within a BookmarkProvider"

### Solution
Same as above - restart the dev server and clear cache.

---

## ❌ Port Already in Use

### Problem
```
Error: listen EADDRINUSE: address already in use :::3000
```

### Solution

**Windows:**
```bash
# Find process on port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F

# Or use the restart script
restart-dev.bat
```

**Mac/Linux:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or use the restart script
./restart-dev.sh
```

---

## ❌ MongoDB Connection Error

### Problem
```
MongooseServerSelectionError: connect ECONNREFUSED
```

### Solutions

1. **Check Internet Connection**
   - MongoDB Atlas requires internet access

2. **Verify MongoDB URI**
   - Check `server/.env` file
   - Ensure URI is correct

3. **IP Whitelist**
   - Go to MongoDB Atlas dashboard
   - Network Access → Add IP Address
   - Add `0.0.0.0/0` (allow all) for development

4. **DNS Configuration**
   - Already configured in `server/src/index.ts`
   - Uses Cloudflare (1.1.1.1) and Google (8.8.8.8) DNS

---

## ❌ Module Not Found Errors

### Problem
```
Error: Cannot find module '@/contexts/ThemeContext'
```

### Solution

1. **Reinstall Dependencies**
   ```bash
   cd client
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Check TypeScript Paths**
   - Verify `client/tsconfig.json` has correct paths
   - Should have `"@/*": ["./src/*"]`

3. **Restart TypeScript Server**
   - In VS Code: `Ctrl+Shift+P` → "TypeScript: Restart TS Server"

---

## ❌ CSS Not Loading / Styles Missing

### Problem
Styles not applying or CSS warnings in console

### Solution

1. **Clear Next.js Cache**
   ```bash
   cd client
   rm -rf .next
   npm run dev
   ```

2. **Check Tailwind Config**
   - Verify `client/tailwind.config.ts` exists
   - Check `client/postcss.config.js` exists

3. **Hard Refresh Browser**
   - Clear browser cache
   - Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

---

## ❌ API Requests Failing (CORS Error)

### Problem
```
Access to fetch at 'http://localhost:5000' has been blocked by CORS policy
```

### Solution

1. **Check Backend is Running**
   ```bash
   # Should see this in terminal
   🚀 ToolSphere Server running on port 5000
   ✅ MongoDB Connected
   ```

2. **Verify CORS Configuration**
   - Check `server/.env`:
     ```env
     ALLOWED_ORIGINS=http://localhost:3000
     ```

3. **Check API URL**
   - Verify `client/.env.local`:
     ```env
     NEXT_PUBLIC_API_URL=http://localhost:5000
     ```

4. **Restart Backend**
   ```bash
   cd server
   npm run dev
   ```

---

## ❌ Hydration Errors

### Problem
```
Warning: Text content did not match. Server: "X" Client: "Y"
```

### Solution

1. **Clear Browser Storage**
   - Open DevTools → Application → Clear Storage
   - Clear all site data

2. **Check for Client-Only Code**
   - Use `useEffect` for client-only operations
   - Use `mounted` state pattern (already implemented)

3. **Restart Dev Server**
   ```bash
   cd client
   rm -rf .next
   npm run dev
   ```

---

## ❌ TypeScript Errors

### Problem
Red squiggly lines or build errors

### Solution

1. **Install Type Definitions**
   ```bash
   cd client
   npm install --save-dev @types/node @types/react @types/react-dom
   
   cd server
   npm install --save-dev @types/node @types/express
   ```

2. **Run Type Check**
   ```bash
   npm run type-check
   ```

3. **Restart TypeScript Server**
   - VS Code: `Ctrl+Shift+P` → "TypeScript: Restart TS Server"

---

## ❌ Build Errors

### Problem
```
Error: Build failed
```

### Solution

1. **Check for Syntax Errors**
   ```bash
   npm run lint
   ```

2. **Clear Cache and Rebuild**
   ```bash
   cd client
   rm -rf .next node_modules
   npm install
   npm run build
   ```

3. **Check Environment Variables**
   - Ensure all required env vars are set
   - Check `.env` and `.env.local` files

---

## 🔍 Debugging Tips

### 1. Check Console Logs

**Browser Console (F12):**
- Look for red errors
- Check Network tab for failed requests

**Server Terminal:**
- Look for error messages
- Check MongoDB connection status

### 2. Verify File Structure

```
toolsphere/
├── client/
│   ├── src/
│   │   ├── app/
│   │   │   └── layout.tsx  ← Should import Providers
│   │   ├── components/
│   │   │   ├── Providers.tsx  ← Should exist
│   │   │   └── ui/
│   │   │       ├── ThemeToggle.tsx
│   │   │       └── BookmarkButton.tsx
│   │   └── contexts/
│   │       ├── ThemeContext.tsx
│   │       ├── AuthContext.tsx
│   │       └── BookmarkContext.tsx
│   └── .env.local
└── server/
    ├── src/
    │   ├── index.ts
    │   ├── config/
    │   │   └── database.ts
    │   └── models/
    │       └── User.ts
    └── .env
```

### 3. Test Individual Components

Create a test page to isolate issues:

```tsx
// client/src/app/test/page.tsx
'use client';

export default function TestPage() {
  return <div>Test Page Works!</div>;
}
```

Visit `http://localhost:3000/test`

---

## 🆘 Still Having Issues?

### Complete Reset

1. **Stop All Servers**
   ```bash
   # Use restart script or manually kill processes
   ```

2. **Clean Everything**
   ```bash
   # Client
   cd client
   rm -rf .next node_modules package-lock.json
   npm install
   
   # Server
   cd server
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Clear Browser Data**
   - Open DevTools (F12)
   - Application → Clear Storage
   - Clear all site data

4. **Restart Everything**
   ```bash
   # Terminal 1
   cd server && npm run dev
   
   # Terminal 2
   cd client && npm run dev
   ```

5. **Hard Refresh Browser**
   - `Ctrl+Shift+R` (Windows/Linux)
   - `Cmd+Shift+R` (Mac)

---

## 📝 Common Checklist

Before asking for help, verify:

- [ ] Node.js 18+ installed (`node -v`)
- [ ] Dependencies installed (`npm install` in both folders)
- [ ] `.env` files exist and are configured
- [ ] MongoDB Atlas is accessible
- [ ] Ports 3000 and 5000 are free
- [ ] Both servers are running
- [ ] Browser cache is cleared
- [ ] No TypeScript errors (`npm run type-check`)
- [ ] Latest code is saved

---

## 🎯 Quick Fixes Summary

| Error | Quick Fix |
|-------|-----------|
| Context errors | Restart dev server + clear `.next` |
| Port in use | Kill process or use restart script |
| MongoDB error | Check internet + verify URI |
| Module not found | `npm install` |
| CSS not loading | Clear `.next` folder |
| CORS error | Check backend is running |
| Hydration error | Clear browser storage |
| Build error | `npm run lint` + check syntax |

---

**Remember:** Most issues are solved by:
1. Restarting the dev server
2. Clearing the `.next` cache
3. Hard refreshing the browser

Good luck! 🚀
