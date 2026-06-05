"use client";

import { ProfileAvatarButton } from "./profile-avatar-button";

export function HeaderActions({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex shrink-0 items-center gap-2">
      {children}
      <ProfileAvatarButton />
    </div>
  );
}
