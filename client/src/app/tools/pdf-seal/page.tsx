'use client';

import dynamic from 'next/dynamic';

const PDFSeal = dynamic(() => import('@/components/tools/PDFSeal'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Loading PDF Seal Tool...</p>
      </div>
    </div>
  ),
});

export default function PDFSealPage() {
  return <PDFSeal />;
}
