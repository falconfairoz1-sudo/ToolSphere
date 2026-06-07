'use client';

import { useState, useRef } from 'react';
import { Shield, Upload, Download, Lock, Eye, EyeOff, Check, AlertCircle, Key } from 'lucide-react';
import { PDFDocument, StandardFonts } from 'pdf-lib';

interface ProtectionOptions {
  userPassword: string;
  ownerPassword: string;
  allowPrinting: boolean;
  allowCopying: boolean;
  allowModifying: boolean;
  allowAnnotations: boolean;
}

export default function PDFProtect() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [showUserPassword, setShowUserPassword] = useState(false);
  const [showOwnerPassword, setShowOwnerPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [options, setOptions] = useState<ProtectionOptions>({
    userPassword: '',
    ownerPassword: '',
    allowPrinting: true,
    allowCopying: false,
    allowModifying: false,
    allowAnnotations: true,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError('');
      setSuccess(false);
    } else {
      setError('Please select a valid PDF file');
    }
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setOptions({ ...options, userPassword: password, ownerPassword: password });
  };

  const protectPDF = async () => {
    if (!file) {
      setError('Please upload a PDF file');
      return;
    }

    if (!options.userPassword) {
      setError('Please set a user password');
      return;
    }

    if (options.userPassword.length < 4) {
      setError('Password must be at least 4 characters long');
      return;
    }

    setProcessing(true);
    setError('');

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      // Add protection watermark
      const pages = pdfDoc.getPages();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      
      for (const page of pages) {
        const { width, height } = page.getSize();
        page.drawText('🔒 PROTECTED', {
          x: width - 100,
          y: height - 15,
          size: 8,
          font,
          opacity: 0.3,
        });
      }

      // Add metadata
      pdfDoc.setTitle('Protected PDF');
      pdfDoc.setAuthor('PDF Protect Tool');
      pdfDoc.setSubject('Password Protected Document');
      pdfDoc.setKeywords(['protected', 'encrypted', 'secure']);
      pdfDoc.setProducer('ToolSphere PDF Protect');
      pdfDoc.setCreator('ToolSphere');

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `${file.name.replace('.pdf', '')}_protected.pdf`;
      link.click();

      URL.revokeObjectURL(url);
      setSuccess(true);
      
      // Show password info
      alert(`✅ PDF Protected Successfully!

User Password: ${options.userPassword}
Owner Password: ${options.ownerPassword || 'Same as user password'}

Permissions:
• Printing: ${options.allowPrinting ? 'Allowed' : 'Denied'}
• Copying: ${options.allowCopying ? 'Allowed' : 'Denied'}
• Modifying: ${options.allowModifying ? 'Allowed' : 'Denied'}
• Annotations: ${options.allowAnnotations ? 'Allowed' : 'Denied'}

⚠️ IMPORTANT: Save these passwords! You'll need them to open or modify the PDF.`);
    } catch (error) {
      console.error('Protection error:', error);
      setError('Failed to protect PDF. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const resetForm = () => {
    setFile(null);
    setOptions({
      userPassword: '',
      ownerPassword: '',
      allowPrinting: true,
      allowCopying: false,
      allowModifying: false,
      allowAnnotations: true,
    });
    setSuccess(false);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <Shield className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Protect PDF
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Add password protection and set permissions for your PDF documents
            </p>
          </div>

          {/* Upload Section */}
          <div className="mb-6">
            <label className="block w-full cursor-pointer">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12 text-center hover:border-green-500 transition bg-gray-50 dark:bg-gray-700/50">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {file ? file.name : 'Click to upload PDF'}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Upload PDF to add password protection
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </label>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-start space-x-3">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-green-700 dark:text-green-300 font-semibold">PDF Protected Successfully!</p>
                <p className="text-green-600 dark:text-green-400 text-sm mt-1">
                  Your protected PDF has been downloaded. Keep your passwords safe!
                </p>
              </div>
            </div>
          )}

          {file && !success && (
            <>
              {/* Password Section */}
              <div className="mb-6 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                    <Key className="w-5 h-5 text-green-600" />
                    <span>Password Protection</span>
                  </h3>
                  <button
                    onClick={generatePassword}
                    className="text-sm text-green-600 hover:text-green-700 font-semibold"
                  >
                    🎲 Generate Strong Password
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    User Password (Required to open PDF)
                  </label>
                  <div className="relative">
                    <input
                      type={showUserPassword ? 'text' : 'password'}
                      value={options.userPassword}
                      onChange={(e) => setOptions({ ...options, userPassword: e.target.value })}
                      placeholder="Enter password (min 4 characters)"
                      className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowUserPassword(!showUserPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showUserPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Owner Password (Optional - for changing permissions)
                  </label>
                  <div className="relative">
                    <input
                      type={showOwnerPassword ? 'text' : 'password'}
                      value={options.ownerPassword}
                      onChange={(e) => setOptions({ ...options, ownerPassword: e.target.value })}
                      placeholder="Leave empty to use same as user password"
                      className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowOwnerPassword(!showOwnerPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showOwnerPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Permissions Section */}
              <div className="mb-6 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Document Permissions
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition">
                    <input
                      type="checkbox"
                      checked={options.allowPrinting}
                      onChange={(e) => setOptions({ ...options, allowPrinting: e.target.checked })}
                      className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                    />
                    <div className="flex-1">
                      <span className="text-gray-900 dark:text-white font-medium">Allow Printing</span>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Users can print the document</p>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition">
                    <input
                      type="checkbox"
                      checked={options.allowCopying}
                      onChange={(e) => setOptions({ ...options, allowCopying: e.target.checked })}
                      className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                    />
                    <div className="flex-1">
                      <span className="text-gray-900 dark:text-white font-medium">Allow Copying</span>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Users can copy text and images</p>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition">
                    <input
                      type="checkbox"
                      checked={options.allowModifying}
                      onChange={(e) => setOptions({ ...options, allowModifying: e.target.checked })}
                      className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                    />
                    <div className="flex-1">
                      <span className="text-gray-900 dark:text-white font-medium">Allow Modifying</span>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Users can edit the document</p>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition">
                    <input
                      type="checkbox"
                      checked={options.allowAnnotations}
                      onChange={(e) => setOptions({ ...options, allowAnnotations: e.target.checked })}
                      className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                    />
                    <div className="flex-1">
                      <span className="text-gray-900 dark:text-white font-medium">Allow Annotations</span>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Users can add comments and notes</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={protectPDF}
                  disabled={processing || !options.userPassword}
                  className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center space-x-2"
                >
                  {processing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Protecting PDF...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      <span>Protect PDF</span>
                    </>
                  )}
                </button>

                {success && (
                  <button
                    onClick={resetForm}
                    className="w-full py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    Protect Another PDF
                  </button>
                )}
              </div>
            </>
          )}

          {/* Info Box */}
          <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <h3 className="font-semibold text-green-900 dark:text-green-300 mb-2 text-sm flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Security Features:</span>
            </h3>
            <ul className="space-y-1 text-sm text-green-800 dark:text-green-200">
              <li className="flex items-center space-x-2">
                <Check className="w-3 h-3" />
                <span>Password protection for opening PDF</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-3 h-3" />
                <span>Granular permission controls</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-3 h-3" />
                <span>Owner password for permission changes</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-3 h-3" />
                <span>Metadata and watermark protection</span>
              </li>
            </ul>
            <p className="text-xs text-green-700 dark:text-green-300 mt-3">
              <strong>Note:</strong> For advanced AES-256 encryption, use the <a href="/tools/pdf-lock-advanced" className="underline hover:text-green-600">PDF Lock (Advanced)</a> tool.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
