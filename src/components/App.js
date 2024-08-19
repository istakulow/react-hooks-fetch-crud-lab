import React, { useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  const handleCreate = (question) => {
    setQuestions([...questions, question]);
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onCreate={handleCreate} />
      ) : (
        <QuestionList questions={questions} />
      )}
    </main>
  );
}

export default App;