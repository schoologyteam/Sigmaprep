import { isAuthenticated } from "#middleware/authMiddleware.js";
import {
  getQuestionsAnsweredByMonthAndYear,
  getWhichUsersAnsweredMostQuestions,
  postAnswer,
} from "#models/answer/index.js";
import express from "express";
const router = express.Router();

router.use(isAuthenticated);

router.post("/:choice_id", async function (req, res) {
  try {
    const result = await postAnswer(req.user, req.params.choice_id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "server error, could not upload answer" });
  }
});

router.get("/top", async function (req, res) {
  try {
    const result = await getWhichUsersAnsweredMostQuestions();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "server error, retrieve top qs answered" });
  }
});

router.get("/qsansweredbymandy", async function (req, res) {
  try {
    const result = await getQuestionsAnsweredByMonthAndYear();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "server error, getting all qs answerd by month and year",
    });
  }
});

export default router;
