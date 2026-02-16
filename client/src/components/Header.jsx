import React from "react";
import { Zap, Github, BarChart3 } from "lucide-react";

export default function Header({ activeTab, onTabChange }) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-stacks-purple">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">
              Agent<span className="text-brand-400">Pay</span>
            </h1>
            <p className="text-[10px] font-medium tracking-wider text-gray-500 uppercase">
              x402-stacks
            </p>
          </div>
        </div>

        <nav className="hidden items-center gap-1 rounded-full border border-white/5 bg-white/[0.03] p-1 md:flex">
          {["marketplace", "dashboard"].map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`rounded-full px-5 py-2 text-sm font-medium capitalize transition-all ${
                activeTab === tab
                  ? "bg-brand-600 text-white shadow-lg shadow-brand-600/25"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab === "dashboard" && (
                <BarChart3 className="mr-1.5 inline-block h-3.5 w-3.5" />
              )}
              {tab}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
          >
            <Github className="h-5 w-5" />
          </a>
          <div className="hidden items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-2 sm:flex">
            <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-medium text-brand-300">Testnet</span>
          </div>
        </div>
      </div>
    </header>
  );
}
