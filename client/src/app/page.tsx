'use client';

import { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, Grid3x3, Bookmark } from 'lucide-react';
import { categories } from '@/data/categories';
import Link from 'next/link';
import ToolCard from '@/components/ui/ToolCard';
import { toolIcons, categoryGradients } from '@/data/toolIcons';
import { useBookmarks } from '@/contexts/BookmarkContext';
import { useAuth } from '@/contexts/AuthContext';
import LoginModal from '@/components/auth/LoginModal';
import RegisterModal from '@/components/auth/RegisterModal';
import Header from '@/components/layout/Header';

export default function Home() {
  const [tools, setTools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const { bookmarks } = useBookmarks();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    console.log('=== FETCHING TOOLS FROM BACKEND ===');
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tools`)
      .then(res => {
        console.log('Response status:', res.status);
        console.log('Response headers:', res.headers);
        return res.json();
      })
      .then(data => {
        console.log('=== RECEIVED DATA ===');
        console.log('Full response:', data);
        console.log('Success:', data.success);
        console.log('Tools count:', data.count);
        console.log('Data array length:', data.data?.length);
        
        const toolsData = data.data || [];
        console.log('=== SETTING TOOLS STATE ===');
        console.log('Tools to set:', toolsData.length);
        
        // Log first 3 tools to verify structure
        console.log('Sample tools:', toolsData.slice(0, 3));
        
        setTools(toolsData);
        
        const trending = toolsData.filter((t: any) => t.trending);
        console.log('=== TRENDING TOOLS ===');
        console.log('Trending count:', trending.length);
        console.log('Trending tools:', trending.map((t: any) => ({ id: t.id, name: t.name, trending: t.trending })));
        
        setLoading(false);
      })
      .catch(err => {
        console.error('=== FETCH ERROR ===');
        console.error('Error:', err);
        console.error('Error message:', err.message);
        setLoading(false);
      });
  }, []);

  const trendingTools = tools.filter(t => t.trending).slice(0, 8);
  const bookmarkedTools = tools.filter(t => bookmarks.includes(t.id)).slice(0, 8);

  console.log('Tools array length:', tools.length);
  console.log('Trending tools count:', trendingTools.length);
  console.log('Trending tools:', trendingTools.map(t => t.name));

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <Header 
        onLoginClick={() => setShowLoginModal(true)}
        onRegisterClick={() => setShowRegisterModal(true)}
        toolsCount={tools.length}
      />

      {/* Trending Tools */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12">
        <div id="tools" className="mb-12 sm:mb-16 md:mb-20 animate-slide-up">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                  Trending Tools
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 ml-16">
                Most popular tools used by professionals
              </p>
            </div>
            <Link href="/trending" className="hidden md:flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <span>View All</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            {loading ? (
              <div className="col-span-full text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">Loading trending tools...</p>
              </div>
            ) : trendingTools.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">No trending tools available</p>
              </div>
            ) : (
              trendingTools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  name={tool.name}
                  description={tool.description}
                  icon={toolIcons[tool.id] || '🔧'}
                  route={tool.route}
                  gradient={categoryGradients[tool.category] || 'from-gray-500 to-gray-600'}
                  trending={tool.trending}
                  new={tool.new}
                  toolId={tool.id}
                />
              ))
            )}
          </div>
        </div>

        {/* Bookmarked Tools */}
        {isAuthenticated && bookmarkedTools.length > 0 && (
          <div className="mb-20 animate-slide-up">
            <div className="flex items-center justify-between mb-10">
              <div>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl shadow-lg">
                    <Bookmark className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                    Your Bookmarks
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 ml-16">{bookmarks.length} tools saved for quick access</p>
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
              {bookmarkedTools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  name={tool.name}
                  description={tool.description}
                  icon={toolIcons[tool.id] || '🔧'}
                  route={tool.route}
                  gradient={categoryGradients[tool.category] || 'from-gray-500 to-gray-600'}
                  trending={tool.trending}
                  new={tool.new}
                  toolId={tool.id}
                />
              ))}
            </div>
          </div>
        )}

        {/* Categories Grid */}
        <div id="categories" className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl shadow-lg">
                <Grid3x3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Browse by Category
              </h3>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Explore our comprehensive collection of professional tools
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.id}`}
                className="group relative p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-transparent hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                <div className="relative">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <span className="text-3xl">
                      {category.icon === 'FileText' && '📄'}
                      {category.icon === 'Image' && '🖼️'}
                      {category.icon === 'Sparkles' && '✨'}
                      {category.icon === 'Code' && '💻'}
                      {category.icon === 'DollarSign' && '💰'}
                      {category.icon === 'Database' && '📊'}
                      {category.icon === 'GraduationCap' && '🎓'}
                      {category.icon === 'Globe' && '🌐'}
                      {category.icon === 'Shield' && '🔐'}
                      {category.icon === 'Wrench' && '🔧'}
                      {category.icon === 'Music' && '🎵'}
                      {category.icon === 'Gamepad2' && '🎮'}
                      {category.icon === 'PenTool' && '✍️'}
                      {category.icon === 'Briefcase' && '💼'}
                      {category.icon === 'Share2' && '📱'}
                      {category.icon === 'RefreshCw' && '🔄'}
                      {category.icon === 'Heart' && '❤️'}
                      {category.icon === 'Zap' && '⚡'}
                      {category.icon === 'Presentation' && '📊'}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {category.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                      {category.count} tools
                    </span>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center justify-center">
                  <svg className="w-16 h-16 sm:w-20 sm:h-20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                    <text x="50" y="68" fontSize="40" fontWeight="900" fill="url(#tGradientFooter)" textAnchor="middle" fontFamily="Arial, sans-serif">T</text>
                    
                    {/* Gradient for T */}
                    <defs>
                      <linearGradient id="tGradientFooter" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4F46E5"/>
                        <stop offset="50%" stopColor="#EC4899"/>
                        <stop offset="100%" stopColor="#F59E0B"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div>
                  <span className="text-2xl font-black text-gray-900 dark:text-white">ToolDataBase</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold">{tools.length > 0 ? `${tools.length}+ Tools in One Platform` : '150+ Tools in One Platform'}</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed max-w-md">
                Your ultimate destination for {tools.length}+ professional tools. Fast, beautiful, and completely free. 
                Empowering professionals and creators worldwide.
              </p>
              <div className="flex items-center space-x-4">
                <a href="#" className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="#tools" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition">All Tools</a></li>
                <li><a href="#categories" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition">Categories</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition">Popular</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition">New Tools</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Resources</h4>
              <ul className="space-y-3">
                <li><a href="/about" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition">About Us</a></li>
                <li><a href="/help" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition">Contact</a></li>
                <li><a href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition">Privacy Policy</a></li>
                <li><a href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-600 dark:text-gray-400 text-center md:text-left">
                © 2026 ToolDataBase. Made with <span className="text-red-500">❤️</span> for developers and creators worldwide.
              </p>
              <div className="flex items-center space-x-6 text-sm">
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full font-semibold">
                  ✓ 100% Free
                </span>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full font-semibold">
                  ✓ No Ads
                </span>
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full font-semibold">
                  ✓ Open Source
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Auth Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToRegister={() => {
          setShowLoginModal(false);
          setShowRegisterModal(true);
        }}
      />
      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSwitchToLogin={() => {
          setShowRegisterModal(false);
          setShowLoginModal(true);
        }}
      />
    </main>
  );
}
