export default (arr1: string[], arr2: string[]): [number, number, string]| null =>{
  
  for(let i=0; i < arr1.length;i++){
    for(let j=0; j< arr2.length; j++){
      if(arr1[i] === arr2[j]) return [i,j, arr1[i]]; 
    }
  }
  return null;
};