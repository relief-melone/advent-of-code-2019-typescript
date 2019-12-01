"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parseArgs(Args) {
    let args = {};
    for (let ind in Args) {
        // Ignore node and Path to app
        if (parseInt(ind) > 1) {
            let arg = Args[ind];
            if (arg.indexOf('=') !== -1) {
                args[arg.split('=')[0]] = arg.split('=')[1];
            }
            else {
                args[arg.split('=')[0]] = true;
            }
        }
    }
    return args;
}
const args = parseArgs(process.argv);
exports.args = args;
//# sourceMappingURL=args.js.map