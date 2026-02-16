const { callLLM } = require("./llmService");

async function summarizeText(text) {
  const prompt = `You are an expert text summarizer. Create a concise, informative summary of the following text. Extract key points and actionable insights.

Text:
"""
${text}
"""

Provide your summary in the following JSON format:
{
  "summary": "<concise 2-4 sentence summary>",
  "keyPoints": ["<point 1>", "<point 2>", "<point 3>"],
  "actionItems": ["<action 1>", "<action 2>"],
  "sentiment": "<Positive|Negative|Neutral|Mixed>",
  "readingTime": "<estimated reading time of original>",
  "wordCount": {
    "original": <number>,
    "summary": <number>
  },
  "topics": ["<topic 1>", "<topic 2>"]
}

Return ONLY valid JSON, no markdown.`;

  const result = await callLLM(prompt);
  try {
    return JSON.parse(result);
  } catch {
    const words = text.split(/\s+/).length;
    return {
      summary: result,
      keyPoints: ["See summary above for key details"],
      actionItems: [],
      sentiment: "Neutral",
      readingTime: `${Math.ceil(words / 200)} min`,
      wordCount: { original: words, summary: result.split(/\s+/).length },
      topics: ["General"],
    };
  }
}

module.exports = { summarizeText };
