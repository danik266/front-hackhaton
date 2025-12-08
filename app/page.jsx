"use client";
import React, { useState, useEffect, useRef } from "react";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMessage = query.trim();
    setQuery("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:8000/ask?query=${encodeURIComponent(userMessage)}`
      );
      if (!response.ok) throw new Error("Ошибка сервера");
      const result = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: result.answer || "Нет ответа",
          sources: result.sources || [],
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `Ошибка: ${err.message}`, error: true },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex h-screen">
      {/* Красивый иридисцентный фон */}
      <div className="absolute inset-0 -z-10">
        <div
          className="w-full h-full"
          style={{
            background:
              "radial-gradient(circle at center, #d5d5d5ff 0%, #d5d5d5ff 20%, #c8e6c9 60%, #a5d6a7 100%)",
            backgroundSize: "200% 200%",
            animation: "iridescentBreath 5s ease-in-out infinite",
          }}
        />
      </div>

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

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .msg-animation {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>

      <div className="flex h-full w-full relative">
        {/* Боковая панель с анимацией — теперь fixed */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-40 w-84 bg-white/40 backdrop-blur-xl border-r border-white/20 p-6 flex flex-col gap-6 
            transition-all duration-700 ease-in-out
            ${
              isSidebarOpen
                ? "translate-x-0 opacity-100"
                : "-translate-x-full opacity-0"
            }
            ${isLoaded ? "" : "-translate-x-20 opacity-0"}
          `}
        >
          <h1 className="text-2xl font-bold text-[#1b5e20]">AI Pharmacist</h1>
          <button className="text-left text-[#1b5e20]/70 bg-white/30 backdrop-blur-xl px-5 py-3 rounded-2xl hover:bg-white/50 transition-all hover:scale-[1.02] border border-white/20">
            + Новый чат
          </button>
        </aside>

        {/* Кнопка скрытия/показа сайдбара — всегда видна */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute left-0 top-6 z-50 bg-white/40 backdrop-blur-xl p-3 rounded-r-2xl shadow-xl border border-white/30 shadow-2xl hover:bg-white/60 transition-all"
          style={{
            transform: isSidebarOpen ? "translateX(336px)" : "translateX(0)",
          }} // 336px = w-84 (21rem)
        >
          <svg
            className={`w-6 h-6 text-[#1b5e20] transition-transform ${
              isSidebarOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Основная область чата — растягивается, центрирует контент и сдвигается динамически */}
        <div
          className={`text-[#1b5e20]/70 flex-1 flex flex-col transition-all duration-700 ease-in-out overflow-hidden ${
            isSidebarOpen ? "ml-84" : "ml-0"
          }`}
        >
          {/* Сообщения */}
          <div className="flex-1 overflow-y-auto px-8 py-6">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center max-w-2xl mx-auto">
                  <h2 className="text-4xl font-light text-[#1b5e20]/80 mb-4">
                    Вас приветствует AI Pharmacist!
                  </h2>
                  <p className="text-lg text-[#1b5e20]/60">
                    Задайте вопрос о лекарствах, их составе, взаимодействии или
                    применении
                  </p>
                </div>
              </div>
            ) : (
              <div
                className={`mx-auto space-y-8 transition-all duration-700 ease-in-out ${
                  isSidebarOpen ? "max-w-3xl" : "max-w-5xl"
                }`}
              >
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`msg-animation flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`px-7 py-5 rounded-3xl shadow-lg backdrop-blur-md border border-white/30 max-w-full`}
                      style={{ maxWidth: "calc(100% - 2rem)" }}
                    >
                      {msg.role === "assistant" && (
                        <p className="text-sm font-semibold text-[#1b5e20]/70 mb-2">
                          AI Pharmacist
                        </p>
                      )}
                      <p className="text-lg leading-relaxed whitespace-pre-wrap">
                        {msg.content}
                      </p>

                      {msg.sources && msg.sources.length > 0 && (
                        <div className="mt-5 pt-5 border-t border-white/30">
                          <p className="text-sm font-medium text-[#1b5e20]/80 mb-3">
                            Источники:
                          </p>
                          <div className="space-y-2">
                            {msg.sources.map((src, idx) => (
                              <a
                                key={idx}
                                href={src.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-sm text-blue-600 hover:text-blue-800 underline"
                              >
                                {src.name}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex justify-start">
                    <div className="shadow-xl  text-[#1b5e20] px-7 py-5 rounded-3xl backdrop-blur-md border border-white/30">
                      <p className="text-lg">Загрузка...</p>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Поле ввода — центрируется с той же шириной */}
          <div className="p-6 bg-gradient-to-t from-[#a5d6a7]/60 via-[#a5d6a7]/20 to-transparent backdrop-blur-md">
            <form
              onSubmit={handleSubmit}
              className={`mx-auto flex gap-4 transition-all duration-700 ease-in-out ${
                isSidebarOpen ? "max-w-3xl" : "max-w-5xl"
              }`}
            >
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Узнать у AI Pharmacist..."
                className="text-[#1b5e20] flex-1 bg-white/30 backdrop-blur-xl px-7 py-5 rounded-3xl outline-none text-lg placeholder-[#1b5e20]/50 border border-white/40 focus:border-white/70 transition-all shadow-2xl"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !query.trim()}
                className="bg-white/40 backdrop-blur-xl p-5 rounded-full hover:bg-white/60 transition-all hover:scale-110 disabled:opacity-40 disabled:cursor-not-allowed shadow-xl border border-white/30"
              >
                <img
                  src="/free-icon-send-button-12439325 (1).png"
                  alt="Отправить"
                  className="w-8 h-8 brightness-0 opacity-80"
                />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
