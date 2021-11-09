export const formatSpaceObject = (spaceObject) => {
  if (spaceObject === "iss") {
    return "ISS";
  }

  const splitChars = spaceObject.split("");

  const whiteSpaceObject = splitChars.map((char) => {
    if (char === "_" || char === "-") {
      return " ";
    }
    return char;
  });

  const splitWords = whiteSpaceObject.join("").split(" ");

  const upperCaseWords = splitWords.map((word) => {
    const firstLetter = word[0].toUpperCase();
    const remainingLetters = word.substring(1);
    return firstLetter + remainingLetters;
  });

  return upperCaseWords.join(" ");
};
