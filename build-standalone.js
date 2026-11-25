'use strict';
// node build-standalone.js  →  dist/Ideaflux-Finance.html  (single file: UI + SQLite engine + logic, works offline)
const esbuild = require('esbuild'); const fs = require('fs'); const path = require('path');
const out = esbuild.buildSync({ entryPoints: ['browser/main.js'], bundle: true, minify: true, write: false, format: 'iife', platform: 'browser', target: 'es2020',
  external: ['crypto', 'exceljs'], legalComments: 'none' }).outputFiles[0].text;
const dist = path.join(__dirname, 'node_modules', 'sql.js', 'dist');
const sqljs = fs.readFileSync(path.join(dist, 'sql-wasm-browser.js'), 'utf8'), wasm = fs.readFileSync(path.join(dist, 'sql-wasm-browser.wasm')).toString('base64');
const css = fs.readFileSync('public/app.css', 'utf8'); let app = fs.readFileSync('public/app.js', 'utf8');
const logo = 'data:image/svg+xml;base64,' + fs.readFileSync('public/logo.svg').toString('base64');
app = app.split('logo.svg').join(logo);
const safe = (s) => s.replace(/<\/script/gi, '<\\/script');
const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>IDEAFLUX Finance</title>
<link rel="icon" href="${logo}"><link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>${css}</style></head><body><div id="app"></div><div id="toasts"></div><div id="modal-root"></div>
<script id="wasm-b64" type="text/plain">${wasm}</script>
<script>${safe(sqljs)}</script>
<script>${safe(out)}</script>
<script>${safe(app)}</script></body></html>`;
fs.mkdirSync('dist', { recursive: true }); fs.writeFileSync('dist/Ideaflux-Finance.html', html);
console.log('dist/Ideaflux-Finance.html', (html.length / 1024).toFixed(0) + ' KB');
