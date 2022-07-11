
import { APP_VARIABLES } from "../config/app-variables";
import { environment } from "src/environments/environment";

export const DEFAULT_LANG = "en";

export function constant() {
  return {
    env: environment,
    app: APP_VARIABLES,
  };
}

export function generatePassword(
  length: number,
  useUpper?: boolean,
  useNumbers?: boolean,
  userSymbols?: boolean
) {
  var passwordLength = length || 12;
  var addUpper = useUpper || true;
  var addNumbers = useNumbers || true;
  var addSymbols = userSymbols || true;

  var lowerCharacters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  var upperCharacters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  var symbols = ["!", "?", "@"];

  var getRandom = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  var finalCharacters = "";

  if (addUpper) {
    finalCharacters = finalCharacters.concat(getRandom(upperCharacters));
  }

  if (addNumbers) {
    finalCharacters = finalCharacters.concat(getRandom(numbers));
  }

  // if (addSymbols) {
  //   finalCharacters = finalCharacters.concat(getRandom(symbols));
  // }

  for (var i = 1; i < passwordLength - 3; i++) {
    finalCharacters = finalCharacters.concat(getRandom(lowerCharacters));
  }

  //shuffle!
  return finalCharacters
    .split("")
    .sort(function () {
      return 0.5 - Math.random();
    })
    .join("");
}
export function getYears() {
  var year = 2000;
  var years = [];
  for (var i = 0; i < 31; i++) {
    years.push({
      year: year + i,
    });
  }
  return years;
}

export function getYear() {
  var year = 1970;
  var currentYear = new Date().getFullYear();
  var years = [];
  for (var i = 0; i < currentYear; i++) {
    years.push({
      year: year + i,
    });
  }
  return years;
}
