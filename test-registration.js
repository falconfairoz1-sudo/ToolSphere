// Test registration endpoint
const http = require('http');

const testData = JSON.stringify({
  email: 'test@example.com',
  password: 'test123',
  name: 'Test User',
  role: 'user'
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/auth/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': testData.length
  }
};

console.log('Testing registration endpoint...');
console.log('Data:', JSON.parse(testData));

const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Response:', data);
    try {
      const response = JSON.parse(data);
      if (response.success) {
        console.log('✅ Registration successful!');
      } else {
        console.log('❌ Registration failed:', response.error);
      }
    } catch (e) {
      console.log('Response (raw):', data);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Error:', error.message);
});

req.write(testData);
req.end();
