'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useBookmarks } from '@/contexts/BookmarkContext';
import { useRouter } from 'next/navigation';
import { User, Mail, Calendar, Shield, Edit2, Save, X } from 'lucide-react';
import BackButton from '@/components/ui/BackButton';

export default function ProfilePage() {
  const { user, isAuthenticated, updateUser } = useAuth();
  const { bookmarks } = useBookmarks();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [recentToolsCount, setRecentToolsCount] = useState(0);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
      return;
    }
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
    
    // Get recent tools from localStorage
    const recentTools = localStorage.getItem('recent_tools');
    if (recentTools) {
      try {
        const parsed = JSON.parse(recentTools);
        setRecentToolsCount(Array.isArray(parsed) ? parsed.length : 0);
      } catch (e) {
        setRecentToolsCount(0);
      }
    }
  }, [isAuthenticated, user, router]);

  const handleSave = async () => {
    setLoading(true);
    setMessage('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user context (you'll need to implement updateUser in AuthContext)
      if (updateUser) {
        updateUser({ ...user!, name, email });
      }
      
      setMessage('Profile updated successfully!');
      setIsEditing(false);
      
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
    setIsEditing(false);
    setMessage('');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const isAdmin = user.email === 'admin@toolsphere.com';
  const joinDate = new Date(user.createdAt || Date.now()).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <BackButton />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">My Profile</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your account information</p>
        </div>

        {/* Success/Error Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-xl ${
            message.includes('success') 
              ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-800'
              : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800'
          }`}>
            {message}
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Cover */}
          <div className="h-32 bg-gradient-to-r from-primary-600 to-purple-600"></div>
          
          {/* Profile Info */}
          <div className="px-8 pb-8">
            {/* Avatar */}
            <div className="flex items-end justify-between -mt-16 mb-6">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-600 to-purple-600 flex items-center justify-center text-white text-4xl font-bold border-4 border-white dark:border-gray-800 shadow-xl">
                {getInitials(user.name)}
              </div>
              
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition shadow-lg"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <div className="flex space-x-3">
                  <button
                    onClick={handleCancel}
                    disabled={loading}
                    className="flex items-center space-x-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition disabled:opacity-50"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition shadow-lg disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* User Details */}
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <User className="w-4 h-4 mr-2" />
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="Enter your full name"
                  />
                ) : (
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="Enter your email"
                  />
                ) : (
                  <p className="text-lg text-gray-700 dark:text-gray-300 break-all">{user.email}</p>
                )}
              </div>

              {/* Join Date */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  Member Since
                </label>
                <p className="text-lg text-gray-700 dark:text-gray-300">{joinDate}</p>
              </div>

              {/* Admin Badge */}
              {isAdmin && (
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Shield className="w-4 h-4 mr-2" />
                    Role
                  </label>
                  <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl font-semibold shadow-lg">
                    <Shield className="w-5 h-5" />
                    <span>Administrator</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              {bookmarks.length}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Bookmarked Tools</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              {recentToolsCount}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Recent Tools</div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              {user.createdAt 
                ? Math.max(1, Math.floor((Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24)))
                : 1
              }
            </div>
            <div className="text-gray-600 dark:text-gray-400">Days Active</div>
          </div>
        </div>
      </div>
    </div>
  );
}
