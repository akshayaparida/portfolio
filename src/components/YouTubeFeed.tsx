"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { YouTubeVideo } from "@/app/api/youtube/route";

export default function YouTubeFeed() {
  const [allVideos, setAllVideos] = useState<YouTubeVideo[]>([]);
  const [activeTab, setActiveTab] = useState<"videos" | "shorts">("videos");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch("/api/youtube");
        if (!res.ok) throw new Error("Failed to load");
        const data = await res.json();
        if (data.videos && data.videos.length > 0) {
          const vids: YouTubeVideo[] = data.videos;
          setAllVideos(vids);
          const regularVids = vids.filter((v) => !v.isShort);
          const shortsVids = vids.filter((v) => v.isShort);
          if (regularVids.length === 0 && shortsVids.length > 0) {
            setActiveTab("shorts");
          }
        }
      } catch (err) {
        console.error("Failed to load YouTube feed", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, []);

  const regularVideos = allVideos.filter((v) => !v.isShort);
  const shortsVideos = allVideos.filter((v) => v.isShort);
  const currentList = activeTab === "videos" ? regularVideos : shortsVideos;

  if (error || (!loading && allVideos.length === 0)) {
    return null;
  }

  return (
    <section className="yt-feed-section">
      <div className="yt-feed-header">
        <div className="yt-title-group">
          <h3 className="section-title">
            <i
              className="fa-brands fa-youtube"
              style={{ color: "var(--heading-color)", marginRight: "0.5rem" }}
            ></i>
            YouTube Channel Feed
          </h3>

          <div className="yt-tabs">
            <button
              className={`yt-tab-btn ${activeTab === "videos" ? "active" : ""}`}
              onClick={() => setActiveTab("videos")}
            >
              <i className="fa-solid fa-video"></i> Videos (
              {regularVideos.length})
            </button>
            <button
              className={`yt-tab-btn ${activeTab === "shorts" ? "active" : ""}`}
              onClick={() => setActiveTab("shorts")}
            >
              <i className="fa-solid fa-bolt"></i> Shorts ({shortsVideos.length}
              )
            </button>
          </div>
        </div>

        <a
          href="https://www.youtube.com/@akshaya.parida?sub_confirmation=1"
          target="_blank"
          rel="noopener noreferrer"
          className="yt-subscribe-btn"
        >
          <i className="fa-brands fa-youtube"></i> Subscribe @akshaya.parida
        </a>
      </div>

      {loading ? (
        <div className="yt-skeleton-player" style={{ height: "140px" }}>
          <div className="yt-spinner"></div>
          <span>Loading YouTube feed...</span>
        </div>
      ) : (
        <div className="yt-scroll-container">
          {currentList.length > 0 ? (
            <div
              className={`yt-scroll-track ${activeTab === "shorts" ? "shorts-track" : ""}`}
            >
              {currentList.map((vid) => (
                <a
                  key={vid.id}
                  href={vid.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`yt-scroll-card ${vid.isShort ? "short-card" : ""}`}
                >
                  <div className="yt-card-thumb">
                    <Image
                      src={vid.thumbnail}
                      alt={vid.title}
                      width={280}
                      height={vid.isShort ? 320 : 155}
                      className="yt-thumb-img"
                      unoptimized
                    />
                    <span className="yt-play-badge">
                      <i
                        className={
                          vid.isShort ? "fa-solid fa-bolt" : "fa-solid fa-play"
                        }
                      ></i>
                    </span>
                  </div>
                  <div className="yt-card-info">
                    <span className="yt-card-date">{vid.published}</span>
                    <h5 className="yt-card-title">{vid.title}</h5>
                    <span className="yt-watch-btn">
                      Watch Full {vid.isShort ? "Short" : "Video"}{" "}
                      <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </span>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="yt-skeleton-player" style={{ height: "120px" }}>
              <span>No {activeTab} available yet on YouTube.</span>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
