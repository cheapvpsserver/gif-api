import fetch from 'node-fetch';
export default async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.end();

  const form = new FormData();
  form.append('file', req.body);
  form.append('optimize', 3);
  form.append('lossy', 80);

  try {
    const html = await (await fetch('https://s3.ezgif.com/optimize', { method:'POST', body: form })).text();
    const url = 'https://s3.ezgif.com' + html.match(/<img id="output" src="([^"]+)"/)[1];
    res.json({ url });
  } catch {
    res.status(500).json({ error: '压缩失败' });
  }
};