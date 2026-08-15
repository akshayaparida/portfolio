import { NextResponse } from "next/server";

export interface YouTubeVideo {
  id: string;
  title: string;
  link: string;
  thumbnail: string;
  published: string;
}

const YOUTUBE_CHANNEL_ID = "UCrQsPICFRuDxlGHjWdgo1Pw";
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`;

export async function GET() {
  try {
    const res = await fetch(RSS_URL, {
      next: { revalidate: 1800 }, // Revalidate every 30 minutes
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch YouTube RSS feed" },
        { status: res.status },
      );
    }

    const xmlText = await res.text();
    const videos: YouTubeVideo[] = [];

    // Parse XML entries using regex for high efficiency without heavy DOM dependencies
    const entryMatches = Array.from(
      xmlText.matchAll(/<entry>([\s\S]*?)<\/entry>/g),
    );

    for (const match of entryMatches.slice(0, 6)) {
      const entryXml = match[1];

      const idMatch = entryXml.match(/<yt:videoId>(.*?)<\/yt:videoId>/);
      const titleMatch = entryXml.match(/<title>(.*?)<\/title>/);
      const linkMatch = entryXml.match(/<link rel="alternate" href="(.*?)"\/>/);
      const thumbnailMatch = entryXml.match(/<media:thumbnail url="(.*?)"/);
      const publishedMatch = entryXml.match(/<published>(.*?)<\/published>/);

      if (idMatch && titleMatch) {
        const id = idMatch[1].trim();
        const rawTitle = titleMatch[1].trim();

        // Clean HTML entities in title
        const title = rawTitle
          .replace(/&amp;/g, "&")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'");

        const link = linkMatch
          ? linkMatch[1]
          : `https://www.youtube.com/watch?v=${id}`;
        const thumbnail = thumbnailMatch
          ? thumbnailMatch[1]
          : `https://i1.ytimg.com/vi/${id}/hqdefault.jpg`;

        const rawDate = publishedMatch
          ? publishedMatch[1]
          : new Date().toISOString();
        const dateObj = new Date(rawDate);
        const published = dateObj.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });

        videos.push({
          id,
          title,
          link,
          thumbnail,
          published,
        });
      }
    }

    return NextResponse.json({
      channelHandle: "@akshaya.parida",
      channelUrl: `https://www.youtube.com/@akshaya.parida`,
      channelId: YOUTUBE_CHANNEL_ID,
      videos,
    });
  } catch (error) {
    console.error("Error parsing YouTube RSS feed:", error);
    return NextResponse.json(
      { error: "Internal Server Error fetching YouTube feed" },
      { status: 500 },
    );
  }
}
