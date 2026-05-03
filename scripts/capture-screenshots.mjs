/**
 * Builds the app, serves production bundle briefly, writes PNGs to public/screenshots/.
 * Requires: npm install && npx playwright install chromium
 * Usage: npm run screenshots
 */
import { execSync, spawn } from 'node:child_process';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
process.chdir(root);

const PORT = process.env.SCREENSHOT_PORT || '3100';
const base = `http://127.0.0.1:${PORT}`;
const outDir = path.join(root, 'public', 'screenshots');

function waitForHttp(url, ms = 120000) {
  const deadline = Date.now() + ms;
  return new Promise((resolve, reject) => {
    function tryOnce() {
      http
        .get(url, (res) => {
          res.resume();
          resolve();
        })
        .on('error', () => {
          if (Date.now() > deadline) reject(new Error(`Timeout waiting for ${url}`));
          else setTimeout(tryOnce, 400);
        });
    }
    tryOnce();
  });
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });

  console.log('Building…');
  execSync('npm run build', { stdio: 'inherit', cwd: root });

  const proc = spawn('npx', ['next', 'start', '-p', PORT], {
    cwd: root,
    stdio: 'pipe',
    env: { ...process.env, PORT },
  });

  try {
    await waitForHttp(base);
    await new Promise((r) => setTimeout(r, 1000));

    const browser = await chromium.launch();
    const page = await browser.newPage({
      viewport: { width: 1920, height: 1080 },
      deviceScaleFactor: 1,
    });

    await page.goto(`${base}/`, { waitUntil: 'networkidle', timeout: 90000 });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(outDir, '01-home.png'), type: 'png' });

    await page.fill('#wallet-address', '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045');
    await page.click('button[type="submit"]');
    await page.waitForSelector('output', { timeout: 20000 });
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(outDir, '02-score-result.png'), type: 'png' });

    await page.goto(`${base}/docs`, { waitUntil: 'networkidle', timeout: 90000 });
    await page.waitForTimeout(1200);
    await page.screenshot({ path: path.join(outDir, '03-docs-concept.png'), type: 'png' });

    await browser.close();
    console.log('Screenshots saved under public/screenshots/');
  } finally {
    proc.kill('SIGTERM');
    await new Promise((r) => setTimeout(r, 800));
    try {
      proc.kill('SIGKILL');
    } catch {
      /* ignore */
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
