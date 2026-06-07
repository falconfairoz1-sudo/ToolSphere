'use client';

import { Upload, Info } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface WordToolPlaceholderProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  comingSoon?: boolean;
}

export default function WordToolPlaceholder({ 
  title, 
  description, 
  icon: Icon, 
  iconColor,
  comingSoon = true 
}: WordToolPlaceholderProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <Icon className={`w-16 h-16 ${iconColor} mx-auto mb-4`} />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {description}
            </p>
          </div>

          {comingSoon && (
            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800 dark:text-blue-200">
                <p className="font-semibold mb-1">Coming Soon!</p>
                <p>This tool is currently under development. Check back soon for full functionality!</p>
              </div>
            </div>
          )}

          <div className="mb-6">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-not-allowed opacity-50">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-12 h-12 text-gray-400 mb-4" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Feature Coming Soon</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Word documents (.docx, .doc)
                </p>
              </div>
            </label>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Free</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">No Limits</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">✓</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Secure</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
