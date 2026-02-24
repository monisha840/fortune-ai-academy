import fetch from 'node-fetch';

const url = 'https://azuvlfkcicwvovollwfk.supabase.co/rest/v1/leads';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6dXZsZmtjaWN3dm92b2xsd2ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0MDA2ODcsImV4cCI6MjA4NTk3NjY4N30.P-mYIAUUrI3kKPblAxDxDm914a0ViUAz2ymFXgdWp68';

async function rawTest() {
    console.log("--- RAW HTTP TEST ---");

    // 1. Try GET
    console.log("Testing GET...");
    const getRes = await fetch(url + '?limit=1', {
        headers: {
            'apikey': key,
            'Authorization': `Bearer ${key}`
        }
    });
    console.log("GET Status:", getRes.status, getRes.statusText);
    const getData = await getRes.json();
    console.log("GET Data:", JSON.stringify(getData));

    // 2. Try POST
    console.log("\nTesting POST...");
    const postRes = await fetch(url, {
        method: 'POST',
        headers: {
            'apikey': key,
            'Authorization': `Bearer ${key}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
        },
        body: JSON.stringify({ name: 'Raw Test' })
    });
    console.log("POST Status:", postRes.status, postRes.statusText);
    const postData = await postRes.text();
    console.log("POST Response Body:", postData);
}

rawTest();
