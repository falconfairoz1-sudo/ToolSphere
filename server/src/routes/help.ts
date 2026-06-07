import express from 'express';
import {
  createTicket,
  getAllTickets,
  getTicket,
  updateTicket,
  deleteTicket,
  getMyTickets,
  getDashboardStats,
} from '../controllers/helpController';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = express.Router();

// Public routes
router.post('/tickets', createTicket);

// Protected routes (require authentication)
router.get('/my-tickets', authenticateToken, getMyTickets);
router.get('/tickets/:id', authenticateToken, getTicket);

// Admin only routes
router.get('/tickets', authenticateToken, requireAdmin, getAllTickets);
router.put('/tickets/:id', authenticateToken, requireAdmin, updateTicket);
router.delete('/tickets/:id', authenticateToken, requireAdmin, deleteTicket);
router.get('/stats', authenticateToken, requireAdmin, getDashboardStats);

export default router;
