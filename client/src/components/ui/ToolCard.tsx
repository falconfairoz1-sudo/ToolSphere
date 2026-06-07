'use client';

import Link from 'next/link';
import BookmarkButton from './BookmarkButton';

interface ToolCardProps {
  name: string;
  description: string;
  icon: string;
  route: string;
  gradient: string;
  trending?: boolean;
  new?: boolean;
  toolId?: string;
}

export default function ToolCard({ name, description, icon, route, gradient, trending, new: isNew, toolId }: ToolCardProps) {
  // Extract toolId from route if not provided
  const id = toolId || route.split('/').pop() || '';

  const handleClick = () => {
    // Track recent tools
    try {
      const recentTools = JSON.parse(localStorage.getItem('recent_tools') || '[]');
      const updatedRecent = [id, ...recentTools.filter((t: string) => t !== id)].slice(0, 10);
      localStorage.setItem('recent_tools', JSON.stringify(updatedRecent));
    } catch (e) {
      console.error('Failed to track recent tool:', e);
    }
  };

  return (
    <Link href={route} onClick={handleClick}>
      <div className="group relative p-3 sm:p-4 md:p-5 lg:p-6 bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-500 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden">
        {/* Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
        
        {/* Badges and Bookmark */}
        <div className="absolute top-1.5 sm:top-2 md:top-3 right-1.5 sm:right-2 md:right-3 flex items-center space-x-0.5 sm:space-x-1">
          {trending && (
            <span className="px-1 sm:px-1.5 py-0.5 bg-red-500 text-white text-[8px] sm:text-[9px] md:text-[10px] font-bold rounded-full">
              🔥
            </span>
          )}
          {isNew && (
            <span className="px-1 sm:px-1.5 py-0.5 bg-green-500 text-white text-[8px] sm:text-[9px] md:text-[10px] font-bold rounded-full">
              ✨
            </span>
          )}
          <div className="scale-75 sm:scale-90 md:scale-100">
            <BookmarkButton toolId={id} />
          </div>
        </div>

        {/* Icon */}
        <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-2 sm:mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
          <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl">{icon}</span>
        </div>

        {/* Content */}
        <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-gray-900 dark:text-white mb-1 sm:mb-1.5 md:mb-2 group-hover:text-primary-600 transition-colors line-clamp-2 leading-tight">
          {name}
        </h3>
        <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-snug">
          {description}
        </p>

        {/* Arrow */}
        <div className="mt-2 sm:mt-3 md:mt-4 flex items-center text-primary-600 font-medium text-[10px] sm:text-xs md:text-sm opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="hidden sm:inline">Try it now</span>
          <span className="sm:hidden">Try</span>
          <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 ml-0.5 sm:ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
