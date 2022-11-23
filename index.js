import chalk from "chalk";
import { getFilm } from "./request.js";
import { planetHasBiome, planetHasWater } from "./util.js";

function usage() {
  console.log(`Usage : node index.js FILM_ID`);
}

function computePlanets(planets) {
  const withWaterAndMountains = planets.filter(
    (planet) => planetHasWater(planet) && planetHasBiome(planet, "mountains")
  );
  const totalDiameter = withWaterAndMountains.reduce(
    (acc, curr) => acc + parseInt(curr.diameter),
    0
  );

  return { planets: withWaterAndMountains, totalDiameter };
}

async function getFilmData(id) {
  const filmData = await getFilm(id);
  const planets = await filmData.getPlanets();
  return {
    ...filmData,
    planets,
  };
}

const [cmd, script, arg] = process.argv;
const log = console.log;
if (!arg) {
  usage();
} else {
  getFilmData(arg)
    .then((film) => {
      log(chalk.blueBright.underline(`Film #${arg} (${film.title})`));
      if (!film.planets.length) {
        log(chalk.yellow("No planets were shown for that film."));
        return;
      }
      const targetPlanets = computePlanets(film.planets);
      log(`${targetPlanets.planets.length} planets matching our criterias :`);

      targetPlanets.planets.forEach((p) =>
        log(`- ${chalk.green(p.name)} (${p.diameter} km in diameter)`)
      );

      log(`Total diameter : ${chalk.green(targetPlanets.totalDiameter)} km`);
    })
    .catch((err) => {
      log(chalk.red(err.message));
    });
}
