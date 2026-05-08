"use client";

import { Bell } from "lucide-react";
import { ProfileAvatarButton } from "./profile-avatar-button";

export function HeaderActions({
  children,
  showNotifications = true,
}: {
  children?: React.ReactNode;
  showNotifications?: boolean;
}) {
  return (
    <div className="flex shrink-0 items-center gap-2">
      {children}
      {showNotifications ? (
        <button type="button" className="relative rounded-full border border-[#E5E7EB] p-2 text-[#6B7280]" aria-label="Notifications">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#16A34A] px-0.5 text-[10px] text-white">
            3
          </span>
        </button>
      ) : null}
      <ProfileAvatarButton />
    </div>
  );
}
