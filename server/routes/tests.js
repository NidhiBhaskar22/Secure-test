import express from 'express';
import { auth, isAdmin } from '../middleware/auth.js';
import {
  createTest,
  addQuestion,
  addOption,
  addMultipleOptions,
  mapCorrectOption,
  getAllTests,
  getTestById,
  getAllTestOfUser,
  deleteTest,
  testMarks,
  getUserActivityOnTest,
  testSummary,
} from '../controllers/testController.js';

const router = express.Router();

router.post('/create-test', auth, isAdmin, createTest);
router.post('/questions', auth, isAdmin, addQuestion);
router.post('/options', auth, isAdmin, addOption);
router.post('/options/multiple', auth, isAdmin, addMultipleOptions);
router.post('/questions/correct-option', auth, isAdmin, mapCorrectOption);
router.get('/get-tests', auth, getAllTests);
router.get('/get-test/:id', auth, getTestById);
router.get('/user/:userId', auth, getAllTestOfUser);
router.delete('/delete-test/:id', auth, deleteTest);
router.get("/test-marks/:testId", auth, testMarks);
router.get("/:testId/user/:userId/summary", auth, testSummary);
router.get('/user/:userId/test/:testId/activity', getUserActivityOnTest);

export default router;