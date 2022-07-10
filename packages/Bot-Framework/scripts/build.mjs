import { build } from 'esbuild';
import fs from 'fs-extra';
import ora from 'ora';

const spinner = ora('building framework');

const pkg = fs.readJSONSync('./package.json');
const dependencies = Object.keys(pkg.dependencies);

fs.ensureDirSync('node_modules/bot-framework');
fs.writeFileSync(
  'node_modules/bot-framework/index.mjs',
  'export * from "../../dist/index.mjs";'
);
fs.writeFileSync(
  'node_modules/bot-framework/package.json',
  JSON.stringify({
    ...pkg,
    module: 'index.mjs',
    main: 'index.mjs',
  })
);

build({
  entryPoints: ['./Bot-Framework/index.ts'],
  outfile: './dist/index.mjs',
  format: 'esm',
  target: 'node16',
  platform: 'node',
  bundle: true,
  external: dependencies,
  define: {
    'process.env.NODE_ENV': JSON.stringify('development'),
  },
  banner: {
    js: '#!/usr/bin/env node',
  },
}).then(() => {
  spinner.succeed('build complete');
});
