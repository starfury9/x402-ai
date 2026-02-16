# AgentPay — Pay-Per-Use AI Agent Marketplace

> **Built for the x402 Stacks Challenge** | Feb 9–16, 2026

AgentPay is a marketplace where AI agents are monetized via **micropayments** using the **x402-stacks** protocol. No subscriptions. No API keys. Just **pay-per-use** with STX or sBTC on the Stacks blockchain.

![AgentPay](https://img.shields.io/badge/x402--stacks-v2-purple?style=for-the-badge)
![Stacks](https://img.shields.io/badge/Stacks-Testnet-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## The Problem

- AI tools are locked behind expensive SaaS subscriptions
- No way to charge micro-amounts ($0.001–$0.01) for single AI tasks
- Credit cards can't handle micropayments (min ~$0.50 + 2.9% fees)
- No native machine-to-machine payment rails for AI agents

## The Solution

**AgentPay** uses the [x402-stacks](https://www.npmjs.com/package/x402-stacks) protocol to enable:

```
User → Pick Agent → Submit Task → HTTP 402 → Pay STX → Agent Executes → Result
```

Every AI agent endpoint is protected by `paymentMiddleware` from x402-stacks. When a user runs a task:

1. The server responds with **HTTP 402 Payment Required**
2. The client automatically signs an STX transaction
3. The facilitator settles the payment on the Stacks blockchain
4. The server executes the AI agent and returns the result

**Cost per task: 0.001–0.01 STX** (fractions of a cent)

## AI Agents Available

| Agent | Description | Price |
|-------|-------------|-------|
| Resume Analyzer | AI resume feedback, ATS scoring, improvement tips | 0.002 STX |
| Smart Contract Auditor | Clarity/Solidity security analysis | 0.01 STX |
| Text Summarizer | Condense articles into key takeaways | 0.001 STX |
| Code Reviewer | Bug detection, security checks, refactoring | 0.005 STX |
| Trading Signal Analyzer | Crypto market analysis & signals | 0.005 STX |
| SEO Content Optimizer | SEO scoring, keyword suggestions | 0.003 STX |

## Tech Stack

- **Protocol**: [x402-stacks v2](https://www.npmjs.com/package/x402-stacks) — HTTP 402 payments on Stacks
- **Backend**: Node.js + Express with `paymentMiddleware`
- **Frontend**: React + Vite + Tailwind CSS
- **AI**: OpenAI GPT-4o-mini (with mock fallback for demo)
- **Blockchain**: Stacks (STX/sBTC) via x402 facilitator

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- (Optional) OpenAI API key for real AI inference
- (Optional) Stacks testnet wallet for payments

### Installation

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/agentpay.git
cd agentpay

# Install all dependencies
npm run install:all
```

### Configuration

```bash
# Copy environment template
cp server/.env.example server/.env

# Edit server/.env with your values:
# - SERVER_ADDRESS: Your Stacks address (receives payments)
# - OPENAI_API_KEY: For real AI inference (optional, mock mode works without it)
# - NETWORK: testnet (default)
```

### Run

```bash
# Terminal 1: Start the backend
npm run dev:server

# Terminal 2: Start the frontend
npm run dev:client
```

Then open **http://localhost:5173** in your browser.

### Demo Mode

The app works out of the box in **demo mode** without a wallet or OpenAI key:
- AI agents return realistic mock responses
- Payment flow is simulated visually
- Dashboard tracks all transactions

For **real x402 payments**, connect a Stacks testnet wallet:
1. Get testnet STX from the [Stacks Faucet](https://explorer.stacks.co/sandbox/faucet?chain=testnet)
2. Use `wrapAxiosWithPayment` from x402-stacks on the client
3. The payment middleware handles the 402 flow automatically

## x402-stacks Integration

### Server — Payment Middleware

```javascript
const { paymentMiddleware, getPayment, STXtoMicroSTX } = require("x402-stacks");

app.post("/api/agents/resume-analyzer/run",
  paymentMiddleware({
    amount: STXtoMicroSTX(0.002),           // 0.002 STX
    address: "ST1PQHQKV...",                // seller address
    network: "testnet",
    facilitatorUrl: "https://facilitator.stacksx402.com",
    description: "Resume Analyzer execution",
    tokenType: "STX",
  }),
  async (req, res) => {
    const payment = getPayment(req);         // payment details
    const result = await analyzeResume(req.body.input);
    res.json({ result, payment });
  }
);
```

### Client — Automatic Payment

```javascript
import { wrapAxiosWithPayment, privateKeyToAccount } from "x402-stacks";

const account = privateKeyToAccount(privateKey, "testnet");
const api = wrapAxiosWithPayment(axios.create(), account);

// 402 payments are handled automatically!
const { data } = await api.post("/api/agents/resume-analyzer/run", {
  input: "My resume text..."
});
```

## Architecture

```
┌─────────────┐     HTTP 402      ┌──────────────┐     Settle      ┌─────────────┐
│   Frontend   │ ───────────────→ │   Express     │ ──────────────→ │ Facilitator │
│   (React)    │ ←─── Result ──── │   Server      │ ←── Confirm ── │  (x402)     │
│              │                  │               │                 │             │
│  Agent Cards │  payment-sig     │ paymentMiddle │  POST /settle   │  Broadcasts │
│  Task Runner │ ──────────────→ │  ware (x402)  │ ──────────────→ │  to Stacks  │
│  Dashboard   │                  │  AI Agents    │                 │  blockchain │
└─────────────┘                  └──────────────┘                 └─────────────┘
```

## Project Structure

```
agentpay/
├── server/
│   ├── src/
│   │   ├── index.js              # Express server entry
│   │   ├── agents/               # AI agent implementations
│   │   │   ├── llmService.js     # OpenAI API + mock fallback
│   │   │   ├── resumeAnalyzer.js
│   │   │   ├── contractAuditor.js
│   │   │   ├── textSummarizer.js
│   │   │   ├── codeReviewer.js
│   │   │   ├── tradingSignal.js
│   │   │   └── seoOptimizer.js
│   │   ├── routes/
│   │   │   ├── agents.js         # x402-protected agent endpoints
│   │   │   ├── marketplace.js    # Agent discovery & metadata
│   │   │   └── stats.js          # Analytics & transactions
│   │   └── utils/
│   │       ├── agentRegistry.js  # Agent definitions & pricing
│   │       ├── config.js
│   │       └── store.js          # In-memory transaction store
│   ├── .env.example
│   └── package.json
├── client/
│   ├── src/
│   │   ├── App.jsx               # Main app with routing
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── AgentCard.jsx
│   │   │   ├── AgentModal.jsx    # Task runner + payment flow
│   │   │   ├── Dashboard.jsx     # Analytics & tx history
│   │   │   └── Footer.jsx
│   │   ├── hooks/
│   │   │   └── useMarketplace.js
│   │   └── utils/
│   │       └── api.js
│   ├── index.html
│   └── package.json
├── package.json                  # Root scripts
└── README.md
```

## Why AgentPay Matters

1. **Micropayments for AI** — Pay $0.001 per task instead of $20/month subscriptions
2. **No Gatekeeping** — No accounts, API keys, or credit cards needed
3. **Global Access** — Anyone with STX can use AI tools, worldwide
4. **Machine-to-Machine Ready** — AI agents can pay other agents autonomously
5. **Bitcoin-Secured** — All payments anchored to Bitcoin via Stacks

## Resources

- [x402-stacks Documentation](https://docs.x402stacks.xyz/)
- [x402-stacks npm](https://www.npmjs.com/package/x402-stacks)
- [x402-stacks GitHub](https://github.com/tony1908/x402Stacks)
- [Stacks Blockchain](https://stacks.co)
- [Stacks Testnet Faucet](https://explorer.stacks.co/sandbox/faucet?chain=testnet)

## License

MIT — Built with love for the x402 Stacks Challenge.
