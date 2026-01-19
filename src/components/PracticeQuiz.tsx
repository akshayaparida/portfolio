"use client";

import { useState } from "react";
import { PracticeQuestion } from "@/types/learning";

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

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (optionIndex: number) => {
    if (showExplanation) return; // Prevent changing answer after reveal
    setSelectedOption(optionIndex);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;

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
    setAnswers({});
  };

  if (!questions || questions.length === 0) {
    return null;
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
        <span className={`difficulty-badge ${currentQuestion.difficulty}`}>
          {currentQuestion.difficulty}
        </span>
      </div>

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
          className={`explanation-box ${selectedOption === currentQuestion.correctAnswer ? "success" : "info"}`}
        >
          <h4>
            {selectedOption === currentQuestion.correctAnswer
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
