import Express from "express";
import path from "path";

const app = Express();

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
