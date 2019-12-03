import { args } from './shared/args';

for (const arg of Object.keys(args)) {
  require(`./${arg}/index.js`);
}
