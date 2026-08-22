"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { PracticeQuestion } from "@/types/learning";

const TIMER_SECONDS = 90;
const TIMER_RADIUS = 18;
const TIMER_CIRCUMFERENCE = 2 * Math.PI * TIMER_RADIUS;

interface PracticeQuizProps {
  questions: PracticeQuestion[];
}

export default function PracticeQuiz({ questions }: PracticeQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [timerActive, setTimerActive] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const [timeoutCount, setTimeoutCount] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentQuestion = questions[currentQuestionIndex];

  // Timer countdown effect
  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timerActive, timeLeft]);

  // Auto-submit on timeout
  const handleTimeout = useCallback(() => {
    setTimerActive(false);
    setTimedOut(true);
    setTimeoutCount((prev) => prev + 1);
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: false }));
    setShowExplanation(true);
  }, [currentQuestion.id]);

  useEffect(() => {
    if (timeLeft === 0 && timerActive) {
      handleTimeout();
    }
  }, [timeLeft, timerActive, handleTimeout]);

  const handleOptionSelect = (optionIndex: number) => {
    if (showExplanation) return;
    setSelectedOption(optionIndex);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;

    setTimerActive(false);
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    setAnswers({ ...answers, [currentQuestion.id]: isCorrect });

    if (isCorrect) {
      setScore(score + 1);
    }

    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setShowExplanation(false);
      setTimeLeft(TIMER_SECONDS);
      setTimerActive(true);
      setTimedOut(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setScore(0);
    setQuizCompleted(false);
    setQuizStarted(false);
    setAnswers({});
    setTimeLeft(TIMER_SECONDS);
    setTimerActive(false);
    setTimedOut(false);
    setTimeoutCount(0);
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setTimerActive(true);
  };

  const timerProgress = timeLeft / TIMER_SECONDS;
  const strokeDashoffset = TIMER_CIRCUMFERENCE * (1 - timerProgress);
  const timerColor =
    timeLeft > 30 ? "#10b981" : timeLeft > 10 ? "#f59e0b" : "#ef4444";

  const [filterGateOnly, setFilterGateOnly] = useState(false);

  const getQuestionGateYear = (q: PracticeQuestion) => {
    if (q.gateYear) return q.gateYear;
    const match = q.question.match(/\[(GATE[^\]]+)\]/i);
    return match ? match[1] : null;
  };

  const getQuestionTopic = (q: PracticeQuestion) => {
    if (q.topicTag) return q.topicTag;
    const match = q.question.match(/\[Topic:\s*([^\]]+)\]/i);
    return match ? match[1] : null;
  };

  const gateQuestionsCount = questions.filter((q) =>
    getQuestionGateYear(q),
  ).length;
  const filteredIndices = questions
    .map((q, idx) => ({ q, idx }))
    .filter(({ q }) => (filterGateOnly ? !!getQuestionGateYear(q) : true))
    .map(({ idx }) => idx);

  const currentGateYear = getQuestionGateYear(currentQuestion);
  const currentTopicTag = getQuestionTopic(currentQuestion);
  const cleanQuestionText = currentQuestion.question
    .replace(/\[GATE[^\]]+\]\s*/i, "")
    .replace(/\[Topic:\s*[^\]]+\]\s*/i, "");

  const handleJumpToQuestion = (targetIndex: number) => {
    if (targetIndex === currentQuestionIndex) return;
    setCurrentQuestionIndex(targetIndex);
    setSelectedOption(null);
    setShowExplanation(false);
    setTimeLeft(TIMER_SECONDS);
    setTimerActive(true);
    setTimedOut(false);
  };

  if (!questions || questions.length === 0) {
    return null;
  }

  if (!quizStarted) {
    return (
      <div className="quiz-container">
        <div className="start-screen">
          <div className="start-icon">📝</div>
          <h3>Practice Quiz</h3>
          <p className="start-info">
            {questions.length} question{questions.length > 1 ? "s" : ""} ·{" "}
            {TIMER_SECONDS}s per question
          </p>
          {gateQuestionsCount > 0 && (
            <div className="gate-featured-badge">
              <i className="fa-solid fa-graduation-cap"></i> Includes{" "}
              <strong>
                {gateQuestionsCount} GATE Previous Year Question
                {gateQuestionsCount > 1 ? "s" : ""}
              </strong>
            </div>
          )}
          <p className="start-desc">
            Each question has a {TIMER_SECONDS}-second time limit. Unanswered
            questions will be auto-submitted when time runs out.
          </p>
          <button className="start-btn" onClick={startQuiz}>
            Start Quiz ▶
          </button>
        </div>
        <style jsx>{`
          .quiz-container {
            background: var(--surface);
            border-radius: 12px;
            border: 1px solid var(--border);
            padding: 2rem;
            margin-top: 1.5rem;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
            text-align: center;
          }
          .start-icon {
            font-size: 2.5rem;
            margin-bottom: 0.75rem;
          }
          .start-screen h3 {
            font-size: 1.35rem;
            font-weight: 700;
            color: var(--heading-color);
            margin-bottom: 0.4rem;
          }
          .start-info {
            font-size: 0.95rem;
            color: var(--text-secondary);
            font-weight: 600;
            margin-bottom: 0.4rem;
          }
          .gate-featured-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            padding: 0.35rem 0.85rem;
            border-radius: 9999px;
            background: rgba(16, 185, 129, 0.1);
            border: 1px solid rgba(16, 185, 129, 0.3);
            color: #10b981;
            font-size: 0.82rem;
            font-weight: 600;
            margin-bottom: 0.85rem;
          }
          .start-desc {
            font-size: 0.88rem;
            color: var(--text-muted);
            margin-bottom: 1.25rem;
            max-width: 400px;
            margin-left: auto;
            margin-right: auto;
            line-height: 1.5;
          }
          .start-btn {
            background: var(--heading-color);
            color: var(--surface);
            border: none;
            padding: 0.65rem 1.75rem;
            border-radius: 8px;
            font-weight: 600;
            font-size: 0.95rem;
            cursor: pointer;
            transition: all 0.15s ease;
          }
          .start-btn:hover {
            opacity: 0.9;
            transform: translateY(-1px);
          }
        `}</style>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="quiz-container completed">
        <div className="completion-card">
          <div className="completion-icon">🏆</div>
          <h3>Quiz Completed!</h3>
          <p className="final-score">
            You scored <span>{score}</span> out of{" "}
            <span>{questions.length}</span>
          </p>
          <div className="score-bar-container">
            <div
              className="score-bar"
              style={{ width: `${(score / questions.length) * 100}%` }}
            ></div>
          </div>
          {timeoutCount > 0 && (
            <p className="timeout-summary">
              ⏱ {timeoutCount} question{timeoutCount > 1 ? "s" : ""} timed out
            </p>
          )}
          <p className="completion-message">
            {score === questions.length
              ? "Perfect score! You've mastered this topic."
              : "Great practice! Review the explanations to improve further."}
          </p>
          <button onClick={resetQuiz} className="retry-btn">
            Retake Quiz
          </button>
        </div>
        <style jsx>{`
          .quiz-container {
            margin-top: 1.5rem;
            padding: 2rem;
            background: var(--surface);
            border-radius: 12px;
            border: 1px solid var(--border);
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
            text-align: center;
          }
          .completion-icon {
            font-size: 2.5rem;
            margin-bottom: 0.75rem;
          }
          .completion-card h3 {
            font-size: 1.35rem;
            font-weight: 700;
            color: var(--heading-color);
            margin-bottom: 0.4rem;
          }
          .final-score {
            font-size: 1rem;
            color: var(--text-secondary);
            margin-bottom: 1.25rem;
          }
          .final-score span {
            font-weight: 700;
            color: #10b981;
          }
          .score-bar-container {
            width: 100%;
            height: 10px;
            background: var(--border);
            border-radius: 5px;
            overflow: hidden;
            margin-bottom: 1.25rem;
            max-width: 280px;
            margin-left: auto;
            margin-right: auto;
          }
          .score-bar {
            height: 100%;
            background: #10b981;
            transition: width 1s ease-out;
          }
          .timeout-summary {
            font-size: 0.9rem;
            color: #ef4444;
            font-weight: 600;
            margin-bottom: 0.85rem;
          }
          .completion-message {
            font-size: 0.9rem;
            color: var(--text-secondary);
            margin-bottom: 1.25rem;
          }
          .retry-btn {
            background: var(--heading-color);
            color: var(--surface);
            border: none;
            padding: 0.65rem 1.5rem;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.15s ease;
          }
          .retry-btn:hover {
            opacity: 0.9;
            transform: translateY(-1px);
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      {/* Question Jump & Filter Strip */}
      <div className="quiz-nav-strip">
        <div className="filter-group">
          <button
            className={`filter-btn ${!filterGateOnly ? "active" : ""}`}
            onClick={() => setFilterGateOnly(false)}
          >
            All ({questions.length})
          </button>
          {gateQuestionsCount > 0 && (
            <button
              className={`filter-btn gate-filter ${filterGateOnly ? "active" : ""}`}
              onClick={() => setFilterGateOnly(true)}
            >
              <i className="fa-solid fa-graduation-cap"></i> GATE PYQs (
              {gateQuestionsCount})
            </button>
          )}
        </div>

        <div className="jump-pills-list">
          {filteredIndices.map((idx) => {
            const q = questions[idx];
            const isCurrent = idx === currentQuestionIndex;
            const isAnswered = answers[q.id] !== undefined;
            const isCorrect = answers[q.id] === true;
            const hasGateTag = !!getQuestionGateYear(q);

            return (
              <button
                key={q.id}
                onClick={() => handleJumpToQuestion(idx)}
                className={`jump-pill ${isCurrent ? "current" : ""} ${isAnswered ? (isCorrect ? "correct" : "incorrect") : ""} ${hasGateTag ? "is-gate" : ""}`}
                title={`Q${idx + 1}${hasGateTag ? ` - ${getQuestionGateYear(q)}` : ""}`}
              >
                {hasGateTag && (
                  <i className="fa-solid fa-graduation-cap pill-icon"></i>
                )}
                <span>Q{idx + 1}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="quiz-header">
        <div className="header-left">
          <span className="question-counter">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <div className="tags-row">
            {currentGateYear && (
              <span className="gate-badge">
                <i className="fa-solid fa-graduation-cap"></i> {currentGateYear}
              </span>
            )}
            {currentTopicTag && (
              <span className="topic-badge">
                <i className="fa-solid fa-bookmark"></i> {currentTopicTag}
              </span>
            )}
          </div>
        </div>

        <div className="header-right">
          <div
            className={`timer-container${timeLeft <= 10 && timerActive ? " pulse" : ""}${timedOut ? " timed-out" : ""}`}
          >
            <svg width="40" height="40" viewBox="0 0 44 44">
              <circle
                cx="22"
                cy="22"
                r={TIMER_RADIUS}
                fill="none"
                stroke="var(--border)"
                strokeWidth="3"
              />
              <circle
                cx="22"
                cy="22"
                r={TIMER_RADIUS}
                fill="none"
                stroke={timerColor}
                strokeWidth="3"
              />
            </svg>
            <span className="timer-text" style={{ color: timerColor }}>
              {timeLeft}
            </span>
          </div>
          <span className={`difficulty-badge ${currentQuestion.difficulty}`}>
            {currentQuestion.difficulty}
          </span>
        </div>
      </div>

      {timedOut && (
        <div className="timeout-banner">
          ⏱ Time&apos;s up! Moving to explanation.
        </div>
      )}

      <h3 className="question-text">{cleanQuestionText}</h3>

      <div className="options-grid">
        {currentQuestion.options.map((option, index) => {
          let optionClass = "option-btn";

          if (showExplanation) {
            if (index === currentQuestion.correctAnswer) {
              optionClass += " correct";
            } else if (index === selectedOption) {
              optionClass += " incorrect";
            } else {
              optionClass += " disabled";
            }
          } else if (selectedOption === index) {
            optionClass += " selected";
          }

          return (
            <button
              key={index}
              className={optionClass}
              onClick={() => handleOptionSelect(index)}
              disabled={showExplanation}
            >
              <span className="option-letter">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="option-text">{option}</span>
              {showExplanation && index === currentQuestion.correctAnswer && (
                <i className="fas fa-check-circle result-icon"></i>
              )}
              {showExplanation &&
                index === selectedOption &&
                index !== currentQuestion.correctAnswer && (
                  <i className="fas fa-times-circle result-icon"></i>
                )}
            </button>
          );
        })}
      </div>

      {showExplanation && (
        <div
          className={`explanation-box ${timedOut ? "timeout" : selectedOption === currentQuestion.correctAnswer ? "success" : "info"}`}
        >
          <h4>
            {timedOut
              ? "⏱ Time's up! The correct answer is " +
                String.fromCharCode(65 + currentQuestion.correctAnswer) +
                "."
              : selectedOption === currentQuestion.correctAnswer
                ? "Correct! 🎉"
                : "Not quite. The correct answer is " +
                  String.fromCharCode(65 + currentQuestion.correctAnswer) +
                  "."}
          </h4>
          <p>{currentQuestion.explanation}</p>
        </div>
      )}

      <div className="quiz-footer">
        {!showExplanation ? (
          <button
            className="action-btn check-btn"
            onClick={handleCheckAnswer}
            disabled={selectedOption === null}
          >
            Check Answer
          </button>
        ) : (
          <button className="action-btn next-btn" onClick={handleNextQuestion}>
            {currentQuestionIndex < questions.length - 1
              ? "Next Question"
              : "See Results"}
            <i className="fas fa-arrow-right"></i>
          </button>
        )}
      </div>

      <style jsx>{`
        .quiz-container {
          background: var(--surface);
          border-radius: 12px;
          border: 1px solid var(--border);
          padding: 1.5rem;
          margin-top: 1.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
        }

        .quiz-nav-strip {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          margin-bottom: 1.25rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border);
        }

        .filter-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .filter-btn {
          padding: 0.25rem 0.65rem;
          border-radius: 6px;
          font-size: 0.76rem;
          font-weight: 700;
          border: 1px solid var(--border);
          background: var(--bg-light);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .filter-btn:hover {
          border-color: var(--heading-color);
        }

        .filter-btn.active {
          background: var(--heading-color);
          color: var(--surface);
          border-color: var(--heading-color);
        }

        .filter-btn.gate-filter {
          color: #10b981;
          border-color: rgba(16, 185, 129, 0.3);
          background: rgba(16, 185, 129, 0.06);
        }

        .filter-btn.gate-filter.active {
          background: #10b981;
          color: #ffffff;
          border-color: #10b981;
        }

        .jump-pills-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
          align-items: center;
        }

        .jump-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.2rem 0.5rem;
          border-radius: 6px;
          border: 1px solid var(--border);
          background: var(--surface);
          color: var(--text-secondary);
          font-size: 0.74rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .jump-pill:hover {
          border-color: #10b981;
          transform: translateY(-1px);
        }

        .jump-pill.current {
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
          color: #3b82f6;
          background: rgba(59, 130, 246, 0.08);
        }

        .jump-pill.correct {
          border-color: #10b981;
          background: rgba(16, 185, 129, 0.12);
          color: #10b981;
        }

        .jump-pill.incorrect {
          border-color: #ef4444;
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }

        .jump-pill.is-gate {
          border-color: #f59e0b;
          color: #d97706;
          background: rgba(245, 158, 11, 0.08);
        }

        html.dark .jump-pill.is-gate {
          color: #fbbf24;
          border-color: rgba(251, 191, 36, 0.35);
        }

        .pill-icon {
          font-size: 0.65rem;
        }

        .header-left {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          align-items: center;
        }

        .gate-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.15rem 0.55rem;
          border-radius: 6px;
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: #10b981;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.02em;
        }

        .topic-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.15rem 0.55rem;
          border-radius: 6px;
          background: rgba(59, 130, 246, 0.08);
          border: 1px solid rgba(59, 130, 246, 0.25);
          color: #3b82f6;
          font-size: 0.72rem;
          font-weight: 700;
        }

        .quiz-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .timer-container {
          position: relative;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .timer-text {
          position: absolute;
          font-size: 0.72rem;
          font-weight: 700;
          font-variant-numeric: tabular-nums;
        }

        .timer-container.pulse {
          animation: timerPulse 1s ease-in-out infinite;
        }

        .timer-container.timed-out .timer-text {
          color: #ef4444 !important;
        }

        @keyframes timerPulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        .timeout-banner {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.25);
          color: #ef4444;
          padding: 0.5rem 0.85rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.85rem;
          text-align: center;
          margin-bottom: 1rem;
        }

        .question-counter {
          font-size: 0.82rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .difficulty-badge {
          font-size: 0.7rem;
          padding: 0.2rem 0.6rem;
          border-radius: 999px;
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.05em;
          border: 1px solid var(--border);
          color: var(--text-secondary);
        }

        .question-text {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--heading-color);
          margin-bottom: 1.25rem;
          line-height: 1.5;
        }

        .options-grid {
          display: grid;
          gap: 0.65rem;
          margin-bottom: 1.25rem;
        }

        .option-btn {
          display: flex;
          align-items: center;
          padding: 0.85rem 1rem;
          background: var(--bg-light);
          border: 1.5px solid var(--border);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.15s ease;
          text-align: left;
          color: var(--text-primary);
        }

        .option-btn:hover:not(:disabled) {
          border-color: var(--heading-color);
        }

        .option-btn.selected {
          border-color: #3b82f6;
          background: rgba(59, 130, 246, 0.08);
        }

        .option-btn.correct {
          border-color: #10b981;
          background: rgba(16, 185, 129, 0.08);
          color: #10b981;
        }

        .option-btn.incorrect {
          border-color: #ef4444;
          background: rgba(239, 68, 68, 0.08);
          color: #ef4444;
        }

        .option-btn.disabled {
          opacity: 0.6;
          cursor: default;
        }

        .option-letter {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--border);
          border-radius: 50%;
          font-weight: 700;
          font-size: 0.78rem;
          color: var(--text-secondary);
          margin-right: 0.75rem;
          flex-shrink: 0;
        }

        .option-btn.selected .option-letter {
          background: #3b82f6;
          color: white;
        }

        .option-btn.correct .option-letter {
          background: #10b981;
          color: white;
        }

        .option-btn.incorrect .option-letter {
          background: #ef4444;
          color: white;
        }

        .option-text {
          font-size: 0.92rem;
          font-weight: 500;
          color: inherit;
        }

        .result-icon {
          margin-left: auto;
          font-size: 1.1rem;
        }

        .explanation-box {
          padding: 0.9rem 1.1rem;
          border-radius: 8px;
          margin-bottom: 1.25rem;
          background: var(--bg-light);
          border: 1px solid var(--border);
        }

        .explanation-box.success {
          border-left: 3.5px solid #10b981;
        }

        .explanation-box.info {
          border-left: 3.5px solid #3b82f6;
        }

        .explanation-box.timeout {
          border-left: 3.5px solid #ef4444;
        }

        .explanation-box h4 {
          font-size: 0.92rem;
          font-weight: 700;
          margin-bottom: 0.35rem;
          color: var(--heading-color);
        }

        .explanation-box p {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.7;
          white-space: pre-line;
          margin: 0;
        }

        .quiz-footer {
          display: flex;
          justify-content: flex-end;
          padding-top: 0.85rem;
          border-top: 1px solid var(--border);
        }

        .action-btn {
          padding: 0.6rem 1.35rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          border: none;
          transition: all 0.15s ease;
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }

        .check-btn {
          background: var(--heading-color);
          color: var(--surface);
        }

        .check-btn:disabled {
          background: var(--border);
          color: var(--text-muted);
          cursor: not-allowed;
        }

        .check-btn:hover:not(:disabled) {
          opacity: 0.9;
        }

        .next-btn {
          background: #2563eb;
          color: white;
        }

        .next-btn:hover {
          background: #1d4ed8;
        }
      `}</style>
    </div>
  );
}
