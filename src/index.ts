import Day01 from "./Days/Day01";

const days = [Day01];

days.forEach(async (Day, i) => {
  const day = await Day.initializeAsync();
  const solution1 = await day.getPartOneSolution();
  const solution2 = await day.getPartTwoSolution();
  console.log(`Day ${i + 1}, part 1: ${solution1}`);
  console.log(`Day ${i + 1}, part 2: ${solution2}`);
});
