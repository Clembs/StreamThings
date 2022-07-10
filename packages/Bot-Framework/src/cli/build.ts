// shameless port of Purplet
// https://github.com/CRBT-Team/Purplet/tree/main/src/util/readDirRecursive.ts

import dedent from 'dedent';
import path from 'path';
import fs, { pathExists } from 'fs-extra';
import { readDirRecursive } from '../util/readDirRecursive';
import { getTempFolder } from '../util/temp';

export async function build() {
  const modulePath = path.resolve(process.cwd(), 'src', 'commmands');

  const configFile = path.resolve(process.cwd(), 'core.config.mjs');

  const moduleList = (await pathExists(modulePath))
    ? await readDirRecursive(modulePath)
    : [];

  const entryGeneratedFile = path.join(await getTempFolder(), 'entry.mjs');

  await fs.writeFile(entryGeneratedFile, [
    dedent`
        import { Client } from 'core';

        import config from '${configFile
          .replace(/\\/g, '\\\\')
          .replace(/\.[^.]+$/, '')}';
      `,
    ...moduleList.map((module) => {
      const relativePath = path.relative(modulePath, module);
      const moduleId = relativePath
        .replace(/\.[^.]+$/, '')
        .replace(/[^a-zA-Z0-9]/g, '_');
      const moduleFile = module.replace(/\\/g, '\\\\').replace(/\.[tj]s/g, '');
      return `import * as ${moduleId} from '${moduleFile}';`;
    }),
    '',
    'const modules = {',
    ...moduleList.map((module, i) => {
      const relativePath = path.relative(modulePath, module);
      const moduleId = relativePath
        .replace(/\.[^.]+$/, '')
        .replace(/[^a-zA-Z0-9]/g, '_');
      return `  m${i}: ${moduleId},`;
    }),
    '};',
    '',
    dedent`
        (async () => {
          const conf = config;
          global.client = new Client();
          for (const [moduleName, module] of Object.entries(modules)) {
            client.commands.set(moduleName, module);
          }
          client.connect();
        })
      `,
  ]);
}
