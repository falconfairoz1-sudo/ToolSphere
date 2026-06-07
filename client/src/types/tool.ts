export type ToolCategory = 
  | 'productivity'
  | 'pdf'
  | 'word-doc'
  | 'powerpoint'
  | 'image'
  | 'video'
  | 'ai'
  | 'developer'
  | 'finance'
  | 'data'
  | 'student'
  | 'web'
  | 'security'
  | 'utility'
  | 'audio'
  | 'entertainment'
  | 'writing'
  | 'business'
  | 'social'
  | 'converter'
  | 'health'
  | 'advanced';

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: string;
  tags: string[];
  trending?: boolean;
  new?: boolean;
  popular?: boolean;
  route: string;
}

export interface CategoryInfo {
  id: ToolCategory;
  name: string;
  icon: string;
  color: string;
  gradient: string;
  description: string;
  count: number;
}

export interface SearchResult extends Tool {
  score: number;
  matchedTags: string[];
}
