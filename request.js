import axios from "axios";

const basePath = "https://swapi.dev/api";

async function makeRequest(url) {
  try {
    const res = await axios.get(url);

    return res.data;
  } catch (err) {
    throw Error("No resource found");
  }
}

function getSubresources(requester, collection) {
  return Promise.all(
    collection.map((item) => {
      if (item.indexOf(basePath) > -1) {
        return requester(item);
      }
      return Promise.resolve(item);
    })
  );
}

async function getResource(
  requester,
  endpoint,
  identifier,
  withCollections = false
) {
  const resource = await requester(`${basePath}/${endpoint}/${identifier}`);
  if (!withCollections) {
    return resource;
  }
  Object.keys(resource).forEach((key) => {
    const value = resource[key];
    if (Array.isArray(value)) {
      const getter = `get${key.substring(0, 1).toUpperCase()}${key.substring(
        1
      )}`;
      resource[getter] = () => getSubresources(requester, resource[key]);
    }
  });

  return resource;
}

export async function getFilm(id) {
  return getResource(makeRequest, "films", id, true);
}
