// Simple test to check if server is running
const http = require('http');

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/health',
  method: 'GET'
};

console.log('Testing server connection...');

const req = http.request(options, (res) => {
  console.log(`✅ Server is running! Status: ${res.statusCode}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Response:', data);
  });
});

req.on('error', (error) => {
  console.error('❌ Server is not running or not accessible:', error.message);
  console.log('\nTo start the server, run:');
  console.log('  cd server');
  console.log('  npm run dev');
});

req.end();
