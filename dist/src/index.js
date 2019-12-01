"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const args_1 = require("./shared/args");
for (let arg of Object.keys(args_1.args)) {
    require(`./${arg}/index.js`);
}
//# sourceMappingURL=index.js.map