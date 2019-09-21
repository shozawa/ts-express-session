import Express from "express";

const app = Express();

app.get("/", (_req, res) => {
  res.send({ message: "hello" });
});

const port = 8888;
const host = "localhost";

app.listen(port, host, () => {
  // eslint-disable-next-line no-console
  console.log(`Running on http://${host}:${port}`);
});
