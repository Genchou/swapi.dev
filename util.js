function planetHasWater(planet) {
  if (!planet?.surface_water) {
    return false;
  }
  const waterValue = parseFloat(planet.surface_water);
  return !isNaN(waterValue) && waterValue > 0;
}

function planetHasBiome(planet, biome) {
  if (!planet || !biome?.length) {
    throw Error("Planet and biome must be given");
  }
  return planet.terrain.indexOf(biome) > -1;
}

function calculateTotalDiameterForWaterAndMountainsPlanets(planets) {
  const withWaterAndMountains = planets.filter(
    (planet) => planetHasWater(planet) && planetHasBiome(planet, "mountains")
  );
  const totalDiameter = withWaterAndMountains.reduce(
    (acc, curr) => acc + parseInt(curr.diameter),
    0
  );

  return { planets: withWaterAndMountains, totalDiameter };
}

module.exports = {
  planetHasBiome,
  planetHasWater,
  calculateTotalDiameterForWaterAndMountainsPlanets,
};
