import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then(response => response.json())
      .then(data => setQuestions(data));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setQuestions(questions.filter((question) => question.id !== id));
      });
  };

  const handleUpdate = (id, correctIndex) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex }),
    })
      .then(() => {
        setQuestions(questions.map((question) => {
          if (question.id === id) {
            return { ...question, correctIndex };
          }
          return question;
        }));
      });
  };

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDelete={() => handleDelete(question.id)}
            onUpdate={(correctIndex) => handleUpdate(question.id, correctIndex)}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;