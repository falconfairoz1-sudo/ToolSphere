'use client';

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, Download, X, CheckCircle, Loader2, Presentation, ArrowUp, ArrowDown } from 'lucide-react';

const PowerPointMerger: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [merging, setMerging] = useState(false);
  const [merged, setMerged] = useState(false);
  const [outputName, setOutputName] = useState('merged-presentation.pptx');
  const [mergedFileUrl, setMergedFileUrl] = useState<string>('');

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      (file) => file.name.endsWith('.pptx') || file.name.endsWith('.ppt')
    );
    setFiles((prev) => [...prev, ...droppedFiles]);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const moveFile = (index: number, direction: 'up' | 'down') => {
    const newFiles = [...files];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < files.length) {
      [newFiles[index], newFiles[targetIndex]] = [newFiles[targetIndex], newFiles[index]];
      setFiles(newFiles);
    }
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      alert('Please select at least 2 PowerPoint files');
      return;
    }

    setMerging(true);
    
    try {
      // Import JSZip dynamically for PowerPoint file handling
      const JSZip = (await import('jszip')).default;
      
      // Create a new presentation based on the first file
      const firstFileBuffer = await files[0].arrayBuffer();
      const firstZip = await JSZip.loadAsync(firstFileBuffer);
      
      // Create a new zip for the merged presentation
      const mergedZip = new JSZip();
      
      // Copy all files from the first presentation
      firstZip.forEach((relativePath, file) => {
        if (!file.dir) {
          mergedZip.file(relativePath, file.async('arraybuffer'));
        }
      });
      
      let slideCounter = 1;
      
      // Get slide count from first presentation
      const slideFiles = Object.keys(firstZip.files).filter(name => 
        name.startsWith('ppt/slides/slide') && name.endsWith('.xml')
      );
      slideCounter = slideFiles.length + 1;
      
      // Process remaining files
      for (let i = 1; i < files.length; i++) {
        const fileBuffer = await files[i].arrayBuffer();
        const zip = await JSZip.loadAsync(fileBuffer);
        
        // Extract slides from current presentation
        const currentSlides = Object.keys(zip.files).filter(name => 
          name.startsWith('ppt/slides/slide') && name.endsWith('.xml')
        );
        
        // Add slides to merged presentation
        for (const slidePath of currentSlides) {
          const slideContent = await zip.file(slidePath)?.async('text');
          if (slideContent) {
            const newSlidePath = `ppt/slides/slide${slideCounter}.xml`;
            mergedZip.file(newSlidePath, slideContent);
            slideCounter++;
          }
        }
        
        // Copy slide layouts and masters if they don't exist
        const layouts = Object.keys(zip.files).filter(name => 
          name.startsWith('ppt/slideLayouts/') || name.startsWith('ppt/slideMasters/')
        );
        
        for (const layoutPath of layouts) {
          if (!mergedZip.files[layoutPath]) {
            const layoutContent = await zip.file(layoutPath)?.async('arraybuffer');
            if (layoutContent) {
              mergedZip.file(layoutPath, layoutContent);
            }
          }
        }
        
        // Copy media files (images, etc.)
        const mediaFiles = Object.keys(zip.files).filter(name => 
          name.startsWith('ppt/media/')
        );
        
        for (const mediaPath of mediaFiles) {
          const newMediaPath = `ppt/media/${i}_${mediaPath.split('/').pop()}`;
          if (!mergedZip.files[newMediaPath]) {
            const mediaContent = await zip.file(mediaPath)?.async('arraybuffer');
            if (mediaContent) {
              mergedZip.file(newMediaPath, mediaContent);
            }
          }
        }
      }
      
      // Update presentation.xml with new slide count
      const presentationXml = await firstZip.file('ppt/presentation.xml')?.async('text');
      if (presentationXml) {
        // Update slide count in presentation.xml (basic implementation)
        const updatedXml = presentationXml.replace(
          /<p:sldIdLst[^>]*>[\s\S]*?<\/p:sldIdLst>/,
          generateSlideIdList(slideCounter - 1)
        );
        mergedZip.file('ppt/presentation.xml', updatedXml);
      }
      
      // Generate the merged PowerPoint file
      const mergedBuffer = await mergedZip.generateAsync({
        type: 'arraybuffer',
        compression: 'DEFLATE',
        compressionOptions: { level: 6 }
      });
      
      const mergedBlob = new Blob([mergedBuffer], { 
        type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' 
      });
      
      const url = URL.createObjectURL(mergedBlob);
      setMergedFileUrl(url);
      setMerged(true);
      
    } catch (error) {
      console.error('Error merging presentations:', error);
      alert('Failed to merge presentations. Please ensure all files are valid PowerPoint files (.pptx format recommended).');
    } finally {
      setMerging(false);
    }
  };

  // Helper function to generate slide ID list
  const generateSlideIdList = (slideCount: number) => {
    let slideIdList = '<p:sldIdLst>';
    for (let i = 1; i <= slideCount; i++) {
      slideIdList += `<p:sldId id="${255 + i}" r:id="rId${i + 1}"/>`;
    }
    slideIdList += '</p:sldIdLst>';
    return slideIdList;
  };

  const handleDownload = () => {
    if (mergedFileUrl) {
      const link = document.createElement('a');
      link.href = mergedFileUrl;
      link.download = outputName.endsWith('.pptx') ? outputName : `${outputName}.pptx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const resetTool = () => {
    setFiles([]);
    setMerged(false);
    setMerging(false);
    if (mergedFileUrl) {
      URL.revokeObjectURL(mergedFileUrl);
      setMergedFileUrl('');
    }
    setOutputName('merged-presentation.pptx');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 p-6">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <Presentation className="w-12 h-12 text-orange-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800">PowerPoint Merger</h1>
          <p className="text-gray-600 text-lg">Combine multiple presentations into one</p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <input 
            type="file" 
            id="file-upload-merger" 
            className="hidden" 
            accept=".ppt,.pptx" 
            multiple 
            onChange={handleFileSelect} 
          />
          <label 
            htmlFor="file-upload-merger" 
            onDrop={handleDrop} 
            onDragOver={(e) => e.preventDefault()} 
            className="block border-3 border-dashed border-orange-300 rounded-xl p-12 text-center hover:border-orange-500 transition-colors cursor-pointer bg-orange-50/50"
          >
            <Upload className="w-16 h-16 text-orange-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Drop PowerPoint files here</h3>
            <p className="text-gray-600 mb-4">or click to browse (minimum 2 files)</p>
            <span className="inline-block px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg font-semibold hover:from-orange-700 hover:to-red-700">
              Select Files
            </span>
          </label>
        </div>

        {files.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Files to Merge ({files.length})</h3>
            <p className="text-sm text-gray-600 mb-4">Drag to reorder - files will be merged in this order</p>
            <div className="space-y-3 mb-6">
              {files.map((file, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="flex flex-col gap-1">
                      <button onClick={() => moveFile(idx, 'up')} disabled={idx === 0} className="p-1 text-gray-400 hover:text-orange-600 disabled:opacity-30">
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button onClick={() => moveFile(idx, 'down')} disabled={idx === files.length - 1} className="p-1 text-gray-400 hover:text-orange-600 disabled:opacity-30">
                        <ArrowDown className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">
                      {idx + 1}
                    </div>
                    <Presentation className="w-8 h-8 text-orange-600" />
                    <span className="font-medium text-gray-800">{file.name}</span>
                  </div>
                  <button onClick={() => removeFile(idx)} className="p-2 text-gray-400 hover:text-red-600 rounded-lg">
                    <X className="w-5 h-5" />
                  </button>
                </motion.div>
              ))}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Output Filename</label>
              <input
                type="text"
                value={outputName}
                onChange={(e) => setOutputName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="merged-presentation.pptx"
              />
            </div>

            <button onClick={handleMerge} disabled={merging || files.length < 2} className="w-full py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-bold text-lg hover:from-orange-700 hover:to-red-700 disabled:opacity-50 flex items-center justify-center gap-2">
              {merging ? <><Loader2 className="w-6 h-6 animate-spin" />Merging...</> : <>Merge Presentations</>}
            </button>
          </div>
        )}

        {merged && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-xl p-6">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">Presentations Merged!</h3>
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg mb-4">
              <span className="font-medium">{outputName}</span>
              <button 
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="w-5 h-5" />
                Download
              </button>
            </div>
            <div className="text-center">
              <button 
                onClick={resetTool}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Merge More Files
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PowerPointMerger;
