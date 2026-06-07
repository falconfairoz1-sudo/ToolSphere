import EmailValidator from '@/components/tools/EmailValidator';

export const metadata = {
  title: 'Email Validator - ToolSphere',
  description: 'Validate email addresses and check format',
};

export default function EmailValidatorPage() {
  return <EmailValidator />;
}
