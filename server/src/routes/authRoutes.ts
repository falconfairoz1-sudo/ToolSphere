import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, name, role, referenceCode } = req.body;

    // Validate input
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Validate admin registration
    if (role === 'admin') {
      if (referenceCode !== 's7019391310') {
        return res.status(400).json({ error: 'Invalid admin reference code' });
      }
    }

    // Check if user exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      email: email.toLowerCase(),
      name,
      password: hashedPassword,
      role: role === 'admin' ? 'admin' : 'user',
    });

    // Generate token
    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        bookmarks: user.bookmarks,
        recentTools: user.recentTools,
      },
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed', message: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }

    // Find user and include password
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        bookmarks: user.bookmarks,
        recentTools: user.recentTools,
      },
    });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed', message: error.message });
  }
});

// Verify token middleware
export const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid token' });
  }
};

// Get current user
router.get('/me', authenticateToken, async (req: any, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        bookmarks: user.bookmarks,
        recentTools: user.recentTools,
      },
    });
  } catch (error: any) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to get user', message: error.message });
  }
});

// Update user bookmarks
router.post('/bookmarks', authenticateToken, async (req: any, res) => {
  try {
    const { toolId, action } = req.body; // action: 'add' or 'remove'

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (action === 'add') {
      if (!user.bookmarks.includes(toolId)) {
        user.bookmarks.push(toolId);
      }
    } else if (action === 'remove') {
      user.bookmarks = user.bookmarks.filter(id => id !== toolId);
    }

    await user.save();

    res.json({
      success: true,
      bookmarks: user.bookmarks,
    });
  } catch (error: any) {
    console.error('Bookmark error:', error);
    res.status(500).json({ error: 'Failed to update bookmarks', message: error.message });
  }
});

// Add to recent tools
router.post('/recent', authenticateToken, async (req: any, res) => {
  try {
    const { toolId } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Remove if already exists
    user.recentTools = user.recentTools.filter(id => id !== toolId);
    
    // Add to beginning
    user.recentTools.unshift(toolId);
    
    // Keep only last 10
    user.recentTools = user.recentTools.slice(0, 10);

    await user.save();

    res.json({
      success: true,
      recentTools: user.recentTools,
    });
  } catch (error: any) {
    console.error('Recent tools error:', error);
    res.status(500).json({ error: 'Failed to update recent tools', message: error.message });
  }
});

// Get all users (Admin only)
router.get('/users', authenticateToken, async (req: any, res) => {
  try {
    // Check if user is admin
    const currentUser = await User.findById(req.user.id);
    if (!currentUser || currentUser.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const users = await User.find({}).select('-password').sort({ createdAt: -1 });

    res.json({
      success: true,
      users,
      count: users.length,
    });
  } catch (error: any) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Failed to get users', message: error.message });
  }
});

// Delete user (Admin only)
router.delete('/users/:id', authenticateToken, async (req: any, res) => {
  try {
    // Check if user is admin
    const currentUser = await User.findById(req.user.id);
    if (!currentUser || currentUser.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const { id } = req.params;

    // Prevent deleting yourself
    if (id === req.user.id) {
      return res.status(400).json({ error: 'Cannot delete your own account' });
    }

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error: any) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Failed to delete user', message: error.message });
  }
});

export default router;
