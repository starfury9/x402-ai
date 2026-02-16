import React, { useState } from "react";
import { Search } from "lucide-react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import AgentCard from "./components/AgentCard";
import AgentModal from "./components/AgentModal";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import { useMarketplace } from "./hooks/useMarketplace";

export default function App() {
  const [activeTab, setActiveTab] = useState("marketplace");
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { agents, stats, loading, error, refresh } = useMarketplace();

  const categories = [
    "All",
    ...new Set(agents.map((a) => a.category)),
  ];

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      !searchQuery ||
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.tags.some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "All" || agent.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "marketplace" ? (
        <>
          <Hero />

          <main id="agents" className="mx-auto max-w-7xl px-6 py-12">
            {/* Search + Filter bar */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search agents..."
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-500 transition-all focus:border-brand-500/40 focus:outline-none focus:ring-1 focus:ring-brand-500/20"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                      selectedCategory === cat
                        ? "bg-brand-600 text-white shadow-md shadow-brand-600/20"
                        : "border border-white/10 text-gray-400 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Agent grid */}
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
              </div>
            ) : error ? (
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6 text-center">
                <p className="text-red-300">
                  Failed to load agents: {error}
                </p>
                <p className="mt-2 text-sm text-gray-400">
                  Make sure the server is running on port 4000
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filteredAgents.map((agent) => (
                  <AgentCard
                    key={agent.id}
                    agent={agent}
                    onSelect={setSelectedAgent}
                  />
                ))}
              </div>
            )}

            {!loading && filteredAgents.length === 0 && (
              <div className="py-16 text-center">
                <p className="text-lg text-gray-400">
                  No agents found matching your search
                </p>
              </div>
            )}

            {/* x402 explainer */}
            <section className="mt-20">
              <div className="glass-card glow-purple rounded-2xl p-8 sm:p-12">
                <div className="mx-auto max-w-2xl text-center">
                  <h3 className="mb-4 text-2xl font-bold text-white">
                    How x402 Payments Work
                  </h3>
                  <p className="mb-6 text-gray-400">
                    Every agent endpoint is protected by HTTP 402. When you run a
                    task, the protocol handles payment automatically.
                  </p>
                  <div className="code-block overflow-x-auto rounded-xl bg-black/40 p-6 text-left text-sm">
                    <div className="text-gray-500">
                      {"// 1. Client requests agent"}
                    </div>
                    <div className="text-blue-300">
                      POST /api/agents/resume-analyzer/run
                    </div>
                    <div className="mt-3 text-gray-500">
                      {"// 2. Server responds with 402 Payment Required"}
                    </div>
                    <div className="text-yellow-300">
                      {"HTTP 402 { paymentRequirements: { amount: '2000', asset: 'STX' } }"}
                    </div>
                    <div className="mt-3 text-gray-500">
                      {"// 3. Client signs STX transaction & retries"}
                    </div>
                    <div className="text-purple-300">
                      {"Header: payment-signature: <base64-signed-tx>"}
                    </div>
                    <div className="mt-3 text-gray-500">
                      {"// 4. Server settles via facilitator & returns result"}
                    </div>
                    <div className="text-emerald-300">
                      {'HTTP 200 { result: { overallScore: 78, ... } }'}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </>
      ) : (
        <Dashboard />
      )}

      <Footer />

      {/* Agent modal */}
      {selectedAgent && (
        <AgentModal
          agent={selectedAgent}
          onClose={() => setSelectedAgent(null)}
          onSuccess={() => refresh()}
        />
      )}
    </div>
  );
}
