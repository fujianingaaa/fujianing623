// fjn 本地诗歌数据服务器：提供页面、db.json 中的 poems 数据，并代理 gitee 图片绕过反爬
const express = require('express');
const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const { URL } = require('url');

const app = express();
const PORT = 3004;
const fjn_rootDir = path.join(__dirname, '..');
const fjn_pagePath = path.join(fjn_rootDir, 'poems.html');
const fjn_dataPath = path.join(__dirname, 'db.json');

// fjn 1. 代理 gitee 图片 /img?url=<gitee_raw_url>
//    浏览器同源访问本服务器，服务器带上合法 UA 代拉 gitee 图片后原样转发
//    自动跟随 301/302 重定向（gitee raw 链接会返回 302）
function fjn_fetchImage(url, res, depth) {
  if (depth > 5) { res.status(502).send('重定向次数过多'); return; }

  let parsed;
  try { parsed = new URL(url); } catch (e) { res.status(400).send('url 格式错误'); return; }
  if (!['http:', 'https:'].includes(parsed.protocol)) {
    res.status(403).send('仅允许 http/https 协议'); return;
  }

  const lib = parsed.protocol === 'https:' ? https : http;
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    'Accept': 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
    'Referer': 'https://gitee.com/',
  };

  lib.get(url, { headers }, (giteeRes) => {
    // fjn 自动跟随 301/302
    if ([301, 302, 307, 308].includes(giteeRes.statusCode) && giteeRes.headers.location) {
      fjn_fetchImage(new URL(giteeRes.headers.location, url).href, res, depth + 1);
      return;
    }
    if (giteeRes.statusCode !== 200) {
      res.status(502).send('gitee 返回 ' + giteeRes.statusCode);
      return;
    }
    if (giteeRes.headers['content-type']) res.setHeader('Content-Type', giteeRes.headers['content-type']);
    giteeRes.pipe(res);
  }).on('error', (err) => {
    if (!res.headersSent) res.status(502).send('gitee 连接失败: ' + err.message);
  });
}

app.get('/img', (req, res) => {
  const target = req.query.url;
  if (!target) { res.status(400).send('缺少 url 参数'); return; }
  fjn_fetchImage(target, res, 0);
});

// fjn 2. 提供 poems 数据接口（每次请求重新读取 db.json）
app.get('/api/poems', (req, res) => {
  fs.readFile(fjn_dataPath, 'utf8', (error, data) => {
    if (error) {
      res.status(500).json({ message: '无法读取 db.json' });
      return;
    }

    try {
      const fjn_data = JSON.parse(data);
      // fjn 把每条 pic 字段改写为同源代理 URL
      const fjn_proxied = fjn_data.poems.map((p) => ({
        ...p,
        pic: '/img?url=' + encodeURIComponent(p.pic),
      }));
      res.json(fjn_proxied);
    } catch (parseError) {
      res.status(500).json({ message: 'db.json 格式错误' });
    }
  });
});

// fjn 3. 提供页面
app.get('/', (req, res) => { res.sendFile(fjn_pagePath); });
app.get('/poems.html', (req, res) => { res.sendFile(fjn_pagePath); });

app.listen(PORT, () => {
  console.log(`诗歌服务器已启动：http://localhost:${PORT}`);
  console.log(`  API:     http://localhost:${PORT}/api/poems`);
  console.log(`  图片代理: http://localhost:${PORT}/img?url=<gitee_raw_url>`);
});
