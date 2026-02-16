const express = require("express");
const { paymentMiddleware, getPayment } = require("x402-stacks");
const { getAgent } = require("../utils/agentRegistry");
const { recordTransaction } = require("../utils/store");
const config = require("../utils/config");

const { analyzeResume } = require("../agents/resumeAnalyzer");
const { auditContract } = require("../agents/contractAuditor");
const { summarizeText } = require("../agents/textSummarizer");
const { reviewCode } = require("../agents/codeReviewer");
const { analyzeTradingSignal } = require("../agents/tradingSignal");
const { optimizeSEO } = require("../agents/seoOptimizer");

const router = express.Router();

const agentHandlers = {
  "resume-analyzer": (input) => analyzeResume(input),
  "smart-contract-auditor": (input) => auditContract(input),
  "text-summarizer": (input) => summarizeText(input),
  "code-reviewer": (input) => reviewCode(input),
  "trading-signal": (input) => analyzeTradingSignal(input),
  "seo-optimizer": (input) => optimizeSEO(input),
};

const DEMO_MODE = process.env.DEMO_MODE !== "false";

/**
 * POST /api/agents/:agentId/run
 * Execute an AI agent. Protected by x402 payment middleware.
 * In demo mode, payment is simulated. In production, real STX payment is required.
 */
router.post("/:agentId/run", (req, res, next) => {
  const agent = getAgent(req.params.agentId);
  if (!agent) {
    return res.status(404).json({ error: "Agent not found" });
  }

  if (DEMO_MODE) {
    return next();
  }

  const middleware = paymentMiddleware({
    amount: agent.priceMicroSTX,
    address: config.serverAddress,
    network: config.network,
    facilitatorUrl: config.facilitatorUrl,
    description: `AgentPay: ${agent.name} execution`,
    tokenType: "STX",
  });

  middleware(req, res, next);
}, async (req, res) => {
  const { agentId } = req.params;
  const { input } = req.body;

  if (!input || !input.trim()) {
    return res.status(400).json({ error: "Input is required" });
  }

  const agent = getAgent(agentId);
  const handler = agentHandlers[agentId];

  if (!handler) {
    return res.status(404).json({ error: "Agent handler not found" });
  }

  try {
    const payment = getPayment(req);

    const result = await handler(input.trim());

    const txRecord = recordTransaction({
      agentId,
      payer: payment?.payer || "anonymous",
      amount: agent.priceSTX.toString(),
      token: agent.token,
      txId: payment?.transaction || null,
      task: input.trim().substring(0, 100),
    });

    res.json({
      success: true,
      agent: {
        id: agent.id,
        name: agent.name,
        category: agent.category,
      },
      result,
      payment: {
        amount: `${agent.priceSTX} STX`,
        txId: payment?.transaction || null,
        payer: payment?.payer || "anonymous",
        transactionId: txRecord.id,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error(`Agent ${agentId} error:`, error.message);
    res.status(500).json({
      error: "Agent execution failed",
      message: error.message,
    });
  }
});

/**
 * GET /api/agents/:agentId/price
 * Get pricing info for an agent (free endpoint, no payment required).
 */
router.get("/:agentId/price", (req, res) => {
  const agent = getAgent(req.params.agentId);
  if (!agent) {
    return res.status(404).json({ error: "Agent not found" });
  }
  res.json({
    agentId: agent.id,
    name: agent.name,
    priceSTX: agent.priceSTX,
    priceMicroSTX: agent.priceMicroSTX,
    token: agent.token,
    network: config.network,
    payTo: config.serverAddress,
  });
});

module.exports = router;
