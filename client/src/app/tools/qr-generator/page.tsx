import QRGenerator from '@/components/tools/QRGenerator';

export const metadata = {
  title: 'QR Code Generator - ToolSphere',
  description: 'Create QR codes for URLs, text, or any data instantly',
};

export default function QRGeneratorPage() {
  return <QRGenerator />;
}
