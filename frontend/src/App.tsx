import { useState } from "react";

const BASE = "/api";

type Status = "idle" | "loading" | "ok" | "error";

interface EndpointResult {
  status: Status;
  data: unknown;
  ms: number | null;
}

const ENDPOINTS = [
  { label: "Health", method: "GET", path: "/health" },
  { label: "Dashboard", method: "GET", path: "/dashboard" },
  { label: "Products", method: "GET", path: "/products" },
  { label: "Product Detail (Milk)", method: "GET", path: "/products/milk-gallon" },
  { label: "Reorder Plan", method: "GET", path: "/insights/reorder-plan" },
  { label: "Alerts", method: "GET", path: "/alerts" },
  { label: "Invoice Preview", method: "GET", path: "/invoice/preview" },
  {
    label: "Invoice Import (POST)",
    method: "POST",
    path: "/invoice/import",
    body: { test: true },
  },
] as const;

function statusColor(s: Status) {
  return { idle: "#888", loading: "#f0a500", ok: "#22c55e", error: "#ef4444" }[s];
}

function StatusBadge({ status }: { status: Status }) {
  const label = { idle: "–", loading: "Loading…", ok: "OK", error: "Error" }[status];
  return (
    <span
      style={{
        padding: "2px 10px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 700,
        color: "#fff",
        background: statusColor(status),
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

function EndpointRow({
  label,
  method,
  path,
  body,
}: {
  label: string;
  method: string;
  path: string;
  body?: unknown;
}) {
  const [result, setResult] = useState<EndpointResult>({
    status: "idle",
    data: null,
    ms: null,
  });
  const [open, setOpen] = useState(false);

  async function call() {
    setResult({ status: "loading", data: null, ms: null });
    setOpen(true);
    const t0 = performance.now();
    try {
      const res = await fetch(`${BASE}${path}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined,
      });
      const data = await res.json();
      setResult({ status: res.ok ? "ok" : "error", data, ms: Math.round(performance.now() - t0) });
    } catch (e) {
      setResult({
        status: "error",
        data: e instanceof Error ? e.message : String(e),
        ms: Math.round(performance.now() - t0),
      });
    }
  }

  return (
    <div
      style={{
        border: "1px solid #2a2a2a",
        borderRadius: 10,
        marginBottom: 12,
        background: "#111",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "12px 16px",
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            padding: "2px 8px",
            borderRadius: 4,
            background: method === "GET" ? "#1e40af" : "#7c3aed",
            color: "#fff",
            minWidth: 42,
            textAlign: "center",
          }}
        >
          {method}
        </span>
        <span style={{ fontFamily: "monospace", fontSize: 13, color: "#a3a3a3" }}>
          {BASE}{path}
        </span>
        <span style={{ flex: 1, fontWeight: 600, color: "#f5f5f5", fontSize: 14 }}>{label}</span>
        <StatusBadge status={result.status} />
        {result.ms !== null && (
          <span style={{ fontSize: 11, color: "#666" }}>{result.ms}ms</span>
        )}
        <button
          onClick={call}
          style={{
            padding: "6px 16px",
            borderRadius: 6,
            border: "none",
            background: "#2563eb",
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer",
            fontSize: 13,
          }}
        >
          Test
        </button>
        {result.status !== "idle" && (
          <button
            onClick={() => setOpen((o) => !o)}
            style={{
              padding: "6px 10px",
              borderRadius: 6,
              border: "1px solid #333",
              background: "transparent",
              color: "#aaa",
              cursor: "pointer",
              fontSize: 12,
            }}
          >
            {open ? "▲ Collapse" : "▼ Expand"}
          </button>
        )}
      </div>

      {open && result.status !== "idle" && (
        <pre
          style={{
            margin: 0,
            padding: "12px 16px",
            borderTop: "1px solid #222",
            background: "#0a0a0a",
            color: result.status === "error" ? "#f87171" : "#86efac",
            fontSize: 12,
            overflowX: "auto",
            maxHeight: 320,
            overflowY: "auto",
          }}
        >
          {JSON.stringify(result.data, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default function App() {
  async function runAll() {
    for (const ep of ENDPOINTS) {
      // Fire requests with a small stagger so the UI updates are visible
      await new Promise((r) => setTimeout(r, 80));
      document
        .querySelectorAll<HTMLButtonElement>('button[data-ep="' + ep.path + '"]')
        .forEach((b) => b.click());
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0d0d0d",
        color: "#f5f5f5",
        fontFamily: "system-ui, sans-serif",
        padding: "32px 24px",
        maxWidth: 860,
        margin: "0 auto",
      }}
    >
      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>
        StoreSense API Test
      </h1>
      <p style={{ color: "#666", fontSize: 13, marginBottom: 28 }}>
        Test communication with the Flask backend (localhost:5001) — run each endpoint individually or test all at once.
      </p>

      <div style={{ marginBottom: 24 }}>
        <button
          onClick={runAll}
          style={{
            padding: "10px 24px",
            borderRadius: 8,
            border: "none",
            background: "#16a34a",
            color: "#fff",
            fontWeight: 700,
            cursor: "pointer",
            fontSize: 14,
          }}
        >
          Run All Endpoints
        </button>
      </div>

      {ENDPOINTS.map((ep) => (
        <EndpointRow key={ep.path} {...ep} />
      ))}

      <p style={{ marginTop: 32, fontSize: 11, color: "#444" }}>
        Vite proxy: /api → http://localhost:5001/api
      </p>
    </div>
  );
}
