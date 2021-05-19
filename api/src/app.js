const express = require("express");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const routes = require("./routes/index.js");
const passport = require('./passport');
const cors = require('cors');
const { APP_URL } = process.env;

require("./db.js");

const server = express();

server.name = "API";

server.use(morgan("dev"));
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", APP_URL); 
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

server.use(passport.initialize());

server.use("/", routes);

module.exports = server;