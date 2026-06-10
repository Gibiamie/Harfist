const fs = require('fs');
const path = require('path');

const root = process.cwd();
const outDir = path.join(root, 'www');

const requiredFiles = [
  'index.html',
  'kelime-agi.html'
];

const optionalFiles = [
  'HARFIST_CONSTITUTION.md',
  'README.md'
];

const requiredDirs = [
  'data',
  'audio',
  'assets'
];

function rmDir(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyFile(srcRel, destRel = srcRel) {
  const src = path.join(root, srcRel);
  const dest = path.join(outDir, destRel);
  if (!fs.existsSync(src)) {
    throw new Error(`Required file missing: ${srcRel}`);
  }
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
}

function copyFileIfExists(srcRel, destRel = srcRel) {
  const src = path.join(root, srcRel);
  if (!fs.existsSync(src)) return;
  const dest = path.join(outDir, destRel);
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
}

function copyDirIfExists(srcRel) {
  const src = path.join(root, srcRel);
  if (!fs.existsSync(src)) return;
  const dest = path.join(outDir, srcRel);
  fs.cpSync(src, dest, { recursive: true });
}

rmDir(outDir);
ensureDir(outDir);

for (const file of requiredFiles) copyFile(file);
for (const file of optionalFiles) copyFileIfExists(file);
for (const dir of requiredDirs) copyDirIfExists(dir);

const metadata = {
  app: 'Harfist',
  buildTime: new Date().toISOString(),
  files: requiredFiles,
  directories: requiredDirs.filter((dir) => fs.existsSync(path.join(root, dir)))
};

fs.writeFileSync(
  path.join(outDir, 'build-info.json'),
  JSON.stringify(metadata, null, 2),
  'utf8'
);

console.log('Harfist web assets copied to www/');
console.log(metadata);
