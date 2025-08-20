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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-indigo-100">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 border-b-4 border-gray-400 text-black bg-indigo-300 tracking-wide z-30">
        <div className="max-w-6xl mx-auto container p-5">
          <h1 className="text-2xl font-semibold">{title}</h1>
          {description && <p className="text-sm w-3/4 md:w-full">{description}</p>}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 px-10 py-5 mt-26 mb-20 overflow-auto">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
