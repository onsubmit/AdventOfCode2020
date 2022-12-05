import Day from "./Day";

const passportFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid", "cid"] as const;
type PassportField = typeof passportFields[number];
type Passport = Map<PassportField, string>;

const fieldValidationMap: Map<PassportField, (value: string) => boolean> = new Map([
  [
    "byr",
    (value: string): boolean => {
      const birthYear = parseInt(value, 10);
      return birthYear >= 1920 && birthYear <= 2002;
    },
  ],
  [
    "iyr",
    (value: string): boolean => {
      const issueYear = parseInt(value, 10);
      return issueYear >= 2010 && issueYear <= 2020;
    },
  ],
  [
    "eyr",
    (value: string): boolean => {
      const expirationYear = parseInt(value, 10);
      return expirationYear >= 2020 && expirationYear <= 2030;
    },
  ],
  [
    "hgt",
    (value: string): boolean => {
      const height = parseInt(value.substring(0, value.length - 2), 10);
      if (value.endsWith("cm")) {
        return height >= 150 && height <= 193;
      }

      if (value.endsWith("in")) {
        return height >= 59 && height <= 76;
      }

      return false;
    },
  ],
  [
    "hcl",
    (value: string): boolean => {
      const r = /^#([0-9a-f]{6})$/;
      return r.test(value);
    },
  ],
  [
    "ecl",
    (value: string): boolean => {
      return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(value);
    },
  ],
  [
    "pid",
    (value: string): boolean => {
      const r = /^\d{9}$/;
      return r.test(value);
    },
  ],
  ["cid", (_: string): boolean => true],
]);

function isPassportField(maybePassportField: string): maybePassportField is PassportField {
  const field = passportFields.find((f) => f === maybePassportField);
  return !!field;
}

export default class Day04 extends Day<void> {
  private _passports: Passport[] = [];
  private _parsedPassort: Passport = new Map();

  constructor() {
    super();
    this.parseInput();
  }

  relativeInputPath = `../input/${Day04.name}.txt`;
  parser = (line: string): void => {
    if (!line && this._parsedPassort) {
      this._passports.push(this._parsedPassort);
      this._parsedPassort = new Map();
      return;
    }

    const r = /(?<key>\S+):(?<value>\S+)/g;
    const matches = line.matchAll(r);

    for (const match of matches) {
      if (!match?.groups?.key || !match?.groups?.value) {
        throw new Error("Regex didn't match");
      }

      const { key, value } = match.groups;
      if (isPassportField(key)) {
        if (this._parsedPassort.get(key)) {
          throw new Error(`Duplicate key: ${key}`);
        }

        this._parsedPassort.set(key, value);
      } else {
        throw new Error(`${key} is not a valid passport field.`);
      }
    }
  };

  protected override afterParse = (): void => {
    this._passports.push(this._parsedPassort);
  };

  getPartOneSolution = (): number => {
    let numValidPassports = 0;
    this._passports.forEach((passport: Passport) => {
      if (isValidPassportPartOne(passport)) {
        numValidPassports++;
      }
    });

    return numValidPassports;
  };

  getPartTwoSolution = (): number => {
    let numValidPassports = 0;
    this._passports.forEach((passport: Passport) => {
      if (isValidPassportPartTwo(passport)) {
        numValidPassports++;
      }
    });

    return numValidPassports;
  };
}

function isValidPassportPartOne(passport: Passport): boolean {
  if (passport.size === passportFields.length) {
    return true;
  }

  if (passport.size === passportFields.length - 1 && !passport.get("cid")) {
    return true;
  }

  return false;
}

function isValidPassportPartTwo(passport: Passport): boolean {
  return passportFields.every((field) => {
    if (field === "cid") {
      return true;
    }

    const validationFunction = fieldValidationMap.get(field);
    if (!validationFunction) {
      throw "Missing field validation function";
    }

    const value = passport.get(field);
    if (value === undefined) {
      return false;
    }

    if (validationFunction(value)) {
      return true;
    }

    return false;
  });
}
