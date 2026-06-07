'use client';

import { useState, useRef } from 'react';
import { Upload, Download, Crop, RotateCw, X } from 'lucide-react';

export default function ImageCropper() {
  const [image, setImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [cropArea, setCropArea] = useState({ x: 50, y: 50, width: 200, height: 200 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        setCroppedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = () => {
    if (!image || !imageRef.current) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imageRef.current;
    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;

    canvas.width = cropArea.width * scaleX;
    canvas.height = cropArea.height * scaleY;

    ctx.drawImage(
      img,
      cropArea.x * scaleX,
      cropArea.y * scaleY,
      cropArea.width * scaleX,
      cropArea.height * scaleY,
      0,
      0,
      canvas.width,
      canvas.height
    );

    setCroppedImage(canvas.toDataURL('image/png'));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - cropArea.x, y: e.clientY - cropArea.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left - dragStart.x, rect.width - cropArea.width));
    const y = Math.max(0, Math.min(e.clientY - rect.top - dragStart.y, rect.height - cropArea.height));
    setCropArea({ ...cropArea, x, y });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const downloadImage = () => {
    if (!croppedImage) return;
    const link = document.createElement('a');
    link.href = croppedImage;
    link.download = 'cropped-image.png';
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <Crop className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Image Cropper
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Crop images to custom dimensions
            </p>
          </div>

          <div className="mb-6">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center space-x-2"
            >
              <Upload className="w-5 h-5" />
              <span>Upload Image</span>
            </button>
          </div>

          {image && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Original Image</h3>
                <div
                  className="relative inline-block"
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
                  <img
                    ref={imageRef}
                    src={image}
                    alt="Original"
                    className="max-w-full h-auto rounded-lg"
                  />
                  <div
                    className="absolute border-4 border-green-500 cursor-move"
                    style={{
                      left: cropArea.x,
                      top: cropArea.y,
                      width: cropArea.width,
                      height: cropArea.height,
                    }}
                    onMouseDown={handleMouseDown}
                  >
                    <div className="absolute inset-0 bg-green-500 bg-opacity-20"></div>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <div>
                    <label className="text-sm text-gray-700 dark:text-gray-300">Width: {cropArea.width}px</label>
                    <input
                      type="range"
                      min="50"
                      max="500"
                      value={cropArea.width}
                      onChange={(e) => setCropArea({ ...cropArea, width: parseInt(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-700 dark:text-gray-300">Height: {cropArea.height}px</label>
                    <input
                      type="range"
                      min="50"
                      max="500"
                      value={cropArea.height}
                      onChange={(e) => setCropArea({ ...cropArea, height: parseInt(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                  <button
                    onClick={handleCrop}
                    className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center space-x-2"
                  >
                    <Crop className="w-5 h-5" />
                    <span>Crop Image</span>
                  </button>
                </div>
              </div>

              {croppedImage && (
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Cropped Image</h3>
                  <img src={croppedImage} alt="Cropped" className="max-w-full h-auto rounded-lg border-2 border-green-500" />
                  <button
                    onClick={downloadImage}
                    className="w-full mt-4 py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:from-green-700 hover:to-teal-700 transition flex items-center justify-center space-x-2"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download Cropped Image</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
