import { NextResponse } from "next/server";

export interface YouTubeVideo {
  id: string;
  title: string;
  link: string;
  thumbnail: string;
  published: string;
  isShort: boolean;
}

const YOUTUBE_CHANNEL_ID = "UCrQsPICFRuDxlGHjWdgo1Pw";
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`;

// Preset catalog of all 6 full-length YouTube videos to ensure none are missed
const FULL_VIDEOS_CATALOG: YouTubeVideo[] = [
  {
    id: "_J9pODk4Plw",
    title: "Bengaluru Bike Taxi Ban: Protecting Public, or Auto Goons?",
    link: "https://www.youtube.com/watch?v=_J9pODk4Plw",
    thumbnail: "https://i1.ytimg.com/vi/_J9pODk4Plw/hqdefault.jpg",
    published: "Recent",
    isShort: false,
  },
  {
    id: "M5HEVPU9ptE",
    title:
      "UGC NET JRF 2026 and GATE CS 2027 free resources build by Gemini Spark AI.",
    link: "https://www.youtube.com/watch?v=M5HEVPU9ptE",
    thumbnail: "https://i1.ytimg.com/vi/M5HEVPU9ptE/hqdefault.jpg",
    published: "Recent",
    isShort: false,
  },
  {
    id: "2mYYJM_o58o",
    title:
      "Achhe Din: Episode 1 | Can WE Turn Hindustan Into a Superpower? Let’s Get Into The System.",
    link: "https://www.youtube.com/watch?v=2mYYJM_o58o",
    thumbnail: "https://i1.ytimg.com/vi/2mYYJM_o58o/hqdefault.jpg",
    published: "Full Video",
    isShort: false,
  },
  {
    id: "Qqrn5jxrmzA",
    title:
      "Central University Of Rajasthan ( CURAJ ) How to Reach, Physical Reporting & Hostel Allotment 2026",
    link: "https://www.youtube.com/watch?v=Qqrn5jxrmzA",
    thumbnail: "https://i1.ytimg.com/vi/Qqrn5jxrmzA/hqdefault.jpg",
    published: "Full Video",
    isShort: false,
  },
  {
    id: "n27EBP3fm60",
    title: "Mahendragiri Mountain, Gajapati, Odisha, India",
    link: "https://www.youtube.com/watch?v=n27EBP3fm60",
    thumbnail: "https://i1.ytimg.com/vi/n27EBP3fm60/hqdefault.jpg",
    published: "Full Video",
    isShort: false,
  },
  {
    id: "CX3nb7dvvoU",
    title: "Dev Sanskriti Vishwavidyalaya (DSVV) | Haridwar, Uttarakhand",
    link: "https://www.youtube.com/watch?v=CX3nb7dvvoU",
    thumbnail: "https://i1.ytimg.com/vi/CX3nb7dvvoU/hqdefault.jpg",
    published: "Full Video",
    isShort: false,
  },
];

export async function GET() {
  try {
    const res = await fetch(RSS_URL, {
      next: { revalidate: 1800 }, // Revalidate every 30 minutes
    });

    const videosMap = new Map<string, YouTubeVideo>();

    if (res.ok) {
      const xmlText = await res.text();
      const entryMatches = Array.from(
        xmlText.matchAll(/<entry>([\s\S]*?)<\/entry>/g),
      );

      for (const match of entryMatches) {
        const entryXml = match[1];

        const idMatch = entryXml.match(/<yt:videoId>(.*?)<\/yt:videoId>/);
        const titleMatch = entryXml.match(/<title>(.*?)<\/title>/);
        const linkMatch = entryXml.match(
          /<link rel="alternate" href="(.*?)"\/>/,
        );
        const thumbnailMatch = entryXml.match(/<media:thumbnail url="(.*?)"/);
        const publishedMatch = entryXml.match(/<published>(.*?)<\/published>/);

        if (idMatch && titleMatch) {
          const id = idMatch[1].trim();
          const rawTitle = titleMatch[1].trim();

          const title = rawTitle
            .replace(/&amp;/g, "&")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'");

          const rawLink = linkMatch
            ? linkMatch[1]
            : `https://www.youtube.com/watch?v=${id}`;

          const isShort =
            rawLink.includes("/shorts/") ||
            title.toLowerCase().includes("#shorts") ||
            title.toLowerCase().includes("#short");

          const link = isShort
            ? `https://www.youtube.com/shorts/${id}`
            : `https://www.youtube.com/watch?v=${id}`;

          const thumbnail = thumbnailMatch
            ? thumbnailMatch[1]
            : `https://i1.ytimg.com/vi/${id}/hqdefault.jpg`;

          const rawDate = publishedMatch
            ? publishedMatch[1]
            : new Date().toISOString();
          const dateObj = new Date(rawDate);
          const published = isNaN(dateObj.getTime())
            ? "Recent"
            : dateObj.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              });

          videosMap.set(id, {
            id,
            title,
            link,
            thumbnail,
            published,
            isShort,
          });
        }
      }
    }

    // Append any older preset catalog videos that might not be in the RSS feed (older than the top 15)
    for (const v of FULL_VIDEOS_CATALOG) {
      if (!videosMap.has(v.id)) {
        videosMap.set(v.id, v);
      }
    }

    const videos = Array.from(videosMap.values());

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
