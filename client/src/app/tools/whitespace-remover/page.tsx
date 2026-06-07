import WhitespaceRemover from '@/components/tools/WhitespaceRemover';

export const metadata = {
  title: 'Whitespace Remover - Clean Extra Spaces',
  description: 'Remove extra whitespace, leading and trailing spaces from text',
};

export default function WhitespaceRemoverPage() {
  return <WhitespaceRemover />;
}
