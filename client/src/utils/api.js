import axios from "axios";

const API_BASE = "/api";

const api = axios.create({ baseURL: API_BASE });

export async function fetchMarketplace() {
  const { data } = await api.get("/marketplace");
  return data;
}

export async function fetchAgent(agentId) {
  const { data } = await api.get(`/marketplace/${agentId}`);
  return data;
}

export async function fetchCategories() {
  const { data } = await api.get("/marketplace/categories");
  return data;
}

export async function fetchStats() {
  const { data } = await api.get("/stats");
  return data;
}

export async function fetchTransactions(limit = 50) {
  const { data } = await api.get(`/stats/transactions?limit=${limit}`);
  return data;
}

/**
 * Run an agent task. In demo mode (no wallet), calls the server directly.
 * With a real wallet, the x402 interceptor handles the 402 payment flow.
 */
export async function runAgent(agentId, input, paymentAxios) {
  const client = paymentAxios || api;
  const { data } = await client.post(`/agents/${agentId}/run`, { input });
  return data;
}

export default api;
