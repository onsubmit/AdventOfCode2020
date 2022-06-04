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
      if (this.isPasswordValidForPolicy(line)) {
        count++;
      }
    });
    return count;
  };

  getPartTwoSolution = (): number => {
    return 0;
    throw new Error("No solution found");
  };

  private isPasswordValidForPolicy = (line: Line): boolean => {
    const count = line.password.split(line.policy.char).length - 1;
    return count >= line.policy.min && count <= line.policy.max;
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
