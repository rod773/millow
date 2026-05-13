module.exports = [
"[project]/src/abis/Escrow.json.[json].cjs [app-ssr] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/src_abis_Escrow_json_[json]_cjs_0.eu3ue._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/src/abis/Escrow.json.[json].cjs [app-ssr] (ecmascript)");
    });
});
}),
"[project]/src/abis/RealEstate.json.[json].cjs [app-ssr] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/src_abis_RealEstate_json_[json]_cjs_0n_~9.0._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/src/abis/RealEstate.json.[json].cjs [app-ssr] (ecmascript)");
    });
});
}),
];