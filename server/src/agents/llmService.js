const axios = require("axios");
const config = require("../utils/config");

/**
 * Calls OpenAI (or compatible) API for AI inference.
 * Falls back to a mock response if no API key is configured.
 */
async function callLLM(prompt) {
  if (!config.openaiKey || config.openaiKey === "sk-your-openai-api-key") {
    return getMockResponse(prompt);
  }

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 1500,
      },
      {
        headers: {
          Authorization: `Bearer ${config.openaiKey}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("LLM API error:", error.message);
    return getMockResponse(prompt);
  }
}

function getMockResponse(prompt) {
  const lower = prompt.toLowerCase();

  if (lower.includes("resume")) {
    return JSON.stringify({
      overallScore: 78,
      summary:
        "Strong technical background with clear progression. Resume demonstrates solid experience but could benefit from more quantifiable achievements and modern formatting.",
      strengths: [
        "Strong technical skill set with in-demand technologies",
        "Progressive career growth with recognized companies",
        "Clear educational background from top institution",
      ],
      improvements: [
        "Add quantifiable metrics (e.g., 'Increased performance by 40%')",
        "Include a professional summary section at the top",
        "Add relevant certifications or continuous learning",
      ],
      atsScore: 72,
      atsNotes:
        "Good keyword density for tech roles. Consider adding more role-specific terms matching job descriptions.",
      keywordSuggestions: [
        "full-stack development",
        "agile methodology",
        "CI/CD pipeline",
        "microservices architecture",
        "team leadership",
      ],
      formattingTips: [
        "Use consistent bullet point formatting throughout",
        "Keep resume to 1-2 pages maximum",
      ],
      industryFit: "Technology / Software Engineering / FinTech",
    });
  }

  if (lower.includes("smart contract") || lower.includes("audit")) {
    return JSON.stringify({
      language: "Clarity",
      riskLevel: "Medium",
      overallScore: 71,
      summary:
        "The contract implements basic transfer functionality. While the core logic is sound, there are missing access controls and insufficient input validation that should be addressed before deployment.",
      vulnerabilities: [
        {
          severity: "High",
          title: "Missing Access Control",
          description: "The transfer function lacks role-based access restrictions",
          recommendation:
            "Implement an authorization check using contract-caller or a whitelist",
        },
        {
          severity: "Medium",
          title: "No Amount Validation",
          description: "Zero-amount transfers are not prevented",
          recommendation: "Add (asserts! (> amount u0) (err u1)) at the start",
        },
        {
          severity: "Low",
          title: "Missing Event Emission",
          description: "No print statements for transaction tracking",
          recommendation:
            "Add (print { event: \"transfer\", amount: amount, to: to })",
        },
      ],
      gasOptimizations: [
        "The contract is simple and gas-efficient",
        "Consider batching multiple transfers for bulk operations",
      ],
      bestPractices: [
        "Add comprehensive documentation with ;; comments",
        "Implement error codes as constants for readability",
        "Add a contract owner pattern for admin functions",
      ],
      codeQuality:
        "Clean and readable but needs more defensive programming patterns",
    });
  }

  if (lower.includes("summariz")) {
    const inputWords = prompt.split(/\s+/).length;
    return JSON.stringify({
      summary:
        "The text discusses the transformative impact of AI across industries, highlighting the role of large language models while acknowledging ongoing challenges around safety, bias, and workforce displacement.",
      keyPoints: [
        "AI has transformed virtually every industry in the past decade",
        "Large language models have accelerated AI adoption significantly",
        "Key concerns include AI safety, bias, and job displacement",
      ],
      actionItems: [
        "Stay informed about AI developments in your industry",
        "Consider AI safety implications when deploying systems",
      ],
      sentiment: "Mixed",
      readingTime: `${Math.ceil(inputWords / 200)} min`,
      wordCount: { original: inputWords, summary: 42 },
      topics: ["Artificial Intelligence", "Technology Impact", "AI Ethics"],
    });
  }

  if (lower.includes("code review") || lower.includes("code")) {
    return JSON.stringify({
      language: "JavaScript",
      overallScore: 62,
      summary:
        "The code has a critical bug: missing `await` on the `.json()` call, which will return a Promise instead of parsed data. Error handling is also absent.",
      bugs: [
        {
          severity: "Critical",
          line: "Line 3",
          issue: "Missing `await` on `res.json()` — returns a Promise, not data",
          fix: "Change to `const data = await res.json();`",
        },
        {
          severity: "High",
          line: "Line 2",
          issue: "No error handling for failed HTTP requests",
          fix: "Add `if (!res.ok) throw new Error(res.statusText);` after fetch",
        },
      ],
      securityIssues: [
        "No input sanitization on API endpoint",
        "Consider adding request timeout to prevent hanging",
      ],
      performanceTips: [
        "Add caching for frequently requested user data",
        "Consider implementing pagination for large user lists",
      ],
      cleanCodeSuggestions: [
        "Add TypeScript types for the return value",
        "Extract the API base URL to a configuration constant",
        "Add JSDoc documentation for the function",
      ],
      refactoredCode:
        'async function fetchUsers() {\n  try {\n    const res = await fetch("/api/users");\n    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);\n    const data = await res.json();\n    return data;\n  } catch (error) {\n    console.error("Failed to fetch users:", error);\n    throw error;\n  }\n}',
    });
  }

  if (lower.includes("trading") || lower.includes("signal")) {
    return JSON.stringify({
      pair: "STX/USD",
      signal: "Buy",
      confidence: 68,
      summary:
        "STX shows bullish momentum with increasing developer activity on Stacks. Technical indicators suggest a potential breakout above current resistance levels.",
      technicalIndicators: {
        rsi: 58,
        macd: "Bullish",
        movingAverage: "Above",
        volume: "High",
      },
      supportLevel: "$0.45",
      resistanceLevel: "$0.72",
      riskAssessment: "Medium",
      timeframe: "Medium-term",
      keyFactors: [
        "Growing Stacks ecosystem and developer activity",
        "Bitcoin correlation providing support",
        "Increasing institutional interest in L2 solutions",
      ],
      disclaimer:
        "This is a simulated analysis for demonstration purposes only. Not financial advice.",
    });
  }

  if (lower.includes("seo")) {
    return JSON.stringify({
      seoScore: 58,
      summary:
        "The content has a good foundation but lacks key SEO elements. Adding structured headers, meta descriptions, and targeted keywords would significantly improve visibility.",
      titleSuggestions: [
        "How to Build a DeFi Application: Complete 2026 Guide",
        "Build Your First DeFi App: Smart Contract Tutorial for Beginners",
      ],
      metaDescription:
        "Learn how to build a DeFi application step-by-step. This guide covers smart contracts, blockchain integration, and decentralized finance development.",
      keywords: {
        primary: ["DeFi application", "decentralized finance"],
        secondary: ["smart contracts", "blockchain development"],
        longTail: [
          "how to build a defi application from scratch",
          "DeFi development tutorial 2026",
        ],
      },
      readabilityScore: 74,
      contentSuggestions: [
        "Add code examples and screenshots for better engagement",
        "Include a table of contents for long-form content",
        "Add internal links to related blockchain tutorials",
      ],
      structureImprovements: [
        "Break content into H2/H3 sections for better scannability",
        "Add a FAQ section targeting common questions",
      ],
      competitiveInsight:
        "Top-ranking DeFi tutorials typically include 2000+ words, code samples, and step-by-step instructions",
    });
  }

  return JSON.stringify({
    result: "Analysis complete",
    message: "Mock response — configure OPENAI_API_KEY for real AI inference",
  });
}

module.exports = { callLLM };
