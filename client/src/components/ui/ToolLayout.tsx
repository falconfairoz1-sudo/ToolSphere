'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ShareButton from './ShareButton';
import BookmarkButton from './BookmarkButton';

interface ToolLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  toolId?: string;
}

export default function ToolLayout({ children, title, description, icon, gradient, toolId }: ToolLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/"
          className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Home</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mx-auto mb-6 shadow-2xl transform hover:scale-110 transition-transform duration-300`}>
            <span className="text-5xl">{icon}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
            {description}
          </p>
          
          {/* Action Buttons */}
          <div className="flex items-center justify-center space-x-3">
            <ShareButton title={title} text={`Check out ${title} on ToolSphere - Fast, free, and easy to use!`} />
            {toolId && <BookmarkButton toolId={toolId} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700" />}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-700 mb-8">
          {children}
        </div>

        {/* Features Footer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <p className="text-3xl mb-2">⚡</p>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Fast</p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <p className="text-3xl mb-2">🔒</p>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Secure</p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <p className="text-3xl mb-2">🆓</p>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Free</p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <p className="text-3xl mb-2">🚀</p>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Easy</p>
          </div>
        </div>
      </div>
    </div>
  );
}
