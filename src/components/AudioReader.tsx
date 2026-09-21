"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  cleanMarkdownForSpeech,
  extractSectionForSpeech,
} from "@/lib/speechUtils";

interface AudioReaderProps {
  content?: string;
  moduleTitle: string;
  moduleDescription?: string;
}

const SPEED_OPTIONS = [0.75, 1.0, 1.25, 1.5, 2.0];

export default function AudioReader({
  content = "",
  moduleTitle,
  moduleDescription,
}: AudioReaderProps) {
  const [isSupported, setIsSupported] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rate, setRate] = useState(1.0);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>("");
  const [chunks, setChunks] = useState<string[]>([]);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const [activeSectionTitle, setActiveSectionTitle] = useState<string | null>(
    null,
  );
  const [showFloatingBar, setShowFloatingBar] = useState(false);
  const [showVoicePicker, setShowVoicePicker] = useState(false);

  const synthRef = useRef<SpeechSynthesis | null>(null);
  const isPlayingRef = useRef(false);
  const isPausedRef = useRef(false);
  const currentChunkIndexRef = useRef(0);
  const chunksRef = useRef<string[]>([]);
  const selectedVoiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const rateRef = useRef(1.0);
  const activeSectionTitleRef = useRef<string | null>(null);
  const playerCardRef = useRef<HTMLDivElement>(null);

  // Keep refs synchronized with state
  useEffect(() => {
    isPlayingRef.current = isPlaying;
    isPausedRef.current = isPaused;
    currentChunkIndexRef.current = currentChunkIndex;
    chunksRef.current = chunks;
    rateRef.current = rate;
    activeSectionTitleRef.current = activeSectionTitle;
  }, [
    isPlaying,
    isPaused,
    currentChunkIndex,
    chunks,
    rate,
    activeSectionTitle,
  ]);

  // Initialize SpeechSynthesis and available voices
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setIsSupported(false);
      return;
    }

    synthRef.current = window.speechSynthesis;

    const updateVoices = () => {
      if (!synthRef.current) return;
      const allVoices = synthRef.current.getVoices();
      // Filter for English voices, prioritizing natural/high quality voices
      const englishVoices = allVoices.filter((v) =>
        v.lang.toLowerCase().startsWith("en"),
      );
      const voiceList = englishVoices.length > 0 ? englishVoices : allVoices;
      setVoices(voiceList);

      // Select default natural English voice
      if (voiceList.length > 0) {
        const preferred =
          voiceList.find(
            (v) =>
              v.name.includes("Google") ||
              v.name.includes("Natural") ||
              v.name.includes("Samantha") ||
              v.name.includes("Daniel") ||
              v.name.includes("Premium"),
          ) ||
          voiceList.find((v) => v.default) ||
          voiceList[0];

        setSelectedVoiceURI(preferred.voiceURI);
        selectedVoiceRef.current = preferred;
      }
    };

    updateVoices();
    if (synthRef.current.onvoiceschanged !== undefined) {
      synthRef.current.onvoiceschanged = updateVoices;
    }

    // Floating bar visibility on scroll
    const handleScroll = () => {
      if (playerCardRef.current) {
        const rect = playerCardRef.current.getBoundingClientRect();
        // If player is scrolled out of viewport and currently playing or paused, show floating bar
        const isOutOfView = rect.bottom < 0;
        setShowFloatingBar(isOutOfView);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Update selected voice reference when selection changes
  const handleVoiceChange = (voiceURI: string) => {
    setSelectedVoiceURI(voiceURI);
    const found = voices.find((v) => v.voiceURI === voiceURI) || null;
    selectedVoiceRef.current = found;

    // If currently playing, restart current chunk with new voice
    if (isPlayingRef.current && !isPausedRef.current) {
      synthRef.current?.cancel();
      speakChunk(currentChunkIndexRef.current);
    }
  };

  // Prepare full module text chunks
  const prepareModuleChunks = useCallback(() => {
    const intro: string[] = [];
    if (moduleTitle) {
      intro.push(`Starting audio reader for: ${moduleTitle}.`);
    }
    if (moduleDescription) {
      intro.push(moduleDescription);
    }
    const bodyChunks = cleanMarkdownForSpeech(content);
    return [...intro, ...bodyChunks];
  }, [moduleTitle, moduleDescription, content]);

  // Speak a specific chunk
  const speakChunk = useCallback((index: number) => {
    if (!synthRef.current) return;

    const currentChunks = chunksRef.current;
    if (index >= currentChunks.length) {
      // Completed reading all chunks
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentChunkIndex(0);
      setActiveSectionTitle(null);
      return;
    }

    const chunkText = currentChunks[index];
    if (!chunkText || !chunkText.trim()) {
      // Skip empty chunk
      setCurrentChunkIndex(index + 1);
      speakChunk(index + 1);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(chunkText);
    utterance.rate = rateRef.current;
    if (selectedVoiceRef.current) {
      utterance.voice = selectedVoiceRef.current;
    }

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
      setCurrentChunkIndex(index);
    };

    utterance.onend = () => {
      // If user paused or stopped, do not advance
      if (!isPlayingRef.current || isPausedRef.current) return;
      const nextIdx = index + 1;
      setCurrentChunkIndex(nextIdx);
      speakChunk(nextIdx);
    };

    utterance.onerror = (e) => {
      if (e.error === "canceled" || e.error === "interrupted") {
        return;
      }
      console.warn("SpeechSynthesis error:", e.error);
      const nextIdx = index + 1;
      setCurrentChunkIndex(nextIdx);
      speakChunk(nextIdx);
    };

    synthRef.current.speak(utterance);
  }, []);

  // Play / Start Audio
  const handlePlay = () => {
    if (!synthRef.current) return;

    if (isPaused) {
      // Resume from paused state
      synthRef.current.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    // Cancel any ongoing speech
    synthRef.current.cancel();

    let chunksToSpeak = chunks;
    if (chunksToSpeak.length === 0) {
      chunksToSpeak = prepareModuleChunks();
      setChunks(chunksToSpeak);
      chunksRef.current = chunksToSpeak;
    }

    setActiveSectionTitle(null);
    setCurrentChunkIndex(0);
    speakChunk(0);
  };

  // Pause Audio
  const handlePause = () => {
    if (!synthRef.current) return;
    synthRef.current.pause();
    setIsPaused(true);
  };

  // Stop Audio
  const handleStop = () => {
    if (!synthRef.current) return;
    synthRef.current.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentChunkIndex(0);
    setActiveSectionTitle(null);
  };

  // Skip Forward 1 chunk
  const handleNext = () => {
    if (!synthRef.current) return;
    synthRef.current.cancel();
    const nextIdx = Math.min(currentChunkIndex + 1, chunks.length - 1);
    setCurrentChunkIndex(nextIdx);
    if (isPlaying) {
      speakChunk(nextIdx);
    }
  };

  // Skip Backward 1 chunk
  const handlePrev = () => {
    if (!synthRef.current) return;
    synthRef.current.cancel();
    const prevIdx = Math.max(currentChunkIndex - 1, 0);
    setCurrentChunkIndex(prevIdx);
    if (isPlaying) {
      speakChunk(prevIdx);
    }
  };

  // Change Speed
  const handleSpeedChange = (newRate: number) => {
    setRate(newRate);
    rateRef.current = newRate;
    if (isPlaying && !isPaused && synthRef.current) {
      synthRef.current.cancel();
      speakChunk(currentChunkIndex);
    }
  };

  // Broadcast speech state so section heading buttons can reflect active/playing state
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("study-speech-state", {
          detail: {
            activeSection: activeSectionTitle,
            isPlaying,
            isPaused,
          },
        }),
      );
    }
  }, [activeSectionTitle, isPlaying, isPaused]);

  // Listen to Section Event from Section Buttons in ModuleViewer
  useEffect(() => {
    const handleListenSection = (e: Event) => {
      const customEvent = e as CustomEvent<{ heading: string }>;
      const heading = customEvent.detail?.heading;
      if (!heading || !synthRef.current) return;

      const isSameSection =
        activeSectionTitleRef.current?.toLowerCase().trim() ===
        heading.toLowerCase().trim();

      // If user clicks the listen button for the currently active section:
      if (isSameSection && isPlayingRef.current) {
        if (isPausedRef.current) {
          synthRef.current.resume();
          setIsPaused(false);
          setIsPlaying(true);
        } else {
          synthRef.current.pause();
          setIsPaused(true);
        }
        return;
      }

      synthRef.current.cancel();

      const sectionChunks = extractSectionForSpeech(content, heading);
      if (sectionChunks.length === 0) return;

      const fullSectionChunks = [
        `Now reading section: ${heading}.`,
        ...sectionChunks,
      ];
      setChunks(fullSectionChunks);
      chunksRef.current = fullSectionChunks;
      setActiveSectionTitle(heading);
      setCurrentChunkIndex(0);
      speakChunk(0);

      // Do NOT scroll to top card - stay right at the user's current reading position.
      // If the top audio player card is out of view, immediately show the floating mini bar
      if (playerCardRef.current) {
        const rect = playerCardRef.current.getBoundingClientRect();
        if (rect.bottom < 0) {
          setShowFloatingBar(true);
        }
      }
    };

    window.addEventListener("study-listen-section", handleListenSection);
    return () => {
      window.removeEventListener("study-listen-section", handleListenSection);
    };
  }, [content, speakChunk]);

  if (!isSupported) {
    return null;
  }

  const currentSnippet =
    chunks.length > 0 && currentChunkIndex < chunks.length
      ? chunks[currentChunkIndex]
      : moduleDescription ||
        "Click Play to listen to the complete study module notes.";

  const progressPercent =
    chunks.length > 0
      ? Math.round(((currentChunkIndex + 1) / chunks.length) * 100)
      : 0;

  return (
    <>
      {/* Main Docked Audio Reader Card in Module Header */}
      <div
        ref={playerCardRef}
        className={`audio-reader-card ${isPlaying ? "is-active" : ""}`}
        aria-label="Audio Reader"
      >
        {/* Top Bar: Title, Badge, and Soundwave Animation */}
        <div className="audio-reader-top">
          <div className="audio-reader-title-row">
            <div className="audio-icon-pulse">
              <i className="fa-solid fa-headphones"></i>
            </div>
            <div>
              <div className="audio-title-text">
                Listen to Notes{" "}
                <span className="audio-ai-pill">Text-to-Speech</span>
              </div>
              <div className="audio-subtitle-text">
                {activeSectionTitle ? (
                  <>
                    <i
                      className="fa-solid fa-bookmark"
                      style={{ marginRight: 5, color: "#10b981" }}
                    />
                    Reading Section: <strong>{activeSectionTitle}</strong>
                  </>
                ) : (
                  "Full Module Audio Lecture & Mathematical Explanations"
                )}
              </div>
            </div>
          </div>

          {/* Sound Wave Equalizer Animation (Active when Playing) */}
          <div
            className={`sound-wave-bars ${isPlaying && !isPaused ? "animating" : ""}`}
            aria-hidden="true"
          >
            <span className="wave-bar bar-1"></span>
            <span className="wave-bar bar-2"></span>
            <span className="wave-bar bar-3"></span>
            <span className="wave-bar bar-4"></span>
            <span className="wave-bar bar-5"></span>
          </div>
        </div>

        {/* Live Reading Snippet Box */}
        <div className="audio-snippet-box">
          <div className="audio-snippet-label">
            {isPlaying ? (
              isPaused ? (
                <span className="status-badge paused">
                  <i className="fa-solid fa-pause"></i> Paused
                </span>
              ) : (
                <span className="status-badge speaking">
                  <i className="fa-solid fa-volume-high"></i> Speaking
                </span>
              )
            ) : (
              <span className="status-badge ready">
                <i className="fa-solid fa-circle-check"></i> Ready
              </span>
            )}
            {chunks.length > 0 && isPlaying && (
              <span className="chunk-counter">
                Paragraph {currentChunkIndex + 1} of {chunks.length} (
                {progressPercent}%)
              </span>
            )}
          </div>
          <p className="audio-snippet-text">{currentSnippet}</p>

          {/* Progress Line */}
          {chunks.length > 0 && isPlaying && (
            <div className="audio-progress-track">
              <div
                className="audio-progress-fill"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          )}
        </div>

        {/* Controls Row */}
        <div className="audio-controls-row">
          {/* Main Playback Buttons */}
          <div className="audio-primary-buttons">
            <button
              onClick={handlePrev}
              disabled={!isPlaying || currentChunkIndex === 0}
              className="audio-step-btn"
              title="Previous paragraph"
              aria-label="Previous paragraph"
            >
              <i className="fa-solid fa-backward-step"></i>
            </button>

            {isPlaying && !isPaused ? (
              <button
                onClick={handlePause}
                className="audio-main-play-btn pause-state"
                title="Pause listening"
                aria-label="Pause listening"
              >
                <i className="fa-solid fa-pause"></i>
                <span>Pause</span>
              </button>
            ) : (
              <button
                onClick={handlePlay}
                className="audio-main-play-btn"
                title={isPaused ? "Resume listening" : "Start listening"}
                aria-label={isPaused ? "Resume listening" : "Start listening"}
              >
                <i className="fa-solid fa-play"></i>
                <span>{isPaused ? "Resume" : "Listen to Notes"}</span>
              </button>
            )}

            <button
              onClick={handleNext}
              disabled={!isPlaying || currentChunkIndex >= chunks.length - 1}
              className="audio-step-btn"
              title="Next paragraph"
              aria-label="Next paragraph"
            >
              <i className="fa-solid fa-forward-step"></i>
            </button>

            {isPlaying && (
              <button
                onClick={handleStop}
                className="audio-stop-btn"
                title="Stop listening"
                aria-label="Stop listening"
              >
                <i className="fa-solid fa-stop"></i>
              </button>
            )}
          </div>

          {/* Speed Selector Presets */}
          <div className="audio-speed-selector">
            <span className="speed-label">Speed:</span>
            <div className="speed-pills-group">
              {SPEED_OPTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSpeedChange(s)}
                  className={`speed-pill ${rate === s ? "active" : ""}`}
                  title={`Play at ${s}x speed`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>

          {/* Voice Selector Dropdown Toggle */}
          {voices.length > 0 && (
            <div className="audio-voice-container">
              <button
                onClick={() => setShowVoicePicker(!showVoicePicker)}
                className="audio-voice-btn"
                title="Change Voice"
              >
                <i className="fa-solid fa-user-gear"></i>
                <span>Voice</span>
                <i
                  className="fa-solid fa-chevron-down"
                  style={{ fontSize: "0.7rem" }}
                ></i>
              </button>

              {showVoicePicker && (
                <div className="audio-voice-dropdown">
                  <div className="voice-dropdown-header">
                    Select Spoken Voice
                  </div>
                  <div className="voice-dropdown-list">
                    {voices.map((v) => (
                      <button
                        key={v.voiceURI}
                        onClick={() => {
                          handleVoiceChange(v.voiceURI);
                          setShowVoicePicker(false);
                        }}
                        className={`voice-option ${selectedVoiceURI === v.voiceURI ? "active" : ""}`}
                      >
                        <i
                          className={`fa-solid ${selectedVoiceURI === v.voiceURI ? "fa-circle-check" : "fa-circle"}`}
                          style={{
                            fontSize: "0.75rem",
                            marginRight: 8,
                            color:
                              selectedVoiceURI === v.voiceURI
                                ? "#10b981"
                                : "#94a3b8",
                          }}
                        />
                        <span className="voice-name">{v.name}</span>
                        <span className="voice-lang">({v.lang})</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Floating Mini Player Widget (Visible when playing/paused and scrolled down) */}
      {showFloatingBar && (isPlaying || isPaused) && (
        <div
          className="audio-floating-mini-bar"
          role="region"
          aria-label="Quick Audio Controls"
        >
          <div className="mini-bar-content">
            <div className="mini-wave-indicator">
              <span
                className={`mini-dot ${isPlaying && !isPaused ? "pulsing" : ""}`}
              ></span>
              <span className="mini-status-text">
                {isPaused ? "Paused" : "Listening"}
              </span>
            </div>

            <div className="mini-controls">
              {isPlaying && !isPaused ? (
                <button
                  onClick={handlePause}
                  className="mini-ctrl-btn play-toggle"
                  title="Pause"
                  aria-label="Pause"
                >
                  <i className="fa-solid fa-pause"></i>
                </button>
              ) : (
                <button
                  onClick={handlePlay}
                  className="mini-ctrl-btn play-toggle"
                  title="Resume"
                  aria-label="Resume"
                >
                  <i className="fa-solid fa-play"></i>
                </button>
              )}

              <button
                onClick={handleStop}
                className="mini-ctrl-btn stop-toggle"
                title="Stop"
                aria-label="Stop"
              >
                <i className="fa-solid fa-stop"></i>
              </button>

              <button
                onClick={() => {
                  playerCardRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }}
                className="mini-ctrl-btn expand-toggle"
                title="Scroll to full audio player"
                aria-label="Scroll to full audio player"
              >
                <i className="fa-solid fa-up-right-from-square"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
