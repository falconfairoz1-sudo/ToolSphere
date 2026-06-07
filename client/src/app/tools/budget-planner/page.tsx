import ToolLayout from '@/components/ui/ToolLayout';
import BudgetPlanner from '@/components/tools/BudgetPlanner';

export default function BudgetPlannerPage() {
  return (
    <ToolLayout
      title="Budget Planner"
      description="Plan and track your monthly budget"
      icon="💼"
      gradient="from-emerald-500 to-emerald-600"
    >
      <BudgetPlanner />
    </ToolLayout>
  );
}
