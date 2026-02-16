import React from "react";
import { Zap, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0a0a0f] px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-stacks-purple">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="font-bold text-white">
                Agent<span className="text-brand-400">Pay</span>
              </p>
              <p className="text-xs text-gray-500">
                Pay-Per-Use AI Marketplace
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
            <a
              href="https://docs.x402stacks.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 transition-colors hover:text-brand-400"
            >
              x402 Docs <ExternalLink className="h-3 w-3" />
            </a>
            <a
              href="https://www.stacksx402.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 transition-colors hover:text-brand-400"
            >
              x402 Stacks <ExternalLink className="h-3 w-3" />
            </a>
            <a
              href="https://stacks.co"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 transition-colors hover:text-brand-400"
            >
              Stacks <ExternalLink className="h-3 w-3" />
            </a>
            <a
              href="https://github.com/tony1908/x402Stacks"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 transition-colors hover:text-brand-400"
            >
              x402-stacks GitHub <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-white/5 pt-6 text-center">
          <p className="text-xs text-gray-600">
            Built for the x402 Stacks Challenge &middot; Powered by HTTP 402
            &amp; Stacks Blockchain &middot; All payments in STX / sBTC
          </p>
        </div>
      </div>
    </footer>
  );
}
