import React from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App } from "./modules/App";
import "./styles.css";

// Force rebuild - contract address update

const queryClient = new QueryClient();

const container = document.getElementById("root");
if (!container) throw new Error("Root container not found");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);


// 🔥 WEBSOCKET FIX: Production server connection
// API_BASE: https://www.triviapump.com
// Contract: 42btZmafsPsz87LbEwHnma9VxMjfZJ3C8YwMzerjpump
// Build: $(date)
