import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 180; // 3 minutes revalidation

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
    id: "xG8HywlK5d4",
    title:
      "​End of Bengaluru ? Hire Locals or Face Action: CM DK Shivakumar’s Warning to Bengaluru IT Firms",
    link: "https://www.youtube.com/watch?v=xG8HywlK5d4",
    thumbnail: "https://i1.ytimg.com/vi/xG8HywlK5d4/hqdefault.jpg",
    published: "19h ago",
    isShort: false,
  },
  {
    id: "ViXWO5NzN1E",
    title:
      "Discrete Mathematics noc26_cs137 NPTEL Exam Experience 2026 & How to Reach TCS ION Sitapura, Jaipur",
    link: "https://www.youtube.com/watch?v=ViXWO5NzN1E",
    thumbnail: "https://i1.ytimg.com/vi/ViXWO5NzN1E/hqdefault.jpg",
    published: "2w ago",
    isShort: false,
  },
  {
    id: "I3XpQKn8KbE",
    title:
      "Self-Defense Truths Every Woman Needs to Hear | Spray, Tactical Flashlight, Safety Alarm, Air Pistol",
    link: "https://www.youtube.com/watch?v=I3XpQKn8KbE",
    thumbnail: "https://i1.ytimg.com/vi/I3XpQKn8KbE/hqdefault.jpg",
    published: "1mo ago",
    isShort: false,
  },
  {
    id: "A2tkuNyZJQw",
    title: "Nuakhai Juhar 2026: Traditions, Food & Sambalpuri Vibes",
    link: "https://www.youtube.com/watch?v=A2tkuNyZJQw",
    thumbnail: "https://i1.ytimg.com/vi/A2tkuNyZJQw/hqdefault.jpg",
    published: "1mo ago",
    isShort: false,
  },
  {
    id: "Noufml7KHmo",
    title:
      "Ground Reality of NAAC A++ CURAJ B6 Boys Hostel: No RO Water, Choked Washrooms & Broken Restroom ",
    link: "https://www.youtube.com/watch?v=Noufml7KHmo",
    thumbnail: "https://i1.ytimg.com/vi/Noufml7KHmo/hqdefault.jpg",
    published: "1mo ago",
    isShort: false,
  },
  {
    id: "A0uLdfhb6nY",
    title:
      "Kaun Banega Super Teacher's Day Play | Jadoo Dhoop, Thakur Guest Appearance | Dept. of CS, CURAJ",
    link: "https://www.youtube.com/watch?v=A0uLdfhb6nY",
    thumbnail: "https://i1.ytimg.com/vi/A0uLdfhb6nY/hqdefault.jpg",
    published: "1mo ago",
    isShort: false,
  },
  {
    id: "HljZNDM98JI",
    title:
      "Khelo India Yuva Sambad, Olympics 2036 Vision, NSS 2026, Mess Protein Deficiency Food Complaint ",
    link: "https://www.youtube.com/watch?v=HljZNDM98JI",
    thumbnail: "https://i1.ytimg.com/vi/HljZNDM98JI/hqdefault.jpg",
    published: "2mo ago",
    isShort: false,
  },
  {
    id: "80CU0IBRVKI",
    title:
      "Acche Din La Ke Rahenge: EP2: Hindu Rashtra, Raksha Bandhan Degradation, GenZ Problem, Ban Thar, CJP",
    link: "https://www.youtube.com/watch?v=80CU0IBRVKI",
    thumbnail: "https://i1.ytimg.com/vi/80CU0IBRVKI/hqdefault.jpg",
    published: "2mo ago",
    isShort: false,
  },
  {
    id: "-5uD_ohTPqc",
    title:
      "Odisha Uber and Rapido Driver Protest: Can IIT BBSR & KIIT Tech Replace Gig Driver app?",
    link: "https://www.youtube.com/watch?v=-5uD_ohTPqc",
    thumbnail: "https://i1.ytimg.com/vi/-5uD_ohTPqc/hqdefault.jpg",
    published: "2mo ago",
    isShort: false,
  },
  {
    id: "_J9pODk4Plw",
    title: "Bengaluru Bike Taxi Ban: Protecting Public, or Auto Goons?",
    link: "https://www.youtube.com/watch?v=_J9pODk4Plw",
    thumbnail: "https://i1.ytimg.com/vi/_J9pODk4Plw/hqdefault.jpg",
    published: "2mo ago",
    isShort: false,
  },
  {
    id: "M5HEVPU9ptE",
    title:
      "UGC NET JRF and GATE CS  Free Resources ( Gemini Spark AI ) Practice Paper (PYQ), GATE NPTEL (MOCK)",
    link: "https://www.youtube.com/watch?v=M5HEVPU9ptE",
    thumbnail: "https://i1.ytimg.com/vi/M5HEVPU9ptE/hqdefault.jpg",
    published: "3mo ago",
    isShort: false,
  },
  {
    id: "2mYYJM_o58o",
    title:
      "Acche Din La Ke Rahenge: EP 1 | Can WE Turn Hindustan Into a Superpower? Let’s Get Into The System.",
    link: "https://www.youtube.com/watch?v=2mYYJM_o58o",
    thumbnail: "https://i1.ytimg.com/vi/2mYYJM_o58o/hqdefault.jpg",
    published: "3mo ago",
    isShort: false,
  },
  {
    id: "Qqrn5jxrmzA",
    title:
      "Central University Of Rajasthan ( CURAJ ) How to Reach, Physical Reporting & Hostel Allotment 2026",
    link: "https://www.youtube.com/watch?v=Qqrn5jxrmzA",
    thumbnail: "https://i1.ytimg.com/vi/Qqrn5jxrmzA/hqdefault.jpg",
    published: "3mo ago",
    isShort: false,
  },
  {
    id: "n27EBP3fm60",
    title: "Mahendragiri Mountain, The second highest mountain of Odisha.",
    link: "https://www.youtube.com/watch?v=n27EBP3fm60",
    thumbnail: "https://i1.ytimg.com/vi/n27EBP3fm60/hqdefault.jpg",
    published: "1y ago",
    isShort: false,
  },
  {
    id: "CX3nb7dvvoU",
    title: "Dev Sanskriti Vishwavidyalaya (DSVV) | Haridwar, Uttarakhand",
    link: "https://www.youtube.com/watch?v=CX3nb7dvvoU",
    thumbnail: "https://i1.ytimg.com/vi/CX3nb7dvvoU/hqdefault.jpg",
    published: "5y ago",
    isShort: false,
  },
];

