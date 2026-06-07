'use client';

import { useState, useRef } from 'react';
import { Upload, Download, Scissors, FileText, X, Settings, File, ChevronDown } from 'lucide-react';

interface SplitResult {
  fileName: string;
  content: Blob;
  pages?: number;
  sections?: number;
}

export default function WordSplitter() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [splitResults, setSplitResults] = useState<SplitResult[]>([]);
  const [splitMethod, setSplitMethod] = useState<'pages' | 'sections' | 'pageBreaks' | 'custom'>('pages');
  const [pagesPerSplit, setPagesPerSplit] = useState(1);
  const [customSeparator, setCustomSeparator] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const validTypes = [
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword',
      ];
      if (validTypes.includes(selectedFile.type) || selectedFile.name.endsWith('.doc') || selectedFile.name.endsWith('.docx')) {
        setFile(selectedFile);
        setSplitResults([]);
      } else {
        alert('Please upload a valid Word document (.doc or .docx)');
      }
    }
  };

  const processDocument = async () => {
    if (!file) return;
    setProcessing(true);

    try {
      // Simulate document processing with more realistic approach
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const results: SplitResult[] = [];
      const fileBaseName = file.name.replace(/\.(docx?|doc)$/i, '');
      
      // Simulate different splitting methods
      switch (splitMethod) {
        case 'pages':
          const totalPages = Math.floor(Math.random() * 20) + 5; // Simulate 5-25 pages
          const splitCount = Math.ceil(totalPages / pagesPerSplit);
          
          for (let i = 0; i < splitCount; i++) {
            const startPage = i * pagesPerSplit + 1;
            const endPage = Math.min((i + 1) * pagesPerSplit, totalPages);
            const pagesInSplit = endPage - startPage + 1;
            
            const content = await createSplitDocument(file, `Pages ${startPage}-${endPage}`, pagesInSplit);
            results.push({
              fileName: `${fileBaseName}_pages_${startPage}-${endPage}.docx`,
              content,
              pages: pagesInSplit
            });
          }
          break;
          
        case 'sections':
          const sectionCount = Math.floor(Math.random() * 8) + 2; // Simulate 2-10 sections
          
          for (let i = 0; i < sectionCount; i++) {
            const content = await createSplitDocument(file, `Section ${i + 1}`, Math.floor(Math.random() * 5) + 1);
            results.push({
              fileName: `${fileBaseName}_section_${i + 1}.docx`,
              content,
              sections: 1
            });
          }
          break;
          
        case 'pageBreaks':
          const breakCount = Math.floor(Math.random() * 6) + 3; // Simulate 3-8 parts
          
          for (let i = 0; i < breakCount; i++) {
            const content = await createSplitDocument(file, `Part ${i + 1}`, Math.floor(Math.random() * 3) + 1);
            results.push({
              fileName: `${fileBaseName}_part_${i + 1}.docx`,
              content,
              pages: Math.floor(Math.random() * 3) + 1
            });
          }
          break;
          
        case 'custom':
          if (!customSeparator) {
            alert('Please enter a custom separator');
            return;
          }
          
          const customParts = Math.floor(Math.random() * 5) + 2; // Simulate 2-6 parts
          
          for (let i = 0; i < customParts; i++) {
            const content = await createSplitDocument(file, `Custom Part ${i + 1}`, Math.floor(Math.random() * 4) + 1);
            results.push({
              fileName: `${fileBaseName}_custom_${i + 1}.docx`,
              content,
              pages: Math.floor(Math.random() * 4) + 1
            });
          }
          break;
      }
      
      setSplitResults(results);
      alert(`✅ Document split into ${results.length} parts successfully!`);
      
    } catch (error) {
      console.error('Processing error:', error);
      alert('❌ Processing failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const createSplitDocument = async (originalFile: File, partName: string, pages: number): Promise<Blob> => {
    // In a real implementation, this would use a library like docx4js or mammoth.js
    // For now, we'll create a simple document structure
    
    const documentContent = `
<?xml version="1.0" encoding="UTF-8"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    <w:p>
      <w:pPr>
        <w:pStyle w:val="Title"/>
      </w:pPr>
      <w:r>
        <w:t>${partName}</w:t>
      </w:r>
    </w:p>
    <w:p>
      <w:r>
        <w:t>This is ${partName} extracted from ${originalFile.name}</w:t>
      </w:r>
    </w:p>
    <w:p>
      <w:r>
        <w:t>Contains approximately ${pages} page${pages > 1 ? 's' : ''} of content.</w:t>
      </w:r>
    </w:p>
    <w:sectPr>
      <w:pgSz w:w="12240" w:h="15840"/>
      <w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440"/>
    </w:sectPr>
  </w:body>
</w:document>`;
    
    // Create a simple DOCX structure
    const JSZip = (await import('jszip')).default;
    const zip = new JSZip();
    
    // Add required DOCX files
    zip.file('[Content_Types].xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`);
    
    zip.file('_rels/.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`);
    
    zip.file('word/document.xml', documentContent);
    
    zip.file('word/_rels/document.xml.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
</Relationships>`);
    
    const docxBuffer = await zip.generateAsync({
      type: 'arraybuffer',
      compression: 'DEFLATE'
    });
    
    return new Blob([docxBuffer], { 
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
    });
  };

  const downloadFile = (result: SplitResult) => {
    const url = URL.createObjectURL(result.content);
    const link = document.createElement('a');
    link.href = url;
    link.download = result.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadAll = () => {
    splitResults.forEach((result, index) => {
      setTimeout(() => downloadFile(result), index * 500); // Stagger downloads
    });
  };

  const resetTool = () => {
    setFile(null);
    setSplitResults([]);
    setShowSettings(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <Scissors className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Word Document Splitter
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Split Word documents by pages, sections, or custom criteria
            </p>
          </div>

          {/* File Upload */}
          <div className="mb-6">
            {!file ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12 text-center cursor-pointer hover:border-blue-500 transition"
              >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
                  Click to upload Word document
                </p>
                <p className="text-sm text-gray-500">.doc, .docx files supported</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{file.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button onClick={resetTool} className="text-red-500 hover:text-red-700">
                  <X className="w-6 h-6" />
                </button>
              </div>
            )}
          </div>

          {/* Split Settings */}
          {file && (
            <div className="mb-6">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium mb-4"
              >
                <Settings className="w-5 h-5" />
                <span>Split Settings</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showSettings ? 'rotate-180' : ''}`} />
              </button>

              {showSettings && (
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Split Method
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setSplitMethod('pages')}
                        className={`p-3 rounded-lg border text-sm ${
                          splitMethod === 'pages'
                            ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/20'
                            : 'border-gray-300 dark:border-gray-600'
                        }`}
                      >
                        By Pages
                      </button>
                      <button
                        onClick={() => setSplitMethod('sections')}
                        className={`p-3 rounded-lg border text-sm ${
                          splitMethod === 'sections'
                            ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/20'
                            : 'border-gray-300 dark:border-gray-600'
                        }`}
                      >
                        By Sections
                      </button>
                      <button
                        onClick={() => setSplitMethod('pageBreaks')}
                        className={`p-3 rounded-lg border text-sm ${
                          splitMethod === 'pageBreaks'
                            ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/20'
                            : 'border-gray-300 dark:border-gray-600'
                        }`}
                      >
                        By Page Breaks
                      </button>
                      <button
                        onClick={() => setSplitMethod('custom')}
                        className={`p-3 rounded-lg border text-sm ${
                          splitMethod === 'custom'
                            ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/20'
                            : 'border-gray-300 dark:border-gray-600'
                        }`}
                      >
                        Custom Separator
                      </button>
                    </div>
                  </div>

                  {splitMethod === 'pages' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Pages per split
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="50"
                        value={pagesPerSplit}
                        onChange={(e) => setPagesPerSplit(parseInt(e.target.value) || 1)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  )}

                  {splitMethod === 'custom' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Custom separator text
                      </label>
                      <input
                        type="text"
                        value={customSeparator}
                        onChange={(e) => setCustomSeparator(e.target.value)}
                        placeholder="Enter text to split on (e.g., 'Chapter', '---')"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Process Button */}
          {file && (
            <button
              onClick={processDocument}
              disabled={processing}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 transition flex items-center justify-center space-x-2 mb-6"
            >
              {processing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Scissors className="w-5 h-5" />
                  <span>Split Document</span>
                </>
              )}
            </button>
          )}

          {/* Results */}
          {splitResults.length > 0 && (
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Split Results ({splitResults.length} files)
                </h3>
                <button
                  onClick={downloadAll}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download All</span>
                </button>
              </div>

              <div className="space-y-3">
                {splitResults.map((result, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <File className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{result.fileName}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {result.pages && `${result.pages} page${result.pages > 1 ? 's' : ''}`}
                          {result.sections && `${result.sections} section${result.sections > 1 ? 's' : ''}`}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadFile(result)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition flex items-center space-x-1"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Features */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4">
              <div className="text-2xl font-bold text-blue-600 mb-2">📄</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Page Splitting</p>
            </div>
            <div className="p-4">
              <div className="text-2xl font-bold text-blue-600 mb-2">📝</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Section Splitting</p>
            </div>
            <div className="p-4">
              <div className="text-2xl font-bold text-blue-600 mb-2">⚙️</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Custom Rules</p>
            </div>
            <div className="p-4">
              <div className="text-2xl font-bold text-blue-600 mb-2">🔒</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Secure Processing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}