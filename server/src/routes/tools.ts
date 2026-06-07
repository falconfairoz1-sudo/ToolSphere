import { Router, Request, Response } from 'express';
import { getAllTools, getToolById, getToolsByCategory, searchTools } from '../controllers/toolsController';
import { authenticateToken } from './authRoutes';
import Tool from '../models/Tool';
import User from '../models/User';

const router = Router();

// Get all tools
router.get('/', getAllTools);

// Search tools
router.get('/search', searchTools);

// Get tools by category
router.get('/category/:category', getToolsByCategory);

// Get tool by ID
router.get('/:id', getToolById);

// Update tool trending status (Admin only)
router.put('/:id/trending', authenticateToken, async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const { trending } = req.body;

    // Check if user is admin
    const user = await User.findById(req.user.id);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const tool = await Tool.findOneAndUpdate(
      { id },
      { trending },
      { new: true }
    );

    if (!tool) {
      return res.status(404).json({ error: 'Tool not found' });
    }

    res.json({
      success: true,
      message: 'Tool trending status updated',
      tool,
    });
  } catch (error: any) {
    console.error('Error updating trending status:', error);
    res.status(500).json({ error: 'Failed to update trending status', message: error.message });
  }
});

// Update tool new status (Admin only)
router.put('/:id/new', authenticateToken, async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const { new: isNew } = req.body;

    // Check if user is admin
    const user = await User.findById(req.user.id);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const tool = await Tool.findOneAndUpdate(
      { id },
      { new: isNew },
      { new: true }
    );

    if (!tool) {
      return res.status(404).json({ error: 'Tool not found' });
    }

    res.json({
      success: true,
      message: 'Tool new status updated',
      tool,
    });
  } catch (error: any) {
    console.error('Error updating new status:', error);
    res.status(500).json({ error: 'Failed to update new status', message: error.message });
  }
});

export default router;
