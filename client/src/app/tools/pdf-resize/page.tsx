import PDFResize from '@/components/tools/PDFResize';

export const metadata = {
  title: 'Resize PDF Pages - Free PDF Resizing Tool',
  description: 'Resize PDF pages to different dimensions (A4, Letter, Legal, etc.). Free PDF resizing tool.',
};

export default function PDFResizePage() {
  return <PDFResize />;
}
