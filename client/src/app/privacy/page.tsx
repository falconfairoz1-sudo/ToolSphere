'use client';

import { Shield, Lock, Eye, Database, UserX, FileText } from 'lucide-react';
import BackButton from '@/components/ui/BackButton';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <BackButton />
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                Privacy Policy
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Last updated: January 2026
              </p>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 mb-6">
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg mb-4">
            At ToolDataBase, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your information when you use our platform.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
            <strong className="text-gray-900 dark:text-white">TL;DR:</strong> We don't sell your data, we don't track you across the web, and we process your files securely without storing them permanently.
          </p>
        </div>

        {/* Information We Collect */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 mb-6">
          <div className="flex items-center space-x-3 mb-6">
            <Database className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Information We Collect</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">1. Account Information (Optional)</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
                If you choose to create an account, we collect:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-4">
                <li>Email address</li>
                <li>Username</li>
                <li>Password (encrypted)</li>
                <li>Profile preferences</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">2. Usage Data</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
                We collect anonymous usage data to improve our services:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-4">
                <li>Tool usage statistics (which tools are most popular)</li>
                <li>Browser type and version</li>
                <li>Device information</li>
                <li>General location (country/region only)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">3. Files You Upload</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                When you use our tools, files are processed temporarily and automatically deleted after processing. We do not permanently store your files or their contents.
              </p>
            </div>
          </div>
        </div>

        {/* How We Use Your Information */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 mb-6">
          <div className="flex items-center space-x-3 mb-6">
            <Eye className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">How We Use Your Information</h2>
          </div>
          
          <ul className="space-y-4">
            <li className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mt-1">
                <span className="text-green-600 dark:text-green-400 text-sm">✓</span>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  <strong className="text-gray-900 dark:text-white">To provide our services:</strong> Process your files, save your preferences, and deliver the tools you request.
                </p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mt-1">
                <span className="text-green-600 dark:text-green-400 text-sm">✓</span>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  <strong className="text-gray-900 dark:text-white">To improve our platform:</strong> Analyze usage patterns to enhance user experience and add new features.
                </p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mt-1">
                <span className="text-green-600 dark:text-green-400 text-sm">✓</span>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  <strong className="text-gray-900 dark:text-white">To communicate with you:</strong> Send important updates, respond to inquiries, and provide support.
                </p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mt-1">
                <span className="text-green-600 dark:text-green-400 text-sm">✓</span>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  <strong className="text-gray-900 dark:text-white">To ensure security:</strong> Detect and prevent fraud, abuse, and security incidents.
                </p>
              </div>
            </li>
          </ul>
        </div>

        {/* Data Security */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 mb-6">
          <div className="flex items-center space-x-3 mb-6">
            <Lock className="w-6 h-6 text-green-600 dark:text-green-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Data Security</h2>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            We implement industry-standard security measures to protect your data:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start space-x-3">
              <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
              <p className="text-gray-600 dark:text-gray-400">All data transmission is encrypted using SSL/TLS</p>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
              <p className="text-gray-600 dark:text-gray-400">Passwords are hashed and salted using bcrypt</p>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
              <p className="text-gray-600 dark:text-gray-400">Files are processed in secure, isolated environments</p>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
              <p className="text-gray-600 dark:text-gray-400">Temporary files are automatically deleted after processing</p>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
              <p className="text-gray-600 dark:text-gray-400">Regular security audits and updates</p>
            </li>
          </ul>
        </div>

        {/* Your Rights */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 mb-6">
          <div className="flex items-center space-x-3 mb-6">
            <UserX className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Rights</h2>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            You have the following rights regarding your personal data:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Access</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Request a copy of your personal data</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Correction</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Update or correct your information</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Deletion</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Request deletion of your account and data</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Export</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Download your data in a portable format</p>
            </div>
          </div>
        </div>

        {/* Cookies */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 mb-6">
          <div className="flex items-center space-x-3 mb-6">
            <FileText className="w-6 h-6 text-pink-600 dark:text-pink-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Cookies</h2>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            We use minimal cookies to enhance your experience:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start space-x-3">
              <span className="text-purple-600 dark:text-purple-400 font-bold">•</span>
              <p className="text-gray-600 dark:text-gray-400"><strong className="text-gray-900 dark:text-white">Essential cookies:</strong> Required for authentication and basic functionality</p>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-purple-600 dark:text-purple-400 font-bold">•</span>
              <p className="text-gray-600 dark:text-gray-400"><strong className="text-gray-900 dark:text-white">Preference cookies:</strong> Remember your settings and preferences</p>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-purple-600 dark:text-purple-400 font-bold">•</span>
              <p className="text-gray-600 dark:text-gray-400"><strong className="text-gray-900 dark:text-white">Analytics cookies:</strong> Help us understand how you use our platform (anonymous)</p>
            </li>
          </ul>
        </div>

        {/* Third-Party Services */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Third-Party Services</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            We may use trusted third-party services for:
          </p>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li>• Analytics (to understand usage patterns)</li>
            <li>• Cloud hosting (to deliver our services reliably)</li>
            <li>• Email delivery (to send notifications)</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
            These services are carefully selected and comply with strict privacy standards.
          </p>
        </div>

        {/* Contact */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Questions About Privacy?</h2>
          <p className="mb-6 opacity-90">
            If you have any questions or concerns about our privacy practices, please contact us.
          </p>
          <a
            href="mailto:privacy@tooldatabase.com"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition shadow-lg"
          >
            <span>Contact Privacy Team</span>
          </a>
        </div>
      </div>
    </div>
  );
}
