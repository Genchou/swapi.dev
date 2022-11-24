const {
  planetHasWater,
  planetHasBiome,
  calculateTotalDiameterForWaterAndMountainsPlanets,
} = require("./util");

const testPlanets = [
  {
    name: "Planet A",
    diameter: "12",
    terrain: "mountains, jungles",
    surface_water: "15",
  },
  {
    name: "Planet B",
    diameter: "24",
    terrain: "desert, jungles",
    surface_water: "0",
  },
];

test("Test planetHasWater", () => {
  expect(planetHasWater(testPlanets[0])).toBe(true);
  expect(planetHasWater(testPlanets[1])).toBe(false);
});

test("Test planetHasBiome", () => {
  expect(planetHasBiome(testPlanets[0], "mountains")).toBe(true);
  expect(planetHasBiome(testPlanets[1], "desert")).toBe(true);
  expect(planetHasBiome(testPlanets[1], "mountains")).toBe(false);
});

test("Test calculateTotalDiameterForWaterAndMountainsPlanets", () => {
  const results =
    calculateTotalDiameterForWaterAndMountainsPlanets(testPlanets);
  expect(results.planets).toBeDefined();
  expect(results.planets.length).toBe(1);
  expect(results.totalDiameter).toBe(12);
});
