import { Router } from "express";
import {
  getMyStats,
  getTotalTimeSpent,
  upsertTimeSpent,
  getUserCount,
  editProfile,
} from "#models/account/index.js";

import { isAuthenticated } from "#middleware/authMiddleware.js";
import { z } from "zod";

const router = Router();

router.post("/edit", isAuthenticated, async function (req, res, next) {
  try {
    const editProfileSchema = z.object({
      username: z.string().min(1),
      icon_link: z.string().min(1).nullable(),
      first_name: z.string().optional(),
      last_name: z.string().optional(),
    });

    const parsedData = editProfileSchema.parse(req.body);
    const result = await editProfile(
      req.user,
      parsedData.username,
      parsedData.icon_link,
      parsedData.first_name,
      parsedData.last_name
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/users/count", async function (req, res, next) {
  try {
    const result = await getUserCount();
    res.status(200).json(result?.[0].COUNT);
  } catch (error) {
    next(error);
  }
});

router.post("/time_spent", isAuthenticated, async function (req, res, next) {
  try {
    const result = await upsertTimeSpent(req.user); // always 5 min
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/time_spent/total", async function (req, res, next) {
  try {
    const result = await getTotalTimeSpent();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/stats", isAuthenticated, async function (req, res, next) {
  try {
    const result = await getMyStats(req.user);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

export default router;
