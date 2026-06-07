// Check tools count in database
const mongoose = require('mongoose');
require('dotenv').config({ path: './server/.env' });

const checkTools = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const Tool = mongoose.model('Tool', new mongoose.Schema({}, { strict: false }));
    
    const totalCount = await Tool.countDocuments();
    console.log(`📊 Total tools in database: ${totalCount}`);
    
    const categories = await Tool.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    console.log('\n📁 Tools by category:');
    categories.forEach(cat => {
      console.log(`   ${cat._id}: ${cat.count}`);
    });
    
    const trending = await Tool.countDocuments({ trending: true });
    const newTools = await Tool.countDocuments({ new: true });
    console.log(`\n🔥 Trending: ${trending}`);
    console.log(`✨ New: ${newTools}`);
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

checkTools();
