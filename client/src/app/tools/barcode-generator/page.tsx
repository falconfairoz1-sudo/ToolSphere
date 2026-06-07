import BarcodeGenerator from '@/components/tools/BarcodeGenerator';

export const metadata = {
  title: 'Barcode Generator - Create Barcodes Online',
  description: 'Generate barcodes in multiple formats including CODE128, EAN13, UPC, and CODE39',
};

export default function BarcodeGeneratorPage() {
  return <BarcodeGenerator />;
}
