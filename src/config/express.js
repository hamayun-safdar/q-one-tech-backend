const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const cors = require("cors");
const apiRoutes = require("../api/routes/index");
const rateLimit = require("express-rate-limit");
const bearerToken = require("express-bearer-token");
const compression = require("compression");

/**
 * Express instance
 * @public
 */
const app = express();
   
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bearerToken());

app.use(methodOverride());
const apiRequestLimiterAll = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 90000,
});

app.use("/v1/", apiRequestLimiterAll);

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

// compress all responses
app.use(compression());

// mount api routes
app.use("/", apiRoutes);

module.exports = app;
