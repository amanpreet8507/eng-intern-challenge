const brailleDictionary = {
  // Letters
  a: "O.....",
  b: "O.O...",
  c: "OO....",
  d: "OO.O..",
  e: "O..O..",
  f: "OOO...",
  g: "OOOO..",
  h: "O.OO..",
  i: ".OO...",
  j: ".OOO..",
  k: "O...O.",
  l: "O.O.O.",
  m: "OO..O.",
  n: "OO.OO.",
  o: "O..OO.",
  p: "OOO.O.",
  q: "OOOOO.",
  r: "O.OOO.",
  s: ".OO.O.",
  t: ".OOOO.",
  u: "O...OO",
  v: "O.O.OO",
  w: ".OOO.O",
  x: "OO..OO",
  y: "OO.OOO",
  z: "O..OOO",

  // Numbers
  1: "O.....",
  2: "O.O...",
  3: "OO....",
  4: "OO.O..",
  5: "O..O..",
  6: "OOO...",
  7: "OOOO..",
  8: "O.OO..",
  9: ".OO...",
  0: ".OOO..",

  // Capital letter symbol
  capital: ".....O",

  // Number symbol
  number: ".O.OOO",

  // Space
  " ": "......",
};

// Reverse lookup for English alphabet
const brailleToEnglish = Object.keys(brailleDictionary).reduce((acc, key) => {
  acc[brailleDictionary[key]] = key;
  return acc;
}, {});

function isBraille(input) {
  const allowedChars = new Set(["O", "."]);
  for (const char of input) {
    if (!allowedChars.has(char)) {
      return false;
    }
  }
  return true;
}

function validateBrailleInput(braille) {
  // Check if braille input length is a multiple of 6 & has valid characters
  if (braille.length % 6 !== 0 || !isBraille(braille)) {
    throw new Error("Invalid Braille input.");
  }
}

// Accept only alphabets, numbers, spaces, & basic punctuation
function validateEnglishInput(text) {
  const allowedChars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 .,!?-";
  if ([...text].every((char) => allowedChars.includes(char) || char === " ")) {
    return;
  }
  throw new Error(
    "Invalid English input. Only letters, numbers, spaces, and basic punctuation are allowed."
  );
}

function translateToBraille(text) {
  validateEnglishInput(text); // Validate the input
  let result = "";
  let isNumberMode = false;

  for (const char of text) {
    if (/[A-Z]/.test(char)) {
      result +=
        brailleDictionary["capital"] + brailleDictionary[char.toLowerCase()];
    } else if (/[0-9]/.test(char)) {
      if (!isNumberMode) {
        result += brailleDictionary["number"];
        isNumberMode = true;
      }
      result += brailleDictionary[char];
    } else if (char === " ") {
      result += brailleDictionary[" "];
      isNumberMode = false; // Reset number mode after space
    } else {
      result += brailleDictionary[char];
    }
  }
  return result;
}

function translateToEnglish(braille) {
  validateBrailleInput(braille); // Validate the Braille input
  let result = "";
  let chars = braille.match(/.{1,6}/g); // Split the Braille input into pieces of 6
  let isCapitalMode = false;
  let isNumberMode = false;

  for (const char of chars) {
    if (char === brailleDictionary["capital"]) {
      isCapitalMode = true;
    } else if (char === brailleDictionary["number"]) {
      isNumberMode = true;
    } else if (char === brailleDictionary[" "]) {
      result += " ";
      isNumberMode = false; // Reset number mode after space
    } else {
      let translatedChar = brailleToEnglish[char];
      if (isCapitalMode) {
        translatedChar = translatedChar.toUpperCase();
        isCapitalMode = false;
      }
      result += translatedChar;
    }
  }
  return result;
}

// Main function to handle input & output
function main() {
  const input = process.argv[2];
  try {
    if (isBraille(input)) {
      console.log(translateToEnglish(input));
    } else {
      console.log(translateToBraille(input));
    }
  } catch (error) {
    console.error(error.message);
  }
}

main();
