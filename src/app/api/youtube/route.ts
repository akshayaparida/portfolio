import { NextResponse } from "next/server";

export interface YouTubeVideo {
  id: string;
  title: string;
  link: string;
  thumbnail: string;
  published: string;
  isShort: boolean;
}

const YOUTUBE_CHANNEL_HANDLE = "@akshaya.parida";
const YOUTUBE_CHANNEL_ID = "UCrQsPICFRuDxlGHjWdgo1Pw";
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`;

// Preset catalog of all full-length YouTube videos as an infallible baseline
const FULL_VIDEOS_CATALOG: YouTubeVideo[] = [
  {
    id: "80CU0IBRVKI",
    title:
      "Acche Din La Ke Rahenge: EP2: Hindu Rashtra, Raksha Bandhan Degradation, GenZ Problem, Ban Thar, CJP",
    link: "https://www.youtube.com/watch?v=80CU0IBRVKI",
    thumbnail: "https://i1.ytimg.com/vi/80CU0IBRVKI/hqdefault.jpg",
    published: "Recent",
    isShort: false,
  },
  {
    id: "-5uD_ohTPqc",
    title:
      "Odisha Uber and Rapido Driver Protest: Can IIT & KIIT Tech Replace Uber and Rapido?",
    link: "https://www.youtube.com/watch?v=-5uD_ohTPqc",
    thumbnail: "https://i1.ytimg.com/vi/-5uD_ohTPqc/hqdefault.jpg",
    published: "Recent",
    isShort: false,
  },
  {
    id: "_J9pODk4Plw",
    title: "Bengaluru Bike Taxi Ban: Protecting Public, or Auto Goons?",
    link: "https://www.youtube.com/watch?v=_J9pODk4Plw",
    thumbnail: "https://i1.ytimg.com/vi/_J9pODk4Plw/hqdefault.jpg",
    published: "Full Video",
    isShort: false,
  },
  {
    id: "M5HEVPU9ptE",
    title:
      "UGC NET JRF 2026 and GATE CS 2027 Free Resources Built By Gemini Spark AI.",
    link: "https://www.youtube.com/watch?v=M5HEVPU9ptE",
    thumbnail: "https://i1.ytimg.com/vi/M5HEVPU9ptE/hqdefault.jpg",
    published: "Full Video",
    isShort: false,
  },
  {
    id: "2mYYJM_o58o",
    title:
      "Acche Din La Ke Rahenge: EP 1 | Can WE Turn Hindustan Into a Superpower? Let’s Get Into The System.",
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

// Preset catalog of YouTube Shorts as an infallible baseline
const SHORTS_CATALOG: YouTubeVideo[] = [
  {
    id: "dtBNun-MEZo",
    title: "CURAJ central library.",
    link: "https://www.youtube.com/shorts/dtBNun-MEZo",
    thumbnail: "https://i1.ytimg.com/vi/dtBNun-MEZo/hqdefault.jpg",
    published: "Short",
    isShort: true,
  },
  {
    id: "PsT--vcLiD0",
    title: "nvidia geforce rtx in cs lab.",
    link: "https://www.youtube.com/shorts/PsT--vcLiD0",
    thumbnail: "https://i1.ytimg.com/vi/PsT--vcLiD0/hqdefault.jpg",
    published: "Short",
    isShort: true,
  },
  {
    id: "82VppWRRgGY",
    title: "World class CURAJ facilities.",
    link: "https://www.youtube.com/shorts/82VppWRRgGY",
    thumbnail: "https://i1.ytimg.com/vi/82VppWRRgGY/hqdefault.jpg",
    published: "Short",
    isShort: true,
  },
  {
    id: "8G2QxTa3fbU",
    title: "CURAJ Hockey Ground.",
    link: "https://www.youtube.com/shorts/8G2QxTa3fbU",
    thumbnail: "https://i1.ytimg.com/vi/8G2QxTa3fbU/hqdefault.jpg",
    published: "Short",
    isShort: true,
  },
  {
    id: "F6Pv-D3pqeM",
    title: "CURAJ Football Ground.",
    link: "https://www.youtube.com/shorts/F6Pv-D3pqeM",
    thumbnail: "https://i1.ytimg.com/vi/F6Pv-D3pqeM/hqdefault.jpg",
    published: "Short",
    isShort: true,
  },
  {
    id: "RN1yNO5pKgg",
    title: "Biochemistry Lab Coat, CURAJ E-commerce flipkart point.",
    link: "https://www.youtube.com/shorts/RN1yNO5pKgg",
    thumbnail: "https://i1.ytimg.com/vi/RN1yNO5pKgg/hqdefault.jpg",
    published: "Short",
    isShort: true,
  },
  {
    id: "PGCxwi8GLyk",
    title: "CURAJ WIFI login delayed.",
    link: "https://www.youtube.com/shorts/PGCxwi8GLyk",
    thumbnail: "https://i1.ytimg.com/vi/PGCxwi8GLyk/hqdefault.jpg",
    published: "Short",
    isShort: true,
  },
  {
    id: "LF105W-TM9o",
    title:
      "CURAJ Megamess curry full of oil heart attack guarantee forget about nutrition.",
    link: "https://www.youtube.com/shorts/LF105W-TM9o",
    thumbnail: "https://i1.ytimg.com/vi/LF105W-TM9o/hqdefault.jpg",
    published: "Short",
    isShort: true,
  },
  {
    id: "rjLepPPB_BE",
    title: "CURAJ Campus Rain 🌧 Edition.",
    link: "https://www.youtube.com/shorts/rjLepPPB_BE",
    thumbnail: "https://i1.ytimg.com/vi/rjLepPPB_BE/hqdefault.jpg",
    published: "Short",
    isShort: true,
  },
  {
    id: "OmNAIB0Qb6I",
    title: "Peak CURAJ Male content JCB Ki Khudai.",
    link: "https://www.youtube.com/shorts/OmNAIB0Qb6I",
    thumbnail: "https://i1.ytimg.com/vi/OmNAIB0Qb6I/hqdefault.jpg",
    published: "Short",
    isShort: true,
  },
  {
    id: "LpimkZqZcAo",
    title:
      "We need RO drinking water in CURAJ B6 hostel as well not only washing machine.",
    link: "https://www.youtube.com/shorts/LpimkZqZcAo",
    thumbnail: "https://i1.ytimg.com/vi/LpimkZqZcAo/hqdefault.jpg",
    published: "Short",
    isShort: true,
  },
  {
    id: "hXpNm8DfziI",
    title: "Guest enjoying the food at CURAJ Mega Mess.",
    link: "https://www.youtube.com/shorts/hXpNm8DfziI",
    thumbnail: "https://i1.ytimg.com/vi/hXpNm8DfziI/hqdefault.jpg",
    published: "Short",
    isShort: true,
  },
  {
    id: "Zn2ZrR6Nmqo",
    title: "CURAJ Sports Field.",
    link: "https://www.youtube.com/shorts/Zn2ZrR6Nmqo",
    thumbnail: "https://i1.ytimg.com/vi/Zn2ZrR6Nmqo/hqdefault.jpg",
    published: "Short",
    isShort: true,
  },
  {
    id: "jPidzcaygXM",
    title: "CURAJ central library. it's hall type I didn't like it.",
    link: "https://www.youtube.com/shorts/jPidzcaygXM",
    thumbnail: "https://i1.ytimg.com/vi/jPidzcaygXM/hqdefault.jpg",
    published: "Short",
    isShort: true,
  },
  {
    id: "QVerlEzWNrk",
    title: "Dear CJP, please give your support to Jharkhand student protest.",
    link: "https://www.youtube.com/shorts/QVerlEzWNrk",
    thumbnail: "https://i1.ytimg.com/vi/QVerlEzWNrk/hqdefault.jpg",
    published: "Short",
    isShort: true,
  },
  {
    id: "Va_l5iSvgQc",
    title:
      "end casteism end reservation end diversity qouta and focus only on meritocracy.",
    link: "https://www.youtube.com/shorts/Va_l5iSvgQc",
    thumbnail: "https://i1.ytimg.com/vi/Va_l5iSvgQc/hqdefault.jpg",
    published: "Short",
    isShort: true,
  },
  {
    id: "CfEdRg2pZEQ",
    title: "CURAJ E-commerce delivery point behind post office",
    link: "https://www.youtube.com/shorts/CfEdRg2pZEQ",
    thumbnail: "https://i1.ytimg.com/vi/CfEdRg2pZEQ/hqdefault.jpg",
    published: "Short",
    isShort: true,
  },
  {
    id: "qxY9sQSo3HE",
    title: "CURAJ Campus.",
    link: "https://www.youtube.com/shorts/qxY9sQSo3HE",
    thumbnail: "https://i1.ytimg.com/vi/qxY9sQSo3HE/hqdefault.jpg",
    published: "Short",
    isShort: true,
  },
  {
    id: "YpZob8J9HFk",
    title: "CURAJ Mega mess breakfast and leakage infrastructure due to rain.",
    link: "https://www.youtube.com/shorts/YpZob8J9HFk",
    thumbnail: "https://i1.ytimg.com/vi/YpZob8J9HFk/hqdefault.jpg",
    published: "Short",
    isShort: true,
  },
  {
    id: "MS012oE0Y2E",
    title: "Bengaluru horrible public infrastructure and it's a Slum IT city.",
    link: "https://www.youtube.com/shorts/MS012oE0Y2E",
    thumbnail: "https://i1.ytimg.com/vi/MS012oE0Y2E/hqdefault.jpg",
    published: "Short",
    isShort: true,
  },
  {
    id: "an6wlNSeGWE",
    title: "Hair salon outside curaj gate 3 #curaj",
    link: "https://www.youtube.com/shorts/an6wlNSeGWE",
    thumbnail: "https://i1.ytimg.com/vi/an6wlNSeGWE/hqdefault.jpg",
    published: "Short",
    isShort: true,
  },
  {
    id: "_svtexYc6AE",
    title: "CURAJ FITNESS CENTER",
    link: "https://www.youtube.com/shorts/_svtexYc6AE",
    thumbnail: "https://i1.ytimg.com/vi/_svtexYc6AE/hqdefault.jpg",
    published: "Short",
    isShort: true,
  },
  {
    id: "dn17SKSlYrY",
    title:
      "CURAJ academic building near to computer science building for PM vidyalaxmi loan related visit",
    link: "https://www.youtube.com/shorts/dn17SKSlYrY",
    thumbnail: "https://i1.ytimg.com/vi/dn17SKSlYrY/hqdefault.jpg",
    published: "Short",
    isShort: true,
  },
  {
    id: "salPbdzQZkQ",
    title: "curaj msc cs classroom ground floor 2026",
    link: "https://www.youtube.com/shorts/salPbdzQZkQ",
    thumbnail: "https://i1.ytimg.com/vi/salPbdzQZkQ/hqdefault.jpg",
    published: "Short",
    isShort: true,
  },
  {
    id: "mB9SvutRhmk",
    title: "curaj side bandrasindri bus stop",
    link: "https://www.youtube.com/shorts/mB9SvutRhmk",
    thumbnail: "https://i1.ytimg.com/vi/mB9SvutRhmk/hqdefault.jpg",
    published: "Short",
    isShort: true,
  },
  {
    id: "y8NhtCPll-U",
    title: "bandrasindri RSRTC bus stop.",
    link: "https://www.youtube.com/shorts/y8NhtCPll-U",
    thumbnail: "https://i1.ytimg.com/vi/y8NhtCPll-U/hqdefault.jpg",
    published: "Short",
    isShort: true,
  },
];

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractYtInitialData(html: string): any {
  const marker = "ytInitialData";
  const index = html.indexOf(marker);
  if (index === -1) return null;

  const eqIndex = html.indexOf("=", index);
  if (eqIndex === -1) return null;

  const braceStart = html.indexOf("{", eqIndex);
  if (braceStart === -1) return null;

  let openBraces = 0;
  let inString = false;
  let escapeNext = false;
  let braceEnd = -1;

  for (let i = braceStart; i < html.length; i++) {
    const char = html[i];

    if (escapeNext) {
      escapeNext = false;
      continue;
    }

    if (char === "\\") {
      escapeNext = true;
      continue;
    }

    if (char === '"') {
      inString = !inString;
      continue;
    }

    if (!inString) {
      if (char === "{") {
        openBraces++;
      } else if (char === "}") {
        openBraces--;
        if (openBraces === 0) {
          braceEnd = i;
          break;
        }
      }
    }
  }

  if (braceEnd !== -1) {
    try {
      const jsonStr = html.slice(braceStart, braceEnd + 1);
      return JSON.parse(jsonStr);
    } catch {
      return null;
    }
  }

  return null;
}

// In-memory cache to ensure speed and eliminate rate-limiting
let cachedVideos: YouTubeVideo[] | null = null;
let cacheTime = 0;
const CACHE_DURATION_MS = 10 * 60 * 1000; // 10 minutes

async function fetchTabFromChannel(
  tabName: "videos" | "shorts",
): Promise<YouTubeVideo[]> {
  try {
    const url = `https://www.youtube.com/${YOUTUBE_CHANNEL_HANDLE}/${tabName}`;
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
      next: { revalidate: 600 },
    });

    if (!res.ok) return [];

    const html = await res.text();
    const data = extractYtInitialData(html);

    if (!data) return [];

    const tabs = data?.contents?.twoColumnBrowseResultsRenderer?.tabs || [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const activeTab = tabs.find((t: any) => t.tabRenderer?.selected);
    const contents =
      activeTab?.tabRenderer?.content?.richGridRenderer?.contents || [];

    const items: YouTubeVideo[] = [];

    for (const item of contents) {
      const lockup = item.richItemRenderer?.content?.lockupViewModel;
      const shortsLockup =
        item.richItemRenderer?.content?.shortsLockupViewModel;
      const videoRenderer = item.richItemRenderer?.content?.videoRenderer;
      const reelRenderer = item.richItemRenderer?.content?.reelItemRenderer;

      if (lockup) {
        const id = lockup.contentId;
        const rawTitle =
          lockup.metadata?.lockupMetadataViewModel?.title?.content ||
          lockup.rendererContext?.accessibilityContext?.label ||
          "";
        const title = decodeHtmlEntities(rawTitle);

        const metadataRows =
          lockup.metadata?.lockupMetadataViewModel?.metadata
            ?.contentMetadataViewModel?.metadataRows || [];
        let published = "Recent";

        for (const row of metadataRows) {
          for (const part of row.metadataParts || []) {
            const text = part.text?.content || "";
            if (
              text.includes("ago") ||
              text.includes("streamed") ||
              text.includes("Premiered")
            ) {
              published = text;
            }
          }
        }

        if (id) {
          items.push({
            id,
            title,
            link: `https://www.youtube.com/watch?v=${id}`,
            thumbnail: `https://i1.ytimg.com/vi/${id}/hqdefault.jpg`,
            published,
            isShort: false,
          });
        }
      } else if (shortsLockup) {
        let id =
          shortsLockup.entityId?.replace(/^shorts-shelf-item-/, "") || "";
        if (
          !id &&
          shortsLockup.onTap?.innertubeCommand?.commandMetadata
            ?.webCommandMetadata?.url
        ) {
          const u =
            shortsLockup.onTap.innertubeCommand.commandMetadata
              .webCommandMetadata.url;
          id = u.replace("/shorts/", "");
        }
        if (!id) {
          const str = JSON.stringify(shortsLockup);
          const m =
            str.match(/\/shorts\/([a-zA-Z0-9_-]+)/) ||
            str.match(/"videoId":"([a-zA-Z0-9_-]+)"/);
          if (m) id = m[1];
        }

        const rawTitle =
          shortsLockup.overlayMetadata?.primaryText?.content || "";
        const title = decodeHtmlEntities(rawTitle);
        const views =
          shortsLockup.overlayMetadata?.secondaryText?.content || "Short";

        if (id) {
          items.push({
            id,
            title,
            link: `https://www.youtube.com/shorts/${id}`,
            thumbnail: `https://i1.ytimg.com/vi/${id}/hqdefault.jpg`,
            published: views,
            isShort: true,
          });
        }
      } else if (videoRenderer) {
        const id = videoRenderer.videoId;
        const rawTitle =
          videoRenderer.title?.runs?.[0]?.text ||
          videoRenderer.title?.simpleText ||
          "";
        const title = decodeHtmlEntities(rawTitle);
        const published =
          videoRenderer.publishedTimeText?.simpleText || "Recent";

        if (id) {
          items.push({
            id,
            title,
            link: `https://www.youtube.com/watch?v=${id}`,
            thumbnail: `https://i1.ytimg.com/vi/${id}/hqdefault.jpg`,
            published,
            isShort: false,
          });
        }
      } else if (reelRenderer) {
        const id = reelRenderer.videoId;
        const rawTitle =
          reelRenderer.headline?.simpleText ||
          reelRenderer.headline?.runs?.[0]?.text ||
          "";
        const title = decodeHtmlEntities(rawTitle);

        if (id) {
          items.push({
            id,
            title,
            link: `https://www.youtube.com/shorts/${id}`,
            thumbnail: `https://i1.ytimg.com/vi/${id}/hqdefault.jpg`,
            published: "Short",
            isShort: true,
          });
        }
      }
    }

    return items;
  } catch (err) {
    console.error(`Error scraping YouTube tab ${tabName}:`, err);
    return [];
  }
}

