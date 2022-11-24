const { getFilm } = require("./request");

const films = [
  {
    id: "filma",
    title: "MockFilmA",
    planets: [
      "https://swapi.dev/api/planets/planeta",
      "https://swapi.dev/api/planets/planetb",
    ],
  },
];

const planets = [
  {
    id: "planeta",
    name: "Planet A",
    diameter: "12",
    terrain: "mountains, jungles",
    surface_water: "15",
  },
  {
    id: "planetb",
    name: "Planet B",
    diameter: "24",
    terrain: "desert, jungles",
    surface_water: "0",
  },
];

const mockRequester = (url) => {
  if (url.indexOf("planets") > -1) {
    const planetId = url.split("/").pop();
    return Promise.resolve(planets.find((p) => p.id === planetId));
  }
  return Promise.resolve(films[0]);
};

test("getFilm", () => {
  return getFilm(mockRequester, "filma").then((film) => {
    expect(film).toBeDefined();
    expect(film.title).toBe("MockFilmA");
  });
});

test("test getFilm.getPlanets()", () => {
  return getFilm(mockRequester, "filma").then((film) => {
    return film.getPlanets().then((planets) => {
      expect(planets.length).toBeDefined();
      expect(planets.length).toBe(2);
      expect(planets[0].name).toBe("Planet A");
    });
  });
});
