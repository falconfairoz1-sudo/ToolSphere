import ToolLayout from '@/components/ui/ToolLayout';
import LoanCalculator from '@/components/tools/LoanCalculator';

export default function LoanCalculatorPage() {
  return (
    <ToolLayout
      title="Loan Calculator"
      description="Calculate your loan payments and total interest"
      icon="🏦"
      gradient="from-yellow-500 to-yellow-600"
    >
      <LoanCalculator />
    </ToolLayout>
  );
}
