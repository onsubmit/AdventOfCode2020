import Day from "./Day";

class Bag {
  color: string;
  containedBags: string[];

  constructor(color: string, containedBags: string[] = []) {
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
    const bags = containedBags.map((b) => {
      const res = r.exec(b.trim());
      const color = res?.groups?.color;
      if (!color) {
        throw "Invalid data";
      }

      return color;
    });

    return new Bag(color, bags);
  }
}

export default class Day07 extends Day<Bag> {
  relativeInputPath = `../input/${Day07.name}.txt`;
  parser = Bag.fromInput;

  private _bags: { [color: string]: Bag } = {};
  private _knownBags: { [color: string]: boolean } = {};

  getPartOneSolution = (): number => {
    for (let i = 0; i < this.lines.length; i++) {
      const bag = this.lines[i];
      this._bags[bag.color] = bag;
    }

    const numCanContainGoldBag = Object.values(this._bags).filter((bag) => this.canContainGoldBag(bag)).length;
    return numCanContainGoldBag;
  };

  canContainGoldBag = (bag: Bag): boolean => {
    if (this._knownBags[bag.color] === false) {
      return false;
    }

    if (this._knownBags[bag.color] === true) {
      return true;
    }

    if (bag.containedBags.length === 0) {
      this._knownBags[bag.color] = false;
      return false;
    }

    for (const containedBag of bag.containedBags) {
      if (containedBag === "shiny gold") {
        this._knownBags[bag.color] = true;
        return true;
      }

      if (this.canContainGoldBag(this._bags[containedBag])) {
        this._knownBags[bag.color] = true;
        return true;
      }
    }

    this._knownBags[bag.color] = false;
    return false;
  };

  getPartTwoSolution = (): number => {
    return 0;
  };
}
