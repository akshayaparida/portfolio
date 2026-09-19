"use client";

import React, { useState } from "react";
import { VideoLecture } from "@/types/learning";

interface VideoLectureHubProps {
  videoLectures: VideoLecture[];
}

export default function VideoLectureHub({
  videoLectures,
}: VideoLectureHubProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!videoLectures || videoLectures.length === 0) {
    return null;
  }

  const activeVideo = videoLectures[selectedIndex] || videoLectures[0];
  const youtubeEmbedUrl = `https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?rel=0&modestbranding=1`;
  const directWatchUrl =
    activeVideo.directUrl ||
    `https://www.youtube.com/watch?v=${activeVideo.youtubeId}`;

  const scrollToNotes = (e: React.MouseEvent) => {
    e.preventDefault();
    const theoryEl = document.querySelector(".theory-section");
    if (theoryEl) {
      const topOffset = 80;
      const elementPosition = theoryEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="video-lectures"
      className="video-lecture-hub"
      aria-label="Video-First Lecture Hub"
    >
      {/* Top Advisory Banner */}
      <div className="video-hub-header">
        <div className="video-hub-title-group">
          <div className="video-hub-badge">
            <i className="fa-brands fa-youtube video-badge-icon"></i>
            <span>Step 1: Visual Intuition First</span>
          </div>
          <h3 className="video-hub-heading">
            Curated Video Lectures: Watch On-the-Go
          </h3>
          <p className="video-hub-subtitle">
            Grasp the core mechanics in 10–15 minutes first, then study the
            formal textbook definitions, 5-tuples, and CIA-1 model answers
            below.
          </p>
        </div>

        <button
          onClick={scrollToNotes}
          className="jump-to-notes-btn"
          aria-label="Jump directly to textbook notes"
        >
          <span>Study Written Notes</span>
          <i className="fa-solid fa-arrow-down"></i>
        </button>
      </div>

      {/* Main Video Presentation Grid */}
      <div className="video-hub-main-grid">
        {/* Left / Top: Active Video Player & Metadata */}
        <div className="video-player-column">
          <div className="video-player-wrapper">
            <iframe
              src={youtubeEmbedUrl}
              title={`YouTube video: ${activeVideo.title}`}
              className="video-iframe"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>

          <div className="video-active-meta">
            <div className="video-meta-top-row">
              <span className="video-channel-tag">
                <i className="fa-solid fa-graduation-cap"></i>{" "}
                {activeVideo.channel}
              </span>
              {activeVideo.duration && (
                <span className="video-duration-tag">
                  <i className="fa-regular fa-clock"></i> {activeVideo.duration}
                </span>
              )}
              {activeVideo.recommendedSpeed && (
                <span
                  className="video-speed-tag"
                  title="Recommended watch speed for fast learning"
                >
                  <i className="fa-solid fa-gauge-high"></i> Speed:{" "}
                  {activeVideo.recommendedSpeed}
                </span>
              )}
              <a
                href={directWatchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="video-external-link"
                aria-label={`Open ${activeVideo.title} on YouTube`}
                title="Watch on YouTube App (offline download, 2x speed)"
              >
                <span>Watch on YouTube</span>
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
              </a>
            </div>

            <h4 className="video-active-title">{activeVideo.title}</h4>
            <p className="video-active-desc">{activeVideo.description}</p>

            <div className="video-exam-relevance-box">
              <div className="exam-relevance-header">
                <i className="fa-solid fa-award"></i>
                <span>Exam Alignment & Relevance</span>
              </div>
              <p className="exam-relevance-text">{activeVideo.examRelevance}</p>
            </div>

            {activeVideo.keyTopics && activeVideo.keyTopics.length > 0 && (
              <div className="video-key-topics">
                <span className="key-topics-label">Key Topics Covered:</span>
                <div className="key-topics-pills">
                  {activeVideo.keyTopics.map((topic, i) => (
                    <span key={i} className="key-topic-pill">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right / Bottom: Playlist / Lecture Switcher */}
        <div className="video-playlist-column">
          <div className="playlist-header">
            <div className="playlist-title">
              <i className="fa-solid fa-list-check"></i>
              <span>Recommended Watch List</span>
            </div>
            <span className="playlist-count">
              {selectedIndex + 1} of {videoLectures.length}
            </span>
          </div>

          <div
            className="video-playlist-list"
            role="tablist"
            aria-label="Unit 1 Video Playlist"
          >
            {videoLectures.map((video, idx) => {
              const isCurrent = idx === selectedIndex;
              return (
                <button
                  key={video.id}
                  onClick={() => setSelectedIndex(idx)}
                  className={`playlist-item-card ${isCurrent ? "active-lecture" : ""}`}
                  role="tab"
                  aria-selected={isCurrent}
                  aria-label={`Select lecture ${idx + 1}: ${video.title}`}
                >
                  <div className="playlist-item-number">
                    {isCurrent ? (
                      <i className="fa-solid fa-circle-play text-red-500 animate-pulse"></i>
                    ) : (
                      <span>{idx + 1}</span>
                    )}
                  </div>

                  <div className="playlist-item-body">
                    <div className="playlist-item-channel">
                      <span>{video.channel}</span>
                      {video.duration && <span className="item-dot">·</span>}
                      {video.duration && <span>{video.duration}</span>}
                    </div>
                    <div className="playlist-item-title">{video.title}</div>
                    <div className="playlist-item-badge">
                      {video.examRelevance.split("|")[0].trim()}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
