import { Router } from "express";
import { getMessage } from "../controllers/messageController.js";

const router = Router();

router.get("/", getMessage);

export default router;
