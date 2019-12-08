export default (minVal: number, maxVal: number, forbiddenDiggets: number[]): number[][] => {
  const sequences: number[][] = [];
  const maxlength = maxVal.toString().length;
  for(let n=minVal; n<maxVal; n++){
    const sequence = n.toString().split('').map(a => parseInt(a));
    fillSequenceToLength(sequence,maxlength);
    if(isUnique(sequence) && !containsForbiddenDigets(sequence,forbiddenDiggets)){
      sequences.push(sequence);
    } 
  }
  return sequences;
};

const fillSequenceToLength = (sequence: number[], length: number): void => {
  for(let i = sequence.length; i<length; i++){
    sequence.unshift(0);
  }
}; 

const isUnique = (sequence: number[]): boolean => {
  const encounteredDigets: number[] = [];
  for(let i=0; i<sequence.length;i++){
    if(encounteredDigets.indexOf(sequence[i]) !== -1) return false;
    encounteredDigets.push(sequence[i]);
  }
  return true;
};

const containsForbiddenDigets = (sequence: number[], forbiddenDigets: number[]): boolean => {  
  for(let j=0; j<forbiddenDigets.length; j++){
    if(sequence.indexOf(forbiddenDigets[j]) !== -1) return true;
  }
  
  return false;
};