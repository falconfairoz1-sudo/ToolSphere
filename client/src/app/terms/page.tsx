'use client';

import { FileText, AlertCircle, CheckCircle, XCircle, Scale } from 'lucide-react';
import BackButton from '@/components/ui/BackButton';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <BackButton />
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
              <Scale className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                Terms of Service
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
            Welcome to ToolDataBase! By accessing or using our platform, you agree to be bound by these Terms of Service. Please read them carefully.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
            If you do not agree with any part of these terms, you may not use our services.
          </p>
        </div>

        {/* Acceptance of Terms */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 mb-6">
          <div className="flex items-center space-x-3 mb-6">
            <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">1. Acceptance of Terms</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            By creating an account or using ToolDataBase, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            We reserve the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the modified terms.
          </p>
        </div>

        {/* Use of Services */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 mb-6">
          <div className="flex items-center space-x-3 mb-6">
            <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">2. Use of Services</h2>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">2.1 Eligibility</h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            You must be at least 13 years old to use ToolDataBase. By using our services, you represent that you meet this age requirement.
          </p>

          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">2.2 Account Registration</h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            While many tools are available without registration, creating an account provides additional features. You are responsible for:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-4 mb-4">
            <li>Maintaining the confidentiality of your account credentials</li>
            <li>All activities that occur under your account</li>
            <li>Notifying us immediately of any unauthorized access</li>
          </ul>

          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">2.3 Acceptable Use</h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
            You agree to use ToolDataBase only for lawful purposes. You must not:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-4">
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe on intellectual property rights</li>
            <li>Upload malicious code or viruses</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Use automated tools to scrape or download content</li>
            <li>Abuse or overload our services</li>
            <li>Upload illegal, harmful, or offensive content</li>
          </ul>
        </div>

        {/* Intellectual Property */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 mb-6">
          <div className="flex items-center space-x-3 mb-6">
            <AlertCircle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">3. Intellectual Property</h2>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">3.1 Our Content</h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            All content on ToolDataBase, including but not limited to text, graphics, logos, icons, images, and software, is the property of ToolDataBase or its licensors and is protected by copyright and other intellectual property laws.
          </p>

          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">3.2 Your Content</h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            You retain all rights to the files and content you upload to our platform. By uploading content, you grant us a limited license to process and display it solely for the purpose of providing our services.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            We do not claim ownership of your content and will not use it for any purpose other than providing the requested service.
          </p>
        </div>

        {/* Service Availability */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Service Availability</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            We strive to provide reliable, uninterrupted service, but we cannot guarantee:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-4 mb-4">
            <li>That our services will be available at all times</li>
            <li>That our services will be error-free or bug-free</li>
            <li>That defects will be corrected immediately</li>
            <li>That our servers are free from viruses or harmful components</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            We reserve the right to modify, suspend, or discontinue any part of our services at any time without notice.
          </p>
        </div>

        {/* Disclaimer of Warranties */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 mb-6">
          <div className="flex items-center space-x-3 mb-6">
            <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">5. Disclaimer of Warranties</h2>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 mb-4">
            <p className="text-gray-700 dark:text-gray-300 font-semibold mb-2">
              IMPORTANT: PLEASE READ CAREFULLY
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              ToolDataBase is provided "AS IS" and "AS AVAILABLE" without warranties of any kind, either express or implied.
            </p>
          </div>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            We disclaim all warranties, including but not limited to:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-4">
            <li>Merchantability</li>
            <li>Fitness for a particular purpose</li>
            <li>Non-infringement</li>
            <li>Accuracy or reliability of results</li>
            <li>Security of data transmission</li>
          </ul>
        </div>

        {/* Limitation of Liability */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Limitation of Liability</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            To the maximum extent permitted by law, ToolDataBase and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-4 mb-4">
            <li>Loss of profits or revenue</li>
            <li>Loss of data or content</li>
            <li>Loss of business opportunity</li>
            <li>Service interruptions</li>
            <li>Any other commercial damages or losses</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Our total liability shall not exceed the amount you paid us in the past 12 months (which is $0 for free services).
          </p>
        </div>

        {/* User Responsibilities */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. User Responsibilities</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            You are solely responsible for:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Your Content</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Ensuring you have rights to upload and process files</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Backups</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Maintaining backups of important files</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Security</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Protecting your account credentials</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Compliance</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Following all applicable laws and regulations</p>
            </div>
          </div>
        </div>

        {/* Termination */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. Termination</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            We reserve the right to suspend or terminate your account and access to our services at any time, without notice, for:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-4 mb-4">
            <li>Violation of these Terms of Service</li>
            <li>Fraudulent or illegal activity</li>
            <li>Abuse of our services</li>
            <li>Any other reason at our sole discretion</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            You may terminate your account at any time by contacting us or using the account deletion feature.
          </p>
        </div>

        {/* Governing Law */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">9. Governing Law</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction in which ToolDataBase operates, without regard to its conflict of law provisions.
          </p>
        </div>

        {/* Changes to Terms */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">10. Changes to Terms</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            We may update these Terms of Service from time to time. When we do, we will:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-4 mb-4">
            <li>Update the "Last updated" date at the top of this page</li>
            <li>Notify registered users via email for significant changes</li>
            <li>Post a notice on our platform</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Your continued use of ToolDataBase after changes constitutes acceptance of the updated terms.
          </p>
        </div>

        {/* Contact */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Questions About These Terms?</h2>
          <p className="mb-6 opacity-90">
            If you have any questions about our Terms of Service, please don't hesitate to contact us.
          </p>
          <a
            href="mailto:legal@tooldatabase.com"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl hover:bg-gray-100 transition shadow-lg"
          >
            <span>Contact Legal Team</span>
          </a>
        </div>
      </div>
    </div>
  );
}
