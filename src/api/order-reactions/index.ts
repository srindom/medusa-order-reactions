import { wrapHandler } from "@medusajs/utils";
import { projectConfig } from "../../../medusa-config";
import authenticate from "@medusajs/medusa/dist/api/middlewares/authenticate";
import bodyParser from "body-parser";
import cors from "cors";
import glob from "glob";
import { Router } from "express";

export default () => {
  const router = Router();

  const adminRoutes = glob.sync(`${__dirname}/admin/*.js`);
  for (const route of adminRoutes) {
    // Use exported config object to determine method
    const { method, path } = require(route).config;

    // Use path or file name to determine endpoint
    let endpoint = path ?? route.split("/").pop().split(".")[0];
    if (endpoint === "index") {
      endpoint = "";
    }

    if (!endpoint.startsWith("/")) {
      endpoint = `/${endpoint}`;
    }

    if (endpoint === "/") {
      endpoint = "";
    }

    // Use exported default function to determine handler
    const handler = require(route).default;

    const middlewares = [];
    const corsOptions = {
      origin: projectConfig.admin_cors.split(","),
      credentials: true,
    };

    middlewares.push(cors(corsOptions));
    middlewares.push(authenticate());

    // If post add body parser to middlewares
    if (method === "post" || method === "delete") {
      middlewares.push(bodyParser.json());
    }

    // Register middleware
    router.use(`/admin/order-reactions${endpoint}`, ...middlewares);

    // Register router
    router[method](`/admin/order-reactions${endpoint}`, wrapHandler(handler));
  }

  return router;
};
