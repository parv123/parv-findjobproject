var PORT = process.env.PORT || 3000;
var express = require("express");
var app = express();
var cors = require("cors");
var request = require("request");
app.use(cors({ origin: true }));
app.get("/", function (req, res) {
  res.send("connected to the server");
});
app.get("/:location/:description", (req, res, next) => {
  var options = {
    url: `https://jobs.github.com/positions.json?description=${req.params.description}&location=${req.params.location}`,
    headers: {
      "User-Agent": "My web server",
      "content-type": "application/json",
    },
  };
  function callback(error, response, body) {
    try {
      if (!error && response.statusCode === 200) {
        res.send(JSON.parse(body));
        return;
      } else if (response.statusCode === 404) {
        res.send({ message: "your city not found" });
        return;
      }
      console.log(response.coord.lon);
      res.status(response.statusCode).send(response);
    } catch (err) {
      res.send(err);
    }
  }
  request(options, callback);
});

app.listen(PORT);
