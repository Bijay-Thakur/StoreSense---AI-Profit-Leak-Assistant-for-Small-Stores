"use client";

import { useState } from "react";
import { HeaderActions } from "../components/header-actions";
import { Card, ScreenHeader } from "../components/ui";
import {
  assistantPrompts,
  languages,
  primaryInsights,
  type AssistantLanguage,
} from "@/src/data/assistantResponses";

export default function AssistantPage() {
  const [lang, setLang] = useState<AssistantLanguage>("English");
  const [activePrompt, setActivePrompt] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <ScreenHeader
        title="Owner Assistant"
        subtitle="Business insights in simple language."
        rightSlot={<HeaderActions />}
      />

      <Card>
        <p className="text-xs font-semibold text-[#6B7280]">Language</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {languages.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                lang === l ? "bg-[#0F8A3B] text-white" : "border border-[#E5E7EB] bg-white text-[#374151]"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </Card>

      <Card className="border-[#0F8A3B]/20 bg-[#ECFDF3]/40">
        <p className="text-xs font-semibold text-[#0F8A3B]">This week&apos;s insight</p>
        <p className="mt-2 text-sm leading-relaxed text-[#111827]">{primaryInsights[lang]}</p>
      </Card>

      <div className="space-y-2">
        {assistantPrompts.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setActivePrompt(activePrompt === p.id ? null : p.id)}
            className="w-full rounded-3xl border border-[#E5E7EB] bg-white p-4 text-left shadow-sm transition hover:border-[#0F8A3B]/30"
          >
            <p className="text-sm font-semibold text-[#111827]">{p.title}</p>
            {activePrompt === p.id ? (
              <p className="mt-2 text-xs leading-relaxed text-[#374151]">{p.responses[lang]}</p>
            ) : (
              <p className="mt-1 text-xs text-[#9CA3AF]">Tap for demo response</p>
            )}
          </button>
        ))}
      </div>

      <p className="rounded-2xl border border-dashed border-[#E5E7EB] px-3 py-2 text-center text-[10px] text-[#9CA3AF]">
        Demo mode: future version can generate personalized explanations from live store data.
      </p>
    </div>
  );
}
