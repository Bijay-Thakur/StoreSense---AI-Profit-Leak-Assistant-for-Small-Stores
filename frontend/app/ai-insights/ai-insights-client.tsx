"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { HeaderActions } from "../components/header-actions";
import { Badge, Card, ScreenHeader } from "../components/ui";
import {
  INITIAL_GREETING,
  assistantModes,
  suggestedQuestions,
  type AssistantModeId,
} from "@/src/data/aiInsights";
import { getAIInsightResponse, type AIInsightResult } from "@/src/lib/aiInsightEngine";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: string[];
  relatedActions?: { label: string; href: string }[];
};

function nextId() {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function sourceBadgeLabel(source: string): string {
  if (source.includes("invoice")) return "Invoice Records";
  if (source.includes("inventory")) return "Inventory Snapshot";
  if (source.includes("cost")) return "Vendor Cost History";
  if (source.includes("reorder")) return "Reorder Recommendations";
  if (source.includes("POS") || source.includes("sales")) return "POS Data";
  return "Store Data";
}

export function AIInsightsClient({ initialMode }: { initialMode: AssistantModeId }) {
  const [mode, setMode] = useState<AssistantModeId>(initialMode);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: nextId(), role: "assistant", content: INITIAL_GREETING, sources: ["StoreSense structured data (demo)"] },
  ]);
  const [showFuture, setShowFuture] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const ask = useCallback(
    (question: string) => {
      const trimmed = question.trim();
      if (!trimmed) return;

      const result: AIInsightResult = getAIInsightResponse(mode, trimmed);
      setMessages((prev) => [
        ...prev,
        { id: nextId(), role: "user", content: trimmed },
        {
          id: nextId(),
          role: "assistant",
          content: result.answer,
          sources: result.sources,
          relatedActions: result.relatedActions,
        },
      ]);
      setInput("");
    },
    [mode],
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    ask(input);
  }

  const chips = suggestedQuestions[mode];

  return (
    <div className="space-y-4">
      <ScreenHeader
        title="AI Insights"
        subtitle="Ask StoreSense questions about sales, invoices, inventory, and profit leaks."
        rightSlot={<HeaderActions />}
      />

      <Card className="border-[#0F8A3B]/20 bg-[#ECFDF3]/30">
        <h2 className="text-sm font-semibold text-[#111827]">Not just a chatbot</h2>
        <p className="mt-1 text-xs leading-relaxed text-[#374151]">
          StoreSense does not guess from a generic chat model. It uses your POS reports, invoices, inventory, and vendor
          cost history to produce data-backed recommendations.
        </p>
      </Card>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#9CA3AF]">Assistant mode</p>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {assistantModes.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMode(m.id)}
              className={`shrink-0 rounded-2xl border px-3 py-2 text-left text-xs transition ${
                mode === m.id
                  ? "border-[#0F8A3B] bg-[#ECFDF3] font-semibold text-[#0F8A3B]"
                  : "border-[#E5E7EB] bg-white text-[#374151] hover:border-[#D1D5DB]"
              }`}
            >
              <span className="block font-semibold sm:hidden">{m.shortLabel}</span>
              <span className="hidden sm:block">{m.label}</span>
            </button>
          ))}
        </div>
      </div>

      <Card>
        <p className="text-xs font-semibold text-[#6B7280]">Suggested questions</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {chips.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => ask(q)}
              className="rounded-full border border-[#E5E7EB] bg-[#F9FAFB] px-3 py-1.5 text-xs text-[#374151] hover:border-[#0F8A3B]/40 hover:bg-[#ECFDF3]"
            >
              {q}
            </button>
          ))}
        </div>
      </Card>

      <Card className="flex max-h-[min(420px,50vh)] flex-col">
        <p className="mb-3 text-xs font-semibold text-[#6B7280]">
          {assistantModes.find((m) => m.id === mode)?.label}
        </p>
        <div className="flex-1 space-y-3 overflow-y-auto pr-1">
          {messages.map((msg) =>
            msg.role === "user" ? (
              <div key={msg.id} className="flex justify-end">
                <div className="max-w-[85%] rounded-2xl rounded-br-md bg-[#0F8A3B] px-3 py-2 text-sm text-white">
                  {msg.content}
                </div>
              </div>
            ) : (
              <div key={msg.id} className="flex justify-start">
                <div className="max-w-[90%] rounded-2xl rounded-bl-md border border-[#E5E7EB] bg-[#F8FAFC] px-3 py-2">
                  <p className="text-sm leading-relaxed text-[#374151]">{msg.content}</p>
                  {msg.sources?.length ? (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {[...new Set(msg.sources.map(sourceBadgeLabel))].map((label) => (
                        <Badge key={label} text={label} tone="green" />
                      ))}
                    </div>
                  ) : null}
                  {msg.relatedActions?.length ? (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {msg.relatedActions.map((a) => (
                        <Link
                          key={a.href}
                          href={a.href}
                          className="rounded-xl border border-[#0F8A3B]/30 bg-white px-2.5 py-1 text-[10px] font-semibold text-[#0F8A3B] hover:bg-[#ECFDF3]"
                        >
                          {a.label} →
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            ),
          )}
          <div ref={chatEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="mt-3 flex gap-2 border-t border-[#F3F4F6] pt-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about sales, invoices, inventory, or pricing…"
            className="min-w-0 flex-1 rounded-2xl border border-[#E5E7EB] px-3 py-2.5 text-sm outline-none focus:border-[#0F8A3B] focus:ring-1 focus:ring-[#0F8A3B]/25"
          />
          <button
            type="submit"
            className="shrink-0 rounded-2xl bg-[#0F8A3B] px-4 py-2.5 text-sm font-semibold text-white"
          >
            Ask
          </button>
        </form>
      </Card>

      <Card className="bg-[#F9FAFB]">
        <h2 className="text-sm font-semibold text-[#111827]">How AI works here</h2>
        <p className="mt-2 text-xs leading-relaxed text-[#6B7280]">
          StoreSense uses structured POS, invoice, inventory, and cost data to calculate answers first, then explains the
          result in plain language. This reduces guessing and keeps insights tied to store data.
        </p>
      </Card>

      <Card>
        <button
          type="button"
          onClick={() => setShowFuture((v) => !v)}
          className="flex w-full items-center justify-between text-sm font-semibold text-[#111827]"
        >
          Future production AI
          <span className="text-xs text-[#6B7280]">{showFuture ? "Hide" : "Show"}</span>
        </button>
        {showFuture ? (
          <p className="mt-2 text-xs leading-relaxed text-[#6B7280]">
            In production, this assistant can use a hybrid approach: structured data tools for POS and inventory
            calculations, RAG over invoice PDFs and weekly reports, and a secure backend for real POS and email
            integrations.
          </p>
        ) : null}
      </Card>
    </div>
  );
}
