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
  const [answers, setAnswers] = useState<Record<string, boolean>>({}); // track correct/incorrect for each question
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
    if (showExplanation) return; // Prevent changing answer after reveal
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

  // Timer helper
  const timerProgress = timeLeft / TIMER_SECONDS;
  const strokeDashoffset = TIMER_CIRCUMFERENCE * (1 - timerProgress);
  const timerColor =
    timeLeft > 30 ? "#10b981" : timeLeft > 10 ? "#f59e0b" : "#ef4444";

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
            background: #fff;
            border-radius: 12px;
            border: 1px solid #e5e7eb;
            padding: 2rem;
            margin-top: 2rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
            text-align: center;
          }
          .start-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
          }
          .start-screen h3 {
            font-size: 1.5rem;
            font-weight: 700;
            color: #111827;
            margin-bottom: 0.5rem;
          }
          .start-info {
            font-size: 1rem;
            color: #6b7280;
            font-weight: 600;
            margin-bottom: 0.5rem;
          }
          .start-desc {
            font-size: 0.9rem;
            color: #9ca3af;
            margin-bottom: 1.5rem;
            max-width: 400px;
            margin-left: auto;
            margin-right: auto;
            line-height: 1.5;
          }
          .start-btn {
            background: #111827;
            color: white;
            border: none;
            padding: 0.75rem 2rem;
            border-radius: 8px;
            font-weight: 600;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.2s;
          }
          .start-btn:hover {
            background: #374151;
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
            margin-top: 2rem;
            padding: 2rem;
            background: #fff;
            border-radius: 12px;
            border: 1px solid #e5e7eb;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            text-align: center;
          }
          .completion-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
          }
          .completion-card h3 {
            font-size: 1.5rem;
            font-weight: 700;
            color: #111827;
            margin-bottom: 0.5rem;
          }
          .final-score {
            font-size: 1.1rem;
            color: #4b5563;
            margin-bottom: 1.5rem;
          }
          .final-score span {
            font-weight: 700;
            color: #10b981;
          }
          .score-bar-container {
            width: 100%;
            height: 12px;
            background: #e5e7eb;
            border-radius: 6px;
            overflow: hidden;
            margin-bottom: 1.5rem;
            max-width: 300px;
            margin-left: auto;
            margin-right: auto;
          }
          .score-bar {
            height: 100%;
            background: #10b981;
            transition: width 1s ease-out;
          }
          .timeout-summary {
            font-size: 0.95rem;
            color: #ef4444;
            font-weight: 600;
            margin-bottom: 1rem;
          }
          .retry-btn {
            background: #111827;
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
          }
          .retry-btn:hover {
            background: #374151;
            transform: translateY(-1px);
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <span className="question-counter">
          Question {currentQuestionIndex + 1} of {questions.length}
        </span>
        <div className="header-right">
          <div
            className={`timer-container${timeLeft <= 10 && timerActive ? " pulse" : ""}${timedOut ? " timed-out" : ""}`}
          >
            <svg width="44" height="44" viewBox="0 0 44 44">
              <circle
                cx="22"
                cy="22"
                r={TIMER_RADIUS}
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="3"
              />
              <circle
                cx="22"
                cy="22"
                r={TIMER_RADIUS}
                fill="none"
                stroke={timerColor}
                strokeWidth="3"
                strokeDasharray={TIMER_CIRCUMFERENCE}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform="rotate(-90 22 22)"
                style={{
                  transition: "stroke-dashoffset 1s linear, stroke 0.5s ease",
                }}
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

      <h3 className="question-text">{currentQuestion.question}</h3>

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
          background: #fff;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          padding: 1.5rem;
          margin-top: 2rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
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
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .timer-text {
          position: absolute;
          font-size: 0.75rem;
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
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #dc2626;
          padding: 0.625rem 1rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.9rem;
          text-align: center;
          margin-bottom: 1rem;
          animation: fadeIn 0.3s ease;
        }

        .question-counter {
          font-size: 0.875rem;
          color: #6b7280;
          font-weight: 500;
        }

        .difficulty-badge {
          font-size: 0.75rem;
          padding: 0.25rem 0.75rem;
          border-radius: 999px;
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.05em;
        }

        .difficulty-badge.easy {
          background: #ecfdf5;
          color: #059669;
        }
        .difficulty-badge.medium {
          background: #fffbeb;
          color: #d97706;
        }
        .difficulty-badge.hard {
          background: #fef2f2;
          color: #dc2626;
        }

        .question-text {
          font-size: 1.125rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 1.5rem;
          line-height: 1.5;
        }

        .options-grid {
          display: grid;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .option-btn {
          display: flex;
          align-items: center;
          padding: 1rem;
          background: #f9fafb;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
          position: relative;
        }

        .option-btn:hover:not(:disabled) {
          background: #f3f4f6;
          border-color: #d1d5db;
        }

        .option-btn.selected {
          border-color: #3b82f6;
          background: #eff6ff;
        }

        .option-btn.correct {
          border-color: #10b981;
          background: #ecfdf5;
          color: #065f46;
        }

        .option-btn.incorrect {
          border-color: #ef4444;
          background: #fef2f2;
          color: #991b1b;
        }

        .option-btn.disabled {
          opacity: 0.6;
          cursor: default;
        }

        .option-letter {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #e5e7eb;
          border-radius: 50%;
          font-weight: 700;
          font-size: 0.875rem;
          color: #4b5563;
          margin-right: 1rem;
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
          font-size: 1rem;
          font-weight: 500;
          color: inherit;
        }

        .result-icon {
          margin-left: auto;
          font-size: 1.25rem;
        }

        .explanation-box {
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .explanation-box.success {
          background: #ecfdf5;
          border: 1px solid #a7f3d0;
        }

        .explanation-box.info {
          background: #f0f9ff;
          border: 1px solid #bae6fd;
        }

        .explanation-box.timeout {
          background: #fef2f2;
          border: 1px solid #fecaca;
        }

        .explanation-box h4 {
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: #111827;
        }

        .explanation-box p {
          font-size: 0.95rem;
          color: #4b5563;
          line-height: 1.8;
          white-space: pre-line;
        }

        .quiz-footer {
          display: flex;
          justify-content: flex-end;
          padding-top: 1rem;
          border-top: 1px solid #f3f4f6;
        }

        .action-btn {
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          border: none;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .check-btn {
          background: #111827;
          color: white;
        }

        .check-btn:disabled {
          background: #e5e7eb;
          color: #9ca3af;
          cursor: not-allowed;
        }

        .check-btn:hover:not(:disabled) {
          background: #374151;
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
