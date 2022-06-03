import Day01 from "./Days/Day01";

const days = [Day01];

days.forEach(async (day, i) => {
  const solution = await day.getSolution();
  console.log(`Day ${i + 1}: ${solution}`);
});
