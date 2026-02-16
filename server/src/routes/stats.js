const express = require("express");
const { getAllStats, getTransactions } = require("../utils/store");

const router = express.Router();

/**
 * GET /api/stats
 * Overall marketplace statistics.
 */
router.get("/", (_req, res) => {
  res.json(getAllStats());
});

/**
 * GET /api/stats/transactions
 * Recent transactions list.
 */
router.get("/transactions", (req, res) => {
  const limit = parseInt(req.query.limit) || 50;
  res.json({ transactions: getTransactions(limit) });
});

module.exports = router;
