#!/usr/bin/env node
/**
 * CustomGPT Design System — token lint enforcer
 * Usage: node customgpt-design-system/lint-tokens.js <page.html>
 * Exit 0: clean. Exit 1: violations. Exit 2: usage error.
 *
 * Checks:
 *   RAW_HEX  — hex color outside :root {} (must use var(--color-*))
 *   RAW_PX   — bare px on padding/margin/gap/font-size outside var() or clamp()
 */

'use strict';
const fs = require('fs');

const file = process.argv[2];
if (!file) {
  console.error('Usage: node customgpt-design-system/lint-tokens.js <page.html>');
  process.exit(2);
}
if (!fs.existsSync(file)) {
  console.error(`File not found: ${file}`);
  process.exit(2);
}

const html = fs.readFileSync(file, 'utf8');
const violations = [];

// ── helpers ──────────────────────────────────────────────────────────────────

function stripRootBlocks(css) {
  // Remove all :root { ... } blocks (token definitions are allowed there)
  let out = '';
  let i = 0;
  while (i < css.length) {
    const rootIdx = css.indexOf(':root', i);
    if (rootIdx === -1) { out += css.slice(i); break; }
    out += css.slice(i, rootIdx);
    const openBrace = css.indexOf('{', rootIdx);
    if (openBrace === -1) { out += css.slice(rootIdx); break; }
    let depth = 1;
    let j = openBrace + 1;
    while (j < css.length && depth > 0) {
      if (css[j] === '{') depth++;
      else if (css[j] === '}') depth--;
      j++;
    }
    i = j;
  }
  return out;
}

function isCommentLine(line) {
  const t = line.trim();
  return !t || t.startsWith('//') || t.startsWith('*') || t.startsWith('/*') || t.startsWith('-->');
}

const SPACING_PROP_RE = /^(padding(?:-(?:top|right|bottom|left))?|margin(?:-(?:top|right|bottom|left))?|gap|row-gap|column-gap|font-size)\s*:/i;
const HEX_RE = /#[0-9a-fA-F]{3,8}\b/g;
const PX_RE = /\b(\d+(?:\.\d+)?px)\b/g;

function lintCSSLines(css, labelPrefix) {
  const lines = css.split('\n');
  lines.forEach((line, i) => {
    if (isCommentLine(line)) return;
    const lineNum = i + 1;
    const trimmed = line.trim();

    // RAW_HEX — any hex value outside :root
    HEX_RE.lastIndex = 0;
    let hm;
    while ((hm = HEX_RE.exec(line)) !== null) {
      // Skip if match is inside a CSS comment on this line
      const before = line.slice(0, hm.index);
      const commentOpen = before.lastIndexOf('/*');
      const commentClose = before.lastIndexOf('*/');
      if (commentOpen > commentClose) continue;

      violations.push({
        type: 'RAW_HEX',
        value: hm[0],
        location: `${labelPrefix}:${lineNum}`,
        context: trimmed.slice(0, 100),
      });
    }

    // RAW_PX — bare px on spacing/font-size props not using var() or clamp()
    if (SPACING_PROP_RE.test(trimmed)) {
      const colonIdx = trimmed.indexOf(':');
      const value = trimmed.slice(colonIdx + 1).replace(/;.*$/, '').trim();
      if (!value.includes('var(') && !value.includes('clamp(')) {
        PX_RE.lastIndex = 0;
        let pm;
        while ((pm = PX_RE.exec(value)) !== null) {
          if (parseFloat(pm[1]) > 0) {
            violations.push({
              type: 'RAW_PX',
              value: pm[1],
              location: `${labelPrefix}:${lineNum}`,
              context: trimmed.slice(0, 100),
            });
          }
        }
      }
    }
  });
}

// ── scan <style> blocks ───────────────────────────────────────────────────────

const STYLE_RE = /<style[^>]*>([\s\S]*?)<\/style>/gi;
let sm;
let styleCount = 0;
while ((sm = STYLE_RE.exec(html)) !== null) {
  styleCount++;
  const stripped = stripRootBlocks(sm[1]);
  lintCSSLines(stripped, `<style#${styleCount}>`);
}

// ── scan inline style="" attributes ──────────────────────────────────────────

const INLINE_RE = /\bstyle="([^"]*)"/gi;
let im;
while ((im = INLINE_RE.exec(html)) !== null) {
  const lineNum = html.slice(0, im.index).split('\n').length;
  const style = im[1];

  HEX_RE.lastIndex = 0;
  let hm;
  while ((hm = HEX_RE.exec(style)) !== null) {
    violations.push({
      type: 'RAW_HEX (inline style)',
      value: hm[0],
      location: `inline:${lineNum}`,
      context: style.slice(0, 100),
    });
  }

  // Also check px on spacing props in inline styles
  const decls = style.split(';');
  decls.forEach(decl => {
    if (SPACING_PROP_RE.test(decl.trim())) {
      const val = decl.slice(decl.indexOf(':') + 1).trim();
      if (!val.includes('var(') && !val.includes('clamp(')) {
        PX_RE.lastIndex = 0;
        let pm;
        while ((pm = PX_RE.exec(val)) !== null) {
          if (parseFloat(pm[1]) > 0) {
            violations.push({
              type: 'RAW_PX (inline style)',
              value: pm[1],
              location: `inline:${lineNum}`,
              context: decl.trim().slice(0, 100),
            });
          }
        }
      }
    }
  });
}

// ── report ────────────────────────────────────────────────────────────────────

if (violations.length === 0) {
  console.log(`✓  ${file}: no token violations`);
  process.exit(0);
}

const byType = {};
for (const v of violations) {
  (byType[v.type] = byType[v.type] || []).push(v);
}

process.stderr.write(`\nToken violations in ${file}:\n\n`);

for (const [type, list] of Object.entries(byType)) {
  const fix = type.includes('HEX')
    ? 'replace with var(--color-*)'
    : 'replace with var(--sp*) or wrap in clamp()';
  process.stderr.write(`  ${type} — ${fix} (${list.length})\n`);
  for (const v of list) {
    process.stderr.write(`    ${v.location}: ${v.value}  ${v.context}\n`);
  }
  process.stderr.write('\n');
}

process.stderr.write(`  ${violations.length} violation(s) — fix all before shipping.\n\n`);
process.exit(1);