async function fetchFromRSS(): Promise<YouTubeVideo[]> {
  try {
    const res = await fetch(RSS_URL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)",
      },
      next: { revalidate: 1800 },
    });

    if (!res.ok) return [];

    const xmlText = await res.text();
    const entryMatches = Array.from(
      xmlText.matchAll(/<entry>([\s\S]*?)<\/entry>/g),
    );

    const results: YouTubeVideo[] = [];

    for (const match of entryMatches) {
      const entryXml = match[1];
      const idMatch = entryXml.match(/<yt:videoId>(.*?)<\/yt:videoId>/);
      const titleMatch = entryXml.match(/<title>(.*?)<\/title>/);
      const linkMatch = entryXml.match(/<link rel="alternate" href="(.*?)"\/>/);
      const thumbnailMatch = entryXml.match(/<media:thumbnail url="(.*?)"/);
      const publishedMatch = entryXml.match(/<published>(.*?)<\/published>/);

      if (idMatch && titleMatch) {
        const id = idMatch[1].trim();
        const title = decodeHtmlEntities(titleMatch[1].trim());

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

        results.push({
          id,
          title,
          link,
          thumbnail,
          published,
          isShort,
        });
      }
    }

    return results;
  } catch (err) {
    console.error("Error fetching YouTube RSS:", err);
    return [];
  }
}

