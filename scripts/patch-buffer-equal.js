/**
 * Postinstall patch for buffer-equal-constant-time
 * 
 * Fixes: "Cannot read properties of undefined (reading 'prototype')"
 * on Node.js v26+ where SlowBuffer was removed.
 * SlowBuffer is an alias for Buffer in modern Node, so falling back is safe.
 */
const fs = require('fs');
const path = require('path');

const filePath = path.join(
  __dirname,
  '..',
  'node_modules',
  'buffer-equal-constant-time',
  'index.js'
);

try {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = "var SlowBuffer = require('buffer').SlowBuffer;";
  const patched = "var SlowBuffer = require('buffer').SlowBuffer || Buffer;";

  if (content.includes(patched)) {
    console.log('[patch] buffer-equal-constant-time already patched.');
  } else if (content.includes(original)) {
    content = content.replace(original, patched);
    fs.writeFileSync(filePath, content);
    console.log('[patch] buffer-equal-constant-time patched successfully.');
  } else {
    console.log('[patch] buffer-equal-constant-time: pattern not found (may be already fixed upstream).');
  }
} catch (err) {
  console.log('[patch] buffer-equal-constant-time: skipped -', err.message);
}
