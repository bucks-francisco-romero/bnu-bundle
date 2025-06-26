require('log-timestamp');

const fs = require('fs');
const path = require('path');

function copyRecursiveSync(src, dest) {
  if (!fs.existsSync(src)) return;
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(child => {
      copyRecursiveSync(path.join(src, child), path.join(dest, child));
    });
  } else {
    fs.copyFileSync(src, dest);
    console.log(`Copied: ${src} -> ${dest}`);
  }
}

function main() {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.error('Usage: node copy-dist.js <destination-path>');
    process.exit(1);
  }
  const dest = args[0];
  const src = path.resolve(__dirname, '../dist');
  const destPath = path.resolve(dest);
  copyRecursiveSync(src, destPath);
  console.log(`Copied all files from ${src} to ${destPath}`);
}

main();
