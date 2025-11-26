"use client";

import { useState, useEffect, useCallback } from "react";

interface AnalyticsData {
  visitors: {
    total: number;
    unique: number;
    returning: number;
  };
  regions: {
    country: string;
    city: string;
    visitors: number;
    percentage: number;
  }[];
  pageViews: {
    path: string;
    views: number;
  }[];
  devices: {
    type: string;
    count: number;
    percentage: number;
  }[];
  browsers: {
    name: string;
    count: number;
    percentage: number;
  }[];
}

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<"24h" | "7d" | "30d" | "all">("7d");

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      // This endpoint would fetch data from Vercel Analytics API
      // You'll need to set up an API route to fetch this data
      const response = await fetch(`/api/analytics?range=${timeRange}`);

      if (!response.ok) {
        throw new Error("Failed to fetch analytics data");
      }

      const data = await response.json();
      setAnalytics(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [timeRange]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="text-red-800 font-semibold">Error loading analytics</h3>
            <p className="text-red-600 mt-2">{error}</p>
            <div className="text-sm text-red-500 mt-4">
              Note: To view analytics, you need to:
              <ol className="list-decimal ml-5 mt-2 space-y-1">
                <li>Deploy your site to Vercel</li>
                <li>Enable Vercel Analytics in your project settings</li>
                <li>Set up the API route at <code className="bg-red-100 px-1 rounded">/api/analytics</code></li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600">Track your website visitors and engagement</p>
        </div>

        {/* Time Range Selector */}
        <div className="mb-6 flex gap-2">
          {(["24h", "7d", "30d", "all"] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                timeRange === range
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
              }`}
            >
              {range === "24h" && "Last 24 Hours"}
              {range === "7d" && "Last 7 Days"}
              {range === "30d" && "Last 30 Days"}
              {range === "all" && "All Time"}
            </button>
          ))}
        </div>

        {/* Visitor Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Visitors</p>
                <p className="text-3xl font-bold text-gray-900">{analytics.visitors.total.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="fas fa-users text-blue-600 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Unique Visitors</p>
                <p className="text-3xl font-bold text-gray-900">{analytics.visitors.unique.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="fas fa-user-check text-green-600 text-xl"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Returning Visitors</p>
                <p className="text-3xl font-bold text-gray-900">{analytics.visitors.returning.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <i className="fas fa-sync-alt text-purple-600 text-xl"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Visitors by Region */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <i className="fas fa-globe text-blue-600"></i>
            Visitors by Region
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Country</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">City</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Visitors</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Percentage</th>
                </tr>
              </thead>
              <tbody>
                {analytics.regions.map((region, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-900">{region.country}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{region.city}</td>
                    <td className="py-3 px-4 text-sm text-gray-900 text-right font-medium">
                      {region.visitors.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${region.percentage}%` }}
                          ></div>
                        </div>
                        {region.percentage.toFixed(1)}%
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Pages */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="fas fa-file-alt text-green-600"></i>
              Top Pages
            </h2>
            <div className="space-y-3">
              {analytics.pageViews.map((page, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 font-medium truncate">{page.path}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${(page.views / analytics.pageViews[0].views) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="ml-4 text-sm font-semibold text-gray-900">{page.views.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Devices & Browsers */}
          <div className="space-y-6">
            {/* Devices */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="fas fa-mobile-alt text-purple-600"></i>
                Devices
              </h2>
              <div className="space-y-3">
                {analytics.devices.map((device, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 capitalize">{device.type}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full"
                          style={{ width: `${device.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-900 w-16 text-right">
                        {device.percentage.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Browsers */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="fas fa-window-restore text-orange-600"></i>
                Browsers
              </h2>
              <div className="space-y-3">
                {analytics.browsers.map((browser, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{browser.name}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-orange-600 h-2 rounded-full"
                          style={{ width: `${browser.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-900 w-16 text-right">
                        {browser.percentage.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-blue-900 font-semibold mb-2 flex items-center gap-2">
            <i className="fas fa-info-circle"></i>
            About Analytics
          </h3>
          <p className="text-blue-800 text-sm">
            This dashboard displays real-time analytics data from Vercel Analytics. Data includes visitor counts,
            geographic locations, device types, and page performance metrics. Analytics are privacy-friendly and
            do not use cookies or track personal information.
          </p>
        </div>
      </div>
    </div>
  );
}
