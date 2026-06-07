import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';
import Tool from '../models/Tool';

dotenv.config();

// Configure DNS servers
dns.setServers(['1.1.1.1', '8.8.8.8']);

const removeVideoTools = async () => {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('MONGO_URI is not defined');
    }

    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Check for video category tools
    console.log('\n📋 Checking for video tools...');
    const videoTools = await Tool.find({ category: 'video' });
    console.log(`Found ${videoTools.length} video tools`);

    if (videoTools.length > 0) {
      console.log('\n🗑️  Video tools to be removed:');
      videoTools.forEach(tool => {
        console.log(`   - ${tool.name} (${tool.id})`);
      });

      // Remove video tools
      console.log('\n🗑️  Removing video tools...');
      const deleteResult = await Tool.deleteMany({ category: 'video' });
      console.log(`✅ Removed ${deleteResult.deletedCount} video tools`);
    } else {
      console.log('✅ No video tools found in database');
    }

    // Show updated stats
    const totalCount = await Tool.countDocuments();
    const categories = await Tool.distinct('category');
    
    console.log(`\n📊 Updated Stats:`);
    console.log(`   Total tools: ${totalCount}`);
    console.log(`   Categories: ${categories.length}`);
    console.log(`   Categories: ${categories.sort().join(', ')}`);

    await mongoose.connection.close();
    console.log('\n✅ Operation completed successfully!');
    process.exit(0);
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

removeVideoTools();
