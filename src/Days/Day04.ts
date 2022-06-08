import Day from "./Day";

const passportFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid", "cid"] as const;
type PassportField = typeof passportFields[number];
type Passport = Map<PassportField, string>;

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
      if (isValidPassport(passport)) {
        numValidPassports++;
      }
    });

    return numValidPassports;
  };

  getPartTwoSolution = (): number => {
    return 0;
  };
}

function isValidPassport(passport: Passport): boolean {
  if (passport.size === passportFields.length) {
    return true;
  }

  if (passport.size === passportFields.length - 1 && !passport.get("cid")) {
    return true;
  }

  return false;
}
