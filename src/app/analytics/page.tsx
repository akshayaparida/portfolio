import AnalyticsDashboard from "@/components/Analytics/AnalyticsDashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analytics Dashboard",
  description: "View website analytics and visitor statistics",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AnalyticsPage() {
  return <AnalyticsDashboard />;
}
