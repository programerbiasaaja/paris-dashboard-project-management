import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(119,34,36,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(232,129,39,0.18),transparent_28%),linear-gradient(180deg,rgba(13,34,55,0.05),transparent_40%)]">
      {children}
    </div>
  );
}
