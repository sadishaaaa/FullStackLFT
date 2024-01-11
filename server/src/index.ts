import express from "express";
import cors from "cors";
import config from "./config";
import routes from "./Routes/";
import { logger } from "./Middleware/logger";
import { genericErrorHandler, notFoundError } from "./Middleware/errorHandler";

const app = express();

app.use(express.json());
app.use(cors());
app.use(logger);
app.use(routes);
app.use(genericErrorHandler);
app.use(notFoundError);
console.log(`Server listening on port: ${config.serverPort}`);
app.listen(config.serverPort);
