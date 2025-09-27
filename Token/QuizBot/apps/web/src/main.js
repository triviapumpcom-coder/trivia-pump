import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App } from "./modules/App";
import "./styles.css";
const queryClient = new QueryClient();
const container = document.getElementById("root");
if (!container)
    throw new Error("Root container not found");
const root = createRoot(container);
root.render(_jsx(React.StrictMode, { children: _jsx(QueryClientProvider, { client: queryClient, children: _jsx(App, {}) }) }));
