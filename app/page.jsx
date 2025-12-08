"use client";
import React, { useState, useEffect, useRef } from "react";

export default function App() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [chatMode, setChatMode] = useState(false);
  const [chatHistory, setChatHistory] = useState([]); // список всех чатов
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userText = query;
    setQuery("");

    if (!chatMode) setChatMode(true);
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:8000/ask?query=${encodeURIComponent(userText)}`
      );
      if (!res.ok) throw new Error("Ошибка сервера");
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "bot", text: data.answer }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Ошибка: " + err.message },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex h-screen overflow-hidden">
      {/* Фон с твоим градиентом */}
      <div
        className="absolute inset-0 -z-10 w-full h-full"
        style={{
          background:
            "radial-gradient(circle at center, #d5d5d5ff 0%, #d5d5d5ff 20%, #c8e6c9 60%, #a5d6a7 100%)",
          backgroundSize: "200% 200%",
          animation: "iridescentBreath 5s ease-in-out infinite",
        }}
      />
      <style jsx>{`
        @keyframes iridescentBreath {
          0%,
          100% {
            background-size: 150% 200%;
            background-position: 0% 50%;
          }
          25% {
            background-size: 170% 220%;
            background-position: 0% 100%;
          }
          50% {
            background-size: 150% 200%;
            background-position: 100% 50%;
          }
          75% {
            background-size: 170% 220%;
            background-position: 100% 0%;
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>

      <div className="relative flex h-full w-full">
<aside className="w-64 bg-white/40 backdrop-blur-10xl border-white/20 p-6 flex flex-col gap-6 rounded-r-[2rem] fade-in">

  <div className="text-2xl font-semibold text-[#1b5e20] px-4 py-2  rounded-xl backdrop-blur-md">
    AI Pharmacist
  </div>

<div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-2">
  {chatHistory.map((chat, idx) => (
    <button
      key={idx}
      onClick={() => {
        setMessages(chat);      // ← загружаем чат
        setChatMode(true);      // ← переходим в режим чата
      }}
      className="p-3 text-left bg-white/30 rounded-xl cursor-pointer hover:bg-white/40 transition text-sm text-[#1b5e20]"
    >
      Чат #{idx + 1} — {chat[0]?.text?.slice(0, 25) || "пустой"}
    </button>
  ))}
</div>


  {chatMode && (
    <button
  onClick={() => {
    if (messages.length > 0) {
      setChatHistory(prev => [...prev, messages]);
    }
    setMessages([]);
    setChatMode(false);
  }}
  className="text-[#1b5e20] bg-white/30 backdrop-blur-2xl px-4 py-3 rounded-2xl hover:bg-white/40 transition"
>
  Новый чат
</button>

  )}
</aside>
        {/* Основной блок */}
        {!chatMode ? (
          <main className="flex-1 p-12 flex items-center justify-center fade-in">
            <div>
              <h1 className="text-3xl mb-10  text-[#1b5e20]">Вас приветствует AI Pharmacist!</h1>
              <form
                onSubmit={handleSubmit}
                className="flex w-[470px] bg-white/15 backdrop-blur-3xl px-6 py-4 rounded-3xl shadow-xl border border-white/30"
              >
                <input
                  type="text"
                  className="flex-1 text-[#1b5e20] bg-transparent outline-none text-lg placeholder-[#1b5e20]/30"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Узнать у AI Pharmacist"
                />
                <button
                  type="submit"
                  className="text-xl text-[#1b5e20] hover:opacity-80 transition pl-2 bg-white/20 rounded-full p-2 "
                >
                  ➤
                </button>
              </form>
              {loading && (
                <p className="mt-6 text-lg bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md">
                  Загрузка…
                </p>
              )}
            </div>
          </main>
        ) : (
          <main className="flex-1 p-12 flex flex-col fade-in">
            <div className="flex-1 overflow-y-auto space-y-6 pr-3">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`max-w-[70%] px-5 py-3 rounded-2xl backdrop-blur-xl shadow-md text-[#1b5e20] border border-white/20 ${
                    msg.role === "user" ? "ml-auto bg-white/30" : "mr-auto bg-white/10"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              {loading && (
                <div className="mr-auto text-[#1b5e20] bg-white/10 px-5 py-3 rounded-2xl border border-white/20">
                  Печатает…
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-6 flex bg-white/20 backdrop-blur-3xl px-6 py-4 rounded-3xl shadow-xl border border-white/30"
            >
              <input
                type="text"
                className="flex-1 bg-transparent text-[#1b5e20] outline-none text-lg placeholder-[#1b5e20]/30"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Введите сообщение…"
              />
              <button
                type="submit"
                className="text-xl text-[#1b5e20] hover:opacity-80 transition pl-2 bg-white/20 rounded-full p-2"
              >
                ➤
              </button>
            </form>
          </main>
        )}
      </div>
    </div>
  );
}
