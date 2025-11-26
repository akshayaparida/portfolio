import { NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Use counterapi.dev as a reliable alternative
    // Endpoint: /v1/{namespace}/{key}/up (increments and returns)
    const response = await fetch("https://api.counterapi.dev/v1/akshayaparida-portfolio/visits/up");
    
    if (!response.ok) {
      console.warn("Counter API error:", response.statusText);
      return NextResponse.json({ visitors: { total: 0 } });
    }

    const data = await response.json();
    
    return NextResponse.json({
      visitors: {
        // counterapi.dev returns { count: 123 }
        total: data.count || 0
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
