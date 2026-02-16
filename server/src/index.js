require("dotenv").config();
const express = require("express");
const cors = require("cors");
const agentRoutes = require("./routes/agents");
const marketplaceRoutes = require("./routes/marketplace");
const statsRoutes = require("./routes/stats");

const app = express();
const PORT = process.env.PORT || 4000;

const allowedOrigins = [
  process.env.CLIENT_URL || "http://localhost:5173",
  "http://localhost:5173",
  "http://localhost:5174",
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.some((o) => origin.startsWith(o)) || origin.endsWith(".vercel.app")) {
        callback(null, true);
      } else {
        callback(null, true); // allow all in demo mode
      }
    },
  })
);
app.use(express.json({ limit: "10mb" }));

app.get("/", (_req, res) => {
  res.json({
    name: "AgentPay API",
    version: "1.0.0",
    description: "Pay-Per-Use AI Agent Marketplace powered by x402-stacks",
    endpoints: {
      marketplace: "/api/marketplace",
      agents: "/api/agents",
      stats: "/api/stats",
    },
  });
});

app.use("/api/marketplace", marketplaceRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api/stats", statsRoutes);

app.use((err, _req, res, _next) => {
  console.error("Server error:", err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`\n  AgentPay Server running on http://localhost:${PORT}`);
  console.log(`  Network: ${process.env.NETWORK || "testnet"}`);
  console.log(`  Seller address: ${process.env.SERVER_ADDRESS}\n`);
});
