"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { YouTubeVideo } from "@/app/api/youtube/route";

export default function YouTubeFeed() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch("/api/youtube");
        if (!res.ok) throw new Error("Failed to load");
        const data = await res.json();
        if (data.videos && data.videos.length > 0) {
          setVideos(data.videos);
          setActiveVideoId(data.videos[0].id);
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

  if (error || (!loading && videos.length === 0)) {
    return null; // Gracefully hide if no videos or network error
  }

  return (
    <section className="yt-feed-section">
      <div className="yt-feed-header">
        <div className="yt-title-group">
          <h3 className="section-title">
            <i
              className="fa-brands fa-youtube"
              style={{ color: "#ef4444", marginRight: "0.5rem" }}
            ></i>
            Latest YouTube Videos
          </h3>
          <span className="yt-live-tag">Auto-Synced</span>
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
        <div className="yt-skeleton-player">
          <div className="yt-spinner"></div>
          <span>Loading latest YouTube upload...</span>
        </div>
      ) : (
        <div className="yt-content-grid">
          {/* Main Embedded Player */}
          {activeVideoId && (
            <div className="yt-player-wrapper">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=0`}
                title="Latest YouTube Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="yt-iframe"
              ></iframe>
            </div>
          )}

          {/* Recent Video Grid */}
          {videos.length > 1 && (
            <div className="yt-recent-list">
              <h4 className="yt-recent-heading">Recent Uploads</h4>
              <div className="yt-cards-grid">
                {videos.map((vid) => (
                  <div
                    key={vid.id}
                    className={`yt-card ${vid.id === activeVideoId ? "active" : ""}`}
                    onClick={() => setActiveVideoId(vid.id)}
                  >
                    <div className="yt-card-thumb">
                      <Image
                        src={vid.thumbnail}
                        alt={vid.title}
                        width={240}
                        height={135}
                        className="yt-thumb-img"
                        unoptimized
                      />
                      <span className="yt-play-badge">
                        <i className="fa-solid fa-play"></i>
                      </span>
                    </div>
                    <div className="yt-card-info">
                      <span className="yt-card-date">{vid.published}</span>
                      <h5 className="yt-card-title">{vid.title}</h5>
                      <a
                        href={vid.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="yt-watch-external"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Watch on YouTube{" "}
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