// Preset catalog of YouTube Shorts as an infallible baseline
const SHORTS_CATALOG: YouTubeVideo[] = [
  {
    id: "XRvspHrhiok",
    title: "Kotia village issue: Odisha and Andhra Pradesh Border area.",
    link: "https://www.youtube.com/shorts/XRvspHrhiok",
    thumbnail: "https://i1.ytimg.com/vi/XRvspHrhiok/hqdefault.jpg",
    published: "12 views",
    isShort: true,
  },
  {
    id: "Tr4VF6enHcE",
    title:
      "Elon musk Starlink vs Ambani, USA H1B visa issue, indian IT companies suspended in USA.",
    link: "https://www.youtube.com/shorts/Tr4VF6enHcE",
    thumbnail: "https://i1.ytimg.com/vi/Tr4VF6enHcE/hqdefault.jpg",
    published: "89 views",
    isShort: true,
  },
  {
    id: "vJYK-PuU0W4",
    title: "SIR CJP Protest Part 2",
    link: "https://www.youtube.com/shorts/vJYK-PuU0W4",
    thumbnail: "https://i1.ytimg.com/vi/vJYK-PuU0W4/hqdefault.jpg",
    published: "123 views",
    isShort: true,
  },
  {
    id: "CHtD7LgOXH8",
    title: "SIR Protest, CJP and ECI, Gyanesh Kumar Resign.",
    link: "https://www.youtube.com/shorts/CHtD7LgOXH8",
    thumbnail: "https://i1.ytimg.com/vi/CHtD7LgOXH8/hqdefault.jpg",
    published: "91 views",
    isShort: true,
  },
  {
    id: "Cp2GFh99IyM",
    title: "Tiranga 🇮🇳",
    link: "https://www.youtube.com/shorts/Cp2GFh99IyM",
    thumbnail: "https://i1.ytimg.com/vi/Cp2GFh99IyM/hqdefault.jpg",
    published: "1.3K views",
    isShort: true,
  },
  {
    id: "xg-FJqK4rJA",
    title: "CURAJ Academic Building.",
    link: "https://www.youtube.com/shorts/xg-FJqK4rJA",
    thumbnail: "https://i1.ytimg.com/vi/xg-FJqK4rJA/hqdefault.jpg",
    published: "94 views",
    isShort: true,
  },
  {
    id: "vshRGVT5ZOc",
    title: "CURAJ terrace and water facilities.",
    link: "https://www.youtube.com/shorts/vshRGVT5ZOc",
    thumbnail: "https://i1.ytimg.com/vi/vshRGVT5ZOc/hqdefault.jpg",
    published: "92 views",
    isShort: true,
  },
  {
    id: "cqc5mIo5VQ8",
    title: "Clean RO Water shouldn't be campus struggle.",
    link: "https://www.youtube.com/shorts/cqc5mIo5VQ8",
    thumbnail: "https://i1.ytimg.com/vi/cqc5mIo5VQ8/hqdefault.jpg",
    published: "200 views",
    isShort: true,
  },
  {
    id: "JQ41LS1HgAo",
    title: "sarla medical store at bandarseendri, ajmer.",
    link: "https://www.youtube.com/shorts/JQ41LS1HgAo",
    thumbnail: "https://i1.ytimg.com/vi/JQ41LS1HgAo/hqdefault.jpg",
    published: "133 views",
    isShort: true,
  },
  {
    id: "Ats0xEg-ikM",
    title: "Third class curaj washing machine and customer service.",
    link: "https://www.youtube.com/shorts/Ats0xEg-ikM",
    thumbnail: "https://i1.ytimg.com/vi/Ats0xEg-ikM/hqdefault.jpg",
    published: "97 views",
    isShort: true,
  },
  {
    id: "vN2L4vb0o10",
    title: "CURAJ Health Centre.",
    link: "https://www.youtube.com/shorts/vN2L4vb0o10",
    thumbnail: "https://i1.ytimg.com/vi/vN2L4vb0o10/hqdefault.jpg",
    published: "76 views",
    isShort: true,
  },
  {
    id: "2PSEC_JhMkE",
    title: "Krishna Janmashtami Festival at CURAJ.",
    link: "https://www.youtube.com/shorts/2PSEC_JhMkE",
    thumbnail: "https://i1.ytimg.com/vi/2PSEC_JhMkE/hqdefault.jpg",
    published: "102 views",
    isShort: true,
  },
  {
    id: "5wkrrHTPx-M",
    title: "CURAJ Reading Hall Infrastructure.",
    link: "https://www.youtube.com/shorts/5wkrrHTPx-M",
    thumbnail: "https://i1.ytimg.com/vi/5wkrrHTPx-M/hqdefault.jpg",
    published: "481 views",
    isShort: true,
  },
  {
    id: "dtBNun-MEZo",
    title: "CURAJ central library.",
    link: "https://www.youtube.com/shorts/dtBNun-MEZo",
    thumbnail: "https://i1.ytimg.com/vi/dtBNun-MEZo/hqdefault.jpg",
    published: "155 views",
    isShort: true,
  },
  {
    id: "PsT--vcLiD0",
    title: "nvidia geforce rtx in cs lab.",
    link: "https://www.youtube.com/shorts/PsT--vcLiD0",
    thumbnail: "https://i1.ytimg.com/vi/PsT--vcLiD0/hqdefault.jpg",
    published: "1.1K views",
    isShort: true,
  },
  {
    id: "82VppWRRgGY",
    title: "World class CURAJ facilities.",
    link: "https://www.youtube.com/shorts/82VppWRRgGY",
    thumbnail: "https://i1.ytimg.com/vi/82VppWRRgGY/hqdefault.jpg",
    published: "678 views",
    isShort: true,
  },
  {
    id: "8G2QxTa3fbU",
    title: "CURAJ Hockey Ground.",
    link: "https://www.youtube.com/shorts/8G2QxTa3fbU",
    thumbnail: "https://i1.ytimg.com/vi/8G2QxTa3fbU/hqdefault.jpg",
    published: "175 views",
    isShort: true,
  },
  {
    id: "F6Pv-D3pqeM",
    title: "CURAJ Football Ground.",
    link: "https://www.youtube.com/shorts/F6Pv-D3pqeM",
    thumbnail: "https://i1.ytimg.com/vi/F6Pv-D3pqeM/hqdefault.jpg",
    published: "162 views",
    isShort: true,
  },
  {
    id: "RN1yNO5pKgg",
    title: "Biochemistry Lab Coat, CURAJ E-commerce flipkart point.",
    link: "https://www.youtube.com/shorts/RN1yNO5pKgg",
    thumbnail: "https://i1.ytimg.com/vi/RN1yNO5pKgg/hqdefault.jpg",
    published: "137 views",
    isShort: true,
  },
  {
    id: "PGCxwi8GLyk",
    title: "CURAJ WIFI login delayed.",
    link: "https://www.youtube.com/shorts/PGCxwi8GLyk",
    thumbnail: "https://i1.ytimg.com/vi/PGCxwi8GLyk/hqdefault.jpg",
    published: "308 views",
    isShort: true,
  },
  {
    id: "LF105W-TM9o",
    title:
      "CURAJ Megamess curry full of oil heart attack guarantee forget about nutrition.",
    link: "https://www.youtube.com/shorts/LF105W-TM9o",
    thumbnail: "https://i1.ytimg.com/vi/LF105W-TM9o/hqdefault.jpg",
    published: "1.3K views",
    isShort: true,
  },
  {
    id: "rjLepPPB_BE",
    title: "CURAJ Campus Rain  🌧 Edition.",
    link: "https://www.youtube.com/shorts/rjLepPPB_BE",
    thumbnail: "https://i1.ytimg.com/vi/rjLepPPB_BE/hqdefault.jpg",
    published: "217 views",
    isShort: true,
  },
  {
    id: "OmNAIB0Qb6I",
    title: "Peak CURAJ Male content JCB Ki Khudai.",
    link: "https://www.youtube.com/shorts/OmNAIB0Qb6I",
    thumbnail: "https://i1.ytimg.com/vi/OmNAIB0Qb6I/hqdefault.jpg",
    published: "395 views",
    isShort: true,
  },
  {
    id: "LpimkZqZcAo",
    title:
      "We need RO drinking water in CURAJ B6 hostel as well not only washing machine.",
    link: "https://www.youtube.com/shorts/LpimkZqZcAo",
    thumbnail: "https://i1.ytimg.com/vi/LpimkZqZcAo/hqdefault.jpg",
    published: "593 views",
    isShort: true,
  },
  {
    id: "hXpNm8DfziI",
    title: "Guest enjoying the food at CURAJ Mega Mess.",
    link: "https://www.youtube.com/shorts/hXpNm8DfziI",
    thumbnail: "https://i1.ytimg.com/vi/hXpNm8DfziI/hqdefault.jpg",
    published: "1.3K views",
    isShort: true,
  },
  {
    id: "Zn2ZrR6Nmqo",
    title: "CURAJ Sports Field.",
    link: "https://www.youtube.com/shorts/Zn2ZrR6Nmqo",
    thumbnail: "https://i1.ytimg.com/vi/Zn2ZrR6Nmqo/hqdefault.jpg",
    published: "814 views",
    isShort: true,
  },
  {
    id: "jPidzcaygXM",
    title:
      "CURAJ central library. it's hall type I didn't like it. Music: A Lifetime With You @ J Scott Rakozy",
    link: "https://www.youtube.com/shorts/jPidzcaygXM",
    thumbnail: "https://i1.ytimg.com/vi/jPidzcaygXM/hqdefault.jpg",
    published: "290 views",
    isShort: true,
  },
  {
    id: "QVerlEzWNrk",
    title: "Dear CJP, please give your support to Jharkhand student protest.",
    link: "https://www.youtube.com/shorts/QVerlEzWNrk",
    thumbnail: "https://i1.ytimg.com/vi/QVerlEzWNrk/hqdefault.jpg",
    published: "381 views",
    isShort: true,
  },
  {
    id: "Va_l5iSvgQc",
    title:
      "end casteism end reservation end diversity qouta and focus only on meritocracy. #endcasteism",
    link: "https://www.youtube.com/shorts/Va_l5iSvgQc",
    thumbnail: "https://i1.ytimg.com/vi/Va_l5iSvgQc/hqdefault.jpg",
    published: "151 views",
    isShort: true,
  },
  {
    id: "CfEdRg2pZEQ",
    title: "CURAJ E-commerce delivery point behind post office",
    link: "https://www.youtube.com/shorts/CfEdRg2pZEQ",
    thumbnail: "https://i1.ytimg.com/vi/CfEdRg2pZEQ/hqdefault.jpg",
    published: "207 views",
    isShort: true,
  },
  {
    id: "qxY9sQSo3HE",
    title: "CURAJ Campus.",
    link: "https://www.youtube.com/shorts/qxY9sQSo3HE",
    thumbnail: "https://i1.ytimg.com/vi/qxY9sQSo3HE/hqdefault.jpg",
    published: "759 views",
    isShort: true,
  },
  {
    id: "YpZob8J9HFk",
    title: "CURAJ Mega mess breakfast and leakage infrastructure due to rain.",
    link: "https://www.youtube.com/shorts/YpZob8J9HFk",
    thumbnail: "https://i1.ytimg.com/vi/YpZob8J9HFk/hqdefault.jpg",
    published: "1K views",
    isShort: true,
  },
  {
    id: "MS012oE0Y2E",
    title: "Bengaluru horrible public infrastructure and it's a Slum IT city.",
    link: "https://www.youtube.com/shorts/MS012oE0Y2E",
    thumbnail: "https://i1.ytimg.com/vi/MS012oE0Y2E/hqdefault.jpg",
    published: "919 views",
    isShort: true,
  },
  {
    id: "an6wlNSeGWE",
    title: "Hair salon outside curaj gate 3 #curaj",
    link: "https://www.youtube.com/shorts/an6wlNSeGWE",
    thumbnail: "https://i1.ytimg.com/vi/an6wlNSeGWE/hqdefault.jpg",
    published: "171 views",
    isShort: true,
  },
  {
    id: "_svtexYc6AE",
    title: "CURAJ FITNESS CENTER",
    link: "https://www.youtube.com/shorts/_svtexYc6AE",
    thumbnail: "https://i1.ytimg.com/vi/_svtexYc6AE/hqdefault.jpg",
    published: "675 views",
    isShort: true,
  },
  {
    id: "dn17SKSlYrY",
    title:
      "CURAJ academic building near to computer science building for PM vidyalaxmi loan related visit",
    link: "https://www.youtube.com/shorts/dn17SKSlYrY",
    thumbnail: "https://i1.ytimg.com/vi/dn17SKSlYrY/hqdefault.jpg",
    published: "201 views",
    isShort: true,
  },
  {
    id: "salPbdzQZkQ",
    title: "curaj msc cs classroom ground floor 2026",
    link: "https://www.youtube.com/shorts/salPbdzQZkQ",
    thumbnail: "https://i1.ytimg.com/vi/salPbdzQZkQ/hqdefault.jpg",
    published: "420 views",
    isShort: true,
  },
  {
    id: "mB9SvutRhmk",
    title: "curaj side bandrasindri bus stop",
    link: "https://www.youtube.com/shorts/mB9SvutRhmk",
    thumbnail: "https://i1.ytimg.com/vi/mB9SvutRhmk/hqdefault.jpg",
    published: "1.2K views",
    isShort: true,
  },
  {
    id: "y8NhtCPll-U",
    title: "bandrasindri RSRTC bus stop.",
    link: "https://www.youtube.com/shorts/y8NhtCPll-U",
    thumbnail: "https://i1.ytimg.com/vi/y8NhtCPll-U/hqdefault.jpg",
    published: "169 views",
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
const CACHE_DURATION_MS = 3 * 60 * 1000; // 3 minutes

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
      next: { revalidate: 180 },
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

      if (tabName === "shorts") {
        if (shortsLockup) {
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
        } else if (lockup) {
          const id = lockup.contentId;
          const rawTitle =
            lockup.metadata?.lockupMetadataViewModel?.title?.content ||
            lockup.rendererContext?.accessibilityContext?.label ||
            "";
          if (id) {
            items.push({
              id,
              title: decodeHtmlEntities(rawTitle),
              link: `https://www.youtube.com/shorts/${id}`,
              thumbnail: `https://i1.ytimg.com/vi/${id}/hqdefault.jpg`,
              published: "Short",
              isShort: true,
            });
          }
        }
      } else {
        // tabName === "videos"
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
      next: { revalidate: 180 },
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

export async function GET(request: NextRequest) {
  try {
    const now = Date.now();
    const isForcedRefresh =
      request?.nextUrl?.searchParams?.get("refresh") === "1" ||
      request?.nextUrl?.searchParams?.get("refresh") === "true";

    if (
      !isForcedRefresh &&
      cachedVideos &&
      cachedVideos.length > 0 &&
      now - cacheTime < CACHE_DURATION_MS
    ) {
      return NextResponse.json(
        {
          channelHandle: YOUTUBE_CHANNEL_HANDLE,
          channelUrl: `https://www.youtube.com/${YOUTUBE_CHANNEL_HANDLE}`,
          channelId: YOUTUBE_CHANNEL_ID,
          videos: cachedVideos,
          cached: true,
        },
        {
          headers: {
            "Cache-Control": "public, s-maxage=180, stale-while-revalidate=300",
          },
        },
      );
    }

    // Step 1: Concurrently fetch real-time RSS XML and both channel tabs
    const [rssResult, videosResult, shortsResult] = await Promise.allSettled([
      fetchFromRSS(),
      fetchTabFromChannel("videos"),
      fetchTabFromChannel("shorts"),
    ]);

    const rssVideos = rssResult.status === "fulfilled" ? rssResult.value : [];
    const scrapedVideos =
      videosResult.status === "fulfilled" ? videosResult.value : [];
    const scrapedShorts =
      shortsResult.status === "fulfilled" ? shortsResult.value : [];

    const regularVideosMap = new Map<string, YouTubeVideo>();
    const shortsMap = new Map<string, YouTubeVideo>();

    // Step 2: Ingest YouTube RSS first (instant real-time index directly from YouTube)
    for (const item of rssVideos) {
      if (item.isShort) {
        if (!shortsMap.has(item.id)) {
          shortsMap.set(item.id, item);
        }
      } else {
        if (!regularVideosMap.has(item.id)) {
          regularVideosMap.set(item.id, item);
        }
      }
    }

    // Step 3: Merge scraped regular videos (adds relative timestamps & older videos)
    for (const v of scrapedVideos) {
      if (regularVideosMap.has(v.id)) {
        const existing = regularVideosMap.get(v.id)!;
        if (v.published && v.published !== "Recent") {
          existing.published = v.published;
        }
      } else {
        regularVideosMap.set(v.id, v);
      }
    }

    // Step 4: Merge scraped shorts (adds view metrics & older shorts)
    for (const s of scrapedShorts) {
      if (shortsMap.has(s.id)) {
        const existing = shortsMap.get(s.id)!;
        if (s.published && s.published !== "Short") {
          existing.published = s.published;
        }
      } else {
        shortsMap.set(s.id, s);
      }
    }

    // Step 5: Backfill from comprehensive catalogs so zero historical content is ever lost
    for (const v of FULL_VIDEOS_CATALOG) {
      if (!regularVideosMap.has(v.id)) {
        regularVideosMap.set(v.id, v);
      }
    }

    for (const s of SHORTS_CATALOG) {
      if (!shortsMap.has(s.id)) {
        shortsMap.set(s.id, s);
      }
    }

    const videos = [
      ...Array.from(regularVideosMap.values()),
      ...Array.from(shortsMap.values()),
    ];

    // Update in-memory cache
    cachedVideos = videos;
    cacheTime = now;

    return NextResponse.json(
      {
        channelHandle: YOUTUBE_CHANNEL_HANDLE,
        channelUrl: `https://www.youtube.com/${YOUTUBE_CHANNEL_HANDLE}`,
        channelId: YOUTUBE_CHANNEL_ID,
        videos,
        cached: false,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=180, stale-while-revalidate=300",
        },
      },
    );
  } catch (error) {
    console.error("Error in YouTube API route:", error);

    // In the worst case, return the full combined catalogs
    const fallbackList = [...FULL_VIDEOS_CATALOG, ...SHORTS_CATALOG];
    return NextResponse.json(
      {
        channelHandle: YOUTUBE_CHANNEL_HANDLE,
        channelUrl: `https://www.youtube.com/${YOUTUBE_CHANNEL_HANDLE}`,
        channelId: YOUTUBE_CHANNEL_ID,
        videos: fallbackList,
        fallback: true,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
        },
      },
    );
  }
}
