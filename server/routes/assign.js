import express from "express";
import { auth, isAdmin } from "../middleware/auth.js";
import {
  assignTest,
  getAllUsersOfATest,
} from "../controllers/assignController.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.json({ message: "Assign route is working" });
});

router.post("/", auth, isAdmin, assignTest);

router.get("/:testId", getAllUsersOfATest);

export default router;
