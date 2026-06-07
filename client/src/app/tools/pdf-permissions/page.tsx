import PDFPermissions from '@/components/tools/PDFPermissions';

export const metadata = {
  title: 'PDF Permissions - Restrict Print and Edit',
  description: 'Add permissions to restrict printing, editing, and copying in PDF documents. Free PDF permission tool.',
};

export default function PDFPermissionsPage() {
  return <PDFPermissions />;
}
