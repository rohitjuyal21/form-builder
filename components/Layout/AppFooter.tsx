import React from "react";

export default function AppFooter({ children }: { children: React.ReactNode }) {
  return (
    <header className="h-14 z-40 lg:z-50 border-t border-primaryBorder lg:max-w-[640px] w-full sticky bottom-0 py-4 sm:px-6 px-2 lg:left-auto lg:right-auto left-0 right-0 flex items-center box-border justify-center bg-gray-100">
      {children}
    </header>
  );
}
