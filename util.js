export function planetHasWater(planet) {
  if (!planet?.surface_water) {
    return false;
  }
  const waterValue = parseFloat(planet.surface_water);
  return !isNaN(waterValue) && waterValue > 0;
}

export function planetHasBiome(planet, biome) {
  if (!planet || !biome?.length) {
    throw Error("Planet and biome must be given");
  }
  return planet.terrain.indexOf(biome) > -1;
}
