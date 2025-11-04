// Simple test script to check backend API
import fetch from 'node-fetch';

const BACKEND_URL = 'http://localhost:5000';

async function testBackend() {
    console.log('Testing backend API...');
    
    try {
        // Test health endpoint
        console.log('\n1. Testing health endpoint...');
        const healthResponse = await fetch(`${BACKEND_URL}/health`);
        console.log('Health status:', healthResponse.status);
        
        // Test households endpoint
        console.log('\n2. Testing households endpoint...');
        const householdsResponse = await fetch(`${BACKEND_URL}/api/households`);
        console.log('Households status:', householdsResponse.status);
        
        if (householdsResponse.ok) {
            const households = await householdsResponse.json();
            console.log('Households count:', households.length);
            console.log('First household:', households[0]);
        } else {
            const error = await householdsResponse.text();
            console.log('Households error:', error);
        }
        
        // Test collection logs endpoint
        console.log('\n3. Testing collection logs endpoint...');
        const logsResponse = await fetch(`${BACKEND_URL}/api/collection-logs`);
        console.log('Logs status:', logsResponse.status);
        
        if (logsResponse.ok) {
            const logs = await logsResponse.json();
            console.log('Logs count:', logs.length);
        } else {
            const error = await logsResponse.text();
            console.log('Logs error:', error);
        }
        
    } catch (error) {
        console.error('Test failed:', error.message);
    }
}

testBackend();