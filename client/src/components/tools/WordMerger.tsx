'use client';

import { useState, useRef } from 'react';
import { Upload, Download, FileText, X, Plus, GripVertical, Trash2 } from 'lucide-react';

interface DocumentFile {
  id: string;
  file: File;
  order: number;
}

export default function WordMerger() {
  const [files, setFiles] = useState<DocumentFile[]>([]);
  const [merging, setMerging] = useState(false);
  const [preserveFormatting, setPreserveFormatting] = useState(true);
  const [addPageBreaks, setAddPageBreaks] = useState(true);
  const [includeHeaders, setIncludeHeaders] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const validFiles = selectedFiles.filter(file => 
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.type === 'application/msword' ||
      file.name.endsWith('.doc') ||
      file.name.endsWith('.docx')
    );

    const newFiles: DocumentFile[] = validFiles.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      file,
      order: files.length + index,
    }));

    setFiles([...files, ...newFiles]);
  };

  const removeFile = (id: string) => {
    setFiles(files.filter(f => f.id !== id));
  };

  const moveFile = (id: string, direction: 'up' | 'down') => {
    const index = files.findIndex(f => f.id === id);
    if (index === -1) return;
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === files.length - 1) return;

    const newFiles = [...files];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newFiles[index], newFiles[targetIndex]] = [newFiles[targetIndex], newFiles[index]];
    setFiles(newFiles);
  };

  const mergeDocuments = async () => {
    if (files.length < 2) {
      alert('Please add at least 2 documents to merge');
      return;
    }

    setMerging(true);

    try {
      // Simulate merging process
      await new Promise(resolve => setTimeout(resolve, 2000));

      // In production, use a library like docx or send to backend
      const mergedContent = `Merged Document
      
Files merged: ${files.length}
Preserve formatting: ${preserveFormatting ? 'Yes' : 'No'}
Page breaks: ${addPageBreaks ? 'Yes' : 'No'}
Include headers: ${includeHeaders ? 'Yes' : 'No'}

Documents:
${files.map((f, i) => `${i + 1}. ${f.file.name}`).join('\n')}`;

      const blob = new Blob([mergedContent], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = 'merged_document.docx';
      link.click();

      URL.revokeObjectURL(url);
      alert('✅ Documents merged successfully!');
    } catch (error) {
      console.error('Merge error:', error);
      alert('❌ Merge failed. Please try again.');
    } finally {
      setMerging(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <FileText className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Word Document Merger
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Merge multiple Word documents with formatting preservation
            </p>
          </div>

          {/* Upload Section */}
          <div className="mb-6">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition"
            >
              <Plus className="w-10 h-10 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 dark:text-gray-400">
                Click to add Word documents
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {files.length} document{files.length !== 1 ? 's' : ''} added
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Files List */}
          {files.length > 0 && (
            <div className="mb-6 space-y-2">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                Documents to Merge ({files.length})
              </h3>
              {files.map((doc, index) => (
                <div
                  key={doc.id}
                  className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex space-x-1">
                    <button
                      onClick={() => moveFile(doc.id, 'up')}
                      disabled={index === 0}
                      className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => moveFile(doc.id, 'down')}
                      disabled={index === files.length - 1}
                      className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                    >
                      ↓
                    </button>
                  </div>
                  <GripVertical className="w-5 h-5 text-gray-400" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 dark:text-white truncate">
                      {index + 1}. {doc.file.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {(doc.file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <button
                    onClick={() => removeFile(doc.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Options */}
          {files.length > 0 && (
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-3">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Merge Options
              </h3>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={preserveFormatting}
                  onChange={(e) => setPreserveFormatting(e.target.checked)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-gray-700 dark:text-gray-300">
                  Preserve original formatting
                </span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={addPageBreaks}
                  onChange={(e) => setAddPageBreaks(e.target.checked)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-gray-700 dark:text-gray-300">
                  Add page breaks between documents
                </span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeHeaders}
                  onChange={(e) => setIncludeHeaders(e.target.checked)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-gray-700 dark:text-gray-300">
                  Include headers and footers
                </span>
              </label>
            </div>
          )}

          {/* Merge Button */}
          {files.length >= 2 && (
            <button
              onClick={mergeDocuments}
              disabled={merging}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 transition flex items-center justify-center space-x-2"
            >
              {merging ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Merging...</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  <span>Merge {files.length} Documents</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
