module.exports = [
"[turbopack-node]/transforms/postcss.ts { CONFIG => \"[project]/hackhaton-devfest/frontend/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "chunks/d6cd6_dc9c3e81._.js",
  "chunks/[root-of-the-server]__5a10e0a3._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[turbopack-node]/transforms/postcss.ts { CONFIG => \"[project]/hackhaton-devfest/frontend/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript)");
    });
});
}),
];