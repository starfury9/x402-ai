const { STXtoMicroSTX } = require("x402-stacks");

/**
 * Agent Registry — all available AI agents with metadata and pricing.
 */
const agents = [
  {
    id: "resume-analyzer",
    name: "Resume Analyzer",
    description:
      "AI-powered resume analysis. Get detailed feedback on structure, keywords, ATS compatibility, and improvement suggestions.",
    icon: "FileText",
    category: "Career",
    priceSTX: 0.002,
    priceMicroSTX: STXtoMicroSTX(0.002).toString(),
    token: "STX",
    inputType: "textarea",
    inputLabel: "Paste your resume text",
    inputPlaceholder: "Paste the full text of your resume here...",
    sampleInput:
      "John Doe\nSoftware Engineer\n5 years experience in React, Node.js, Python\nWorked at Google, Meta\nBS Computer Science from MIT",
    tags: ["resume", "career", "ATS", "job-search"],
    estimatedTime: "~5 seconds",
  },
  {
    id: "smart-contract-auditor",
    name: "Smart Contract Auditor",
    description:
      "Analyze Clarity or Solidity smart contracts for vulnerabilities, gas optimization, and best practices.",
    icon: "Shield",
    category: "Blockchain",
    priceSTX: 0.01,
    priceMicroSTX: STXtoMicroSTX(0.01).toString(),
    token: "STX",
    inputType: "textarea",
    inputLabel: "Paste your smart contract code",
    inputPlaceholder: "(define-public (transfer (amount uint) (to principal)) ...)",
    sampleInput:
      '(define-public (transfer (amount uint) (to principal))\n  (begin\n    (try! (stx-transfer? amount tx-sender to))\n    (ok true)))',
    tags: ["smart-contract", "audit", "security", "clarity"],
    estimatedTime: "~8 seconds",
  },
  {
    id: "text-summarizer",
    name: "Text Summarizer",
    description:
      "Condense long articles, papers, or documents into concise, actionable summaries with key takeaways.",
    icon: "AlignLeft",
    category: "Productivity",
    priceSTX: 0.001,
    priceMicroSTX: STXtoMicroSTX(0.001).toString(),
    token: "STX",
    inputType: "textarea",
    inputLabel: "Paste text to summarize",
    inputPlaceholder: "Paste the article or document text you want summarized...",
    sampleInput:
      "Artificial intelligence has transformed virtually every industry over the past decade. From healthcare to finance, AI systems now assist with complex decision-making, pattern recognition, and process automation. The emergence of large language models has further accelerated this transformation, enabling natural language understanding at unprecedented scales. However, concerns about AI safety, bias, and job displacement remain significant challenges that society must address.",
    tags: ["summarize", "productivity", "writing", "NLP"],
    estimatedTime: "~3 seconds",
  },
  {
    id: "code-reviewer",
    name: "Code Reviewer",
    description:
      "Get instant AI code reviews — find bugs, security issues, performance improvements, and clean-code suggestions.",
    icon: "Code",
    category: "Developer Tools",
    priceSTX: 0.005,
    priceMicroSTX: STXtoMicroSTX(0.005).toString(),
    token: "STX",
    inputType: "textarea",
    inputLabel: "Paste your code",
    inputPlaceholder: "function fetchData() { ... }",
    sampleInput:
      'async function fetchUsers() {\n  const res = await fetch("/api/users");\n  const data = res.json();\n  return data;\n}',
    tags: ["code-review", "bugs", "security", "developer"],
    estimatedTime: "~5 seconds",
  },
  {
    id: "trading-signal",
    name: "Trading Signal Analyzer",
    description:
      "Analyze crypto token data and market conditions to generate trading signals with risk assessment.",
    icon: "TrendingUp",
    category: "Finance",
    priceSTX: 0.005,
    priceMicroSTX: STXtoMicroSTX(0.005).toString(),
    token: "STX",
    inputType: "text",
    inputLabel: "Enter token symbol or pair",
    inputPlaceholder: "e.g. STX/USD, BTC/USD, ETH/BTC",
    sampleInput: "STX/USD",
    tags: ["trading", "crypto", "signals", "DeFi"],
    estimatedTime: "~4 seconds",
  },
  {
    id: "seo-optimizer",
    name: "SEO Content Optimizer",
    description:
      "Analyze web content for SEO — get keyword suggestions, meta tag improvements, readability scores, and ranking tips.",
    icon: "Search",
    category: "Marketing",
    priceSTX: 0.003,
    priceMicroSTX: STXtoMicroSTX(0.003).toString(),
    token: "STX",
    inputType: "textarea",
    inputLabel: "Paste your content or URL description",
    inputPlaceholder: "Paste the blog post or web page content to optimize...",
    sampleInput:
      "How to Build a DeFi Application\n\nDeFi applications are changing the financial landscape. In this guide, we explore how to build your first decentralized finance application using smart contracts and blockchain technology.",
    tags: ["SEO", "content", "marketing", "optimization"],
    estimatedTime: "~5 seconds",
  },
];

function getAgent(id) {
  return agents.find((a) => a.id === id) || null;
}

function getAllAgents() {
  return agents;
}

function getAgentsByCategory(category) {
  return agents.filter(
    (a) => a.category.toLowerCase() === category.toLowerCase()
  );
}

module.exports = { getAgent, getAllAgents, getAgentsByCategory, agents };
