const express = require("express");
const { getAllAgents, getAgent, getAgentsByCategory } = require("../utils/agentRegistry");
const { getAgentStats } = require("../utils/store");

const router = express.Router();

/**
 * GET /api/marketplace
 * List all available agents with metadata and stats.
 */
router.get("/", (_req, res) => {
  const agents = getAllAgents().map((agent) => ({
    ...agent,
    stats: getAgentStats(agent.id),
  }));
  res.json({ agents, total: agents.length });
});

/**
 * GET /api/marketplace/categories
 * List all unique categories.
 */
router.get("/categories", (_req, res) => {
  const agents = getAllAgents();
  const categories = [...new Set(agents.map((a) => a.category))];
  res.json({ categories });
});

/**
 * GET /api/marketplace/category/:category
 * Filter agents by category.
 */
router.get("/category/:category", (req, res) => {
  const agents = getAgentsByCategory(req.params.category);
  res.json({ agents, total: agents.length });
});

/**
 * GET /api/marketplace/:agentId
 * Get single agent details.
 */
router.get("/:agentId", (req, res) => {
  const agent = getAgent(req.params.agentId);
  if (!agent) {
    return res.status(404).json({ error: "Agent not found" });
  }
  res.json({ ...agent, stats: getAgentStats(agent.id) });
});

module.exports = router;
