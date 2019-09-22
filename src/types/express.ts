import Express from "express";
import { HttpError } from "http-errors";
import { IRouterMatcher } from "express-serve-static-core";
import { GET } from "./get";

declare module "express" {
  interface RequestParam {
    query?: any;
    params?: any;
    body?: any;
  }

  interface ExRequest<T extends RequestParam> extends Express.Request {
    query: T["query"];
    params: T["params"];
    body: T["body"];
  }

  interface ExResponse<T> extends Express.Response {
    send: (body?: T) => ExResponse<T>;
  }

  interface ExNextFunction {
    (err?: HttpError): void;
  }

  interface ExRequestHandler<T extends { req?: any; res?: any }> {
    (
      req: ExRequest<T["req"]>,
      res: ExResponse<T["res"]>,
      next: ExNextFunction
    ): any;
  }

  interface Application {
    get: <P extends keyof GET>(
      path: P,
      handler: ExRequestHandler<GET[P]>
    ) => any & IRouterMatcher<this>;
  }
}
