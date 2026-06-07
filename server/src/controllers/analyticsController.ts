import { Request, Response } from 'express';
import Analytics from '../models/Analytics';
import User from '../models/User';

export const trackToolUsage = async (req: Request, res: Response) => {
  try {
    const { toolId, toolName, category, action, userId, sessionId } = req.body;

    if (!toolId || !toolName || !category || !action) {
      return res.status(400).json({
        success: false,
        error: 'Tool ID, name, category, and action are required',
      });
    }

    await Analytics.create({
      toolId,
      toolName,
      category,
      action,
      userId,
      sessionId,
      timestamp: new Date(),
    });

    res.json({
      success: true,
      message: 'Usage tracked',
    });
  } catch (error) {
    console.error('Track usage error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to track usage',
    });
  }
};

export const getTrendingTools = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const days = parseInt(req.query.days as string) || 7;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const trending = await Analytics.aggregate([
      {
        $match: {
          timestamp: { $gte: startDate },
          action: 'use',
        },
      },
      {
        $group: {
          _id: '$toolId',
          toolName: { $first: '$toolName' },
          category: { $first: '$category' },
          usageCount: { $sum: 1 },
        },
      },
      {
        $sort: { usageCount: -1 },
      },
      {
        $limit: limit,
      },
    ]);

    res.json({
      success: true,
      data: trending,
    });
  } catch (error) {
    console.error('Get trending tools error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch trending tools',
    });
  }
};

export const getAdminAnalytics = async (req: Request, res: Response) => {
  try {
    const timeRange = req.query.timeRange as string || '30d';
    
    // Calculate date range
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get total users
    const totalUsers = await User.countDocuments();
    
    // Get new users in time range
    const newUsers = await User.countDocuments({
      createdAt: { $gte: startDate },
    });

    // Get total views and usage
    const [viewsData, usageData] = await Promise.all([
      Analytics.countDocuments({
        timestamp: { $gte: startDate },
        action: 'view',
      }),
      Analytics.countDocuments({
        timestamp: { $gte: startDate },
        action: 'use',
      }),
    ]);

    // Calculate previous period for comparison
    const prevStartDate = new Date(startDate);
    prevStartDate.setDate(prevStartDate.getDate() - days);

    const [prevViews, prevUsage, prevUsers] = await Promise.all([
      Analytics.countDocuments({
        timestamp: { $gte: prevStartDate, $lt: startDate },
        action: 'view',
      }),
      Analytics.countDocuments({
        timestamp: { $gte: prevStartDate, $lt: startDate },
        action: 'use',
      }),
      User.countDocuments({
        createdAt: { $gte: prevStartDate, $lt: startDate },
      }),
    ]);

    // Calculate percentage changes
    const viewsChange = prevViews > 0 ? ((viewsData - prevViews) / prevViews) * 100 : 0;
    const usageChange = prevUsage > 0 ? ((usageData - prevUsage) / prevUsage) * 100 : 0;
    const usersChange = prevUsers > 0 ? ((newUsers - prevUsers) / prevUsers) * 100 : 0;

    // Get top tools
    const topTools = await Analytics.aggregate([
      {
        $match: {
          timestamp: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: '$toolId',
          toolName: { $first: '$toolName' },
          views: {
            $sum: { $cond: [{ $eq: ['$action', 'view'] }, 1, 0] },
          },
          usage: {
            $sum: { $cond: [{ $eq: ['$action', 'use'] }, 1, 0] },
          },
        },
      },
      {
        $sort: { usage: -1 },
      },
      {
        $limit: 5,
      },
      {
        $project: {
          id: '$_id',
          name: '$toolName',
          views: 1,
          usage: 1,
          trend: 'up', // Simplified - could calculate actual trend
          _id: 0,
        },
      },
    ]);

    // Get top categories
    const topCategories = await Analytics.aggregate([
      {
        $match: {
          timestamp: { $gte: startDate },
          action: 'use',
        },
      },
      {
        $group: {
          _id: '$category',
          usage: { $sum: 1 },
        },
      },
      {
        $sort: { usage: -1 },
      },
      {
        $limit: 5,
      },
    ]);

    const totalCategoryUsage = topCategories.reduce((sum, cat) => sum + cat.usage, 0);
    const categoriesWithPercentage = topCategories.map((cat) => ({
      name: cat._id,
      usage: cat.usage,
      percentage: totalCategoryUsage > 0 ? Math.round((cat.usage / totalCategoryUsage) * 100) : 0,
    }));

    // Get daily activity for the last 7 days
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);

    const dailyActivity = await Analytics.aggregate([
      {
        $match: {
          timestamp: { $gte: last7Days },
        },
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
            action: '$action',
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { '_id.date': 1 },
      },
    ]);

    // Format daily activity
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const activityByDay: any = {};
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayName = daysOfWeek[date.getDay()];
      
      activityByDay[dateStr] = {
        date: dayName,
        users: 0,
        views: 0,
      };
    }

    dailyActivity.forEach((item) => {
      if (activityByDay[item._id.date]) {
        if (item._id.action === 'view') {
          activityByDay[item._id.date].views = item.count;
        } else if (item._id.action === 'use') {
          activityByDay[item._id.date].users = item.count;
        }
      }
    });

    const userActivity = Object.values(activityByDay);

    // Calculate average session time (simplified - using 4m 32s as placeholder)
    const avgSessionTime = '4m 32s';
    const sessionChange = 5.7;

    res.json({
      success: true,
      data: {
        overview: {
          totalViews: viewsData,
          totalUsers,
          totalToolUsage: usageData,
          avgSessionTime,
          viewsChange: Math.round(viewsChange * 10) / 10,
          usersChange: Math.round(usersChange * 10) / 10,
          usageChange: Math.round(usageChange * 10) / 10,
          sessionChange,
        },
        topTools,
        topCategories: categoriesWithPercentage,
        userActivity,
      },
    });
  } catch (error) {
    console.error('Get admin analytics error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch analytics',
    });
  }
};
