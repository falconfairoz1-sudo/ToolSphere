import ToolLayout from '@/components/ui/ToolLayout';
import TaxEstimator from '@/components/tools/TaxEstimator';

export default function TaxEstimatorPage() {
  return (
    <ToolLayout
      title="Tax Estimator"
      description="Estimate your income tax liability"
      icon="🧾"
      gradient="from-indigo-500 to-indigo-600"
    >
      <TaxEstimator />
    </ToolLayout>
  );
}
