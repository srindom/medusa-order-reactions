import { Router } from "express";
import orderReactions from "./order-reactions";

export default () => {
  const app = Router();

  app.use(orderReactions());

  return app;
};
