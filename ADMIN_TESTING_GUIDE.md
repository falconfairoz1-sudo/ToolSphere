# Admin Panel Testing Guide

## Issue Fixed ✅

The admin panel now properly uses the AuthContext instead of localStorage directly, ensuring:
- Proper role-based access control
- Admin panel link only shows for users with admin role
- Consistent authentication state across the app

## Testing Steps

### 1. Test User Registration (Non-Admin)

1. Open `http://localhost:3000`
2. Click "Sign Up"
3. Select **"User"** account type (blue icon)
4. Fill in:
   - Name: Test User
   - Email: user@test.com
   - Password: user123
   - Confirm Password: user123
5. Click "Create Account"
6. ✅ You should be logged in
7. Click your profile picture/initials in the header
8. ✅ **Verify**: "Admin Panel" option should **NOT** appear in the menu
9. ✅ You should see:
   - My Profile
   - My Bookmarks
   - Recent Tools
   - Settings
   - Sign Out

### 2. Test Admin Registration

1. Sign out if logged in
2. Click "Sign Up"
3. Select **"Admin"** account type (purple shield icon)
4. Fill in:
   - Name: Admin User
   - Email: admin@test.com
   - Password: admin123
   - Confirm Password: admin123
   - **Admin Reference Code: s7019391310**
5. Click "Create Account"
6. ✅ You should be logged in as admin
7. Click your profile picture/initials in the header
8. ✅ **Verify**: "Admin Panel" option **SHOULD** appear with a shield icon
9. ✅ You should see:
   - My Profile
   - My Bookmarks
   - Recent Tools
   - Settings
   - **Admin Panel** ⭐ (with purple/primary color)
   - Sign Out

### 3. Test Admin Panel Access

#### As Admin User:
1. Login as admin (admin@test.com / admin123)
2. Click profile menu → "Admin Panel"
3. ✅ Admin dashboard should load successfully
4. ✅ You should see:
   - Statistics cards (Users, Tools, Active Users, Help Tickets)
   - Quick action cards
   - Recent activity feed
5. Click "Manage Help Tickets"
6. ✅ Help tickets page should load

#### As Regular User:
1. Login as regular user (user@test.com / user123)
2. Try to access `http://localhost:3000/admin` directly
3. ✅ You should be redirected to home page
4. ✅ Alert should show: "Access denied. Admin only."
5. ✅ Admin Panel link should NOT appear in user menu

### 4. Test Invalid Admin Registration

1. Sign out
2. Click "Sign Up"
3. Select "Admin" account type
4. Fill in details with **WRONG** reference code: `wrongcode123`
5. Click "Create Account"
6. ✅ Error should show: "Invalid admin reference code"
7. ✅ Registration should fail

### 5. Test Role Persistence

1. Login as admin
2. Refresh the page (F5)
3. ✅ You should still be logged in as admin
4. ✅ Admin Panel link should still appear in menu
5. Click Admin Panel
6. ✅ Should load successfully without redirect

### 6. Test Cross-Browser

Test the above scenarios in:
- Chrome/Edge
- Firefox
- Safari (if available)

## Expected Behavior Summary

### For Regular Users:
- ❌ Cannot see "Admin Panel" in user menu
- ❌ Cannot access `/admin` URL (redirected to home)
- ❌ Cannot access `/admin/help-tickets` URL (redirected to home)
- ✅ Can use all regular features

### For Admin Users:
- ✅ Can see "Admin Panel" in user menu (with shield icon)
- ✅ Can access `/admin` URL
- ✅ Can access `/admin/help-tickets` URL
- ✅ Can see admin statistics
- ✅ Can manage help tickets
- ✅ Can use all regular features

## Database Verification

Check MongoDB to verify user roles:

```javascript
// In MongoDB shell or Compass
db.users.find({}, { email: 1, role: 1, name: 1 })

// Expected output:
// { email: "user@test.com", role: "user", name: "Test User" }
// { email: "admin@test.com", role: "admin", name: "Admin User" }
```

## JWT Token Verification

The JWT token should include the role:

```javascript
// Decode the token (use jwt.io)
{
  "id": "user_id_here",
  "email": "admin@test.com",
  "role": "admin",  // ← This should be present
  "iat": 1234567890,
  "exp": 1234567890
}
```

## Common Issues & Solutions

### Issue: Admin Panel link not showing
**Solution**: 
- Check that user.role === 'admin' in MongoDB
- Clear localStorage and login again
- Check browser console for errors

### Issue: Redirected from admin panel
**Solution**:
- Verify you're logged in as admin
- Check that AuthContext.isAdmin returns true
- Check browser console for authentication errors

### Issue: "Access denied" alert keeps showing
**Solution**:
- Clear browser cache and localStorage
- Re-register as admin with correct reference code
- Check that backend is returning role in user object

### Issue: Admin reference code not working
**Solution**:
- Verify code is exactly: `s7019391310`
- Check backend logs for validation errors
- Ensure backend authRoutes.ts has the validation

## Files Modified for This Fix

1. `client/src/app/admin/page.tsx`
   - Now uses `useAuth()` hook
   - Checks `isAdmin` from AuthContext
   - Uses `token` from AuthContext

2. `client/src/app/admin/help-tickets/page.tsx`
   - Now uses `useAuth()` hook
   - Checks `isAdmin` from AuthContext
   - Uses `token` from AuthContext

3. `client/src/components/auth/UserMenu.tsx`
   - Changed admin check from email to `user.role === 'admin'`

## Security Notes

✅ **Implemented Security Features:**
- Role-based access control (RBAC)
- Admin reference code validation
- JWT token includes role
- Frontend route protection
- Backend API protection (existing)
- Automatic redirects for unauthorized access

⚠️ **Important:**
- Admin reference code is hardcoded: `s7019391310`
- Change this in production!
- Consider environment variables for the code
- Add rate limiting for registration attempts

## Next Steps After Testing

1. ✅ Verify all tests pass
2. ✅ Test on different browsers
3. ✅ Test on mobile devices
4. 🔄 Change admin reference code for production
5. 🔄 Add environment variable for reference code
6. 🔄 Add rate limiting for registration
7. 🔄 Add email verification (optional)
8. 🔄 Add 2FA for admin accounts (optional)

## Support

If you encounter issues:
1. Check browser console for errors
2. Check backend logs
3. Verify MongoDB connection
4. Clear localStorage: `localStorage.clear()`
5. Restart both servers

---

**Status**: ✅ Fixed and Ready for Testing
**Date**: May 8, 2026
