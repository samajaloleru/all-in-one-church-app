import React from "react";
import Footer from "../Footer";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

export const BasicLayout = ({
  children,
  title,
  description,
}: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col space-y-36 bg-gradient-to-b from-zinc-50 to-zinc-700">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 border-b-4 border-rose-400 text-white bg-zinc-800 tracking-wide z-30">
        <div className="max-w-7xl md:max-w-6xl md:mx-auto mx-auto container p-5">
          <h1 className="text-2xl font-semibold">{title}</h1>
          {description && <p className="text-sm w-3/4 md:w-full">{description}</p>}
        </div>
      </div>
      <div className="md:h-2"></div>

      {/* Main Content */}
      <main className="flex-1 md:px-10 p-5 mb-20 overflow-auto">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
