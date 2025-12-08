"use client";
import React, { useState, useEffect } from "react";
export default function App() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    setData(null);
    try {
      const response = await fetch(
        `http://localhost:8000/ask?query=${encodeURIComponent(query)}`
      );
      if (!response.ok) throw new Error("Ошибка сервера");
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative flex h-screen overflow-hidden">
      {/* Иридисцентный радиальный градиент: от белого центра к зелёному по краям, с мягким переливом для стеклянного эффекта */}
      <div className="absolute inset-0 -z-10">
        <div
          className="w-full h-full"
          style={{
            background:
              "radial-gradient(circle at center, #d5d5d5ff 0%, #d5d5d5ff 20%, #c8e6c9 60%, #a5d6a7 100%)",
            backgroundSize: "200% 200%",
            animation: "iridescentBreath 5s ease-in-out infinite", // Ускорено до 5 секунд
          }}
        />
      </div>
      {/* Улучшенная анимация для иридисцентного "дыхания" с лёгким сдвигом для большего блеска */}
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
        .fade-in-delay-1 {
          animation-delay: 0.2s;
        }
        .fade-in-delay-2 {
          animation-delay: 0.4s;
        }
        .fade-in-delay-3 {
          animation-delay: 0.6s;
        }
      `}</style>
      {/* Основной контент с улучшенным стеклянным эффектом: больше размытия, тонкие тени и градиенты для iOS-подобного вида */}
      <div className="relative flex h-full w-full">
        <aside
          className={`w-64 bg-white/40 backdrop-blur-10xl border-white/20 p-6 flex flex-col gap-6 rounded-r-[2rem] ${
            isLoaded ? "fade-in" : "opacity-0"
          }`}
        >
          <div className="text-2xl font-semibold text-[#1b5e20] px-4 py-2 rounded-xl backdrop-blur-md fade-in fade-in-delay-1">
            AI Pharmacist
          </div>
          <button className="text-[#1b5e20] bg-white/30 backdrop-blur-2xl px-4 py-3 rounded-2xl hover:bg-white/40 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border border-white/20 fade-in fade-in-delay-2">
            Новый чат
          </button>
        </aside>
        <main
          className={`flex-1 p-12 text-[#1b5e20] flex items-center justify-center ${
            isLoaded ? "fade-in" : "opacity-0"
          }`}
        >
          <div>
            <h1 className="text-3xl mb-10 px-3 rounded-2xl fade-in fade-in-delay-1">
              Вас приветствует AI Pharmacist!
            </h1>
            <form
              onSubmit={handleSubmit}
              className={`flex w-[470px] bg-white/15 backdrop-blur-3xl px-6 py-4 rounded-3xl shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-300 hover:bg-white/20 fade-in fade-in-delay-2`}
            >
              <input
                type="text"
                className="flex-1 bg-transparent outline-none text-lg placeholder-[#1b5e20]/30"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Узнать у AI Pharmacist"
              />
              <button
                type="submit"
                className="text-xl hover:opacity-80 transition pl-2 bg-white/20 rounded-full p-2"
              ></button>
            </form>
            {loading && (
              <p className="mt-6 text-lg bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md inline-block fade-in fade-in-delay-3">
                Загрузка...
              </p>
            )}
            {error && (
              <p className="mt-6 text-lg text-red-400 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md inline-block fade-in fade-in-delay-3">
                Ошибка: {error}
              </p>
            )}
            {data && (
              <div
                className={`mt-10 w-full max-w-[470px] fade-in fade-in-delay-3`}
              >
                <h2 className="text-2xl font-semibold bg-white/20 px-4 py-2 rounded-xl backdrop-blur-md inline-block">
                  Ответ:
                </h2>
                <p className="mt-4 text-lg leading-relaxed bg-white/10 p-6 rounded-2xl backdrop-blur-2xl border border-white/20 shadow-lg">
                  {data.answer}
                </p>
                {data.sources && data.sources.length > 0 && (
                  <>
                    <h3 className="text-xl mt-6 font-medium bg-white/20 px-4 py-2 rounded-xl backdrop-blur-md inline-block">
                      Источники:
                    </h3>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      {data.sources.map((src, idx) => (
                        <li
                          key={idx}
                          className="bg-white/5 p-2 rounded-lg backdrop-blur-md"
                        >
                          <a
                            href={src.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline hover:text-blue-800 transition"
                          >
                            {src.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
