/**
 * In-memory store for transactions and agent stats.
 * In production, replace with a database.
 */

const transactions = [];
const agentStats = {};

function recordTransaction({ agentId, payer, amount, token, txId, task }) {
  const record = {
    id: `tx_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    agentId,
    payer: payer || "anonymous",
    amount,
    token: token || "STX",
    txId: txId || null,
    task: task || "",
    timestamp: new Date().toISOString(),
  };
  transactions.push(record);

  if (!agentStats[agentId]) {
    agentStats[agentId] = { totalCalls: 0, totalRevenue: 0, lastUsed: null };
  }
  agentStats[agentId].totalCalls += 1;
  agentStats[agentId].totalRevenue += parseFloat(amount) || 0;
  agentStats[agentId].lastUsed = record.timestamp;

  return record;
}

function getTransactions(limit = 50) {
  return transactions.slice(-limit).reverse();
}

function getAgentStats(agentId) {
  return agentStats[agentId] || { totalCalls: 0, totalRevenue: 0, lastUsed: null };
}

function getAllStats() {
  return {
    totalTransactions: transactions.length,
    totalRevenue: transactions.reduce(
      (sum, tx) => sum + (parseFloat(tx.amount) || 0),
      0
    ),
    uniquePayers: [...new Set(transactions.map((tx) => tx.payer))].length,
    agentStats: { ...agentStats },
    recentTransactions: transactions.slice(-10).reverse(),
  };
}

module.exports = {
  recordTransaction,
  getTransactions,
  getAgentStats,
  getAllStats,
};
