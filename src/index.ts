import { args } from "./shared/args";

for (let arg of Object.keys(args)) {
  require(`./${arg}/index.js`);
}
