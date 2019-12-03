function parseArgs(Args: string[]): any {
  const args: any = {};
  for (const ind in Args) {
    // Ignore node and Path to app
    if (parseInt(ind) > 1) {
      const arg = Args[ind];
      if (arg.indexOf('=') !== -1) {
        args[arg.split('=')[0]] = arg.split('=')[1];
      } else {
        args[arg.split('=')[0]] = true;
      }
    }
  }

  return args;
}

const args = parseArgs(process.argv);

export { args }; 