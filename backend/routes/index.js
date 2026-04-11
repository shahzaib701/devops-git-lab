import { Router } from "express";
import healthRoutes from "./healthRoutes.js";
import messageRoutes from "./messageRoutes.js";

const apiRouter = Router();

apiRouter.use("/health", healthRoutes);
apiRouter.use("/message", messageRoutes);

export default apiRouter;
