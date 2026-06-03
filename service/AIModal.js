import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const AIChatSession = {
  sendMessage: async (prompt) => {
    const response = await groq.chat.completions.create({
      // model: "llama3-8b-8192",
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 1,
      max_tokens: 1024,
    });

    const text = response.choices[0]?.message?.content || "";

    return {
      response: {
        text: () => text,
      },
    };
  },
};