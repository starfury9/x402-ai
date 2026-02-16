import { useState, useEffect, useCallback } from "react";
import { fetchMarketplace, fetchStats } from "../utils/api";

export function useMarketplace() {
  const [agents, setAgents] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [marketplace, statsData] = await Promise.all([
        fetchMarketplace(),
        fetchStats(),
      ]);
      setAgents(marketplace.agents);
      setStats(statsData);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { agents, stats, loading, error, refresh: loadData };
}
