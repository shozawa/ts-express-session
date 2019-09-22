import Express from "express";
import path from "path";

import { APP_HOST, APP_PORT } from "../constants";

import session from "./session";
import routes from "./routes";

// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require("webpack");
// eslint-disable-next-line import/no-extraneous-dependencies
const webpackDevMiddleware = require("webpack-dev-middleware");
const config = require("../../webpack.config.js");

const app = Express();

session(app);

const compiler = webpack(config);

app.use(
  webpackDevMiddleware(compiler, {
    publickPath: config.output.publickPath
  })
);

const clientDir = path.join(__dirname, "../client");
app.set("view engine", "ejs");
app.set("views", clientDir);

app.use((req, _res, next) => {
  if (req.session !== undefined) {
    if (req.session.count === undefined || req.session.count === null) {
      req.session.count = 0;
    }
  }
  next();
});

routes(app);

app.listen(APP_PORT, APP_HOST, () => {
  // eslint-disable-next-line no-console
  console.log(`Running on http://${APP_HOST}:${APP_PORT}`);
});
