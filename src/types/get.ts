import { Health } from "./api";

export interface GET {
  "/user/greet/:id": {
    req: { params: { id: string } };
    res: { message: string };
  };
  "/": {
    req: any;
    res: any;
  };
  "/ping": {
    req: any;
    res: Health;
  };
}
