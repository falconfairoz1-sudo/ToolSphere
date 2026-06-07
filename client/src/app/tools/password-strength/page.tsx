import PasswordStrength from '@/components/tools/PasswordStrength';

export const metadata = {
  title: 'Password Strength Checker - ToolSphere',
  description: 'Check how secure your password is',
};

export default function PasswordStrengthPage() {
  return <PasswordStrength />;
}
