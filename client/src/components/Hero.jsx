import React from "react";
import { ArrowRight, Zap, Coins, Bot } from "lucide-react";

export default function Hero() {
  return (
    <section className="hero-gradient relative overflow-hidden px-6 pb-8 pt-16">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/10 px-4 py-1.5">
            <Zap className="h-3.5 w-3.5 text-brand-400" />
            <span className="text-xs font-semibold text-brand-300">
              Powered by x402-stacks &middot; HTTP 402 Payments
            </span>
          </div>

          <h2 className="mb-5 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            AI Agents.{" "}
            <span className="gradient-text">Pay Per Use.</span>
            <br />
            No Subscriptions.
          </h2>

          <p className="mb-8 text-lg leading-relaxed text-gray-400">
            Run powerful AI agents and pay only for what you use. Micropayments
            in <strong className="text-white">STX</strong> &amp;{" "}
            <strong className="text-white">sBTC</strong> via the{" "}
            <strong className="text-brand-400">x402</strong> protocol.
            No accounts. No API keys. Just pay and execute.
          </p>

          <div className="mb-12 flex flex-wrap justify-center gap-4">
            <a
              href="#agents"
              className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-stacks-purple px-6 py-3 font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:shadow-brand-600/40"
            >
              Browse Agents
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="https://docs.x402stacks.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 font-semibold text-gray-300 transition-all hover:border-white/20 hover:text-white"
            >
              Learn x402
            </a>
          </div>
        </div>

        {/* How it works mini flow */}
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-4">
          {[
            {
              icon: Bot,
              step: "01",
              title: "Pick Agent",
              desc: "Browse AI tools",
            },
            {
              icon: Zap,
              step: "02",
              title: "Run Task",
              desc: "Submit your input",
            },
            {
              icon: Coins,
              step: "03",
              title: "HTTP 402",
              desc: "Pay with STX/sBTC",
            },
            {
              icon: ArrowRight,
              step: "04",
              title: "Get Result",
              desc: "Instant delivery",
            },
          ].map(({ icon: Icon, step, title, desc }) => (
            <div
              key={step}
              className="glass-card flex items-center gap-3 rounded-xl p-4 sm:flex-col sm:text-center"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-brand-600/20 text-brand-400">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-500">
                  {step}
                </span>
                <p className="text-sm font-semibold text-white">{title}</p>
                <p className="text-xs text-gray-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
