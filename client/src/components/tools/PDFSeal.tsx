'use client';

import { useState, useRef, useEffect } from 'react';
import { Upload, Download, Stamp, X, Move, RotateCw, ZoomIn, ZoomOut, Trash2, FileText, Maximize2 } from 'lucide-react';
import { PDFDocument, rgb, degrees } from 'pdf-lib';

interface SealPosition {
  x: number;
  y: number;
  page: number;
  rotation: number;
  scale: number;
  id: number;
}

export default function PDFSeal() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [sealImage, setSealImage] = useState<File | null>(null);
  const [pdfPreview, setPdfPreview] = useState<string>('');
  const [sealPreview, setSealPreview] = useState<string>('');
  const [processing, setProcessing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pdfDimensions, setPdfDimensions] = useState({ width: 612, height: 792 }); // Default Letter size
  const [sealPositions, setSealPositions] = useState<SealPosition[]>([]);
  const [isPlacingSeal, setIsPlacingSeal] = useState(false);
  const [sealRotation, setSealRotation] = useState(0);
  const [sealScale, setSealScale] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [draggingSealId, setDraggingSealId] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [nextSealId, setNextSealId] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const sealInputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const predefinedSeals = [
    { name: 'Official', emoji: '🏛️', color: '#1e40af' },
    { name: 'Approved', emoji: '✅', color: '#16a34a' },
    { name: 'Certified', emoji: '🎖️', color: '#dc2626' },
    { name: 'Verified', emoji: '✓', color: '#2563eb' },
    { name: 'Confidential', emoji: '🔒', color: '#7c3aed' },
    { name: 'Urgent', emoji: '⚡', color: '#ea580c' },
  ];

  const handlePDFUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || file.type !== 'application/pdf') {
      alert('Please upload a valid PDF file');
      return;
    }

    setPdfFile(file);
    const url = URL.createObjectURL(file);
    setPdfPreview(url);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      setTotalPages(pdfDoc.getPageCount());
      setCurrentPage(1);
      
      // Get actual PDF page dimensions
      const firstPage = pdfDoc.getPage(0);
      const { width, height } = firstPage.getSize();
      setPdfDimensions({ width, height });
      
      console.log('✅ PDF loaded:', { 
        pages: pdfDoc.getPageCount(),
        dimensions: { width, height }
      });
    } catch (error) {
      console.error('Error loading PDF:', error);
      alert('Failed to load PDF. Please try again.');
    }
  };

  const handleSealUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPG)');
      return;
    }

    setSealImage(file);
    const url = URL.createObjectURL(file);
    setSealPreview(url);
  };

  const handlePreviewClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (draggingSealId !== null) return;
    if (!isPlacingSeal || !sealImage) return;

    const previewElement = previewRef.current;
    if (!previewElement) return;

    const rect = previewElement.getBoundingClientRect();
    
    // Get click position relative to preview container
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    
    // Use the fixed preview dimensions (800px * zoom)
    const previewWidth = 800 * zoom;
    const previewHeight = (pdfDimensions.height / pdfDimensions.width) * 800 * zoom;
    
    // Verify click is within bounds
    if (clickX < 0 || clickX > previewWidth || clickY < 0 || clickY > previewHeight) {
      console.log('Click outside bounds, ignoring');
      return;
    }
    
    // Store as normalized coordinates (0-1 range) - resolution independent
    const normalizedX = clickX / previewWidth;
    const normalizedY = clickY / previewHeight;
    
    console.log('=== Seal Placement ===');
    console.log('Click (display):', { clickX, clickY });
    console.log('Preview dimensions:', { previewWidth, previewHeight });
    console.log('Normalized coords (0-1):', { normalizedX, normalizedY });

    const newSeal: SealPosition = {
      x: normalizedX,
      y: normalizedY,
      page: currentPage,
      rotation: sealRotation,
      scale: sealScale,
      id: nextSealId,
    };

    console.log('Adding seal:', newSeal);
    setSealPositions([...sealPositions, newSeal]);
    setNextSealId(nextSealId + 1);
    setIsPlacingSeal(false);
  };

  const handleSealMouseDown = (e: React.MouseEvent, sealId: number) => {
    e.stopPropagation();
    const seal = sealPositions.find(s => s.id === sealId);
    if (!seal) return;

    setDraggingSealId(sealId);
    const rect = previewRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    // Convert normalized coords to display coords for offset calculation
    const previewWidth = 800 * zoom;
    const previewHeight = (pdfDimensions.height / pdfDimensions.width) * 800 * zoom;
    const displayX = seal.x * previewWidth;
    const displayY = seal.y * previewHeight;
    
    setDragOffset({
      x: e.clientX - rect.left - displayX,
      y: e.clientY - rect.top - displayY,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (draggingSealId === null || !previewRef.current) return;

    const rect = previewRef.current.getBoundingClientRect();
    const previewWidth = 800 * zoom;
    const previewHeight = (pdfDimensions.height / pdfDimensions.width) * 800 * zoom;
    
    // Get display position
    const displayX = e.clientX - rect.left - dragOffset.x;
    const displayY = e.clientY - rect.top - dragOffset.y;
    
    // Convert to normalized coordinates (0-1)
    const normalizedX = displayX / previewWidth;
    const normalizedY = displayY / previewHeight;
    
    // Clamp to bounds
    const clampedX = Math.max(0, Math.min(normalizedX, 1));
    const clampedY = Math.max(0, Math.min(normalizedY, 1));

    setSealPositions(sealPositions.map(seal =>
      seal.id === draggingSealId
        ? { ...seal, x: clampedX, y: clampedY }
        : seal
    ));
  };

  const handleMouseUp = () => {
    setDraggingSealId(null);
  };

  const removeSeal = (id: number) => {
    setSealPositions(sealPositions.filter(seal => seal.id !== id));
  };

  const createTextSeal = async (text: string, emoji: string, color: string): Promise<Uint8Array> => {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(100, 100, 90, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(100, 100, 90, 0, Math.PI * 2);
    ctx.stroke();

    ctx.font = 'bold 50px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'white';
    ctx.fillText(emoji, 100, 80);

    ctx.font = 'bold 20px Arial';
    ctx.fillText(text, 100, 130);

    return new Promise((resolve) => {
      canvas.toBlob(async (blob) => {
        const arrayBuffer = await blob!.arrayBuffer();
        resolve(new Uint8Array(arrayBuffer));
      }, 'image/png');
    });
  };

  const applySeals = async () => {
    if (!pdfFile || !sealImage || sealPositions.length === 0) {
      alert('Please upload PDF, seal image, and place at least one seal');
      return;
    }

    setProcessing(true);

    try {
      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      const sealArrayBuffer = await sealImage.arrayBuffer();
      const sealImageBytes = new Uint8Array(sealArrayBuffer);
      
      let embeddedImage;
      if (sealImage.type === 'image/png') {
        embeddedImage = await pdfDoc.embedPng(sealImageBytes);
      } else {
        embeddedImage = await pdfDoc.embedJpg(sealImageBytes);
      }

      for (const position of sealPositions) {
        const page = pdfDoc.getPage(position.page - 1);
        const { width: pageWidth, height: pageHeight } = page.getSize();

        console.log('=== Placing Seal ===');
        console.log('PDF Page size:', { width: pageWidth, height: pageHeight });
        console.log('Normalized position (0-1):', { x: position.x, y: position.y });
        
        // Convert normalized coordinates to actual PDF coordinates
        const pdfX = position.x * pageWidth;
        const pdfY = position.y * pageHeight;
        
        console.log('PDF coords (before Y flip):', { pdfX, pdfY });
        
        const sealSize = 50 * position.scale; // Base size in PDF points
        
        // Center the seal on the click point
        const centeredX = pdfX - (sealSize / 2);
        const centeredY = pdfY - (sealSize / 2);
        
        // PDF Y=0 is at bottom, our normalized Y=0 is at top, so flip Y
        const finalX = centeredX;
        const finalY = pageHeight - centeredY - sealSize; // Flip Y
        
        console.log('Final position:', { x: finalX, y: finalY, size: sealSize });

        page.drawImage(embeddedImage, {
          x: finalX,
          y: finalY,
          width: sealSize,
          height: sealSize,
          rotate: degrees(position.rotation),
          opacity: 0.9,
        });
        
        console.log('✅ Seal placed');
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `sealed_${pdfFile.name}`;
      a.click();

      URL.revokeObjectURL(url);
      alert(`✅ ${sealPositions.length} seal(s) added!`);
      setSealPositions([]);
    } catch (error) {
      console.error('❌ Error:', error);
      alert(`Failed: ${error}`);
    } finally {
      setProcessing(false);
    }
  };

  const addPredefinedSeal = async (seal: typeof predefinedSeals[0]) => {
    if (!pdfFile) {
      alert('Please upload a PDF file first');
      return;
    }

    setProcessing(true);

    try {
      const sealImageBytes = await createTextSeal(seal.name, seal.emoji, seal.color);
      
      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const embeddedImage = await pdfDoc.embedPng(sealImageBytes);

      const page = pdfDoc.getPage(currentPage - 1);
      const { width, height } = page.getSize();

      const sealDims = embeddedImage.scale(0.3);
      
      page.drawImage(embeddedImage, {
        x: width - sealDims.width - 50,
        y: 50,
        width: sealDims.width,
        height: sealDims.height,
        opacity: 0.9,
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `sealed_${pdfFile.name}`;
      a.click();

      URL.revokeObjectURL(url);
      alert('Seal added successfully!');
    } catch (error) {
      console.error('Error adding seal:', error);
      alert('Failed to add seal to PDF. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <Stamp className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Add Seal to PDF
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Add official seals and stamps with precise positioning
            </p>
          </div>

          {/* Upload & Controls Section */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            {/* PDF Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                1. Upload PDF
              </label>
              {!pdfFile ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition"
                >
                  <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Click to upload</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={handlePDFUpload}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-2 flex-1 min-w-0">
                    <FileText className="w-6 h-6 text-blue-600 flex-shrink-0" />
                    <p className="font-semibold text-gray-900 dark:text-white text-sm truncate">{pdfFile.name}</p>
                  </div>
                  <button onClick={() => setPdfFile(null)} className="text-red-500 hover:text-red-700 ml-2">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Seal Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                2. Upload Seal
              </label>
              <div
                onClick={() => sealInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition"
              >
                {sealPreview ? (
                  <img src={sealPreview} alt="Seal" className="w-16 h-16 mx-auto object-contain" />
                ) : (
                  <>
                    <Stamp className="w-10 h-10 text-gray-400 mx-auto mb-1" />
                    <p className="text-xs text-gray-600 dark:text-gray-400">Upload image</p>
                  </>
                )}
                <input
                  ref={sealInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleSealUpload}
                  className="hidden"
                />
              </div>
            </div>

            {/* Seal Settings */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                3. Adjust Settings
              </label>
              <div className="space-y-2">
                <div>
                  <label className="text-xs text-gray-600 dark:text-gray-400">Rotation: {sealRotation}°</label>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={sealRotation}
                    onChange={(e) => setSealRotation(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600 dark:text-gray-400">Scale: {sealScale.toFixed(1)}x</label>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={sealScale}
                    onChange={(e) => setSealScale(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                4. Place & Download
              </label>
              <div className="space-y-2">
                {sealImage && pdfFile && (
                  <>
                    <button
                      onClick={() => setIsPlacingSeal(!isPlacingSeal)}
                      className={`w-full py-2 rounded-lg font-semibold text-sm transition flex items-center justify-center space-x-2 ${
                        isPlacingSeal
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      <Move className="w-4 h-4" />
                      <span>{isPlacingSeal ? 'Click PDF' : 'Place Seal'}</span>
                    </button>
                    
                    <button
                      onClick={async () => {
                        if (!pdfFile || !sealImage) return;
                        setProcessing(true);
                        try {
                          const arrayBuffer = await pdfFile.arrayBuffer();
                          const pdfDoc = await PDFDocument.load(arrayBuffer);
                          const sealArrayBuffer = await sealImage.arrayBuffer();
                          const sealImageBytes = new Uint8Array(sealArrayBuffer);
                          let embeddedImage;
                          if (sealImage.type === 'image/png') {
                            embeddedImage = await pdfDoc.embedPng(sealImageBytes);
                          } else {
                            embeddedImage = await pdfDoc.embedJpg(sealImageBytes);
                          }
                          const page = pdfDoc.getPage(0);
                          const { width, height } = page.getSize();
                          // Place seal at center of page
                          page.drawImage(embeddedImage, {
                            x: width / 2 - 50,
                            y: height / 2 - 50,
                            width: 100,
                            height: 100,
                            opacity: 0.9,
                          });
                          const pdfBytes = await pdfDoc.save();
                          const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `test_seal_${pdfFile.name}`;
                          a.click();
                          URL.revokeObjectURL(url);
                          alert('Test seal placed at center of first page!');
                        } catch (error) {
                          console.error('Error:', error);
                          alert('Test failed: ' + error);
                        } finally {
                          setProcessing(false);
                        }
                      }}
                      className="w-full py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-sm font-semibold"
                    >
                      🧪 Test (Center)
                    </button>
                  </>
                )}

                {sealPositions.length > 0 && (
                  <>
                    <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded text-xs">
                      <div className="font-semibold text-gray-900 dark:text-white mb-1">
                        Placed: {sealPositions.length}
                      </div>
                      <div className="max-h-16 overflow-y-auto space-y-1">
                        {sealPositions.map((pos) => (
                          <div key={pos.id} className="flex items-center justify-between bg-white dark:bg-gray-600 p-1 rounded">
                            <span className="text-gray-700 dark:text-gray-300">Page {pos.page}</span>
                            <button
                              onClick={() => removeSeal(pos.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={applySeals}
                      disabled={processing}
                      className="w-full py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 transition flex items-center justify-center space-x-2 text-sm"
                    >
                      {processing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          <span>Download</span>
                        </>
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Quick Seals */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Quick Seals (One-Click Apply)
            </label>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {predefinedSeals.map((seal, idx) => (
                <button
                  key={idx}
                  onClick={() => addPredefinedSeal(seal)}
                  disabled={!pdfFile || processing}
                  className="p-3 border-2 rounded-lg hover:shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ borderColor: seal.color }}
                >
                  <div className="text-2xl mb-1">{seal.emoji}</div>
                  <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">{seal.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* PDF Preview Section - Full Width Below */}
          {pdfFile && pdfPreview && (
            <div className="border-2 border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
              {/* Controls Bar */}
              <div className="bg-gray-100 dark:bg-gray-700 p-4 flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Page {currentPage} / {totalPages}
                  </span>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1 bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded text-sm disabled:opacity-50 hover:bg-gray-50 disabled:cursor-not-allowed"
                    >
                      ← Prev
                    </button>
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded text-sm disabled:opacity-50 hover:bg-gray-50 disabled:cursor-not-allowed"
                    >
                      Next →
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Zoom: {Math.round(zoom * 100)}%
                  </span>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => setZoom(Math.max(0.5, zoom - 0.25))}
                      className="p-2 bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-50"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setZoom(1)}
                      className="p-2 bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-50"
                      title="Reset Zoom"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setZoom(Math.min(2, zoom + 0.25))}
                      className="p-2 bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-50"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {isPlacingSeal && (
                  <div className="w-full lg:w-auto text-center">
                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 animate-pulse">
                      👆 Click on the PDF below to place your seal
                    </span>
                  </div>
                )}
              </div>

              <div 
                className="bg-gray-200 dark:bg-gray-700 p-4"
                style={{ height: '70vh', overflow: 'hidden' }}
              >
                <div 
                  className="h-full overflow-auto flex justify-center items-center"
                  style={{ scrollbarGutter: 'stable' }}
                >
                  <div
                    ref={previewRef}
                    onClick={handlePreviewClick}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    className={`relative bg-white shadow-lg ${isPlacingSeal ? 'cursor-crosshair' : 'cursor-default'}`}
                    style={{
                      width: `${800 * zoom}px`,
                      height: `${(pdfDimensions.height / pdfDimensions.width) * 800 * zoom}px`,
                    }}
                  >
                    <iframe
                      key={`page-${currentPage}`}
                      src={`${pdfPreview}#page=${currentPage}&toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                      className="block border-0"
                      style={{
                        width: '100%',
                        height: '100%',
                        pointerEvents: 'none',
                        margin: 0,
                        padding: 0,
                      }}
                      title="PDF Preview"
                    />
                    
                    {sealPositions
                      .filter(pos => pos.page === currentPage)
                      .map((pos) => {
                        // Convert normalized coordinates (0-1) to display coordinates
                        const previewWidth = 800 * zoom;
                        const previewHeight = (pdfDimensions.height / pdfDimensions.width) * 800 * zoom;
                        const displayX = pos.x * previewWidth;
                        const displayY = pos.y * previewHeight;
                        const displaySize = 50 * pos.scale * zoom;
                        
                        console.log('Displaying seal:', { 
                          id: pos.id, 
                          normalized: { x: pos.x, y: pos.y },
                          display: { x: displayX, y: displayY },
                          size: displaySize 
                        });
                        
                        return (
                        <div
                          key={pos.id}
                          className="absolute z-10 flex items-center justify-center cursor-move"
                          style={{
                            left: `${displayX - displaySize/2}px`,
                            top: `${displayY - displaySize/2}px`,
                            width: `${displaySize}px`,
                            height: `${displaySize}px`,
                          }}
                          onMouseDown={(e) => handleSealMouseDown(e, pos.id)}
                        >
                          <div 
                            className="w-full h-full border-4 border-blue-500 bg-blue-100 bg-opacity-40 rounded-full flex items-center justify-center hover:border-blue-600 transition"
                            style={{
                              transform: `rotate(${pos.rotation}deg)`,
                            }}
                          >
                            <Stamp className="w-8 h-8 text-blue-600" />
                          </div>
                          <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-blue-700 font-bold bg-white px-2 py-1 rounded shadow pointer-events-none whitespace-nowrap">
                            Seal {pos.id}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeSeal(pos.id);
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                            title="Remove seal"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2 text-sm">
              Quick Guide:
            </h3>
            <ol className="list-decimal list-inside space-y-1 text-blue-800 dark:text-blue-200 text-xs">
              <li>Upload PDF and seal image (or use quick seals)</li>
              <li>Adjust rotation and scale settings</li>
              <li>Click "Place Seal" and click on PDF where you want it</li>
              <li>Drag seals to reposition them precisely</li>
              <li>Use zoom controls for better visibility</li>
              <li>Add multiple seals if needed, then download</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
