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

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to analyze symptoms");
  }
}
