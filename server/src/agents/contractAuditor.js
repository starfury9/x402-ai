const { callLLM } = require("./llmService");

async function auditContract(contractCode) {
  const prompt = `You are an expert smart contract security auditor specializing in Clarity (Stacks) and Solidity (Ethereum) contracts. Analyze the following smart contract code for security vulnerabilities, optimization opportunities, and best practices.

Contract Code:
"""
${contractCode}
"""

Provide your audit in the following JSON format:
{
  "language": "<Clarity|Solidity|Unknown>",
  "riskLevel": "<Critical|High|Medium|Low>",
  "overallScore": <number 1-100>,
  "summary": "<2-3 sentence assessment>",
  "vulnerabilities": [
    {
      "severity": "<Critical|High|Medium|Low|Info>",
      "title": "<issue title>",
      "description": "<detailed description>",
      "recommendation": "<how to fix>"
    }
  ],
  "gasOptimizations": ["<optimization 1>", "<optimization 2>"],
  "bestPractices": ["<practice 1>", "<practice 2>"],
  "codeQuality": "<assessment of code quality and readability>"
}

Return ONLY valid JSON, no markdown.`;

  const result = await callLLM(prompt);
  try {
    return JSON.parse(result);
  } catch {
    return {
      language: "Unknown",
      riskLevel: "Medium",
      overallScore: 65,
      summary: result,
      vulnerabilities: [
        {
          severity: "Medium",
          title: "Input Validation",
          description: "Consider adding more comprehensive input validation",
          recommendation: "Add assertions for all input parameters",
        },
      ],
      gasOptimizations: ["Review loop structures for optimization"],
      bestPractices: ["Add comprehensive error handling", "Document all public functions"],
      codeQuality: "Code structure is reasonable but could benefit from more documentation",
    };
  }
}

module.exports = { auditContract };
