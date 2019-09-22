import Express from "express";

export default (app: Express.Application) => {
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
};
