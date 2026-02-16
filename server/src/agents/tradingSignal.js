const { callLLM } = require("./llmService");

async function analyzeTradingSignal(tokenPair) {
  const prompt = `You are a crypto market analyst. Analyze the token pair "${tokenPair}" and provide a simulated trading signal based on typical market analysis patterns. Note: This is for educational and demonstration purposes only, not financial advice.

Provide your analysis in the following JSON format:
{
  "pair": "${tokenPair}",
  "signal": "<Strong Buy|Buy|Hold|Sell|Strong Sell>",
  "confidence": <number 1-100>,
  "summary": "<2-3 sentence market assessment>",
  "technicalIndicators": {
    "rsi": <number 0-100>,
    "macd": "<Bullish|Bearish|Neutral>",
    "movingAverage": "<Above|Below|At>",
    "volume": "<High|Normal|Low>"
  },
  "supportLevel": "<price level>",
  "resistanceLevel": "<price level>",
  "riskAssessment": "<Low|Medium|High|Very High>",
  "timeframe": "<Short-term|Medium-term|Long-term>",
  "keyFactors": ["<factor 1>", "<factor 2>", "<factor 3>"],
  "disclaimer": "This is a simulated analysis for demonstration purposes only. Not financial advice."
}

Return ONLY valid JSON, no markdown.`;

  const result = await callLLM(prompt);
  try {
    return JSON.parse(result);
  } catch {
    return {
      pair: tokenPair,
      signal: "Hold",
      confidence: 55,
      summary: result,
      technicalIndicators: {
        rsi: 50,
        macd: "Neutral",
        movingAverage: "At",
        volume: "Normal",
      },
      supportLevel: "N/A",
      resistanceLevel: "N/A",
      riskAssessment: "Medium",
      timeframe: "Short-term",
      keyFactors: ["Market analysis unavailable"],
      disclaimer:
        "This is a simulated analysis for demonstration purposes only. Not financial advice.",
    };
  }
}

module.exports = { analyzeTradingSignal };
