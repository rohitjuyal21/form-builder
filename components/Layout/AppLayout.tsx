import React from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-x border-primaryBorder flex-1 flex flex-col">
      {children}
    </div>
  );
}
