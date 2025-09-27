import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { useParams } from "react-router-dom";
export function TokenPage() {
    const { mint } = useParams();
    const [holders, setHolders] = React.useState([]);
    React.useEffect(() => {
        if (!mint)
            return;
        fetch(`/api/token/${mint}/top-holders`)
            .then((r) => r.json())
            .then((d) => setHolders(d.holders ?? []))
            .catch(() => setHolders([]));
    }, [mint]);
    return (_jsx("main", { className: "grid gap-4", children: _jsxs("div", { className: "rounded-2xl bg-black/20 p-6 shadow", children: [_jsx("h2", { className: "text-xl font-semibold text-white", children: "Token Top Holders" }), _jsxs("div", { className: "mt-4 grid gap-2", children: [holders.map((h) => (_jsxs("div", { className: "flex items-center justify-between text-white/90", children: [_jsx("div", { className: "truncate", children: h.owner }), _jsx("div", { className: "font-mono", children: h.amount })] }, h.owner))), !holders.length && _jsx("div", { className: "text-white/60", children: "No data." })] })] }) }));
}
