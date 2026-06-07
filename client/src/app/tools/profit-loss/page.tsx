import ToolLayout from '@/components/ui/ToolLayout';
import ProfitLossCalculator from '@/components/tools/ProfitLossCalculator';

export default function ProfitLossCalculatorPage() {
  return (
    <ToolLayout
      title="Profit/Loss Calculator"
      description="Calculate profit or loss on your transactions"
      icon="📈"
      gradient="from-blue-500 to-blue-600"
    >
      <ProfitLossCalculator />
    </ToolLayout>
  );
}
