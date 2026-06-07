# Quick Start Guide

## Starting the Application

### 1. Start the Backend Server

```bash
cd server
npm install  # If not already installed
npm run dev
```

The server will start on `http://localhost:5000`

### 2. Start the Frontend Client

```bash
cd client
npm install  # If not already installed
npm run dev
```

The client will start on `http://localhost:3000`

## Testing the New Features

### Test Admin Registration

1. Open `http://localhost:3000`
2. Click "Sign Up" button in the header
3. Select "Admin" account type (purple shield icon)
4. Fill in the form:
   - Name: Admin User
   - Email: admin@test.com
   - Password: admin123
   - Confirm Password: admin123
   - **Admin Reference Code: s7019391310**
5. Click "Create Account"
6. You should be logged in as an admin

### Test User Registration

1. Click "Sign Up" button
2. Select "User" account type (blue user icon)
3. Fill in the form (no reference code needed)
4. Click "Create Account"

### Test Search Bar

1. Look at the header - you'll see a search bar
2. Type "PDF" or "Image" or any tool name
3. See instant search results in dropdown
4. Click any result to navigate to that tool

### Test All Tools Page

1. Click "All Tools" in the navigation
2. Browse all 185+ tools
3. Try category filters at the top
4. Use the search box to filter tools
5. Toggle between Grid and List view

### Test Admin Panel

1. Login as an admin user
2. Click on your profile picture/initials in the header
3. Click "Admin Panel" (with shield icon)
4. Explore the dashboard:
   - View statistics
   - Click "Help Tickets" to manage tickets
   - See recent activity

### Test User Menu

1. Login as any user
2. Click your profile picture/initials
3. See menu options:
   - My Profile
   - My Bookmarks
   - Recent Tools
   - Settings
   - Admin Panel (only for admins)
   - Sign Out

## Admin Reference Code

**Important**: The admin reference code is hardcoded as:
```
s7019391310
```

To change it, update:
- Frontend: `client/src/components/auth/RegisterModal.tsx` (line with validation)
- Backend: `server/src/routes/authRoutes.ts` (line with validation)

## Troubleshooting

### Search Bar Not Working
- Make sure backend is running on port 5000
- Check browser console for errors
- Verify API_URL in SearchBar component

### Admin Panel Access Denied
- Make sure you registered with the correct reference code
- Check that user role is 'admin' in MongoDB
- Clear localStorage and login again

### Tools Not Loading
- Verify backend is running
- Check MongoDB connection
- Verify tools collection has data

### Mobile Menu Not Working
- Clear browser cache
- Check for JavaScript errors in console
- Try different browser

## Environment Variables

Make sure you have these set up:

### Backend (.env)
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Default Ports

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`
- MongoDB: `mongodb://localhost:27017` (or your connection string)

## Browser Compatibility

Tested and working on:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Features Checklist

✅ Admin/User registration with reference code
✅ Admin panel with statistics
✅ Global search bar with instant results
✅ All Tools page with filtering
✅ Improved navigation and layout
✅ Mobile responsive design
✅ Role-based access control
✅ Help ticket management (admin)

## Next Steps

1. Test all features thoroughly
2. Add more tools to the database
3. Customize the admin reference code
4. Set up production environment variables
5. Deploy to production

## Support

If you encounter any issues:
1. Check the console for errors
2. Verify all services are running
3. Check MongoDB connection
4. Clear browser cache and localStorage
5. Restart both servers

---

**Happy Testing! 🚀**
