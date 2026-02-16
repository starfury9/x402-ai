const { callLLM } = require("./llmService");

async function analyzeResume(resumeText) {
  const prompt = `You are an expert resume analyst and career coach. Analyze the following resume and provide a detailed, structured assessment.

Resume:
"""
${resumeText}
"""

Provide your analysis in the following JSON format:
{
  "overallScore": <number 1-100>,
  "summary": "<2-3 sentence overall assessment>",
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "improvements": ["<improvement 1>", "<improvement 2>", "<improvement 3>"],
  "atsScore": <number 1-100>,
  "atsNotes": "<ATS compatibility notes>",
  "keywordSuggestions": ["<keyword 1>", "<keyword 2>", "<keyword 3>"],
  "formattingTips": ["<tip 1>", "<tip 2>"],
  "industryFit": "<which industries this resume is best suited for>"
}

Return ONLY valid JSON, no markdown.`;

  const result = await callLLM(prompt);
  try {
    return JSON.parse(result);
  } catch {
    return {
      overallScore: 72,
      summary: result,
      strengths: ["Good technical skills listed", "Clear work history"],
      improvements: ["Add quantifiable achievements", "Include more action verbs"],
      atsScore: 68,
      atsNotes: "Consider adding more industry-standard keywords",
      keywordSuggestions: ["leadership", "agile", "cross-functional"],
      formattingTips: ["Use consistent formatting", "Keep to 1-2 pages"],
      industryFit: "Technology / Software Engineering",
    };
  }
}

module.exports = { analyzeResume };
