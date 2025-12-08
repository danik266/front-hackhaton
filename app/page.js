"use client";
import React, { useState } from "react";

export default function App() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setData(null);

    try {
      const response = await fetch(`http://localhost:8000/ask?query=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error("Ошибка сервера");

      const result = await response.json();
      setData(result); // result должен быть объектом {answer, sources}
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Knowledge AI</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Напишите ваш вопрос..."
          style={{ width: "300px", padding: "8px" }}
        />
        <button type="submit" style={{ padding: "8px 12px", marginLeft: "8px" }}>Спросить</button>
      </form>

      {loading && <p>Загрузка...</p>}
      {error && <p style={{ color: "red" }}>Ошибка: {error}</p>}

      {data && (
  <div>
    <h2>Ответ:</h2>
    <p>{data.answer}</p> {/* только строка */}

    {data.sources && data.sources.length > 0 && (
  <>
    <h3>Источники:</h3>
    <ul>
      {data.sources.map((src, idx) => (
        <li key={idx}>
          <a href={src.url} target="_blank" rel="noopener noreferrer">{src.name}</a>
        </li>
      ))}
    </ul>
  </>
)}
  </div>
)}
    </div>
  );
}
