import InvoiceGenerator from '@/components/tools/InvoiceGenerator';

export const metadata = {
  title: 'Invoice Generator - Finance Tools | ToolHub',
  description: 'Create professional invoices with GST and download as PDF',
};

export default function InvoiceGeneratorPage() {
  return <InvoiceGenerator />;
}
