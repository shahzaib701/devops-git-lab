import express from "express";
import cors from "cors";
import { config } from "./config/index.js";
import apiRoutes from "./routes/index.js";

const app = express();

app.use(cors(config.corsOptions));
app.use(express.json());

app.use("/api", apiRoutes);

app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(config.port, () => {
  console.log(`API listening on http://localhost:${config.port}`);
});
