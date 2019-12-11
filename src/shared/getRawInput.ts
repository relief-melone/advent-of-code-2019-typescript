import fs = require('fs');

const getRaw = (filename: string): string => {
  return fs.readFileSync(
    `${__dirname}/../../../data/${filename}`,
    'utf-8'
  );
};
export default getRaw;
