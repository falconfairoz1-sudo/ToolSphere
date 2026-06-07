// Test tools API
const http = require('http');

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/tools',
  method: 'GET'
};

console.log('Testing tools API...');

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      console.log(`✅ Status: ${res.statusCode}`);
      console.log(`✅ Total tools: ${response.count}`);
      console.log(`✅ Trending tools: ${response.data.filter(t => t.trending).length}`);
      console.log(`✅ New tools: ${response.data.filter(t => t.new).length}`);
    } catch (e) {
      console.log('Response:', data);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Error:', error.message);
});

req.end();
