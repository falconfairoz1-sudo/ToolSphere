import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import HelpTicket from '../models/HelpTicket';
import User from '../models/User';

// @desc    Create a new help ticket
// @route   POST /api/help/tickets
// @access  Public
export const createTicket = async (req: AuthRequest, res: Response) => {
  try {
    const { userName, userEmail, toolId, toolName, issueType, subject, description, priority } = req.body;

    // Validation
    if (!userName || !userEmail || !toolId || !toolName || !issueType || !subject || !description) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const ticketData: any = {
      userName,
      userEmail,
      toolId,
      toolName,
      issueType,
      subject,
      description,
      priority: priority || 'medium',
    };

    // If user is logged in, attach userId
    if (req.user) {
      ticketData.userId = req.user._id;
    }

    const ticket = await HelpTicket.create(ticketData);

    res.status(201).json({
      success: true,
      message: 'Help ticket created successfully',
      ticket,
    });
  } catch (error: any) {
    console.error('Create ticket error:', error);
    res.status(500).json({ message: 'Error creating ticket', error: error.message });
  }
};

// @desc    Get all tickets (Admin only)
// @route   GET /api/help/tickets
// @access  Private/Admin
export const getAllTickets = async (req: AuthRequest, res: Response) => {
  try {
    const { status, issueType, priority, search } = req.query;

    const filter: any = {};

    if (status) filter.status = status;
    if (issueType) filter.issueType = issueType;
    if (priority) filter.priority = priority;
    if (search) {
      filter.$or = [
        { subject: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { userEmail: { $regex: search, $options: 'i' } },
        { toolName: { $regex: search, $options: 'i' } },
      ];
    }

    const tickets = await HelpTicket.find(filter)
      .populate('userId', 'name email')
      .populate('resolvedBy', 'name email')
      .sort({ createdAt: -1 });

    const stats = {
      total: await HelpTicket.countDocuments(),
      open: await HelpTicket.countDocuments({ status: 'open' }),
      inProgress: await HelpTicket.countDocuments({ status: 'in-progress' }),
      resolved: await HelpTicket.countDocuments({ status: 'resolved' }),
      closed: await HelpTicket.countDocuments({ status: 'closed' }),
    };

    res.status(200).json({
      success: true,
      count: tickets.length,
      stats,
      tickets,
    });
  } catch (error: any) {
    console.error('Get tickets error:', error);
    res.status(500).json({ message: 'Error fetching tickets', error: error.message });
  }
};

// @desc    Get single ticket
// @route   GET /api/help/tickets/:id
// @access  Private
export const getTicket = async (req: AuthRequest, res: Response) => {
  try {
    const ticket = await HelpTicket.findById(req.params.id)
      .populate('userId', 'name email')
      .populate('resolvedBy', 'name email');

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Check if user is admin or ticket owner
    if (req.user.role !== 'admin' && ticket.userEmail !== req.user.email) {
      return res.status(403).json({ message: 'Not authorized to view this ticket' });
    }

    res.status(200).json({
      success: true,
      ticket,
    });
  } catch (error: any) {
    console.error('Get ticket error:', error);
    res.status(500).json({ message: 'Error fetching ticket', error: error.message });
  }
};

// @desc    Update ticket status (Admin only)
// @route   PUT /api/help/tickets/:id
// @access  Private/Admin
export const updateTicket = async (req: AuthRequest, res: Response) => {
  try {
    const { status, adminNotes, priority } = req.body;

    const ticket = await HelpTicket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    if (status) ticket.status = status;
    if (adminNotes !== undefined) ticket.adminNotes = adminNotes;
    if (priority) ticket.priority = priority;

    if (status === 'resolved' || status === 'closed') {
      ticket.resolvedBy = req.user?._id as any;
      ticket.resolvedAt = new Date();
    }

    await ticket.save();

    const updatedTicket = await HelpTicket.findById(ticket._id)
      .populate('userId', 'name email')
      .populate('resolvedBy', 'name email');

    res.status(200).json({
      success: true,
      message: 'Ticket updated successfully',
      ticket: updatedTicket,
    });
  } catch (error: any) {
    console.error('Update ticket error:', error);
    res.status(500).json({ message: 'Error updating ticket', error: error.message });
  }
};

// @desc    Delete ticket (Admin only)
// @route   DELETE /api/help/tickets/:id
// @access  Private/Admin
export const deleteTicket = async (req: AuthRequest, res: Response) => {
  try {
    const ticket = await HelpTicket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    await ticket.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Ticket deleted successfully',
    });
  } catch (error: any) {
    console.error('Delete ticket error:', error);
    res.status(500).json({ message: 'Error deleting ticket', error: error.message });
  }
};

// @desc    Get user's tickets
// @route   GET /api/help/my-tickets
// @access  Private
export const getMyTickets = async (req: AuthRequest, res: Response) => {
  try {
    const tickets = await HelpTicket.find({ userEmail: req.user.email })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tickets.length,
      tickets,
    });
  } catch (error: any) {
    console.error('Get my tickets error:', error);
    res.status(500).json({ message: 'Error fetching tickets', error: error.message });
  }
};

// @desc    Get dashboard stats (Admin only)
// @route   GET /api/help/stats
// @access  Private/Admin
export const getDashboardStats = async (req: AuthRequest, res: Response) => {
  try {
    const totalTickets = await HelpTicket.countDocuments();
    const openTickets = await HelpTicket.countDocuments({ status: 'open' });
    const inProgressTickets = await HelpTicket.countDocuments({ status: 'in-progress' });
    const resolvedTickets = await HelpTicket.countDocuments({ status: 'resolved' });
    const closedTickets = await HelpTicket.countDocuments({ status: 'closed' });

    // Get tickets by issue type
    const bugTickets = await HelpTicket.countDocuments({ issueType: 'bug' });
    const featureRequests = await HelpTicket.countDocuments({ issueType: 'feature-request' });
    const questions = await HelpTicket.countDocuments({ issueType: 'question' });
    const otherTickets = await HelpTicket.countDocuments({ issueType: 'other' });

    // Get tickets by priority
    const highPriority = await HelpTicket.countDocuments({ priority: 'high' });
    const mediumPriority = await HelpTicket.countDocuments({ priority: 'medium' });
    const lowPriority = await HelpTicket.countDocuments({ priority: 'low' });

    // Get recent tickets
    const recentTickets = await HelpTicket.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('userId', 'name email');

    // Get most reported tools
    const toolStats = await HelpTicket.aggregate([
      {
        $group: {
          _id: '$toolId',
          toolName: { $first: '$toolName' },
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    // Get total users
    const totalUsers = await User.countDocuments();
    const adminUsers = await User.countDocuments({ role: 'admin' });

    res.status(200).json({
      success: true,
      stats: {
        tickets: {
          total: totalTickets,
          open: openTickets,
          inProgress: inProgressTickets,
          resolved: resolvedTickets,
          closed: closedTickets,
        },
        issueTypes: {
          bugs: bugTickets,
          featureRequests,
          questions,
          other: otherTickets,
        },
        priority: {
          high: highPriority,
          medium: mediumPriority,
          low: lowPriority,
        },
        users: {
          total: totalUsers,
          admins: adminUsers,
        },
      },
      recentTickets,
      topReportedTools: toolStats,
    });
  } catch (error: any) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Error fetching stats', error: error.message });
  }
};
