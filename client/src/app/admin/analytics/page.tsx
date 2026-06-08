'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Wrench, 
  Eye, 
  Clock,
  Calendar,
  Activity,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function AdminAnalyticsPage() {
  const router = useRouter();
  const { isAdmin, loading: authLoading, token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  
  const [analytics, setAnalytics] = useState({
    overview: {
      totalViews: 0,
      totalUsers: 0,
      totalToolUsage: 0,
      avgSessionTime: '0m 0s',
      viewsChange: 0,
      usersChange: 0,
      usageChange: 0,
      sessionChange: 0,
    },
    topTools: [] as any[],
    topCategories: [] as any[],
    userActivity: [] as any[],
  });

  useEffect(() => {
    if (!authLoading) {
      if (!isAdmin) {
        alert('Access denied. Admin only.');
        router.push('/');
        return;
      }
      fetchAnalytics();
    }
  }, [authLoading, isAdmin, router, timeRange]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/analytics/admin?timeRange=${timeRange}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setAnalytics(result.data);
        }
      } else {
        console.error('Failed to fetch analytics');
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BarChart3 className="w-8 h-8 text-green-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Analytics Dashboard
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Platform insights and statistics
                </p>
              </div>
            </div>
            <Link
              href="/admin"
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 text-green-700 dark:text-green-300 rounded-lg hover:from-green-200 hover:to-green-300 dark:hover:from-green-800/40 dark:hover:to-green-700/40 transition-all shadow-sm hover:shadow-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="font-medium">Back to Dashboard</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Time Range Filter */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Overview</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setTimeRange('7d')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                timeRange === '7d'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setTimeRange('30d')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                timeRange === '30d'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              30 Days
            </button>
            <button
              onClick={() => setTimeRange('90d')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                timeRange === '90d'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              90 Days
            </button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
              <div className={`flex items-center space-x-1 text-sm font-semibold ${
                analytics.overview.viewsChange > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {analytics.overview.viewsChange > 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                <span>{Math.abs(analytics.overview.viewsChange)}%</span>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {analytics.overview.totalViews.toLocaleString()}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Views</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div className={`flex items-center space-x-1 text-sm font-semibold ${
                analytics.overview.usersChange > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {analytics.overview.usersChange > 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                <span>{Math.abs(analytics.overview.usersChange)}%</span>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {analytics.overview.totalUsers.toLocaleString()}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Users</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Wrench className="w-6 h-6 text-purple-600" />
              </div>
              <div className={`flex items-center space-x-1 text-sm font-semibold ${
                analytics.overview.usageChange > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {analytics.overview.usageChange > 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                <span>{Math.abs(analytics.overview.usageChange)}%</span>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {analytics.overview.totalToolUsage.toLocaleString()}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Tool Usage</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div className={`flex items-center space-x-1 text-sm font-semibold ${
                analytics.overview.sessionChange > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {analytics.overview.sessionChange > 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                <span>{Math.abs(analytics.overview.sessionChange)}%</span>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {analytics.overview.avgSessionTime}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Session Time</p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Tools */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-primary-600" />
              Top 5 Tools
            </h3>
            {analytics.topTools.length > 0 ? (
              <div className="space-y-4">
                {analytics.topTools.map((tool, index) => (
                  <div key={tool.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center font-bold text-primary-600">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{tool.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {tool.views.toLocaleString()} views • {tool.usage.toLocaleString()} uses
                        </p>
                      </div>
                    </div>
                    <div className={`flex items-center space-x-1 ${
                      tool.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {tool.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-48 text-gray-500 dark:text-gray-400">
                No tool usage data available yet
              </div>
            )}
          </div>

          {/* Top Categories */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <BarChart3 className="w-6 h-6 mr-2 text-primary-600" />
              Top Categories
            </h3>
            {analytics.topCategories.length > 0 ? (
              <div className="space-y-4">
                {analytics.topCategories.map((category) => (
                  <div key={category.name}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900 dark:text-white">{category.name}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {category.usage.toLocaleString()} uses ({category.percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-primary-600 to-purple-600 h-3 rounded-full transition-all"
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-48 text-gray-500 dark:text-gray-400">
                No category data available yet
              </div>
            )}
          </div>
        </div>

        {/* User Activity Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Activity className="w-6 h-6 mr-2 text-primary-600" />
            Weekly Activity
          </h3>
          {analytics.userActivity.length > 0 ? (
            <>
              <div className="flex items-end justify-between space-x-2 h-64">
                {analytics.userActivity.map((day) => {
                  const maxUsers = Math.max(...analytics.userActivity.map(d => d.users), 1);
                  const maxViews = Math.max(...analytics.userActivity.map(d => d.views), 1);
                  return (
                    <div key={day.date} className="flex-1 flex flex-col items-center">
                      <div className="w-full flex flex-col items-center space-y-1 mb-2">
                        <div
                          className="w-full bg-gradient-to-t from-primary-600 to-primary-400 rounded-t-lg transition-all hover:from-primary-700 hover:to-primary-500"
                          style={{ height: `${(day.users / maxUsers) * 200}px`, minHeight: day.users > 0 ? '4px' : '0px' }}
                          title={`${day.users} users`}
                        ></div>
                        <div
                          className="w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-lg transition-all hover:from-purple-700 hover:to-purple-500"
                          style={{ height: `${(day.views / maxViews) * 200}px`, minHeight: day.views > 0 ? '4px' : '0px' }}
                          title={`${day.views} views`}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{day.date}</span>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center justify-center space-x-6 mt-6">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gradient-to-r from-primary-600 to-primary-400 rounded"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Users</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gradient-to-r from-purple-600 to-purple-400 rounded"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Views</span>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
              No activity data available yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
