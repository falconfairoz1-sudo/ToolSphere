'use client';

import { useState, useRef } from 'react';
import { Upload, FileText, Download, X, PenTool, Image as ImageIcon, Move, Trash2, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';

interface SignaturePosition {
  x: number;
  y: number;
  page: number;
  width: number;
  height: number;
  id: number;
}

export default function PDFSignature() {
  const [file, setFile] = useState<File | null>(null);
  const [signatureImage, setSignatureImage] = useState<File | null>(null);
  const [signature, setSignature] = useState<string>('');
  const [signaturePreview, setSignaturePreview] = useState<string>('');
  const [isDrawing, setIsDrawing] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [signatureMode, setSignatureMode] = useState<'draw' | 'upload'>('draw');
  const [pdfDataUrl, setPdfDataUrl] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pdfDimensions, setPdfDimensions] = useState({ width: 612, height: 792 }); // Default Letter size
  const [signaturePositions, setSignaturePositions] = useState<SignaturePosition[]>([]);
  const [isPlacingSignature, setIsPlacingSignature] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [draggingSignatureId, setDraggingSignatureId] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [nextSignatureId, setNextSignatureId] = useState(1);
  const [signatureWidth, setSignatureWidth] = useState(150); // Default width in PDF points
  const [signatureHeight, setSignatureHeight] = useState(50); // Default height in PDF points
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const signatureInputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      const arrayBuffer = await selectedFile.arrayBuffer();
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
      
      const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setPdfDataUrl(url);
    }
  };

  const handleSignatureImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSignatureImage(file);
      const url = URL.createObjectURL(file);
      setSignaturePreview(url);
      setSignature(url);
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      setSignature(canvas.toDataURL());
    }
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignature('');
  };

  const handlePreviewClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (draggingSignatureId !== null) return;
    if (!isPlacingSignature || !signature) return;

    const rect = e.currentTarget.getBoundingClientRect();
    
    // Get click position relative to preview container
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    
    // Preview is 800px wide, scaled by zoom
    const previewWidth = 800 * zoom;
    const previewHeight = (pdfDimensions.height / pdfDimensions.width) * 800 * zoom;
    
    // Convert to PDF coordinates
    const pdfX = (clickX / previewWidth) * pdfDimensions.width;
    const pdfY = (clickY / previewHeight) * pdfDimensions.height;
    
    console.log('Click:', { clickX, clickY, previewWidth, previewHeight });
    console.log('PDF coords:', { pdfX, pdfY });

    const newPosition: SignaturePosition = {
      x: pdfX,
      y: pdfY,
      page: currentPage,
      width: signatureWidth, // Use adjustable width
      height: signatureHeight, // Use adjustable height
      id: nextSignatureId,
    };

    setSignaturePositions([...signaturePositions, newPosition]);
    setNextSignatureId(nextSignatureId + 1);
    setIsPlacingSignature(false);
  };

  const handleSignatureMouseDown = (e: React.MouseEvent, signatureId: number) => {
    e.stopPropagation();
    const signature = signaturePositions.find(s => s.id === signatureId);
    if (!signature) return;

    setDraggingSignatureId(signatureId);
    const rect = previewRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    setDragOffset({
      x: e.clientX - rect.left - signature.x,
      y: e.clientY - rect.top - signature.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (draggingSignatureId === null || !previewRef.current) return;

    const rect = previewRef.current.getBoundingClientRect();
    
    // Calculate new position in display coordinates
    const displayX = e.clientX - rect.left - dragOffset.x;
    const displayY = e.clientY - rect.top - dragOffset.y;
    
    // Preview is 800px wide, scaled by zoom
    const previewWidth = 800 * zoom;
    const previewHeight = (pdfDimensions.height / pdfDimensions.width) * 800 * zoom;
    
    // Convert to PDF coordinates
    const pdfX = (displayX / previewWidth) * pdfDimensions.width;
    const pdfY = (displayY / previewHeight) * pdfDimensions.height;
    
    // Clamp to PDF bounds
    const clampedX = Math.max(0, Math.min(pdfX, pdfDimensions.width));
    const clampedY = Math.max(0, Math.min(pdfY, pdfDimensions.height));

    setSignaturePositions(signaturePositions.map(sig =>
      sig.id === draggingSignatureId
        ? { ...sig, x: clampedX, y: clampedY }
        : sig
    ));
  };

  const handleMouseUp = () => {
    setDraggingSignatureId(null);
  };

  const removeSignature = (id: number) => {
    setSignaturePositions(signaturePositions.filter(sig => sig.id !== id));
  };

  const addSignature = async () => {
    if (!file || !signature) {
      alert('Please upload a PDF and create/upload your signature');
      return;
    }

    if (signaturePositions.length === 0) {
      alert('Please click on the PDF preview to place your signature');
      return;
    }

    setProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      let signatureBytes: ArrayBuffer;
      if (signatureMode === 'upload' && signatureImage) {
        signatureBytes = await signatureImage.arrayBuffer();
      } else {
        const signatureBlob = await fetch(signature);
        signatureBytes = await signatureBlob.arrayBuffer();
      }

      const signatureImg = await pdfDoc.embedPng(signatureBytes);

      for (const position of signaturePositions) {
        const page = pdfDoc.getPage(position.page - 1);
        const { width: pageWidth, height: pageHeight } = page.getSize();

        console.log('=== Placing Signature ===');
        console.log('PDF Page:', { width: pageWidth, height: pageHeight });
        console.log('Signature position (PDF coords):', { x: position.x, y: position.y });
        
        // Position is already in PDF coordinates!
        // Just need to flip Y axis (PDF Y=0 is bottom, our Y=0 is top)
        const sigWidth = position.width;
        const sigHeight = position.height;
        
        const finalX = position.x - (sigWidth / 2); // Center on click point
        const finalY = pageHeight - position.y - (sigHeight / 2); // Flip Y and center
        
        console.log('Final position:', { x: finalX, y: finalY, width: sigWidth, height: sigHeight });

        page.drawImage(signatureImg, {
          x: finalX,
          y: finalY,
          width: sigWidth,
          height: sigHeight,
        });
        
        console.log('✅ Signature placed');
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `${file.name.replace('.pdf', '')}_signed.pdf`;
      link.click();

      URL.revokeObjectURL(url);
      alert(`✅ ${signaturePositions.length} signature(s) added!`);
      setSignaturePositions([]);
    } catch (error) {
      console.error('❌ Error:', error);
      alert(`Failed: ${error}`);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <PenTool className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              PDF Signature
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Add your signature to PDF documents with precise positioning
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                1. Upload PDF
              </label>
              {!file ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-purple-500 transition"
                >
                  <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Click to upload</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-2 flex-1 min-w-0">
                    <FileText className="w-6 h-6 text-purple-600 flex-shrink-0" />
                    <p className="font-semibold text-gray-900 dark:text-white text-sm truncate">{file.name}</p>
                  </div>
                  <button onClick={() => setFile(null)} className="text-red-500 hover:text-red-700 ml-2">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                2. Create Signature
              </label>
              <div className="flex space-x-2 mb-3">
                <button
                  onClick={() => setSignatureMode('draw')}
                  className={`flex-1 py-2 px-3 rounded-lg font-semibold text-sm transition ${
                    signatureMode === 'draw'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <PenTool className="w-4 h-4 inline mr-1" />
                  Draw
                </button>
                <button
                  onClick={() => setSignatureMode('upload')}
                  className={`flex-1 py-2 px-3 rounded-lg font-semibold text-sm transition ${
                    signatureMode === 'upload'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <ImageIcon className="w-4 h-4 inline mr-1" />
                  Upload
                </button>
              </div>

              {signatureMode === 'draw' ? (
                <div>
                  <canvas
                    ref={canvasRef}
                    width={300}
                    height={100}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-lg cursor-crosshair bg-white"
                  />
                  <button
                    onClick={clearSignature}
                    className="mt-2 w-full px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded text-sm hover:bg-gray-300 transition"
                  >
                    Clear
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => signatureInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center cursor-pointer hover:border-purple-500 transition"
                >
                  {signaturePreview ? (
                    <img src={signaturePreview} alt="Signature" className="max-h-20 mx-auto" />
                  ) : (
                    <>
                      <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-1" />
                      <p className="text-xs text-gray-600 dark:text-gray-400">Upload image</p>
                    </>
                  )}
                  <input
                    ref={signatureInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleSignatureImageUpload}
                    className="hidden"
                  />
                </div>
              )}

              {/* Size Adjustment Controls */}
              <div className="mt-3 space-y-2">
                <div>
                  <label className="text-xs text-gray-600 dark:text-gray-400 flex items-center justify-between">
                    <span>Width: {signatureWidth}px</span>
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="400"
                    step="10"
                    value={signatureWidth}
                    onChange={(e) => setSignatureWidth(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600 dark:text-gray-400 flex items-center justify-between">
                    <span>Height: {signatureHeight}px</span>
                  </label>
                  <input
                    type="range"
                    min="20"
                    max="200"
                    step="5"
                    value={signatureHeight}
                    onChange={(e) => setSignatureHeight(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                3. Place & Download
              </label>
              <div className="space-y-2">
                {signature && file && (
                  <button
                    onClick={() => setIsPlacingSignature(!isPlacingSignature)}
                    className={`w-full py-2 rounded-lg font-semibold text-sm transition flex items-center justify-center space-x-2 ${
                      isPlacingSignature
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-purple-600 text-white hover:bg-purple-700'
                    }`}
                  >
                    <Move className="w-4 h-4" />
                    <span>{isPlacingSignature ? 'Click PDF Below' : 'Place Signature'}</span>
                  </button>
                )}

                {signaturePositions.length > 0 && (
                  <>
                    <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded text-xs max-h-24 overflow-y-auto">
                      <div className="font-semibold text-gray-900 dark:text-white mb-1">
                        Placed: {signaturePositions.length}
                      </div>
                      {signaturePositions.map((pos) => (
                        <div key={pos.id} className="flex items-center justify-between bg-white dark:bg-gray-600 p-1 rounded mb-1">
                          <span className="text-gray-700 dark:text-gray-300">Page {pos.page}</span>
                          <button
                            onClick={() => removeSignature(pos.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={addSignature}
                      disabled={processing}
                      className="w-full py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 transition flex items-center justify-center space-x-2 text-sm"
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

          {file && pdfDataUrl && (
            <div className="border-2 border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
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

                {isPlacingSignature && (
                  <div className="w-full lg:w-auto text-center">
                    <span className="text-sm font-semibold text-purple-600 dark:text-purple-400 animate-pulse">
                      👆 Click on the PDF below to place your signature
                    </span>
                  </div>
                )}
              </div>

              <div className="bg-gray-200 dark:bg-gray-700 p-4" style={{ height: '70vh', overflow: 'hidden' }}>
                <div className="h-full overflow-auto flex justify-center items-center" style={{ scrollbarGutter: 'stable' }}>
                  <div
                    ref={previewRef}
                    onClick={handlePreviewClick}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    className={`relative bg-white shadow-lg ${isPlacingSignature ? 'cursor-crosshair' : 'cursor-default'}`}
                    style={{
                      width: `${800 * zoom}px`,
                      height: `${(pdfDimensions.height / pdfDimensions.width) * 800 * zoom}px`,
                    }}
                  >
                    <iframe
                      key={`page-${currentPage}`}
                      src={`${pdfDataUrl}#page=${currentPage}&toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
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
                    
                    {signaturePositions
                      .filter(pos => pos.page === currentPage)
                      .map((pos) => {
                        // Convert PDF coordinates to display coordinates
                        const previewWidth = 800 * zoom;
                        const previewHeight = (pdfDimensions.height / pdfDimensions.width) * 800 * zoom;
                        const displayX = (pos.x / pdfDimensions.width) * previewWidth;
                        const displayY = (pos.y / pdfDimensions.height) * previewHeight;
                        const displayWidth = (pos.width / pdfDimensions.width) * previewWidth;
                        const displayHeight = (pos.height / pdfDimensions.height) * previewHeight;
                        
                        return (
                        <div
                          key={pos.id}
                          className="absolute z-10 cursor-move"
                          style={{
                            left: `${displayX - displayWidth/2}px`,
                            top: `${displayY - displayHeight/2}px`,
                            width: `${displayWidth}px`,
                            height: `${displayHeight}px`,
                          }}
                          onMouseDown={(e) => handleSignatureMouseDown(e, pos.id)}
                        >
                          <div className="w-full h-full border-4 border-purple-500 bg-purple-100 bg-opacity-40 rounded flex items-center justify-center hover:border-purple-600 transition">
                            <PenTool className="w-6 h-6 text-purple-600" />
                          </div>
                          <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-purple-700 font-bold bg-white px-2 py-1 rounded shadow whitespace-nowrap pointer-events-none">
                            Signature {pos.id}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeSignature(pos.id);
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                            title="Remove signature"
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

          <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <h3 className="font-semibold text-purple-900 dark:text-purple-300 mb-2 text-sm">
              Quick Guide:
            </h3>
            <ol className="list-decimal list-inside space-y-1 text-purple-800 dark:text-purple-200 text-xs">
              <li>Upload your PDF document</li>
              <li>Draw or upload your signature</li>
              <li>Adjust signature size using the width and height sliders</li>
              <li>Click "Place Signature" and then click on the PDF where you want it</li>
              <li>Drag signatures to reposition them precisely</li>
              <li>Use zoom controls for better visibility</li>
              <li>Add multiple signatures if needed, then download</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
