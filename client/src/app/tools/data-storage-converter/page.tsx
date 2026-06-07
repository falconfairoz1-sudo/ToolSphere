import DataStorageConverter from '@/components/tools/DataStorageConverter';

export const metadata = {
  title: 'Data Storage Converter | Convert Bytes, KB, MB, GB, TB',
  description: 'Convert between different data storage units',
};

export default function DataStorageConverterPage() {
  return <DataStorageConverter />;
}
