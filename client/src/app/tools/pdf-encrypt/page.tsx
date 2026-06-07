import PDFEncrypt from '@/components/tools/PDFEncrypt';

export const metadata = {
  title: 'Encrypt PDF - Strong PDF Encryption',
  description: 'Encrypt PDF documents with AES-128 or AES-256 encryption. Free, fast, and secure PDF encryption tool.',
};

export default function PDFEncryptPage() {
  return <PDFEncrypt />;
}
