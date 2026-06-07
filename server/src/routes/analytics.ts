import { Router, Request, Response } from 'express';
import { trackToolUsage, getTrendingTools, getAdminAnalytics } from '../controllers/analyticsController';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = Router();

// Track tool usage
router.post('/track', trackToolUsage);

// Get trending tools
router.get('/trending', getTrendingTools);

// Get admin analytics (protected route)
router.get('/admin', authenticateToken, requireAdmin, getAdminAnalytics);

export default router;
