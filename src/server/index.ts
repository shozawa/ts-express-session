import Express from "express";
import path from "path";

import { APP_HOST, APP_PORT } from "../constants";
import { Health } from "../types/api";

import session from "./session";

// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require("webpack");
// eslint-disable-next-line import/no-extraneous-dependencies
const webpackDevMiddleware = require("webpack-dev-middleware");
const config = require("../../webpack.config.js");

const app: Express.Application = Express();

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

app.get("/", (req, res) => {
  res.render("index.ejs", { count: req.session!.count });
});

app.get("/user/great/:id", (req, res, next) => {
  const {
    params: { id }
  } = req;
  res.send({ message: `Hello, ${id}` });
  next();
});

app.get("/ping", (req, res, next) => {
  if (req.session && req.session.count) {
    req.session.count += 1;
    const data = { message: "pong", count: req.session.count };
    res.send(data);
  }
  next();
});

app.listen(APP_PORT, APP_HOST, () => {
  // eslint-disable-next-line no-console
  console.log(`Running on http://${APP_HOST}:${APP_PORT}`);
});
