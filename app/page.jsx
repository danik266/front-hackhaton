"use client";
import React, { useState, useEffect, useRef } from "react";

export default function App() {
  const [chats, setChats] = useState({
    1: { title: "Новый чат", messages: [] },
  });
  const [activeChat, setActiveChat] = useState(1);
  const messages = chats[activeChat]?.messages || [];

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [theme, setTheme] = useState("light");

  const messagesEndRef = useRef(null);

  useEffect(
    () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }),
    [messages, loading]
  );

  const deleteChat = (id) => {
    if (id === 1) return;
    setChats((prev) => {
      const updated = { ...prev };
      delete updated[id];
      const remainingIds = Object.keys(updated);
      setActiveChat(remainingIds.length > 0 ? Number(remainingIds[0]) : null);
      return updated;
    });
  };

  const createNewChat = () => {
    if (!activeChat || chats[activeChat]?.messages.length === 0) {
      alert("Сначала отправьте сообщение в текущий чат!");
      return;
    }
    const id = Date.now();
    setChats((prev) => ({
      ...prev,
      [id]: { title: "Новый чат", messages: [] },
    }));
    setActiveChat(id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    const userMessage = query.trim();
    setQuery("");

    setChats((prev) => ({
      ...prev,
      [activeChat]: {
        ...prev[activeChat],
        title:
          prev[activeChat].messages.length === 0
            ? userMessage.slice(0, 25) + "..."
            : prev[activeChat].title,
        messages: [
          ...prev[activeChat].messages,
          { role: "user", content: userMessage },
        ],
      },
    }));

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8000/ask?query=${encodeURIComponent(userMessage)}`
      );
      if (!response.ok) throw new Error("Ошибка сервера");
      const result = await response.json();
      setChats((prev) => ({
        ...prev,
        [activeChat]: {
          ...prev[activeChat],
          messages: [
            ...prev[activeChat].messages,
            {
              role: "assistant",
              content: result.answer || "Нет ответа",
              sources: result.sources || [],
            },
          ],
        },
      }));
    } catch (err) {
      setChats((prev) => ({
        ...prev,
        [activeChat]: {
          ...prev[activeChat],
          messages: [
            ...prev[activeChat].messages,
            {
              role: "assistant",
              content: `Ошибка: ${err.message}`,
              error: true,
            },
          ],
        },
      }));
    } finally {
      setLoading(false);
    }
  };

  const isLight = theme === "light";

  const bgStyle = {
    backgroundImage: isLight
      ? "radial-gradient(circle at center, #d5d5d5ff 0%, #d5d5d5ff 20%, #c8e6c9 60%, #a5d6a7 100%)"
      : "radial-gradient(circle at center, #1b1b1b 0%, #121212 40%, #0c0f0c 100%)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "200% 200%",
    animation: isLight
      ? "iridescentBreath 5s ease-in-out infinite"
      : "darkBreath 6s ease-in-out infinite",
  };

  const textColor = isLight ? "#1b5e20" : "#c8e6c9";
  const sidebarBg = isLight ? "bg-white/40" : "bg-[#0f0f0f]/70";

  return (
    <div className="relative flex h-screen">
      {/* ФОН */}
      <div className="absolute inset-0 -z-10">
        <div className="w-full h-full" style={bgStyle} />
      </div>

      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-84 ${sidebarBg} backdrop-blur-xl border-r p-6 flex flex-col gap-4 transition-transform duration-500`}
        style={{
          borderColor: isLight ? "transparent" : "#1f1f1f",
          transform: isSidebarOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <h1 className="text-2xl font-bold" style={{ color: textColor }}>
          AI Pharmacist
        </h1>

        <button
          onClick={createNewChat}
          disabled={!activeChat || chats[activeChat]?.messages.length === 0}
          className="text-left px-5 py-3 rounded-2xl border transition-all"
          style={{
            color: textColor,
            borderColor: isLight ? "#ffffff33" : "#2a2a2a",
            backgroundColor: isLight
              ? "rgba(255,255,255,0.3)"
              : "rgba(26,26,26,0.6)",
            opacity:
              !activeChat || chats[activeChat]?.messages.length === 0 ? 0.4 : 1,
            cursor:
              !activeChat || chats[activeChat]?.messages.length === 0
                ? "not-allowed"
                : "pointer",
          }}
        >
          + Новый чат
        </button>

        <div className="space-y-3 overflow-y-auto pr-2">
          {Object.entries(chats).map(([id, chat]) => (
            <div
              key={id}
              className="w-full flex items-center justify-between px-3 py-3 rounded-xl transition-all group"
              style={{
                backgroundColor:
                  Number(id) === activeChat
                    ? isLight
                      ? "#ffffff99"
                      : "#1e1e1e"
                    : isLight
                    ? "#ffffff33"
                    : "#141414",
                color:
                  Number(id) === activeChat
                    ? textColor
                    : isLight
                    ? "#1b5e2070"
                    : "#c8e6c980",
              }}
            >
              <button
                onClick={() => setActiveChat(Number(id))}
                className="flex-1 text-left truncate"
              >
                {chat.title}
              </button>
              {Number(id) !== 1 && (
                <button
                  onClick={() => deleteChat(Number(id))}
                  className="opacity-0 group-hover:opacity-100 ml-3 text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="mt-auto px-4 py-2 rounded-xl border transition-all"
          style={{
            borderColor: textColor,
            color: textColor,
            backgroundColor: isLight
              ? "rgba(255,255,255,0.3)"
              : "rgba(26,26,26,0.6)",
          }}
        >
          {theme === "light" ? "Темная тема" : "Светлая тема"}
        </button>
      </aside>

      {/* Кнопка показать/скрыть sidebar */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="absolute left-0 top-6 z-50 bg-white/40 backdrop-blur-xl p-3 rounded-r-2xl border transition-transform duration-500"
        style={{
          borderColor: isLight ? "#ffffff33" : "#2a2a2a",
          backgroundColor: isLight
            ? "rgba(255,255,255,0.4)"
            : "rgba(26,26,26,0.7)",
          transform: isSidebarOpen ? "translateX(336px)" : "translateX(0)",
        }}
      >
        <svg
          className={`w-6 h-6 transition-transform ${
            isSidebarOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke={textColor}
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

      {/* MAIN CHAT */}
      <div
        className="flex-1 flex flex-col transition-all duration-700"
        style={{ marginLeft: isSidebarOpen ? 336 : 0 }}
      >
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center max-w-2xl mx-auto">
                <h2
                  className="text-4xl font-light mb-4"
                  style={{ color: textColor }}
                >
                  Добро пожаловать в AI Pharmacist!
                </h2>
                <p
                  className="text-lg"
                  style={{ color: isLight ? "#1b5e2070" : "#c8e6c980" }}
                >
                  Задайте вопрос о лекарствах, применении, составе или
                  взаимодействии.
                </p>
              </div>
            </div>
          ) : (
            <div
              className={`mx-auto space-y-8 ${
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
                    className="px-7 py-5 rounded-3xl shadow-lg backdrop-blur-md border"
                    style={{
                      maxWidth: "calc(100% - 2rem)",
                      backgroundColor: isLight
                        ? msg.role === "user"
                          ? "#e0f2f1"
                          : "#ffffffaa"
                        : msg.role === "user"
                        ? "#1a1f1a"
                        : "#1e1e1e",
                      borderColor: isLight ? "#ffffff33" : "#2d332d",
                      color: textColor,
                    }}
                  >
                    {msg.role === "assistant" && (
                      <p className="text-sm font-semibold mb-2">
                        AI Pharmacist
                      </p>
                    )}
                    <p className="text-lg leading-relaxed whitespace-pre-wrap">
                      {msg.content}
                    </p>
                    {msg.sources?.length > 0 && (
                      <div
                        className="mt-5 pt-5 border-t"
                        style={{
                          borderColor: isLight ? "#ffffff33" : "#2e2e2e",
                        }}
                      >
                        <p
                          className="text-sm font-medium mb-3"
                          style={{ color: isLight ? "#1b5e20" : "#c8e6c980" }}
                        >
                          Источники:
                        </p>
                        <div className="space-y-2">
                          {msg.sources.map((src, idx) => (
                            <a
                              key={idx}
                              href={src.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block text-sm underline"
                              style={{ color: isLight ? "#1b5e20" : "#c8e6c9" }}
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
                  <div
                    className="shadow-xl px-7 py-5 rounded-3xl backdrop-blur-md border"
                    style={{
                      borderColor: isLight ? "#ffffff33" : "#2d332d",
                      backgroundColor: isLight ? "#ffffffaa" : "#1a1f1a",
                      color: textColor,
                    }}
                  >
                    <p className="text-lg">Загрузка...</p>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* ВВОД */}
        <div className="p-6 bg-gradient-to-t from-transparent via-transparent to-transparent backdrop-blur-md">
          <form
            onSubmit={handleSubmit}
            className={`mx-auto flex gap-4 ${
              isSidebarOpen ? "max-w-3xl" : "max-w-5xl"
            }`}
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                isLight
                  ? "Узнать у AI Pharmacist..."
                  : "Спросить AI Pharmacist..."
              }
              className={`flex-1 px-7 py-5 rounded-3xl outline-none text-lg border shadow-xl placeholder-opacity-50 ${
                isLight ? "placeholder-green-900" : "placeholder-green-200"
              }`}
              style={{
                backgroundColor: isLight
                  ? "rgba(255,255,255,0.3)"
                  : "rgba(26,26,26,0.7)",
                color: textColor,
                borderColor: isLight ? "#ffffff33" : "#2a2a2a",
              }}
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="p-5 rounded-full border shadow-xl transition-all hover:scale-110"
              style={{
                backgroundColor: isLight
                  ? "rgba(255,255,255,0.4)"
                  : "rgba(26,26,26,0.7)",
                borderColor: isLight ? "#ffffff33" : "#2a2a2a",
              }}
            >
              <img
                src="/free-icon-send-button-12439325 (1).png"
                alt="Отправить"
                className={`w-8 h-8 ${isLight ? "" : "invert brightness-150"}`}
              />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
