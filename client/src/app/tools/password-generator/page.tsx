import PasswordGenerator from '@/components/tools/PasswordGenerator';

export const metadata = {
  title: 'Password Generator - ToolSphere',
  description: 'Generate secure random passwords with customizable options',
};

export default function PasswordGeneratorPage() {
  return <PasswordGenerator />;
}
