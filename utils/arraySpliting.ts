export const arraySplitting = (arr: any[], chunk: number) => {
  const chunkedArray = [];
  let index = 0;
  while (index < arr.length) {
    chunkedArray.push(arr.slice(index, index + chunk));
    index += chunk;
  }
  return chunkedArray;
}