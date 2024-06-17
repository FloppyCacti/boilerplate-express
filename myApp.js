require("dotenv").config();
let bodyParser = require("body-parser");
let express = require("express");
let app = express();

app.use("/public", express.static(__dirname + "/public"));

app.use((req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE == "uppercase") {
    res.json({
      message: "HELLO JSON",
    });
  } else {
    res.json({
      message: "Hello json",
    });
  }
});

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.send({ time: req.time });
  }
);

app.get(
  "/:word/echo",
  (req, res, next) => {
    req.word = req.params.word;
    next();
  },
  (req, res) => {
    res.send({ echo: req.word });
  }
);

app.get(
  "/name",
  (req, res, next) => {
    req.name = `${req.query.first} ${req.query.last}`;
    next();
  },
  (req, res) => {
    res.send({ name: req.name });
  }
);

app.post("/name", (req, res) => {
  res.send({ name: `${req.body.first} ${req.body.last}` });
});

module.exports = app;
