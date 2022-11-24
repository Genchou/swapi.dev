const { getFilm } = require("./request");
const {
  planetHasBiome,
  planetHasWater,
  calculateTotalDiameterForWaterAndMountainsPlanets,
} = require("./util.js");

function usage() {
  console.log(`Usage : node index.js FILM_ID`);
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
      log(`Film #${arg} (${film.title})`);
      if (!film.planets.length) {
        log("No planets were shown for that film.");
        return;
      }
      const targetPlanets = calculateTotalDiameterForWaterAndMountainsPlanets(
        film.planets
      );
      log(`${targetPlanets.planets.length} planets matching our criterias :`);

      targetPlanets.planets.forEach((p) =>
        log(`- ${p.name} (${p.diameter} km in diameter)`)
      );

      log(`Total diameter : ${targetPlanets.totalDiameter} km`);
    })
    .catch((err) => {
      log(err.message);
    });
}
