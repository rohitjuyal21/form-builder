import React from "react";

export default function AppHeader({ children }: { children: React.ReactNode }) {
  return (
    <header className="h-14 z-10 border-b border-primaryBorder lg:max-w-[640px] w-full sticky top-0 bg-gray-00 py-4 sm:px-6 px-2 lg:left-auto lg:right-auto left-0 right-0 flex items-center box-border justify-center">
      {children}
    </header>
  );
}
