'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Settings, Moon, Sun, Bell, Lock, Trash2, Save, Monitor } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import BackButton from '@/components/ui/BackButton';

export default function SettingsPage() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [message, setMessage] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [showDataModal, setShowDataModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    setMounted(true);
    if (!isAuthenticated) {
      router.push('/');
      return;
    }
    
    // Load saved settings from localStorage
    const savedSettings = localStorage.getItem('settings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setNotifications(settings.notifications ?? true);
      setEmailUpdates(settings.emailUpdates ?? false);
    }
  }, [isAuthenticated, router]);

  const handleSaveSettings = () => {
    // Save settings to localStorage or API
    localStorage.setItem('settings', JSON.stringify({
      notifications,
      emailUpdates,
      theme
    }));
    
    setMessage('Settings saved successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleDeleteAccount = () => {
    // In a real app, this would call an API to delete the account
    logout();
    router.push('/');
  };

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage('Please fill in all password fields');
      setTimeout(() => setMessage(''), 3000);
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match');
      setTimeout(() => setMessage(''), 3000);
      return;
    }
    
    if (newPassword.length < 6) {
      setMessage('Password must be at least 6 characters');
      setTimeout(() => setMessage(''), 3000);
      return;
    }
    
    // In a real app, this would call an API
    setMessage('Password changed successfully!');
    setShowPasswordModal(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleEnable2FA = () => {
    // In a real app, this would call an API to enable 2FA
    setMessage('Two-Factor Authentication enabled successfully!');
    setShow2FAModal(false);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleDownloadData = () => {
    // Create a JSON file with user data
    const userData = {
      user: {
        name: user?.name,
        email: user?.email,
        createdAt: user?.createdAt,
      },
      bookmarks: user?.bookmarks || [],
      recentTools: user?.recentTools || [],
      settings: {
        notifications,
        emailUpdates,
        theme
      },
      exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(userData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `toolsphere-data-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    setMessage('Your data has been downloaded successfully!');
    setShowDataModal(false);
    setTimeout(() => setMessage(''), 3000);
  };

  if (!mounted || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <BackButton />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white flex items-center">
            <Settings className="w-10 h-10 mr-3" />
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Customize your ToolSphere experience</p>
        </div>

        {/* Success Message */}
        {message && (
          <div className="mb-6 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-800">
            {message}
          </div>
        )}

        {/* Appearance Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            {theme === 'dark' ? <Moon className="w-6 h-6 mr-3" /> : <Sun className="w-6 h-6 mr-3" />}
            Appearance
          </h2>
          
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Theme Preference
            </label>
            
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  if (theme === 'dark') toggleTheme();
                }}
                className={`p-4 rounded-xl border-2 transition flex flex-col items-center justify-center ${
                  theme === 'light'
                    ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-primary-400'
                }`}
              >
                <Sun className="w-8 h-8 mb-2 text-yellow-500" />
                <div className="text-sm font-medium text-gray-900 dark:text-white">Light</div>
              </button>
              
              <button
                onClick={() => {
                  if (theme === 'light') toggleTheme();
                }}
                className={`p-4 rounded-xl border-2 transition flex flex-col items-center justify-center ${
                  theme === 'dark'
                    ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-primary-400'
                }`}
              >
                <Moon className="w-8 h-8 mb-2 text-indigo-500" />
                <div className="text-sm font-medium text-gray-900 dark:text-white">Dark</div>
              </button>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Bell className="w-6 h-6 mr-3" />
            Notifications
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900 dark:text-white">Push Notifications</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Receive notifications about tool updates</div>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition ${
                  notifications ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition ${
                    notifications ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900 dark:text-white">Email Updates</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Get weekly updates about new tools</div>
              </div>
              <button
                onClick={() => setEmailUpdates(!emailUpdates)}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition ${
                  emailUpdates ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition ${
                    emailUpdates ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Lock className="w-6 h-6 mr-3" />
            Privacy & Security
          </h2>
          
          <div className="space-y-4">
            <button 
              onClick={() => setShowPasswordModal(true)}
              className="w-full text-left px-6 py-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <div className="font-medium text-gray-900 dark:text-white">Change Password</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Update your account password</div>
            </button>
            
            <button 
              onClick={() => setShow2FAModal(true)}
              className="w-full text-left px-6 py-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <div className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Add an extra layer of security</div>
            </button>
            
            <button 
              onClick={() => setShowDataModal(true)}
              className="w-full text-left px-6 py-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <div className="font-medium text-gray-900 dark:text-white">Download Your Data</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Export all your account data</div>
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl shadow-xl border-2 border-red-200 dark:border-red-800 p-8 mb-6">
          <h2 className="text-2xl font-bold text-red-900 dark:text-red-200 mb-6 flex items-center">
            <Trash2 className="w-6 h-6 mr-3" />
            Danger Zone
          </h2>
          
          <div className="space-y-4">
            <p className="text-red-800 dark:text-red-300">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            
            {!showDeleteConfirm ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition font-medium"
              >
                Delete Account
              </button>
            ) : (
              <div className="space-y-3">
                <p className="font-medium text-red-900 dark:text-red-200">
                  Are you absolutely sure? This action cannot be undone.
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={handleDeleteAccount}
                    className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition font-medium"
                  >
                    Yes, Delete My Account
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSaveSettings}
            className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-purple-700 transition shadow-lg"
          >
            <Save className="w-5 h-5" />
            <span>Save Settings</span>
          </button>
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Change Password</h3>
              <button
                onClick={() => {
                  setShowPasswordModal(false);
                  setCurrentPassword('');
                  setNewPassword('');
                  setConfirmPassword('');
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="Enter current password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="Confirm new password"
                />
              </div>
              <button
                onClick={handleChangePassword}
                className="w-full px-6 py-3 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-purple-700 transition"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2FA Modal */}
      {show2FAModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Enable 2FA</h3>
              <button
                onClick={() => setShow2FAModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                  <Lock className="w-16 h-16 text-gray-400" />
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Two-Factor Authentication adds an extra layer of security to your account.
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  You'll need to enter a code from your authenticator app when signing in.
                </p>
              </div>
              <button
                onClick={handleEnable2FA}
                className="w-full px-6 py-3 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-purple-700 transition"
              >
                Enable Two-Factor Authentication
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Download Data Modal */}
      {showDataModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Download Your Data</h3>
              <button
                onClick={() => setShowDataModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Download a copy of all your data including:
                </p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Profile information</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Bookmarked tools</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Recent tools history</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Settings and preferences</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={handleDownloadData}
                className="w-full px-6 py-3 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-purple-700 transition flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download Data (JSON)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
