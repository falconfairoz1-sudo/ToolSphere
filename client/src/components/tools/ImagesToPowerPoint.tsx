'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Image, Download, X, CheckCircle, Loader2, Presentation, ArrowUp, ArrowDown, Trash2 } from 'lucide-react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

interface ImageFile {
  file: File;
  preview: string;
  order: number;
}

const ImagesToPowerPoint: React.FC = () => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [converting, setConverting] = useState(false);
  const [converted, setConverted] = useState(false);
  const [slideLayout, setSlideLayout] = useState<'one' | 'two' | 'four'>('one');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '4:3'>('16:9');

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      (file) => file.type.startsWith('image/')
    );
    addImages(droppedFiles);
  }, []);

  const addImages = (files: File[]) => {
    const newImages = files.map((file, index) => ({
      file,
      preview: URL.createObjectURL(file),
      order: images.length + index,
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addImages(Array.from(e.target.files));
    }
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(images[index].preview);
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const moveImage = (index: number, direction: 'up' | 'down') => {
    const newImages = [...images];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < images.length) {
      [newImages[index], newImages[targetIndex]] = [newImages[targetIndex], newImages[index]];
      setImages(newImages);
    }
  };

  const handleConvert = async () => {
    setConverting(true);
    await new Promise((resolve) => setTimeout(resolve, 2500));
    setConverted(true);
    setConverting(false);
  };

  const handleDownload = async () => {
    try {
      const zip = new JSZip();
      
      // Calculate images per slide
      const imagesPerSlide = slideLayout === 'one' ? 1 : slideLayout === 'two' ? 2 : 4;
      const slideWidth = aspectRatio === '16:9' ? 10 : 10;
      const slideHeight = aspectRatio === '16:9' ? 5.625 : 7.5;

      // Create PPTX structure
      // [Content_Types].xml
      zip.file('[Content_Types].xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Default Extension="jpeg" ContentType="image/jpeg"/>
  <Default Extension="jpg" ContentType="image/jpeg"/>
  <Default Extension="png" ContentType="image/png"/>
  <Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/>
  <Override PartName="/ppt/presProps.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presProps+xml"/>
  <Override PartName="/ppt/viewProps.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.viewProps+xml"/>
  <Override PartName="/ppt/tableStyles.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.tableStyles+xml"/>
${images.map((_, i) => `  <Override PartName="/ppt/slides/slide${Math.floor(i / imagesPerSlide) + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>`).filter((v, i, a) => a.indexOf(v) === i).join('\n')}
</Types>`);

      // _rels/.rels
      const relsFolder = zip.folder('_rels');
      relsFolder?.file('.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="ppt/presentation.xml"/>
</Relationships>`);

      // ppt folder
      const pptFolder = zip.folder('ppt');
      const pptRelsFolder = pptFolder?.folder('_rels');
      const slidesFolder = pptFolder?.folder('slides');
      const slidesRelsFolder = slidesFolder?.folder('_rels');
      const mediaFolder = pptFolder?.folder('media');

      // Add images to media folder
      for (let i = 0; i < images.length; i++) {
        const response = await fetch(images[i].preview);
        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();
        const ext = images[i].file.type.split('/')[1];
        mediaFolder?.file(`image${i + 1}.${ext}`, arrayBuffer);
      }

      // Create slides
      const totalSlides = Math.ceil(images.length / imagesPerSlide);
      let slideRels = '';
      
      for (let slideNum = 0; slideNum < totalSlides; slideNum++) {
        const slideImages = images.slice(slideNum * imagesPerSlide, (slideNum + 1) * imagesPerSlide);
        
        // Create slide XML
        let slideXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld>
    <p:spTree>
      <p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>
      <p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>`;

        slideImages.forEach((img, idx) => {
          const globalIdx = slideNum * imagesPerSlide + idx;
          const ext = img.file.type.split('/')[1];
          let x, y, w, h;
          
          if (imagesPerSlide === 1) {
            x = 914400; y = 914400; w = 7315200; h = 5029200;
          } else if (imagesPerSlide === 2) {
            x = idx === 0 ? 457200 : 4800000;
            y = 914400; w = 3657600; h = 4114800;
          } else {
            const row = Math.floor(idx / 2);
            const col = idx % 2;
            x = col === 0 ? 457200 : 4800000;
            y = row === 0 ? 457200 : 3200000;
            w = 3657600; h = 2286000;
          }

          slideXml += `
      <p:pic>
        <p:nvPicPr>
          <p:cNvPr id="${idx + 2}" name="Image ${globalIdx + 1}"/>
          <p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr>
          <p:nvPr/>
        </p:nvPicPr>
        <p:blipFill>
          <a:blip r:embed="rId${idx + 1}"/>
          <a:stretch><a:fillRect/></a:stretch>
        </p:blipFill>
        <p:spPr>
          <a:xfrm><a:off x="${x}" y="${y}"/><a:ext cx="${w}" cy="${h}"/></a:xfrm>
          <a:prstGeom prst="rect"><a:avLst/></a:prstGeom>
        </p:spPr>
      </p:pic>`;
        });

        slideXml += `
    </p:spTree>
  </p:cSld>
  <p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr>
</p:sld>`;

        slidesFolder?.file(`slide${slideNum + 1}.xml`, slideXml);

        // Create slide rels
        let slideRelsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">`;
        
        slideImages.forEach((img, idx) => {
          const globalIdx = slideNum * imagesPerSlide + idx;
          const ext = img.file.type.split('/')[1];
          slideRelsXml += `
  <Relationship Id="rId${idx + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/image${globalIdx + 1}.${ext}"/>`;
        });
        
        slideRelsXml += `
</Relationships>`;
        
        slidesRelsFolder?.file(`slide${slideNum + 1}.xml.rels`, slideRelsXml);
        
        slideRels += `  <Relationship Id="rId${slideNum + 2}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide${slideNum + 1}.xml"/>\n`;
      }

      // ppt/_rels/presentation.xml.rels
      pptRelsFolder?.file('presentation.xml.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/tableStyles" Target="tableStyles.xml"/>
${slideRels}</Relationships>`);

      // ppt/presentation.xml
      let presentationXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:presentation xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:sldSz cx="${slideWidth * 914400}" cy="${slideHeight * 914400}"/>
  <p:notesSz cx="6858000" cy="9144000"/>
  <p:sldIdLst>`;
      
      for (let i = 0; i < totalSlides; i++) {
        presentationXml += `
    <p:sldId id="${256 + i}" r:id="rId${i + 2}"/>`;
      }
      
      presentationXml += `
  </p:sldIdLst>
</p:presentation>`;
      
      pptFolder?.file('presentation.xml', presentationXml);
      pptFolder?.file('presProps.xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><p:presProps xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"/>`);
      pptFolder?.file('viewProps.xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><p:viewPr xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"/>`);
      pptFolder?.file('tableStyles.xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><a:tblStyleLst xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" def="{5C22544A-7EE6-4342-B048-85BDC9FD1C3A}"/>`);

      // Generate and download
      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, `presentation-${Date.now()}.pptx`);

      // Show success message
      setTimeout(() => {
        alert('✅ PowerPoint presentation downloaded successfully!\n\nYour .pptx file contains all ' + images.length + ' images.');
        setConverted(false);
        setImages([]);
      }, 500);

    } catch (error) {
      console.error('Error creating presentation:', error);
      alert('❌ Error creating presentation. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Image className="w-12 h-12 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800">
              Images to PowerPoint
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Create professional presentations from your images
          </p>
        </motion.div>

        {/* Upload Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-6"
        >
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
          />
          <label
            htmlFor="file-upload"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="block border-3 border-dashed border-blue-300 rounded-xl p-12 text-center hover:border-blue-500 transition-colors cursor-pointer bg-blue-50/50"
          >
            <Upload className="w-16 h-16 text-blue-600 mx-auto mb-4 pointer-events-none" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2 pointer-events-none">
              Drop images here
            </h3>
            <p className="text-gray-600 mb-4 pointer-events-none">
              or click to browse (PNG, JPG, GIF, etc.)
            </p>
            <span className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all pointer-events-none">
              Select Images
            </span>
          </label>

          {/* Settings */}
          {images.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-6 p-6 bg-gray-50 rounded-xl"
            >
              <h3 className="font-bold text-gray-800 mb-4">Presentation Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Images per Slide
                  </label>
                  <select
                    value={slideLayout}
                    onChange={(e) => setSlideLayout(e.target.value as any)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="one">1 Image per Slide</option>
                    <option value="two">2 Images per Slide</option>
                    <option value="four">4 Images per Slide</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Aspect Ratio
                  </label>
                  <select
                    value={aspectRatio}
                    onChange={(e) => setAspectRatio(e.target.value as any)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="16:9">16:9 (Widescreen)</option>
                    <option value="4:3">4:3 (Standard)</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Image List */}
        {images.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-6"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Images ({images.length})
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {images.map((img, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative group"
                >
                  <img
                    src={img.preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                    <button
                      onClick={() => moveImage(index, 'up')}
                      disabled={index === 0}
                      className="p-2 bg-white rounded-lg hover:bg-gray-100 disabled:opacity-50"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => moveImage(index, 'down')}
                      disabled={index === images.length - 1}
                      className="p-2 bg-white rounded-lg hover:bg-gray-100 disabled:opacity-50"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeImage(index)}
                      className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                    {index + 1}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Convert Button */}
            <button
              onClick={handleConvert}
              disabled={converting || images.length === 0}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg flex items-center justify-center gap-2"
            >
              {converting ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Creating Presentation...
                </>
              ) : (
                <>
                  <Presentation className="w-6 h-6" />
                  Create PowerPoint
                </>
              )}
            </button>
          </motion.div>
        )}

        {/* Download Section */}
        {converted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-6"
          >
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Presentation Created!
              </h3>
              <p className="text-gray-600 mb-6">
                Your PowerPoint presentation with {images.length} image{images.length > 1 ? 's' : ''} is ready
              </p>
              <button 
                onClick={handleDownload}
                className="px-8 py-4 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-700 transition-colors flex items-center gap-2 mx-auto"
              >
                <Download className="w-6 h-6" />
                Download Presentation
              </button>
            </div>
          </motion.div>
        )}

        {/* Features */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Image className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Multiple Layouts</h3>
            <p className="text-sm text-gray-600">
              Choose 1, 2, or 4 images per slide
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ArrowUp className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Reorder Images</h3>
            <p className="text-sm text-gray-600">
              Arrange images in any order
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Presentation className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Professional Output</h3>
            <p className="text-sm text-gray-600">
              High-quality PPTX format
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagesToPowerPoint;
