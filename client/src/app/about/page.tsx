'use client';

import { Users, Target, Heart, Zap, Shield, Globe } from 'lucide-react';
import BackButton from '@/components/ui/BackButton';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <BackButton />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About ToolDataBase
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Your ultimate destination for professional tools
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 mb-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Mission</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg mb-4">
            At ToolDataBase, we believe that everyone should have access to powerful, professional-grade tools without barriers. Our mission is to provide a comprehensive collection of 150+ tools that empower professionals, creators, developers, and students to work smarter and faster.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
            We're committed to keeping all our tools completely free, fast, and accessible to everyone, everywhere.
          </p>
        </div>

        {/* What We Offer */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 mb-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">What We Offer</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">📄 PDF Tools</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Merge, split, compress, convert, and edit PDFs with ease. Professional-grade PDF processing at your fingertips.
              </p>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">🖼️ Image Tools</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Edit, compress, convert, and enhance images. Background removal, filters, and advanced editing features.
              </p>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">✨ AI Tools</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Leverage cutting-edge AI for content generation, image creation, text analysis, and more.
              </p>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">💻 Developer Tools</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Code formatters, validators, converters, and utilities designed for developers.
              </p>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">💰 Financial Tools</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Calculators, converters, and financial planning tools for smart money management.
              </p>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">🔧 Utility Tools</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Converters, generators, and everyday utilities to simplify your workflow.
              </p>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 mb-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Values</h2>
          </div>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Accessibility</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We believe powerful tools should be accessible to everyone, regardless of budget or location.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Privacy First</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Your data is yours. We process files securely and never store your personal information.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Speed & Performance</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Fast, efficient tools that respect your time. No unnecessary delays or complicated processes.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">User-Centric Design</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Clean, intuitive interfaces designed with you in mind. No clutter, no confusion.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-2xl p-1 shadow-xl mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Why Choose ToolDataBase?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                  100%
                </div>
                <p className="text-gray-600 dark:text-gray-400 font-semibold">Free Forever</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  150+
                </div>
                <p className="text-gray-600 dark:text-gray-400 font-semibold">Professional Tools</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  0
                </div>
                <p className="text-gray-600 dark:text-gray-400 font-semibold">Ads or Tracking</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Get in Touch</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Have questions, suggestions, or feedback? We'd love to hear from you! Our team is dedicated to continuously improving ToolDataBase based on your needs.
          </p>
          <a
            href="mailto:contact@tooldatabase.com"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-purple-700 transition shadow-lg"
          >
            <span>Contact Us</span>
          </a>
        </div>
      </div>
    </div>
  );
}