export async function GET() {
  try {
    const now = Date.now();
    if (
      cachedVideos &&
      cachedVideos.length > 0 &&
      now - cacheTime < CACHE_DURATION_MS
    ) {
      return NextResponse.json({
        channelHandle: YOUTUBE_CHANNEL_HANDLE,
        channelUrl: `https://www.youtube.com/${YOUTUBE_CHANNEL_HANDLE}`,
        channelId: YOUTUBE_CHANNEL_ID,
        videos: cachedVideos,
        cached: true,
      });
    }

    // Step 1: Scrape Videos and Shorts tabs concurrently
    const [scrapedVideos, scrapedShorts] = await Promise.all([
      fetchTabFromChannel("videos"),
      fetchTabFromChannel("shorts"),
    ]);

    const videosMap = new Map<string, YouTubeVideo>();

    // Add scraped regular videos
    for (const v of scrapedVideos) {
      videosMap.set(v.id, v);
    }

    // Add scraped shorts
    for (const s of scrapedShorts) {
      videosMap.set(s.id, s);
    }

    // Step 2: If scraping returned nothing for regular videos, try RSS
    if (scrapedVideos.length === 0) {
      const rssVideos = await fetchFromRSS();
      for (const v of rssVideos) {
        if (!videosMap.has(v.id)) {
          videosMap.set(v.id, v);
        }
      }
    }

    // Step 3: Backfill with the preset catalogs so no historical video or short is missed
    for (const v of FULL_VIDEOS_CATALOG) {
      if (!videosMap.has(v.id)) {
        videosMap.set(v.id, v);
      }
    }

    for (const s of SHORTS_CATALOG) {
      if (!videosMap.has(s.id)) {
        videosMap.set(s.id, s);
      }
    }

    const videos = Array.from(videosMap.values());

    // Update in-memory cache
    cachedVideos = videos;
    cacheTime = now;

    return NextResponse.json({
      channelHandle: YOUTUBE_CHANNEL_HANDLE,
      channelUrl: `https://www.youtube.com/${YOUTUBE_CHANNEL_HANDLE}`,
      channelId: YOUTUBE_CHANNEL_ID,
      videos,
      cached: false,
    });
  } catch (error) {
    console.error("Error in YouTube API route:", error);

    // In the worst case, return the full combined catalogs
    const fallbackList = [...FULL_VIDEOS_CATALOG, ...SHORTS_CATALOG];
    return NextResponse.json({
      channelHandle: YOUTUBE_CHANNEL_HANDLE,
      channelUrl: `https://www.youtube.com/${YOUTUBE_CHANNEL_HANDLE}`,
      channelId: YOUTUBE_CHANNEL_ID,
      videos: fallbackList,
      fallback: true,
    });
  }
}
