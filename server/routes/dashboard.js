import express from 'express';
import { auth } from '../middleware/auth.js';
import { getAdminDashboardData , getUserDashboardData} from '../controllers/dashboardController.js';

const router = express.Router();

router.get('/admin-dashboard-data', auth, getAdminDashboardData);
router.get('/user-dashboard-data', auth, getUserDashboardData);

export default router;