import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';
import Tool from '../models/Tool';
import { tools } from '../data/tools';

dotenv.config();

// Configure DNS servers
dns.setServers(['1.1.1.1', '8.8.8.8']);

const importTools = async () => {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('MONGO_URI is not defined');
    }

    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Remove duplicates from tools array
    const seen = new Set<string>();
    const uniqueTools = tools.filter(tool => {
      if (seen.has(tool.id)) {
        console.log(`⚠️  Skipping duplicate: ${tool.id}`);
        return false;
      }
      seen.add(tool.id);
      return true;
    });

    console.log(`📋 Total tools in file: ${tools.length}`);
    console.log(`✅ Unique tools to import: ${uniqueTools.length}`);

    // Clear existing tools
    console.log('\n🗑️  Clearing existing tools...');
    const deleteResult = await Tool.deleteMany({});
    console.log(`✅ Cleared ${deleteResult.deletedCount} existing tools`);

    // Import tools
    console.log(`\n📥 Importing ${uniqueTools.length} tools...`);
    
    const imported = await Tool.insertMany(uniqueTools);
    console.log(`✅ Successfully imported ${imported.length} tools`);

    // Show some stats
    const trendingCount = await Tool.countDocuments({ trending: true });
    const newCount = await Tool.countDocuments({ new: true });
    const categories = await Tool.distinct('category');
    const totalCount = await Tool.countDocuments();
    
    console.log(`\n📊 Import Stats:`);
    console.log(`   Total tools: ${totalCount}`);
    console.log(`   Trending: ${trendingCount}`);
    console.log(`   New: ${newCount}`);
    console.log(`   Categories: ${categories.length}`);
    console.log(`   Categories: ${categories.join(', ')}`);

    await mongoose.connection.close();
    console.log('\n✅ Import completed successfully!');
    process.exit(0);
  } catch (error: any) {
    console.error('❌ Error importing tools:', error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

importTools();
