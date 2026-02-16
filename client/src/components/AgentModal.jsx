import React, { useState } from "react";
import {
  X,
  Zap,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Copy,
  ExternalLink,
  FileText,
  Shield,
  AlignLeft,
  Code,
  TrendingUp,
  Search,
} from "lucide-react";
import { runAgent } from "../utils/api";

const iconMap = { FileText, Shield, AlignLeft, Code, TrendingUp, Search };

export default function AgentModal({ agent, onClose, onSuccess }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [paymentStep, setPaymentStep] = useState("idle");

  const Icon = iconMap[agent.icon] || Zap;

  async function handleRun() {
    if (!input.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setPaymentStep("paying");

    try {
      await new Promise((r) => setTimeout(r, 800));
      setPaymentStep("processing");
      const data = await runAgent(agent.id, input.trim());
      setPaymentStep("complete");
      setResult(data);
      if (onSuccess) onSuccess(data);
    } catch (err) {
      setPaymentStep("idle");
      if (err.response?.status === 402) {
        setError(
          "Payment required! Connect a Stacks wallet with STX to pay for this agent. In demo mode, the server must be configured to accept demo requests."
        );
      } else {
        setError(err.response?.data?.error || err.message);
      }
    } finally {
      setLoading(false);
    }
  }

  function copyResult() {
    navigator.clipboard.writeText(JSON.stringify(result?.result, null, 2));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#141418] shadow-2xl shadow-black/50 animate-fade-in">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/5 bg-[#141418]/95 px-6 py-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600/20">
              <Icon className="h-5 w-5 text-brand-400" />
            </div>
            <div>
              <h3 className="font-bold text-white">{agent.name}</h3>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Zap className="h-3 w-3 text-brand-400" />
                {agent.priceSTX} STX per run
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Input */}
          {!result && (
            <>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                {agent.inputLabel}
              </label>
              {agent.inputType === "textarea" ? (
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={agent.inputPlaceholder}
                  rows={6}
                  className="code-block w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder-gray-600 transition-colors focus:border-brand-500/50 focus:outline-none focus:ring-1 focus:ring-brand-500/30"
                />
              ) : (
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={agent.inputPlaceholder}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder-gray-600 transition-colors focus:border-brand-500/50 focus:outline-none focus:ring-1 focus:ring-brand-500/30"
                />
              )}

              {/* Sample button */}
              <button
                onClick={() => setInput(agent.sampleInput)}
                className="mt-2 text-xs text-brand-400 transition-colors hover:text-brand-300"
              >
                Use sample input
              </button>

              {/* Payment flow indicator */}
              {paymentStep !== "idle" && (
                <div className="mt-4 flex items-center gap-3 rounded-xl border border-brand-500/20 bg-brand-500/5 p-4">
                  {paymentStep === "paying" && (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin text-brand-400" />
                      <div>
                        <p className="text-sm font-medium text-brand-300">
                          Processing Payment...
                        </p>
                        <p className="text-xs text-gray-400">
                          Sending {agent.priceSTX} STX via x402
                        </p>
                      </div>
                    </>
                  )}
                  {paymentStep === "processing" && (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin text-yellow-400" />
                      <div>
                        <p className="text-sm font-medium text-yellow-300">
                          Agent Running...
                        </p>
                        <p className="text-xs text-gray-400">
                          Payment confirmed. Executing task.
                        </p>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="mt-4 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/5 p-4">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-400" />
                  <p className="text-sm text-red-300">{error}</p>
                </div>
              )}

              {/* Run button */}
              <button
                onClick={handleRun}
                disabled={loading || !input.trim()}
                className="mt-4 w-full rounded-xl bg-gradient-to-r from-brand-600 to-stacks-purple py-3.5 font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:shadow-brand-600/40 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Running...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Zap className="h-4 w-4" />
                    Run Agent — {agent.priceSTX} STX
                  </span>
                )}
              </button>
            </>
          )}

          {/* Result */}
          {result && (
            <div className="animate-slide-up">
              <div className="mb-4 flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                <div>
                  <p className="text-sm font-medium text-emerald-300">
                    Task Complete!
                  </p>
                  <p className="text-xs text-gray-400">
                    Paid {result.payment?.amount} &middot; TX:{" "}
                    {result.payment?.transactionId || "demo"}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-gray-300">Result</h4>
                <button
                  onClick={copyResult}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
                >
                  <Copy className="h-3 w-3" />
                  Copy
                </button>
              </div>

              <div className="code-block max-h-96 overflow-y-auto rounded-xl border border-white/5 bg-black/30 p-4 text-sm text-gray-300">
                <ResultDisplay data={result.result} />
              </div>

              {/* Run again */}
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => {
                    setResult(null);
                    setPaymentStep("idle");
                    setInput("");
                  }}
                  className="flex-1 rounded-xl border border-white/10 py-3 font-medium text-gray-300 transition-all hover:border-white/20 hover:text-white"
                >
                  Run Again
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 rounded-xl bg-brand-600 py-3 font-medium text-white transition-all hover:bg-brand-500"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ResultDisplay({ data }) {
  if (!data) return <p className="text-gray-500">No result</p>;

  if (typeof data === "string") return <p>{data}</p>;

  return (
    <div className="space-y-3">
      {Object.entries(data).map(([key, value]) => (
        <div key={key}>
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-400">
            {key.replace(/([A-Z])/g, " $1").trim()}
          </span>
          <div className="mt-1">
            {typeof value === "string" || typeof value === "number" ? (
              <p className="text-gray-300">{String(value)}</p>
            ) : Array.isArray(value) ? (
              <ul className="ml-4 list-disc space-y-1">
                {value.map((item, i) => (
                  <li key={i} className="text-gray-300">
                    {typeof item === "object" ? (
                      <div className="rounded-lg bg-white/[0.02] p-2 mt-1">
                        {Object.entries(item).map(([k, v]) => (
                          <p key={k}>
                            <span className="text-brand-300 text-xs">{k}:</span>{" "}
                            <span className="text-gray-300">{String(v)}</span>
                          </p>
                        ))}
                      </div>
                    ) : (
                      String(item)
                    )}
                  </li>
                ))}
              </ul>
            ) : typeof value === "object" && value !== null ? (
              <div className="rounded-lg bg-white/[0.02] p-2">
                {Object.entries(value).map(([k, v]) => (
                  <p key={k} className="text-sm">
                    <span className="text-brand-300">{k}:</span>{" "}
                    <span className="text-gray-300">{String(v)}</span>
                  </p>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}
