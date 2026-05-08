"use client";

import { useEffect, useState } from "react";

export function DemoToast({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => {
      setVisible(false);
      onDismiss();
    }, 3500);
    return () => window.clearTimeout(t);
  }, [message, onDismiss]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-24 left-1/2 z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 rounded-2xl border border-[#0F8A3B]/30 bg-white px-4 py-3 text-center text-sm text-[#111827] shadow-lg md:bottom-8">
      {message}
    </div>
  );
}
