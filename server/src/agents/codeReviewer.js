const { callLLM } = require("./llmService");

async function reviewCode(code) {
  const prompt = `You are a senior software engineer performing a thorough code review. Analyze the following code for bugs, security issues, performance problems, and code quality.

Code:
"""
${code}
"""

Provide your review in the following JSON format:
{
  "language": "<detected language>",
  "overallScore": <number 1-100>,
  "summary": "<2-3 sentence assessment>",
  "bugs": [
    {
      "severity": "<Critical|High|Medium|Low>",
      "line": "<approximate location>",
      "issue": "<description>",
      "fix": "<suggested fix>"
    }
  ],
  "securityIssues": ["<issue 1>"],
  "performanceTips": ["<tip 1>", "<tip 2>"],
  "cleanCodeSuggestions": ["<suggestion 1>", "<suggestion 2>"],
  "refactoredCode": "<improved version of the code>"
}

Return ONLY valid JSON, no markdown.`;

  const result = await callLLM(prompt);
  try {
    return JSON.parse(result);
  } catch {
    return {
      language: "JavaScript",
      overallScore: 70,
      summary: result,
      bugs: [],
      securityIssues: ["Review for potential injection vulnerabilities"],
      performanceTips: ["Consider caching frequently accessed data"],
      cleanCodeSuggestions: ["Add error handling", "Use meaningful variable names"],
      refactoredCode: code,
    };
  }
}

module.exports = { reviewCode };
