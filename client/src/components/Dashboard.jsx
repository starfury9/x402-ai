import React, { useState, useEffect } from "react";
import {
  BarChart3,
  Coins,
  Users,
  Activity,
  Zap,
  Clock,
  RefreshCw,
} from "lucide-react";
import { fetchStats, fetchTransactions } from "../utils/api";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadStats() {
    setLoading(true);
    try {
      const [statsData, txData] = await Promise.all([
        fetchStats(),
        fetchTransactions(20),
      ]);
      setStats(statsData);
      setTransactions(txData.transactions || []);
    } catch (err) {
      console.error("Failed to load stats:", err);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Dashboard</h2>
          <p className="text-sm text-gray-400">
            Real-time marketplace analytics &amp; transaction history
          </p>
        </div>
        <button
          onClick={loadStats}
          className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 transition-all hover:border-white/20 hover:text-white"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Stats cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            icon: Activity,
            label: "Total Transactions",
            value: stats?.totalTransactions || 0,
            color: "text-brand-400",
            bg: "bg-brand-600/15",
          },
          {
            icon: Coins,
            label: "Total Revenue",
            value: `${(stats?.totalRevenue || 0).toFixed(4)} STX`,
            color: "text-emerald-400",
            bg: "bg-emerald-600/15",
          },
          {
            icon: Users,
            label: "Unique Payers",
            value: stats?.uniquePayers || 0,
            color: "text-blue-400",
            bg: "bg-blue-600/15",
          },
          {
            icon: BarChart3,
            label: "Active Agents",
            value: stats?.agentStats
              ? Object.keys(stats.agentStats).length
              : 0,
            color: "text-yellow-400",
            bg: "bg-yellow-600/15",
          },
        ].map(({ icon: Icon, label, value, color, bg }) => (
          <div key={label} className="glass-card rounded-xl p-5">
            <div className="mb-3 flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${bg}`}
              >
                <Icon className={`h-5 w-5 ${color}`} />
              </div>
              <span className="text-xs font-medium uppercase tracking-wider text-gray-500">
                {label}
              </span>
            </div>
            <p className="text-2xl font-bold text-white">{value}</p>
          </div>
        ))}
      </div>

      {/* Agent leaderboard */}
      {stats?.agentStats && Object.keys(stats.agentStats).length > 0 && (
        <div className="mb-8">
          <h3 className="mb-4 text-lg font-semibold text-white">
            Agent Leaderboard
          </h3>
          <div className="glass-card overflow-hidden rounded-xl">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  <th className="px-5 py-3">Agent</th>
                  <th className="px-5 py-3">Calls</th>
                  <th className="px-5 py-3">Revenue</th>
                  <th className="px-5 py-3 hidden sm:table-cell">Last Used</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(stats.agentStats)
                  .sort(([, a], [, b]) => b.totalCalls - a.totalCalls)
                  .map(([agentId, data]) => (
                    <tr
                      key={agentId}
                      className="border-b border-white/[0.03] transition-colors hover:bg-white/[0.02]"
                    >
                      <td className="px-5 py-3">
                        <span className="font-medium text-white">
                          {agentId.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                        </span>
                      </td>
                      <td className="px-5 py-3 font-mono text-sm text-brand-300">
                        {data.totalCalls}
                      </td>
                      <td className="px-5 py-3 font-mono text-sm text-emerald-400">
                        {data.totalRevenue.toFixed(4)} STX
                      </td>
                      <td className="px-5 py-3 text-sm text-gray-400 hidden sm:table-cell">
                        {data.lastUsed
                          ? new Date(data.lastUsed).toLocaleTimeString()
                          : "—"}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Transaction feed */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-white">
          Recent Transactions
        </h3>
        {transactions.length === 0 ? (
          <div className="glass-card flex flex-col items-center justify-center rounded-xl px-6 py-16 text-center">
            <Zap className="mb-4 h-12 w-12 text-gray-600" />
            <p className="text-lg font-medium text-gray-400">
              No transactions yet
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Run an AI agent to see transactions appear here
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="glass-card flex items-center justify-between rounded-xl px-5 py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600/15">
                    <Zap className="h-4 w-4 text-brand-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {tx.agentId.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                    </p>
                    <p className="text-xs text-gray-500 truncate max-w-[200px] sm:max-w-md">
                      {tx.task}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-right">
                  <div>
                    <p className="font-mono text-sm font-semibold text-emerald-400">
                      +{tx.amount} {tx.token}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(tx.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
