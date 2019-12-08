import findFirstEqualElementIn2Arrays from '../shared/findFirstEqualElementIn2Arrays';

export const getObjectListFromInput = (lines: string[]): Record<string,any> => {
  const objectList = {};
  lines
    .flatMap(l => l.split(')'))
    .map(s => {
      objectList[s] = null;
    });
  return objectList;
};

export const setPartentsInList = (
  InputList: string[], 
  List: Record<string, any>
): Record<string,null | Record<string,any>> => {
  const clonedList = Object.assign({}, List);
  for(const entry of InputList){
    const splitItem = entry.split(')');
    clonedList[splitItem[1]] = splitItem[0];
  }
  return clonedList;
};

export const countParents = (
  itemKey: string, list: Record<string,any>, offset = 0
): number => {
  const parents = offset;  
  return list[itemKey] ? countParents(list[itemKey], list, parents+1) : parents;
};

export const getPathToRoot = (
  itemKey: string, list: Record<string,any>, currentPath: string[] = []
): string[] => {
  const path = currentPath;
  if(list[itemKey]) path.push(list[itemKey]);
  return list[itemKey] 
    ? getPathToRoot(list[itemKey], list, path) : path;
};

export const solveInput = (input: string[]): number => {
  const objectList = getObjectListFromInput(input);
  const parentList = setPartentsInList(input, objectList);
  const myPathToRoot = getPathToRoot('YOU', parentList);
  const santasPathToRoot = getPathToRoot('SAN', parentList);

  const firstEqualElement = findFirstEqualElementIn2Arrays(myPathToRoot, santasPathToRoot);
  if(firstEqualElement){
    return firstEqualElement[0] + firstEqualElement[1];
  } else {
    throw 'No Path from you to Santa';
  }
  
};