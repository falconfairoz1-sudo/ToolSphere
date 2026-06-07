'use client';

import { useState, useEffect } from 'react';
import { User, LogOut, Settings, Bookmark, Clock, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function UserMenu() {
  const [mounted, setMounted] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />;
  }

  return <UserMenuInner showMenu={showMenu} setShowMenu={setShowMenu} />;
}

function UserMenuInner({ showMenu, setShowMenu }: { showMenu: boolean; setShowMenu: (show: boolean) => void }) {
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return null;
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const isAdmin = user.role === 'admin'; // Check admin role from user object

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-600 to-purple-600 flex items-center justify-center text-white font-bold">
          {getInitials(user.name)}
        </div>
      </button>

      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
            {/* User Info */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <p className="font-semibold text-gray-900 dark:text-white truncate">{user.name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 truncate break-all">{user.email}</p>
            </div>

            {/* Menu Items */}
            <div className="p-2">
              <Link
                href="/profile"
                className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition text-gray-700 dark:text-gray-300"
                onClick={() => setShowMenu(false)}
              >
                <User className="w-5 h-5" />
                <span>My Profile</span>
              </Link>

              <Link
                href="/bookmarks"
                className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition text-gray-700 dark:text-gray-300"
                onClick={() => setShowMenu(false)}
              >
                <Bookmark className="w-5 h-5" />
                <span>My Bookmarks</span>
              </Link>

              <Link
                href="/recent"
                className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition text-gray-700 dark:text-gray-300"
                onClick={() => setShowMenu(false)}
              >
                <Clock className="w-5 h-5" />
                <span>Recent Tools</span>
              </Link>

              <Link
                href="/settings"
                className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition text-gray-700 dark:text-gray-300"
                onClick={() => setShowMenu(false)}
              >
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </Link>

              {isAdmin && (
                <Link
                  href="/admin"
                  className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition text-primary-600 dark:text-primary-400"
                  onClick={() => setShowMenu(false)}
                >
                  <Shield className="w-5 h-5" />
                  <span>Admin Panel</span>
                </Link>
              )}
            </div>

            {/* Logout */}
            <div className="p-2 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => {
                  logout();
                  setShowMenu(false);
                }}
                className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition text-red-600 dark:text-red-400"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
