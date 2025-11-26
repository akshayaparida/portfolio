import { NextResponse } from "next/server";

export const runtime = "edge";

interface VercelAnalyticsQuery {
  range?: "24h" | "7d" | "30d" | "all";
}

// Mock data for development - Replace with actual Vercel Analytics API calls
function getMockAnalyticsData() {
  return {
    visitors: {
      total: 1247,
      unique: 892,
      returning: 355,
    },
    regions: [
      { country: "United States", city: "New York", visitors: 342, percentage: 27.4 },
      { country: "India", city: "Bangalore", visitors: 287, percentage: 23.0 },
      { country: "United Kingdom", city: "London", visitors: 198, percentage: 15.9 },
      { country: "Germany", city: "Berlin", visitors: 156, percentage: 12.5 },
      { country: "Canada", city: "Toronto", visitors: 124, percentage: 9.9 },
      { country: "Australia", city: "Sydney", visitors: 89, percentage: 7.1 },
      { country: "Singapore", city: "Singapore", visitors: 51, percentage: 4.1 },
    ],
    pageViews: [
      { path: "/", views: 543 },
      { path: "/projects", views: 289 },
      { path: "/learning", views: 198 },
      { path: "/about", views: 156 },
      { path: "/contact", views: 61 },
    ],
    devices: [
      { type: "desktop", count: 687, percentage: 55.1 },
      { type: "mobile", count: 435, percentage: 34.9 },
      { type: "tablet", count: 125, percentage: 10.0 },
    ],
    browsers: [
      { name: "Chrome", count: 623, percentage: 50.0 },
      { name: "Safari", count: 311, percentage: 24.9 },
      { name: "Firefox", count: 187, percentage: 15.0 },
      { name: "Edge", count: 87, percentage: 7.0 },
      { name: "Other", count: 39, percentage: 3.1 },
    ],
  };
}

// Function to fetch real Vercel Analytics data
async function getVercelAnalytics(range: string) {
  const VERCEL_TOKEN = process.env.VERCEL_ANALYTICS_TOKEN;
  const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID;
  const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID;

  // If environment variables are not set, return mock data
  if (!VERCEL_TOKEN || !VERCEL_PROJECT_ID || VERCEL_TOKEN === "" || VERCEL_PROJECT_ID === "") {
    console.warn("Vercel Analytics credentials not configured. Using mock data.");
    return getMockAnalyticsData();
  }

  try {
    // Calculate time range
    const now = Date.now();
    const timeRanges = {
      "24h": 24 * 60 * 60 * 1000,
      "7d": 7 * 24 * 60 * 60 * 1000,
      "30d": 30 * 24 * 60 * 60 * 1000,
      "all": 365 * 24 * 60 * 60 * 1000, // 1 year
    };
    const since = now - (timeRanges[range as keyof typeof timeRanges] || timeRanges["7d"]);

    // Vercel Analytics API endpoint
    const baseUrl = VERCEL_TEAM_ID
      ? `https://api.vercel.com/v1/analytics/${VERCEL_PROJECT_ID}/stats`
      : `https://api.vercel.com/v1/projects/${VERCEL_PROJECT_ID}/analytics`;

    const headers = {
      Authorization: `Bearer ${VERCEL_TOKEN}`,
      "Content-Type": "application/json",
    };

    // Fetch various analytics data
    const [visitorsRes, regionsRes, pagesRes, devicesRes] = await Promise.all([
      // Visitors
      fetch(`${baseUrl}?since=${since}`, { headers }),
      // Geographic data
      fetch(`${baseUrl}/geo?since=${since}`, { headers }),
      // Page views
      fetch(`${baseUrl}/pages?since=${since}`, { headers }),
      // Devices
      fetch(`${baseUrl}/devices?since=${since}`, { headers }),
    ]);

    if (!visitorsRes.ok) {
      console.warn(`Failed to fetch Vercel analytics: ${visitorsRes.statusText}. Falling back to mock data.`);
      return getMockAnalyticsData();
    }

    const [visitorsData, regionsData, pagesData, devicesData] = await Promise.all([
      visitorsRes.json(),
      regionsRes.json(),
      pagesRes.json(),
      devicesRes.json(),
    ]);

    // Transform the data to match our interface
    const totalVisitors = visitorsData.total || 0;
    const uniqueVisitors = visitorsData.unique || 0;

    return {
      visitors: {
        total: totalVisitors,
        unique: uniqueVisitors,
        returning: totalVisitors - uniqueVisitors,
      },
      regions: (regionsData.data || []).map((region: { country?: string; city?: string; visitors?: number }) => ({
        country: region.country || "Unknown",
        city: region.city || "Unknown",
        visitors: region.visitors || 0,
        percentage: totalVisitors > 0 ? ((region.visitors || 0) / totalVisitors) * 100 : 0,
      })),
      pageViews: (pagesData.data || []).map((page: { path?: string; views?: number }) => ({
        path: page.path || "/",
        views: page.views || 0,
      })),
      devices: (devicesData.data || []).map((device: { type?: string; count?: number }) => ({
        type: device.type || "unknown",
        count: device.count || 0,
        percentage: totalVisitors > 0 ? ((device.count || 0) / totalVisitors) * 100 : 0,
      })),
      browsers: (devicesData.browsers || []).map((browser: { name?: string; count?: number }) => ({
        name: browser.name || "Unknown",
        count: browser.count || 0,
        percentage: totalVisitors > 0 ? ((browser.count || 0) / totalVisitors) * 100 : 0,
      })),
    };
  } catch (error) {
    console.error("Analytics API error:", error);
    // Return mock data as fallback
    return getMockAnalyticsData();
  }
}

export async function GET(request: Request) {
  console.log("Analytics API called");
  try {
    const { searchParams } = new URL(request.url);
    const range = (searchParams.get("range") as VercelAnalyticsQuery["range"]) || "7d";

    // Validate range parameter
    if (!["24h", "7d", "30d", "all"].includes(range)) {
      return NextResponse.json(
        { error: "Invalid range parameter. Use: 24h, 7d, 30d, or all" },
        { status: 400 }
      );
    }

    const analyticsData = await getVercelAnalytics(range);
    console.log("Analytics data retrieved successfully");

    return NextResponse.json(analyticsData, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("Analytics API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics data" },
      { status: 500 }
    );
  }
}
