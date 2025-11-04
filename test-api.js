// Simple test to check if backend API is working
const http = require('http');

function testAPI(path) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 5001,
            path: path,
            method: 'GET'
        };

        const req = http.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                resolve({
                    status: res.statusCode,
                    data: data
                });
            });
        });

        req.on('error', (err) => {
            reject(err);
        });

        req.end();
    });
}

async function runTests() {
    console.log('Testing Backend API...\n');

    try {
        // Test health endpoint
        console.log('1. Testing /health');
        const health = await testAPI('/health');
        console.log(`Status: ${health.status}`);
        console.log(`Response: ${health.data}\n`);

        // Test households endpoint
        console.log('2. Testing /api/households');
        const households = await testAPI('/api/households');
        console.log(`Status: ${households.status}`);
        console.log(`Response: ${households.data.substring(0, 200)}...\n`);

    } catch (error) {
        console.error('Test failed:', error.message);
    }
}

runTests();