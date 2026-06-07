import HashGenerator from '@/components/tools/HashGenerator';

export const metadata = {
  title: 'Hash Generator - ToolSphere',
  description: 'Generate MD5, SHA-256, and SHA-512 hashes',
};

export default function HashGeneratorPage() {
  return <HashGenerator />;
}
