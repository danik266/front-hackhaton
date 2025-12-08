module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/layout.jsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.jsx [app-rsc] (ecmascript)"));
}),
"[project]/app/page.jsx [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

const { jsxDEV: _jsxDEV } = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
{}/*#__PURE__*/ _jsxDEV("div", {
    className: `flex-1 flex flex-col transition-all duration-700 ease-in-out ${isSidebarOpen ? "ml-0" : "ml-0"}`,
    children: [
        /*#__PURE__*/ _jsxDEV("div", {
            className: "flex-1 overflow-y-auto px-8 py-6",
            children: messages.length === 0 ? /*#__PURE__*/ _jsxDEV("div", {
                className: "h-full flex items-center justify-center",
                children: /*#__PURE__*/ _jsxDEV("div", {
                    className: "text-center max-w-2xl",
                    children: [
                        /*#__PURE__*/ _jsxDEV("h2", {
                            className: "text-4xl font-light text-[#1b5e20]/80 mb-4",
                            children: "Вас приветствует AI Pharmacist!"
                        }, void 0, false, {
                            fileName: "[project]/app/page.jsx",
                            lineNumber: 12,
                            columnNumber: 11
                        }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                        /*#__PURE__*/ _jsxDEV("p", {
                            className: "text-lg text-[#1b5e20]/60",
                            children: "Задайте вопрос о лекарствах, их составе, взаимодействии или применении"
                        }, void 0, false, {
                            fileName: "[project]/app/page.jsx",
                            lineNumber: 15,
                            columnNumber: 11
                        }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.jsx",
                    lineNumber: 11,
                    columnNumber: 9
                }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
            }, void 0, false, {
                fileName: "[project]/app/page.jsx",
                lineNumber: 10,
                columnNumber: 7
            }, /*TURBOPACK member replacement*/ __turbopack_context__.e) : /*#__PURE__*/ _jsxDEV("div", {
                className: `mx-auto space-y-8 transition-all duration-700 ${isSidebarOpen ? "max-w-3xl" : "max-w-5xl" // шире при закрытом сайдбаре
                }`,
                children: [
                    messages.map((msg, i)=>/*#__PURE__*/ _jsxDEV("div", {
                            className: `msg-animation flex ${msg.role === "user" ? "justify-end" : "justify-start"}`,
                            children: /*#__PURE__*/ _jsxDEV("div", {
                                className: `px-7 py-5 rounded-3xl shadow-lg backdrop-blur-md border border-white/30 ${msg.role === "user" ? "bg-white/45 text-[#1b5e20]" : msg.error ? "bg-red-50/80 text-red-700 border-red-200" : "bg-white/40 text-[#1b5e20]"} max-w-full`,
                                style: {
                                    maxWidth: "calc(100% - 2rem)"
                                },
                                children: [
                                    msg.role === "assistant" && /*#__PURE__*/ _jsxDEV("p", {
                                        className: "text-sm font-semibold text-[#1b5e20]/70 mb-2",
                                        children: "AI Pharmacist"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.jsx",
                                        lineNumber: 46,
                                        columnNumber: 17
                                    }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                                    /*#__PURE__*/ _jsxDEV("p", {
                                        className: "text-lg leading-relaxed whitespace-pre-wrap",
                                        children: msg.content
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.jsx",
                                        lineNumber: 50,
                                        columnNumber: 15
                                    }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                                    msg.sources && msg.sources.length > 0 && /*#__PURE__*/ _jsxDEV("div", {
                                        className: "mt-5 pt-5 border-t border-white/30",
                                        children: [
                                            /*#__PURE__*/ _jsxDEV("p", {
                                                className: "text-sm font-medium text-[#1b5e20]/80 mb-3",
                                                children: "Источники:"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.jsx",
                                                lineNumber: 56,
                                                columnNumber: 19
                                            }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                                            /*#__PURE__*/ _jsxDEV("div", {
                                                className: "space-y-2",
                                                children: msg.sources.map((src, idx)=>/*#__PURE__*/ _jsxDEV("a", {
                                                        href: src.url,
                                                        target: "_blank",
                                                        rel: "noopener noreferrer",
                                                        className: "block text-sm text-blue-600 hover:text-blue-800 underline",
                                                        children: src.name
                                                    }, idx, false, {
                                                        fileName: "[project]/app/page.jsx",
                                                        lineNumber: 61,
                                                        columnNumber: 23
                                                    }, /*TURBOPACK member replacement*/ __turbopack_context__.e))
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.jsx",
                                                lineNumber: 59,
                                                columnNumber: 19
                                            }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.jsx",
                                        lineNumber: 55,
                                        columnNumber: 17
                                    }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.jsx",
                                lineNumber: 35,
                                columnNumber: 13
                            }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                        }, i, false, {
                            fileName: "[project]/app/page.jsx",
                            lineNumber: 29,
                            columnNumber: 11
                        }, /*TURBOPACK member replacement*/ __turbopack_context__.e)),
                    loading && /*#__PURE__*/ _jsxDEV("div", {
                        className: "flex justify-start",
                        children: /*#__PURE__*/ _jsxDEV("div", {
                            className: "bg-white/40 text-[#1b5e20] px-7 py-5 rounded-3xl backdrop-blur-md border border-white/30",
                            children: /*#__PURE__*/ _jsxDEV("p", {
                                className: "text-lg",
                                children: "Загрузка..."
                            }, void 0, false, {
                                fileName: "[project]/app/page.jsx",
                                lineNumber: 81,
                                columnNumber: 15
                            }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                        }, void 0, false, {
                            fileName: "[project]/app/page.jsx",
                            lineNumber: 80,
                            columnNumber: 13
                        }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                    }, void 0, false, {
                        fileName: "[project]/app/page.jsx",
                        lineNumber: 79,
                        columnNumber: 11
                    }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                    /*#__PURE__*/ _jsxDEV("div", {
                        ref: messagesEndRef
                    }, void 0, false, {
                        fileName: "[project]/app/page.jsx",
                        lineNumber: 85,
                        columnNumber: 9
                    }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.jsx",
                lineNumber: 21,
                columnNumber: 7
            }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
        }, void 0, false, {
            fileName: "[project]/app/page.jsx",
            lineNumber: 8,
            columnNumber: 3
        }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
        /*#__PURE__*/ _jsxDEV("div", {
            className: "p-6 bg-gradient-to-t from-[#a5d6a7]/60 via-[#a5d6a7]/20 to-transparent backdrop-blur-md",
            children: /*#__PURE__*/ _jsxDEV("form", {
                onSubmit: handleSubmit,
                className: `mx-auto flex gap-4 transition-all duration-700 ${isSidebarOpen ? "max-w-3xl" : "max-w-5xl" // тот же размер, что и сообщения
                }`,
                children: [
                    /*#__PURE__*/ _jsxDEV("input", {
                        type: "text",
                        value: query,
                        onChange: (e)=>setQuery(e.target.value),
                        placeholder: "Узнать у AI Pharmacist...",
                        className: "text-[#1b5e20] flex-1 bg-white/30 backdrop-blur-xl px-7 py-5 rounded-3xl outline-none text-lg placeholder-[#1b5e20]/50 border border-white/40 focus:border-white/70 transition-all shadow-2xl",
                        disabled: loading
                    }, void 0, false, {
                        fileName: "[project]/app/page.jsx",
                        lineNumber: 100,
                        columnNumber: 7
                    }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                    /*#__PURE__*/ _jsxDEV("button", {
                        type: "submit",
                        disabled: loading || !query.trim(),
                        className: "bg-white/40 backdrop-blur-xl p-5 rounded-full hover:bg-white/60 transition-all hover:scale-110 disabled:opacity-40 disabled:cursor-not-allowed shadow-xl border border-white/30",
                        children: /*#__PURE__*/ _jsxDEV("img", {
                            src: "/free-icon-send-button-12439325 (1).png",
                            alt: "Отправить",
                            className: "w-8 h-8 brightness-0 invert opacity-70 hue-rotate-120deg"
                        }, void 0, false, {
                            fileName: "[project]/app/page.jsx",
                            lineNumber: 113,
                            columnNumber: 9
                        }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                    }, void 0, false, {
                        fileName: "[project]/app/page.jsx",
                        lineNumber: 108,
                        columnNumber: 7
                    }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.jsx",
                lineNumber: 92,
                columnNumber: 5
            }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
        }, void 0, false, {
            fileName: "[project]/app/page.jsx",
            lineNumber: 91,
            columnNumber: 3
        }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
    ]
}, void 0, true, {
    fileName: "[project]/app/page.jsx",
    lineNumber: 2,
    columnNumber: 1
}, /*TURBOPACK member replacement*/ __turbopack_context__.e);
}),
"[project]/app/page.jsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/page.jsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__aa80d6f9._.js.map