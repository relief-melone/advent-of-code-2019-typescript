import getLines from "./getLines";

export default (filename: string): Array<number> => {
  const lines = getLines(filename);
  return lines
    .map(a => parseInt(a))
    .filter(a => typeof a === "number" && a === a);
};
