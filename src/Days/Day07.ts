import Day from "./Day";

class Bag {
  color: string;
  containedBags: { [color: string]: number };

  constructor(color: string, containedBags: { [color: string]: number } = {}) {
    this.color = color;
    this.containedBags = containedBags;
  }

  static fromInput(line: string): Bag {
    // light red bags contain 1 bright white bag, 2 muted yellow bags.
    const split = line.split("contain");
    const color = split[0].replace(" bags ", "");

    if (split[1] === " no other bags.") {
      return new Bag(color);
    }

    const containedBags = split[1].split(",");

    const r = /((?<number>\d) (?<color>[\w ]+) bag(s?))+/;
    const bags: { [color: string]: number } = {};
    containedBags.forEach((b) => {
      const res = r.exec(b.trim());
      const number = res?.groups?.number;
      const color = res?.groups?.color;
      if (!number || !color) {
        throw "Invalid data";
      }

      bags[color] = parseInt(number, 10);
    });

    return new Bag(color, bags);
  }
}

export default class Day07 extends Day<Bag> {
  relativeInputPath = `../input/${Day07.name}.txt`;
  parser = Bag.fromInput;

  private _bags: { [color: string]: Bag } = {};
  private _knownBagsCanContainShinyGoldBag: { [color: string]: boolean } = {};
  private _knownBagsContainedCount: { [color: string]: number } = {};

  getPartOneSolution = (): number => {
    for (let i = 0; i < this.lines.length; i++) {
      const bag = this.lines[i];
      this._bags[bag.color] = bag;
    }

    const numCanContainGoldBag = Object.values(this._bags).filter((bag) => this.canContainGoldBag(bag)).length;
    return numCanContainGoldBag;
  };

  getPartTwoSolution = (): number => {
    return this.getContainedBagCount(this._bags["shiny gold"]);
  };

  private canContainGoldBag = (bag: Bag): boolean => {
    if (this._knownBagsCanContainShinyGoldBag[bag.color] === false) {
      return false;
    }

    if (this._knownBagsCanContainShinyGoldBag[bag.color] === true) {
      return true;
    }

    const containedBagNames = Object.keys(bag.containedBags);
    if (containedBagNames.length === 0) {
      this._knownBagsCanContainShinyGoldBag[bag.color] = false;
      return false;
    }

    for (const containedBag of containedBagNames) {
      if (containedBag === "shiny gold") {
        this._knownBagsCanContainShinyGoldBag[bag.color] = true;
        return true;
      }

      if (this.canContainGoldBag(this._bags[containedBag])) {
        this._knownBagsCanContainShinyGoldBag[bag.color] = true;
        return true;
      }
    }

    this._knownBagsCanContainShinyGoldBag[bag.color] = false;
    return false;
  };

  private getContainedBagCount = (bag: Bag): number => {
    if (this._knownBagsContainedCount[bag.color] === 0) {
      return 0;
    }

    if (this._knownBagsContainedCount[bag.color]) {
      return this._knownBagsContainedCount[bag.color];
    }

    const containedBagNames = Object.keys(bag.containedBags);
    if (containedBagNames.length === 0) {
      this._knownBagsContainedCount[bag.color] = 0;
      return 0;
    }

    let sum = 0;
    for (const containedBag of containedBagNames) {
      const numBags = bag.containedBags[containedBag] * (1 + this.getContainedBagCount(this._bags[containedBag]));
      sum += numBags;
    }

    this._knownBagsContainedCount[bag.color] = sum;
    return sum;
  };
}
