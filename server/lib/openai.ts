import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function analyzeSeverity(symptoms: string[], riskFactors: string[]) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a medical analysis system specializing in HIV symptom severity assessment. Provide detailed analysis of symptoms and risk factors. Return response in JSON format with severity scores and detailed explanations."
        },
        {
          role: "user",
          content: `Please analyze these HIV-related symptoms and risk factors:\n\nSymptoms: ${symptoms.join(", ")}\nRisk Factors: ${riskFactors.join(", ")}`
        }
      ],
      response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content || "{}");
  } catch (error) {
    console.error("OpenAI API error:", error);
    // Return a fallback response when API fails
    return {
      analysis: "Unable to perform AI analysis at this time. Please consult the risk level assessment and recommendations provided.",
      score: calculateBasicSeverityScore(symptoms.length, riskFactors.length)
    };
  }
}

function calculateBasicSeverityScore(symptomsCount: number, riskFactorsCount: number): number {
  // Simple fallback calculation when AI is unavailable
  const symptomWeight = 0.6;
  const riskFactorWeight = 0.4;

  const maxSymptoms = 9; // Based on our symptomsList length
  const maxRiskFactors = 5; // Based on our riskFactorsList length

  const symptomScore = (symptomsCount / maxSymptoms) * symptomWeight * 10;
  const riskScore = (riskFactorsCount / maxRiskFactors) * riskFactorWeight * 10;

  return Math.min(Math.round((symptomScore + riskScore) * 10) / 10, 10);
}