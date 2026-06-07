'use client';

import { useState } from 'react';
import { Sparkles, LogIn, UserPlus, Menu, X } from 'lucide-react';
import Link from 'next/link';
import ThemeToggle from '@/components/ui/ThemeToggle';
import SearchBar from '@/components/ui/SearchBar';
import { useAuth } from '@/contexts/AuthContext';
import UserMenu from '@/components/auth/UserMenu';

interface HeaderProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
  toolsCount?: number;
}

export default function Header({ onLoginClick, onRegisterClick, toolsCount = 0 }: HeaderProps) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-3 group flex-shrink-0">
            <div className="relative flex items-center justify-center group-hover:scale-105 transition-transform">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Colored segments forming full circle */}
                <path d="M50 50 L50 2 A48 48 0 0 1 85.4 21.5 Z" fill="#4F46E5"/> {/* Purple-blue */}
                <path d="M50 50 L85.4 21.5 A48 48 0 0 1 98 50 Z" fill="#10B981"/> {/* Green */}
                <path d="M50 50 L98 50 A48 48 0 0 1 85.4 78.5 Z" fill="#F59E0B"/> {/* Orange */}
                <path d="M50 50 L85.4 78.5 A48 48 0 0 1 50 98 Z" fill="#EF4444"/> {/* Red */}
                <path d="M50 50 L50 98 A48 48 0 0 1 14.6 78.5 Z" fill="#8B5CF6"/> {/* Purple */}
                <path d="M50 50 L14.6 78.5 A48 48 0 0 1 2 50 Z" fill="#EC4899"/> {/* Pink */}
                <path d="M50 50 L2 50 A48 48 0 0 1 14.6 21.5 Z" fill="#3B82F6"/> {/* Blue */}
                <path d="M50 50 L14.6 21.5 A48 48 0 0 1 50 2 Z" fill="#06B6D4"/> {/* Cyan */}
                
                {/* Center white circle */}
                <circle cx="50" cy="50" r="30" fill="white"/>
                
                {/* Large T letter in center */}
                <text x="50" y="68" fontSize="40" fontWeight="900" fill="url(#tGradient)" textAnchor="middle" fontFamily="Arial, sans-serif">T</text>
                
                {/* Gradient for T */}
                <defs>
                  <linearGradient id="tGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4F46E5"/>
                    <stop offset="50%" stopColor="#EC4899"/>
                    <stop offset="100%" stopColor="#F59E0B"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-black flex">
                <span className="text-[#EF4444]">T</span>
                <span className="text-[#F59E0B]">o</span>
                <span className="text-[#10B981]">o</span>
                <span className="text-[#06B6D4]">l</span>
                <span className="text-[#3B82F6]">D</span>
                <span className="text-[#8B5CF6]">a</span>
                <span className="text-[#EC4899]">t</span>
                <span className="text-[#EF4444]">a</span>
                <span className="text-[#F59E0B]">B</span>
                <span className="text-[#10B981]">a</span>
                <span className="text-[#06B6D4]">s</span>
                <span className="text-[#3B82F6]">e</span>
              </h1>
              <p className="text-[8px] sm:text-[9px] md:text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                {toolsCount > 0 ? `${toolsCount}+ Tools in One Platform` : '150+ Tools in One Platform'}
              </p>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:block flex-1 max-w-2xl">
            <SearchBar />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link 
              href="/tools" 
              className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition font-medium whitespace-nowrap"
            >
              All Tools
            </Link>
            <a 
              href="#categories" 
              className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition font-medium whitespace-nowrap"
            >
              Categories
            </a>
            {isAuthenticated && (
              <Link 
                href="/help" 
                className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition font-medium whitespace-nowrap"
              >
                Help
              </Link>
            )}
            <ThemeToggle />
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <>
                <button
                  onClick={onLoginClick}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition font-medium whitespace-nowrap"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
                <button
                  onClick={onRegisterClick}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-purple-700 transition whitespace-nowrap"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Sign Up</span>
                </button>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 text-gray-700 dark:text-gray-300"
            >
              {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search Bar - Mobile */}
        <div className="lg:hidden mt-4">
          <SearchBar />
        </div>

        {/* Mobile Menu Dropdown */}
        {showMobileMenu && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700 mt-4">
            <nav className="flex flex-col space-y-3">
              <Link 
                href="/tools" 
                onClick={() => setShowMobileMenu(false)}
                className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition font-medium px-4 py-2"
              >
                All Tools
              </Link>
              <a 
                href="#categories" 
                onClick={() => setShowMobileMenu(false)}
                className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition font-medium px-4 py-2"
              >
                Categories
              </a>
              {isAuthenticated && (
                <Link 
                  href="/help" 
                  onClick={() => setShowMobileMenu(false)}
                  className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition font-medium px-4 py-2"
                >
                  Help & Support
                </Link>
              )}
              {isAuthenticated ? (
                <div className="px-4 py-2">
                  <UserMenu />
                </div>
              ) : (
                <div className="flex flex-col space-y-2 px-4">
                  <button
                    onClick={() => {
                      setShowMobileMenu(false);
                      onLoginClick();
                    }}
                    className="flex items-center justify-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition font-medium border border-gray-300 dark:border-gray-600 rounded-lg"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Sign In</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowMobileMenu(false);
                      onRegisterClick();
                    }}
                    className="flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-purple-700 transition"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Sign Up</span>
                  </button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
