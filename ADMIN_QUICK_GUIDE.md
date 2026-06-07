# 🚀 Admin Panel - Quick Guide

## Access Admin Panel

1. **Login as Admin**
   - Email: your-admin@email.com
   - Password: your-password
   - Must use reference code `s7019391310` during signup

2. **Navigate to Admin Panel**
   - Click your profile picture (top right)
   - Click "Admin Panel" (purple shield icon)

## Main Features

### 📊 Dashboard Overview
**Location**: `/admin`

**What You See**:
- 4 Statistics cards (Users, Tools, Tickets, Usage)
- System Overview panel (quick stats with links)
- Quick Admin Actions (all admin features)
- Platform Health (server, database, API status)

**Quick Actions**:
- Click any stat card to see details
- Use Quick Actions for fast navigation
- Monitor Platform Health at a glance

---

### 🔧 Tools Management
**Location**: `/admin/tools`

**What You Can Do**:
- ✅ Set tools as trending (🔥 icon)
- ✅ Mark tools as new (⭐ icon)
- ✅ Bulk operations (select multiple tools)
- ✅ Search and filter tools
- ✅ View tool statistics

**How to Set Trending**:
1. Go to `/admin/tools`
2. Find tool in table
3. Click 🔥 button (turns orange when active)
4. Tool appears on homepage!

**Bulk Operations**:
1. Check boxes next to tools
2. Click "Set Trending" or "Mark as New"
3. All selected tools updated!

---

### 👥 User Management
**Location**: `/admin/users`

**What You Can Do**:
- ✅ View all registered users
- ✅ Search by name or email
- ✅ Filter by role (Admin/User)
- ✅ See user activity (bookmarks, recent tools)
- ✅ Delete users (with confirmation)

**User Information Shown**:
- Name and avatar
- Email address
- Role (Admin 🛡️ or User 👤)
- Join date
- Activity stats

**How to Delete User**:
1. Find user in table
2. Click trash icon (🗑️)
3. Confirm deletion
4. User removed!

**Note**: You cannot delete your own account!

---

### 🎫 Help Tickets
**Location**: `/admin/help-tickets`

**What You Can Do**:
- ✅ View all support tickets
- ✅ Filter by status/type/priority
- ✅ Update ticket status
- ✅ Add admin notes
- ✅ Delete tickets

**Ticket Statuses**:
- 🟡 Open
- 🔵 In Progress
- 🟢 Resolved
- ⚫ Closed

**How to Handle Ticket**:
1. Click "View" button
2. Read ticket details
3. Add admin notes
4. Update status
5. Close modal

---

## Quick Reference

### Navigation
```
Admin Dashboard
├── Tools Management (/admin/tools)
├── User Management (/admin/users)
└── Help Tickets (/admin/help-tickets)
```

### Common Tasks

#### Set 10 Tools as Trending
```
1. Go to /admin/tools
2. Filter: Status = "Not Trending"
3. Select 10 tools
4. Click "Set Trending"
5. Done!
```

#### Find Specific User
```
1. Go to /admin/users
2. Type name/email in search
3. View user details
```

#### Check Open Tickets
```
1. Go to /admin/help-tickets
2. Filter: Status = "Open"
3. Handle tickets
```

#### Mark New Tools
```
1. Go to /admin/tools
2. Search for new tool
3. Click ⭐ button
4. Tool shows "NEW" badge!
```

---

## Statistics Explained

### Dashboard Stats
- **Total Users**: All registered users
- **Total Tools**: All tools in platform (185+)
- **Active Users**: Users active today
- **Help Tickets**: Open support tickets

### Tools Stats
- **Total Tools**: All tools count
- **Trending**: Tools marked as trending
- **New Tools**: Tools with "new" badge
- **Categories**: Number of categories

### User Stats
- **Total Users**: All registered users
- **Admins**: Users with admin role
- **Regular Users**: Users with user role
- **Active Today**: Estimated active users

---

## Tips & Best Practices

### 🔥 Trending Tools
- Keep 8-12 tools trending
- Update weekly or bi-weekly
- Choose most used/popular tools
- Balance across categories

### ✨ New Badges
- Keep for 2-4 weeks
- Use for new tools or major updates
- Remove after "new" period

### 👥 User Management
- Review users monthly
- Remove spam accounts
- Monitor admin accounts
- Keep database clean

### 🎫 Support Tickets
- Respond within 24 hours
- Update status regularly
- Close resolved tickets
- Monitor open count

---

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Search | Focus search box |
| Select All | Click "Select All" |
| Clear Selection | Click "Clear selection" |
| Back to Dashboard | Click "← Back" |

---

## Status Indicators

### Platform Health
- 🟢 **Green**: Everything working
- 🟡 **Yellow**: Warning/degraded
- 🔴 **Red**: Error/offline

### User Roles
- 🛡️ **Purple Badge**: Admin
- 👤 **Blue Badge**: Regular User

### Tool Status
- 🔥 **Orange Badge**: Trending
- ✨ **Green Badge**: New

### Ticket Status
- 🟡 **Yellow**: Open
- 🔵 **Blue**: In Progress
- 🟢 **Green**: Resolved
- ⚫ **Gray**: Closed

---

## Common Questions

### Q: How do I become an admin?
**A**: Use reference code `s7019391310` during signup

### Q: Can I delete my own admin account?
**A**: No, for security reasons

### Q: How many tools should be trending?
**A**: Recommended 8-12 tools

### Q: How long should "new" badge stay?
**A**: 2-4 weeks typically

### Q: Can I undo a deletion?
**A**: No, deletions are permanent (with confirmation)

### Q: Where do I see all admin features?
**A**: Admin Dashboard → Quick Admin Actions panel

---

## Need Help?

1. **Check Documentation**
   - `ADMIN_PANEL_COMPLETE.md` - Full documentation
   - `ADMIN_FEATURES_GUIDE.md` - Detailed features guide
   - This file - Quick reference

2. **Troubleshooting**
   - Check browser console (F12)
   - Verify admin authentication
   - Check backend logs
   - Clear cache and retry

3. **Support**
   - Contact system administrator
   - Check GitHub issues
   - Review error messages

---

**Quick Start**: Login → Profile Menu → Admin Panel → Start Managing! 🎉

**Version**: 2.0  
**Last Updated**: May 8, 2026
