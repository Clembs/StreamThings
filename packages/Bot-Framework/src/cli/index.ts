import path from 'path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { build } from './build';

const args = yargs(hideBin(process.argv))
  .usage('$0 <command> [options]')
  .command('dev', 'run development mode')
  .command('build', 'build purplet bot')
  .command('run', 'build + run')
  .option('root', {
    alias: 'r',
    describe: 'root directory',
    type: 'string',
    default: './',
  })
  .options('keep-tmp', {
    alias: 'k',
    describe: 'keep temporary files from compilation',
    type: 'boolean',
    default: process.env.NODE_ENV === 'development',
  })
  .help()
  .parseSync();

export type Args = typeof args;

const command = args._[0];

args.root = path.join(process.cwd(), args.root);

if (command === 'build') {
  build();
}
