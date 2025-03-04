import express from "express";
import { auth } from "../middleware/auth.js";
import {
  attempts,
  attemptSession,
  checkAssignment,
  endSession,
  getSession,
  sessionStart,
  updateSession,
  updateStatus,
  warning,
  answerAttempt,
} from "../controllers/sessionController.js";
const router = express.Router();

router.post("/start", auth, sessionStart);

// API to update the status of the test
router.post("/update-status", auth, updateStatus);

router.get("/check-assignment/:testId", auth, checkAssignment);

router.post("/warning/:sessionId", auth, warning);

router.post("/end/:sessionId", auth, endSession);

router.patch("/update/:sessionId", auth, updateSession);

router.get("/", auth, getSession);

router.post("/:sessionId/attempt", auth, attemptSession);

router.get("/:sessionId/attempts", auth, attempts);

router.post("/session/:sessionId/answers", auth, answerAttempt);


export default router;
