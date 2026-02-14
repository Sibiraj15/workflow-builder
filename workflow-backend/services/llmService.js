const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const stepPrompts = {
  clean: (text) =>
    `Clean the following text by fixing grammar and removing unnecessary spaces:\n\n${text}`,

  summarize: (text) =>
    `Summarize the following text clearly:\n\n${text}`,

  extract: (text) =>
    `Extract key points as bullet points:\n\n${text}`,

  tag: (text) =>
    `Give a short category tag (1-3 words):\n\n${text}`,
};

const runStep = async (step, inputText) => {
  const prompt = stepPrompts[step](inputText);

  const response = await client.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: prompt },
    ],
    temperature: 0.3,
  });

  return response.choices[0].message.content;
};


module.exports = { runStep };
