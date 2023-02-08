export const textShorted = (text: string, lenght: number) => {
  let shorted = text.substring(0, lenght);
  const textSplit = shorted.split(' ');
  const lastWordText = text
    .split(' ')
    .reverse()
    .find(
      (word) =>
        word.toLowerCase().includes(textSplit[textSplit.length - 1].toLowerCase()) &&
        word.toLowerCase().indexOf(textSplit[textSplit.length - 1].toLowerCase()) === 0
    );

  if (lastWordText != null) {
    textSplit[textSplit.length - 1] = `${lastWordText.replace(',', '')} ...`;
  }
  shorted = textSplit.join(' ');

  return shorted;
};
