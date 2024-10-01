import React, { useEffect, useState } from "react";
import { Question } from "./Questions";
import "./Quiz.css";

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = () => {
    if (selectedOption === Question[currentQuestion].Answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < Question.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }

    setSelectedOption("");
  };

  const getScoreFeedback = () => {
    if (score >= 1 && score <= 3) {
      return "Don't be discouraged, keep trying! 😢";
    } else if (score >= 4 && score <= 6) {
      return "Good job! You can do even better! 😊";
    } else if (score > 6 && score <= 10) {
      return "Excellent work! You're doing great! 🎉";
    } else {
      return "Invalid marks. Please enter a number between 1 and 10.";
    }
  };

  return (
    <div className="quiz-app">
      {loading ? (
        <>
          <img
            src="https://i.imghippo.com/files/3zyEv1727701440.gif"
            style={{
              maxWidth: "600px",
            }}
            alt=""
          />
        </>
      ) : (
        <>
          <h1 className="quiz-title">Quiz App 🤔</h1>
          {showScore ? (
            <div className="score-section">
              <p>
                You scored {score} out of {Question.length}
              </p>
              {getScoreFeedback()}
            </div>
          ) : (
            <div className="question-section">
              <h2 className="question-count">
                Question {currentQuestion + 1}/{Question.length}
              </h2>
              <p className="question-text">
                {Question[currentQuestion].prompt}
              </p>
              <div className="options-section">
                <label className="option">
                  <input
                    type="radio"
                    value="optionA"
                    checked={selectedOption === "optionA"}
                    onChange={handleOptionChange}
                  />
                  {Question[currentQuestion].optionA}
                </label>
                <label className="option">
                  <input
                    type="radio"
                    value="optionB"
                    checked={selectedOption === "optionB"}
                    onChange={handleOptionChange}
                  />
                  {Question[currentQuestion].optionB}
                </label>
                <label className="option">
                  <input
                    type="radio"
                    value="optionC"
                    checked={selectedOption === "optionC"}
                    onChange={handleOptionChange}
                  />
                  {Question[currentQuestion].optionC}
                </label>
                <label className="option">
                  <input
                    type="radio"
                    value="optionD"
                    checked={selectedOption === "optionD"}
                    onChange={handleOptionChange}
                  />
                  {Question[currentQuestion].optionD}
                </label>
              </div>

              <button
                className="submit-button"
                onClick={handleSubmit}
                disabled={!selectedOption}
              >
                Next Question
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
