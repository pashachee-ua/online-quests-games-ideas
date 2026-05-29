import { mkdir, readdir } from 'node:fs/promises';
import { dirname, extname, join, relative, resolve } from 'node:path';
import { spawn } from 'node:child_process';

const sourceDir = resolve(process.argv[2] ?? 'assets/source-images');
const outputDir = resolve(process.argv[3] ?? 'public/images');
const quality = process.env.WEBP_QUALITY ?? '82';
const supportedExtensions = new Set(['.png', '.jpg', '.jpeg']);

async function collectImages(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const images = [];

  for (const entry of entries) {
    const entryPath = join(directory, entry.name);

    if (entry.isDirectory()) {
      images.push(...await collectImages(entryPath));
      continue;
    }

    if (entry.isFile() && supportedExtensions.has(extname(entry.name).toLowerCase())) {
      images.push(entryPath);
    }
  }

  return images;
}

function convertImage(inputPath, outputPath) {
  return new Promise((resolveConvert, rejectConvert) => {
    const child = spawn(
      'cwebp',
      ['-quiet', '-q', quality, inputPath, '-o', outputPath],
      { stdio: ['ignore', 'pipe', 'pipe'] },
    );

    let stderr = '';
    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });
    child.on('error', (error) => {
      rejectConvert(error);
    });
    child.on('close', (code) => {
      if (code === 0) {
        resolveConvert();
        return;
      }

      rejectConvert(new Error(stderr.trim() || `cwebp exited with code ${code}`));
    });
  });
}

try {
  const images = await collectImages(sourceDir);

  if (images.length === 0) {
    console.log(`No source images found in ${sourceDir}`);
    process.exit(0);
  }

  for (const inputPath of images) {
    const relativePath = relative(sourceDir, inputPath);
    const outputPath = join(
      outputDir,
      relativePath.slice(0, -extname(relativePath).length) + '.webp',
    );

    await mkdir(dirname(outputPath), { recursive: true });
    await convertImage(inputPath, outputPath);
    console.log(`${relativePath} -> ${relative(outputDir, outputPath)}`);
  }

  console.log(`Converted ${images.length} image(s) to WebP at quality ${quality}.`);
} catch (error) {
  console.error(error.message);
  console.error('Install cwebp first, for example: brew install webp');
  process.exit(1);
}
