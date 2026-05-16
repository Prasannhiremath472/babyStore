const https = require('https');

const fetchUrl = (url) => new Promise((resolve, reject) => {
  https.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120',
      'Accept': 'text/html,*/*',
    },
    timeout: 12000,
  }, (res) => {
    let data = '';
    res.on('data', d => data += d);
    res.on('end', () => resolve({ status: res.statusCode, body: data }));
  }).on('error', reject).on('timeout', function() { this.destroy(); reject(new Error('timeout')); });
});

async function test() {
  const q = encodeURIComponent('AUTOFLOW baby feeder bottle india');
  const url = 'https://www.flipkart.com/search?q=' + q;
  console.log('Searching:', url);
  const res = await fetchUrl(url);
  console.log('Status:', res.status);
  const pattern = /https:\/\/rukminim\d+\.flixcart\.com\/image\/\d+\/\d+\/[a-zA-Z0-9\/_-]+\.(jpeg|jpg|png|webp)/g;
  const matches = res.body.match(pattern);
  console.log('Images found:', matches ? matches.length : 0);
  if (matches) {
    matches.slice(0, 3).forEach(function(u) { console.log('  ', u); });
  }

  // Test 2: Pampers
  const q2 = encodeURIComponent('PAMPERS PANTS M diapers india');
  const res2 = await fetchUrl('https://www.flipkart.com/search?q=' + encodeURIComponent(q2));
  const m2 = res2.body.match(pattern);
  console.log('\nPampers search status:', res2.status, '| images:', m2 ? m2.length : 0);
  if (m2) console.log('  ', m2[0]);
}

test().catch(console.error);
