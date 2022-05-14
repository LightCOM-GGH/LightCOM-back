const fs = require("fs");
const path = require("path");
const file = path.join(__dirname, "./geo.json");
const geo = JSON.parse(fs.readFileSync(file, "utf8"));

const abs = Math.abs;

function getTrafficLights(latitude, longitude, precision = 0.01) {
  let i = geo.length;
  const result = [];
  while (i--) {
    if (!geo[i].status) {
      geo[i].status = "unknown";
    }

    const coords = geo[i]["coords"];

    if (
      abs(coords[0] - latitude) < precision &&
      abs(coords[1] - longitude) < precision
    ) {
      result.push({
        latitude: coords[0],
        longitude: coords[1],
        status: geo[i].status,
      });
    }
  }
  return result;
}

module.exports = {
  getTrafficLights,
  geo,
};
