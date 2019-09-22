import Express from "express";

declare module "express" {
  interface ExResponse<T> extends Express.Response {
    send: (body?: T) => ExResponse<T>;
  }
}
