import { Request, Response } from 'express';
import Tool from '../models/Tool';

export const getAllTools = async (req: Request, res: Response) => {
  try {
    const tools = await Tool.find().sort({ name: 1 });
    res.json({
      success: true,
      count: tools.length,
      data: tools,
    });
  } catch (error) {
    console.error('Get all tools error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch tools',
    });
  }
};

export const getToolById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tool = await Tool.findOne({ id });

    if (!tool) {
      return res.status(404).json({
        success: false,
        error: 'Tool not found',
      });
    }

    res.json({
      success: true,
      data: tool,
    });
  } catch (error) {
    console.error('Get tool by ID error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch tool',
    });
  }
};

export const getToolsByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const filteredTools = await Tool.find({ category }).sort({ name: 1 });

    res.json({
      success: true,
      count: filteredTools.length,
      data: filteredTools,
    });
  } catch (error) {
    console.error('Get tools by category error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch tools by category',
    });
  }
};

export const searchTools = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;
    
    if (!q || typeof q !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Search query is required',
      });
    }

    const query = q.toLowerCase();
    
    // Use MongoDB text search or regex
    const results = await Tool.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { tags: { $in: [new RegExp(query, 'i')] } },
      ],
    }).sort({ name: 1 });

    res.json({
      success: true,
      count: results.length,
      query: q,
      data: results,
    });
  } catch (error) {
    console.error('Search tools error:', error);
    res.status(500).json({
      success: false,
      error: 'Search failed',
    });
  }
};
