import { NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Use a unique namespace and key for your portfolio
    // This service increments the counter on every hit
    const response = await fetch("https://api.countapi.xyz/hit/akshayaparida-portfolio/visits");
    
    if (!response.ok) {
      // Fallback if the service is down
      return NextResponse.json({ visitors: { total: 0 } });
    }

    const data = await response.json();
    
    return NextResponse.json({
      visitors: {
        total: data.value || 0
      }
    }, {
      headers: {
        "Cache-Control": "no-store"
      }
    });
  } catch (error) {
    console.error("Counter API error:", error);
    return NextResponse.json({ visitors: { total: 0 } });
  }
}
