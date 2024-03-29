import express, { Request, Response } from "express";
import cors from "cors";
import config from "./config";
import routes from "./Routes/index";
import { logger } from "./Middleware/logger";
import { genericErrorHandler, notFoundError } from "./Middleware/errorHandler";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(routes);
app.use(express.static("./public"));
app.use(logger);
app.use(genericErrorHandler);
app.use(notFoundError);
console.log(`Server listening on port:${config.serverPort}`);
app.listen(config.serverPort);
