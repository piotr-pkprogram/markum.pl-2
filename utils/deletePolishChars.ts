const deletePolishChars = (NameFile: string) => {
  NameFile = NameFile.replaceAll("ó","o");
  NameFile = NameFile.replaceAll("Ó","O");
  NameFile = NameFile.replaceAll("ł","l");
  NameFile = NameFile.replaceAll("Ł","L");
  NameFile = NameFile.replaceAll("ń","n");
  NameFile = NameFile.replaceAll("Ń","N");
  NameFile = NameFile.replaceAll("ż","z");
  NameFile = NameFile.replaceAll("Ż","Z");
  NameFile = NameFile.replaceAll("ź","z");
  NameFile = NameFile.replaceAll("Ź","Z");
  NameFile = NameFile.replaceAll("Ć","C");
  NameFile = NameFile.replaceAll("ć","c");
  NameFile = NameFile.replaceAll("ę","e");
  NameFile = NameFile.replaceAll("Ę","E");
  NameFile = NameFile.replaceAll("Ś","S");
  NameFile = NameFile.replaceAll("ś","s");
  NameFile = NameFile.replaceAll(' ', '-');

  return NameFile;
}

export default deletePolishChars;