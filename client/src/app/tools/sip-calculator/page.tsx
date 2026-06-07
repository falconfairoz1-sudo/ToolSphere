import ToolLayout from '@/components/ui/ToolLayout';
import SIPCalculator from '@/components/tools/SIPCalculator';

export default function SIPCalculatorPage() {
  return (
    <ToolLayout
      title="SIP Calculator"
      description="Calculate returns on your Systematic Investment Plan"
      icon="💹"
      gradient="from-purple-500 to-purple-600"
    >
      <SIPCalculator />
    </ToolLayout>
  );
}
