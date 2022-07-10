//@ts-check

import { build as esbuild } from 'esbuild';
import { readdirSync, readFileSync } from 'fs';
import { resolve } from 'path';

const { dependencies: deps } = JSON.parse(readFileSync('package.json', 'utf8'));

const build = async (/** @type {string} */ path) => {
  // load all command files
  const files = readdirSync(resolve('./src/commands'), 'utf8').map((file) =>
    resolve('./src/commands', file)
  );

  files.forEach((file) => {
    console.log(file);
  });

  await esbuild({
    entryPoints: [...files, path],
    // outfile: 'dist/index.mjs',
    outdir: 'dist',
    watch: {
      onRebuild(error, result) {
        if (error) console.error('watch build failed:', error);
        else console.log('watch build succeeded:', result);
      },
    },
    bundle: true,
    minify: true,
    sourcemap: true,
    platform: 'node',
    target: 'node16',
    format: 'esm',
    external: Object.keys(deps),
  });
};

build('./src/index.ts');
