import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = file => readFile(path.join(root, file), 'utf8');

const [html, appSource, dataSource, academicData, examRoutines] = await Promise.all([
  read('index.html'),
  read('src/app.js'),
  read('src/data.js'),
  read('src/data.json').then(JSON.parse),
  read('src/exam-routines.json').then(JSON.parse)
]);

assert.match(html, /<main\b/, 'index.html must include the application main landmark');
assert.match(html, /src\/data\.js/, 'index.html must load the data bootstrap');
assert.match(dataSource, /src\/app\.js|app\.js/, 'data bootstrap must load the application script');

const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert.equal(new Set(ids).size, ids.length, 'HTML IDs must be unique');

const navTargets = [...html.matchAll(/id="tab-btn-([^"]+)"/g)].map(match => match[1]);
assert.ok(navTargets.length >= 10, 'expected the complete workspace navigation');
for (const tab of navTargets) {
  assert.ok(ids.includes(`tab-${tab}`), `navigation target #tab-${tab} must exist`);
}

const mobileOptions = [...html.matchAll(/<option value="([^"]+)"/g)].map(match => match[1]);
for (const tab of navTargets) {
  assert.ok(mobileOptions.includes(tab), `mobile navigation must include ${tab}`);
}

assert.match(appSource, /function switchTab\(/, 'tab navigation controller must exist');
assert.ok(Array.isArray(academicData.programs) && academicData.programs.length > 1, 'academic data must contain multiple programs');
assert.ok(examRoutines && typeof examRoutines === 'object', 'exam routine data must be a JSON object');

console.log(`Smoke checks passed: ${navTargets.length} sections, ${academicData.programs.length} programs, unique IDs verified.`);

