import fs = require("fs");

const getLines = (filename: string) => {
  const raw = fs.readFileSync(
    `${__dirname}/../../../data/${filename}`,
    "utf-8"
  );
  const lines = raw.split(",").map(a => a.trim());

  return lines;
};
export default getLines;
