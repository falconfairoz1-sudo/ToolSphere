import { tools } from '../data/tools';

const removeDuplicates = () => {
  const seen = new Set<string>();
  const duplicates: string[] = [];
  const unique: any[] = [];

  tools.forEach((tool, index) => {
    if (seen.has(tool.id)) {
      duplicates.push(`${tool.id} (index ${index})`);
    } else {
      seen.add(tool.id);
      unique.push(tool);
    }
  });

  console.log(`📊 Total tools in file: ${tools.length}`);
  console.log(`✅ Unique tools: ${unique.length}`);
  console.log(`❌ Duplicates found: ${duplicates.length}`);
  
  if (duplicates.length > 0) {
    console.log('\n🔍 Duplicate IDs:');
    duplicates.forEach(dup => console.log(`   - ${dup}`));
  }

  console.log(`\n💡 After removing duplicates, you'll have ${unique.length} tools`);
};

removeDuplicates();
