import express from "express";
import router from "./routes/index.js";
import { fileURLToPath } from "url";
import path from "path";
import { ErrorMiddleware } from "./middleware/ErrorMiddleware.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "./templates")));

app.use("/api/v1", router);
app.use(ErrorMiddleware);

export default app;
