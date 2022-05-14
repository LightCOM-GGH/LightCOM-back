const geo = require("./geo");
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.json({
    message: "hello world",
  });
});

app.post("/traffic", (req, res) => {
  // {
  //   "latitude" : 48.815788,
  //   "longitude" : 2.36328,
  //   "precision": 0.01
  // }
  const data = req.body;

  const latitude = data.latitude;
  const longitude = data.longitude;
  const precision = data.precision || 0.001;

  const results = geo.getTrafficLights(latitude, longitude, precision);

  res.json({
    results: results,
  });
});

app.post("/update", (req, res) => {
  const data = req.body;

  const uuid = data.uuid;
  const stats = data.stats.count;
  const status = data.status;

  let i = geo.length;
  while (i--) {
    if (geo[i].recordid === uuid) {
      geo.geo[i].stats = stats;
      geo.geo[i].status = status;
      break;
    }
  }

  res.json({
    message: "OK",
  });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
