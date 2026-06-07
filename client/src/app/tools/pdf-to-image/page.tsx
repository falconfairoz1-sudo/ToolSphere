import PDFToImage from '@/components/tools/PDFToImage';

export const metadata = {
  title: 'PDF to Image Converter - Convert PDF to PNG/JPG',
  description: 'Convert PDF pages to high-quality images. Support for PNG and JPG formats with quality control.',
};

export default function PDFToImagePage() {
  return <PDFToImage />;
}
