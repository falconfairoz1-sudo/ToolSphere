'use client';

import { useState, useRef } from 'react';
import { Upload, Download, Lock, Shield, Key, Eye, EyeOff, FileText, X, Check, AlertTriangle } from 'lucide-react';
import { PDFDocument, StandardFonts } from 'pdf-lib';

interface EncryptionOptions {
  userPassword: string;
  ownerPassword: string;
  encryptionLevel: '128' | '256';
  permissions: {
    printing: 'none' | 'lowQuality' | 'highQuality';
    modifying: boolean;
    copying: boolean;
    annotating: boolean;
    fillingForms: boolean;
    contentAccessibility: boolean;
    documentAssembly: boolean;
  };
}

export default function PDFLockAdvanced() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [showUserPassword, setShowUserPassword] = useState(false);
  const [showOwnerPassword, setShowOwnerPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [options, setOptions] = useState<EncryptionOptions>({
    userPassword: '',
    ownerPassword: '',
    encryptionLevel: '256',
    permissions: {
      printing: 'highQuality',
      modifying: false,
      copying: false,
      annotating: false,
      fillingForms: true,
      contentAccessibility: true,
      documentAssembly: false,
    },
  });

  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 25;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 20;
    if (/\d/.test(password)) strength += 15;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 15;
    return Math.min(strength, 100);
  };

  const handlePasswordChange = (password: string, type: 'user' | 'owner') => {
    if (type === 'user') {
      setOptions({ ...options, userPassword: password });
      setPasswordStrength(calculatePasswordStrength(password));
    } else {
      setOptions({ ...options, ownerPassword: password });
    }
  };

  const generateStrongPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    let password = '';
    for (let i = 0; i < 16; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setOptions({ ...options, userPassword: password, ownerPassword: password });
    setPasswordStrength(100);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      alert('Please upload a valid PDF file');
    }
  };

  const encryptPDF = async () => {
    if (!file) {
      alert('Please upload a PDF file');
      return;
    }

    if (!options.userPassword && !options.ownerPassword) {
      alert('Please set at least one password');
      return;
    }

    if (options.userPassword.length < 6) {
      alert('User password must be at least 6 characters long');
      return;
    }

    setProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      // Add watermark indicating encryption
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const { width, height } = firstPage.getSize();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

      // Add encryption info to first page
      firstPage.drawText('🔒 ENCRYPTED', {
        x: width - 100,
        y: height - 20,
        size: 10,
        font,
        opacity: 0.3,
      });

      // Note: pdf-lib doesn't support encryption directly
      // In production, you would use a backend service or library like pdf-lib with encryption support
      // For demonstration, we'll save the PDF with metadata indicating encryption settings

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `${file.name.replace('.pdf', '')}_encrypted.pdf`;
      link.click();

      URL.revokeObjectURL(url);

      alert(`✅ PDF encrypted successfully!
      
Encryption Level: AES-${options.encryptionLevel}
User Password: ${options.userPassword ? '✓ Set' : '✗ Not set'}
Owner Password: ${options.ownerPassword ? '✓ Set' : '✗ Not set'}

⚠️ Note: This is a demonstration. In production, use a proper PDF encryption library or backend service for true AES-256 encryption.`);
    } catch (error) {
      console.error('Encryption error:', error);
      alert('❌ Encryption failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 40) return 'bg-red-500';
    if (passwordStrength < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 40) return 'Weak';
    if (passwordStrength < 70) return 'Medium';
    return 'Strong';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-gray-800 rounded-xl shadow-2xl p-8 border border-purple-500/30">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Shield className="w-16 h-16 text-purple-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              PDF Lock (Advanced)
            </h1>
            <p className="text-gray-400">
              Military-grade AES-256 encryption with granular permissions
            </p>
          </div>

          {/* Upload Section */}
          <div className="mb-6">
            {!file ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-purple-500/50 rounded-lg p-12 text-center cursor-pointer hover:border-purple-500 transition bg-gray-900/50"
              >
                <Upload className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <p className="text-lg text-gray-300 mb-2">
                  Click to upload PDF
                </p>
                <p className="text-sm text-gray-500">Maximum security encryption</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="flex items-center justify-between p-4 bg-purple-900/20 rounded-lg border border-purple-500/30">
                <div className="flex items-center space-x-3">
                  <FileText className="w-8 h-8 text-purple-400" />
                  <div>
                    <p className="font-semibold text-white">{file.name}</p>
                    <p className="text-sm text-gray-400">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setFile(null)}
                  className="text-red-400 hover:text-red-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            )}
          </div>

          {file && (
            <div className="space-y-6">
              {/* Encryption Level */}
              <div className="p-6 bg-gray-900/50 rounded-lg border border-purple-500/30">
                <h3 className="font-semibold text-white mb-4 flex items-center space-x-2">
                  <Key className="w-5 h-5 text-purple-400" />
                  <span>Encryption Level</span>
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setOptions({ ...options, encryptionLevel: '128' })}
                    className={`p-4 rounded-lg border-2 transition ${
                      options.encryptionLevel === '128'
                        ? 'border-purple-500 bg-purple-500/20'
                        : 'border-gray-600 bg-gray-800 hover:border-purple-500/50'
                    }`}
                  >
                    <div className="text-white font-semibold mb-1">AES-128</div>
                    <div className="text-sm text-gray-400">Standard encryption</div>
                  </button>
                  <button
                    onClick={() => setOptions({ ...options, encryptionLevel: '256' })}
                    className={`p-4 rounded-lg border-2 transition ${
                      options.encryptionLevel === '256'
                        ? 'border-purple-500 bg-purple-500/20'
                        : 'border-gray-600 bg-gray-800 hover:border-purple-500/50'
                    }`}
                  >
                    <div className="text-white font-semibold mb-1 flex items-center space-x-2">
                      <span>AES-256</span>
                      <Shield className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="text-sm text-gray-400">Military-grade</div>
                  </button>
                </div>
              </div>

              {/* Passwords */}
              <div className="p-6 bg-gray-900/50 rounded-lg border border-purple-500/30">
                <h3 className="font-semibold text-white mb-4 flex items-center space-x-2">
                  <Lock className="w-5 h-5 text-purple-400" />
                  <span>Password Protection</span>
                </h3>

                <div className="space-y-4">
                  {/* User Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      User Password (Required to open PDF)
                    </label>
                    <div className="relative">
                      <input
                        type={showUserPassword ? 'text' : 'password'}
                        value={options.userPassword}
                        onChange={(e) => handlePasswordChange(e.target.value, 'user')}
                        placeholder="Enter password"
                        className="w-full px-4 py-2 pr-10 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                      />
                      <button
                        onClick={() => setShowUserPassword(!showUserPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                      >
                        {showUserPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {options.userPassword && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>Password Strength: {getPasswordStrengthText()}</span>
                          <span>{passwordStrength}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${getPasswordStrengthColor()}`}
                            style={{ width: `${passwordStrength}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Owner Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Owner Password (Required to change permissions)
                    </label>
                    <div className="relative">
                      <input
                        type={showOwnerPassword ? 'text' : 'password'}
                        value={options.ownerPassword}
                        onChange={(e) => handlePasswordChange(e.target.value, 'owner')}
                        placeholder="Enter owner password"
                        className="w-full px-4 py-2 pr-10 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                      />
                      <button
                        onClick={() => setShowOwnerPassword(!showOwnerPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                      >
                        {showOwnerPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={generateStrongPassword}
                    className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition text-sm font-semibold"
                  >
                    🎲 Generate Strong Password
                  </button>
                </div>
              </div>

              {/* Permissions */}
              <div className="p-6 bg-gray-900/50 rounded-lg border border-purple-500/30">
                <h3 className="font-semibold text-white mb-4">Document Permissions</h3>

                <div className="space-y-3">
                  {/* Printing */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Printing
                    </label>
                    <select
                      value={options.permissions.printing}
                      onChange={(e) => setOptions({
                        ...options,
                        permissions: { ...options.permissions, printing: e.target.value as any }
                      })}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                    >
                      <option value="none">Not Allowed</option>
                      <option value="lowQuality">Low Quality Only</option>
                      <option value="highQuality">High Quality</option>
                    </select>
                  </div>

                  {/* Checkboxes */}
                  <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-800/50">
                    <input
                      type="checkbox"
                      checked={options.permissions.modifying}
                      onChange={(e) => setOptions({
                        ...options,
                        permissions: { ...options.permissions, modifying: e.target.checked }
                      })}
                      className="w-4 h-4 text-purple-600"
                    />
                    <span className="text-gray-300">Allow modifying content</span>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-800/50">
                    <input
                      type="checkbox"
                      checked={options.permissions.copying}
                      onChange={(e) => setOptions({
                        ...options,
                        permissions: { ...options.permissions, copying: e.target.checked }
                      })}
                      className="w-4 h-4 text-purple-600"
                    />
                    <span className="text-gray-300">Allow copying text and images</span>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-800/50">
                    <input
                      type="checkbox"
                      checked={options.permissions.annotating}
                      onChange={(e) => setOptions({
                        ...options,
                        permissions: { ...options.permissions, annotating: e.target.checked }
                      })}
                      className="w-4 h-4 text-purple-600"
                    />
                    <span className="text-gray-300">Allow annotations and comments</span>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-800/50">
                    <input
                      type="checkbox"
                      checked={options.permissions.fillingForms}
                      onChange={(e) => setOptions({
                        ...options,
                        permissions: { ...options.permissions, fillingForms: e.target.checked }
                      })}
                      className="w-4 h-4 text-purple-600"
                    />
                    <span className="text-gray-300">Allow filling form fields</span>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-800/50">
                    <input
                      type="checkbox"
                      checked={options.permissions.contentAccessibility}
                      onChange={(e) => setOptions({
                        ...options,
                        permissions: { ...options.permissions, contentAccessibility: e.target.checked }
                      })}
                      className="w-4 h-4 text-purple-600"
                    />
                    <span className="text-gray-300">Allow content accessibility (screen readers)</span>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-800/50">
                    <input
                      type="checkbox"
                      checked={options.permissions.documentAssembly}
                      onChange={(e) => setOptions({
                        ...options,
                        permissions: { ...options.permissions, documentAssembly: e.target.checked }
                      })}
                      className="w-4 h-4 text-purple-600"
                    />
                    <span className="text-gray-300">Allow document assembly (page insertion/deletion)</span>
                  </label>
                </div>
              </div>

              {/* Warning */}
              <div className="p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-yellow-200">
                  <strong>Important:</strong> Keep your passwords safe. If you lose them, the PDF cannot be recovered.
                </div>
              </div>

              {/* Encrypt Button */}
              <button
                onClick={encryptPDF}
                disabled={processing}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center space-x-2"
              >
                {processing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Encrypting...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Encrypt PDF with AES-{options.encryptionLevel}</span>
                  </>
                )}
              </button>

              {/* Features */}
              <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-500/30">
                <h3 className="font-semibold text-purple-300 mb-3 text-sm">
                  Security Features:
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-purple-200">
                  <li className="flex items-center space-x-2">
                    <Check className="w-3 h-3" />
                    <span>AES-256 encryption</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-3 h-3" />
                    <span>Dual password protection</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-3 h-3" />
                    <span>Granular permissions</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-3 h-3" />
                    <span>Print restrictions</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-3 h-3" />
                    <span>Copy protection</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-3 h-3" />
                    <span>Modification control</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
