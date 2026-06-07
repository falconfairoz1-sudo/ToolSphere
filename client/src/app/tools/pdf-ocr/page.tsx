import PDFOCR from '@/components/tools/PDFOCR';

export const metadata = {
  title: 'OCR PDF - Convert Images to Searchable Text',
  description: 'Convert images in PDF to searchable text using OCR (Optical Character Recognition). Free PDF OCR tool.',
};

export default function PDFOCRPage() {
  return <PDFOCR />;
}
