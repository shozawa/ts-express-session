import Express from "express";
import path from "path";

import { APP_HOST, APP_PORT } from "../constants";
import { Health } from "../types/api";

// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require("webpack");
// eslint-disable-next-line import/no-extraneous-dependencies
const webpackDevMiddleware = require("webpack-dev-middleware");
const config = require("../../webpack.config.js");

const app = Express();
const compiler = webpack(config);

app.use(
  webpackDevMiddleware(compiler, {
    publickPath: config.output.publickPath
  })
);

const clientDir = path.join(__dirname, "../client");
app.set("view engine", "ejs");
app.set("views", clientDir);

app.get("/", (_req, res) => {
  res.render("index.ejs", { count: 10 });
});

app.get("/ping", (_req, res) => {
  const data: Health = { message: "pong", count: 100 };
  res.send(data);
});

app.listen(APP_PORT, APP_HOST, () => {
  // eslint-disable-next-line no-console
  console.log(`Running on http://${APP_HOST}:${APP_PORT}`);
});
