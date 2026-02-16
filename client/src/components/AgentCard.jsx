import React from "react";
import {
  FileText,
  Shield,
  AlignLeft,
  Code,
  TrendingUp,
  Search,
  Zap,
  Clock,
} from "lucide-react";

const iconMap = {
  FileText,
  Shield,
  AlignLeft,
  Code,
  TrendingUp,
  Search,
};

const categoryColors = {
  Career: "from-emerald-500/20 to-emerald-600/5 border-emerald-500/20 text-emerald-400",
  Blockchain: "from-orange-500/20 to-orange-600/5 border-orange-500/20 text-orange-400",
  Productivity: "from-blue-500/20 to-blue-600/5 border-blue-500/20 text-blue-400",
  "Developer Tools": "from-purple-500/20 to-purple-600/5 border-purple-500/20 text-purple-400",
  Finance: "from-yellow-500/20 to-yellow-600/5 border-yellow-500/20 text-yellow-400",
  Marketing: "from-pink-500/20 to-pink-600/5 border-pink-500/20 text-pink-400",
};

export default function AgentCard({ agent, onSelect }) {
  const Icon = iconMap[agent.icon] || Zap;
  const colorClass = categoryColors[agent.category] || categoryColors.Productivity;

  return (
    <button
      onClick={() => onSelect(agent)}
      className="agent-card-shine glass-card group w-full rounded-2xl p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-600/10"
    >
      <div className="mb-4 flex items-start justify-between">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${colorClass.split(" ").slice(0, 2).join(" ")} border ${colorClass.split(" ")[2]}`}
        >
          <Icon className={`h-6 w-6 ${colorClass.split(" ").pop()}`} />
        </div>
        <div className="flex items-center gap-1 rounded-full bg-brand-600/15 px-3 py-1">
          <Zap className="h-3 w-3 text-brand-400" />
          <span className="text-xs font-bold text-brand-300">
            {agent.priceSTX} STX
          </span>
        </div>
      </div>

      <h3 className="mb-1.5 text-lg font-bold text-white transition-colors group-hover:text-brand-300">
        {agent.name}
      </h3>

      <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-400">
        {agent.description}
      </p>

      <div className="flex items-center justify-between">
        <span
          className={`rounded-full border bg-gradient-to-r px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${colorClass}`}
        >
          {agent.category}
        </span>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Clock className="h-3 w-3" />
          {agent.estimatedTime}
        </div>
      </div>

      {agent.stats && agent.stats.totalCalls > 0 && (
        <div className="mt-3 flex items-center gap-3 border-t border-white/5 pt-3 text-xs text-gray-500">
          <span>{agent.stats.totalCalls} runs</span>
          <span>&middot;</span>
          <span>{agent.stats.totalRevenue.toFixed(4)} STX earned</span>
        </div>
      )}
    </button>
  );
}
