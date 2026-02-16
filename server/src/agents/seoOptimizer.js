const { callLLM } = require("./llmService");

async function optimizeSEO(content) {
  const prompt = `You are an SEO expert. Analyze the following web content and provide comprehensive SEO optimization recommendations.

Content:
"""
${content}
"""

Provide your analysis in the following JSON format:
{
  "seoScore": <number 1-100>,
  "summary": "<2-3 sentence assessment>",
  "titleSuggestions": ["<title 1>", "<title 2>"],
  "metaDescription": "<optimized meta description, max 160 chars>",
  "keywords": {
    "primary": ["<keyword 1>", "<keyword 2>"],
    "secondary": ["<keyword 3>", "<keyword 4>"],
    "longTail": ["<long tail phrase 1>", "<long tail phrase 2>"]
  },
  "readabilityScore": <number 1-100>,
  "contentSuggestions": ["<suggestion 1>", "<suggestion 2>", "<suggestion 3>"],
  "structureImprovements": ["<improvement 1>", "<improvement 2>"],
  "competitiveInsight": "<how this content compares to typical top-ranking content>"
}

Return ONLY valid JSON, no markdown.`;

  const result = await callLLM(prompt);
  try {
    return JSON.parse(result);
  } catch {
    return {
      seoScore: 60,
      summary: result,
      titleSuggestions: ["Consider a more keyword-rich title"],
      metaDescription: "Optimize your meta description for better click-through rates",
      keywords: {
        primary: ["content"],
        secondary: ["optimization"],
        longTail: ["how to optimize content for SEO"],
      },
      readabilityScore: 70,
      contentSuggestions: ["Add more headers", "Include internal links"],
      structureImprovements: ["Use H2/H3 tags", "Add bullet points"],
      competitiveInsight: "Analysis limited - try again with more content",
    };
  }
}

module.exports = { optimizeSEO };
