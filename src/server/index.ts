import Express from "express";
import path from "path";

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
  res.render("index.ejs");
});

const port = 8888;
const host = "localhost";

app.listen(port, host, () => {
  // eslint-disable-next-line no-console
  console.log(`Running on http://${host}:${port}`);
});
