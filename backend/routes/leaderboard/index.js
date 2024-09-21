import express from "express";
import { isAuthenticated } from "#middleware/authMiddleware.js";

const router = express.Router();
router.use(isAuthenticated);

export default router;
