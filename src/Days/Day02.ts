import Day from "./Day";

type PasswordPolicy = {
  min: number;
  max: number;
  char: string;
};

type Line = {
  policy: PasswordPolicy;
  password: string;
};

export default class Day02 extends Day<Line> {
  relativeInputPath = `../input/${Day02.name}.txt`;
  parser = parseLine;

  getPartOneSolution = (): number => {
    let count = 0;
    this.lines.forEach((line) => {
      if (this.isPasswordValidForPolicyPart1(line)) {
        count++;
      }
    });

    return count;
  };

  getPartTwoSolution = (): number => {
    let count = 0;
    this.lines.forEach((line) => {
      if (this.isPasswordValidForPolicyPart2(line)) {
        count++;
      }
    });

    return count;
  };

  private isPasswordValidForPolicyPart1 = (line: Line): boolean => {
    const count = line.password.split(line.policy.char).length - 1;
    return count >= line.policy.min && count <= line.policy.max;
  };

  private isPasswordValidForPolicyPart2 = (line: Line): boolean => {
    let matches = 0;

    if (line.password.charAt(line.policy.min - 1) === line.policy.char) {
      matches++;
    }

    if (line.password.charAt(line.policy.max - 1) === line.policy.char) {
      matches++;
    }

    return matches === 1;
  };
}

function parseLine(line: string): Line {
  const r = /(?<min>\d+)-(?<max>\d+) (?<char>[a-z]): (?<password>[a-z]+)/;
  const matches = line.match(r);

  if (!matches?.groups?.min || !matches?.groups?.max || !matches?.groups?.char || !matches?.groups?.password) {
    throw "Regex didn't match";
  }

  const min = parseInt(matches.groups.min, 10);
  const max = parseInt(matches.groups.max, 10);
  const char = matches.groups.char;
  const password = matches.groups.password;

  const policy: PasswordPolicy = { min, max, char };
  return { policy, password };
}
