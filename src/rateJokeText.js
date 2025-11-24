const OpenAI = require("openai");


async function rateJoke(joke, token) {
  const endpoint = "https://models.github.ai/inference";
  const model = "openai/gpt-4.1";

  // Initialize OpenAI client with GitHub Models endpoint
  const client = new OpenAI({ baseURL: endpoint, apiKey: token });

  // Create chat completion with system and user messages
  const response = await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a joke critic who evaluates humor quality, creativity, and delivery. Provide a detailed but concise evaluation."
      },
      {
        role: "user",
        content: `Please rate this joke: "${joke}"`
      }
    ],
    temperature: 1.0,
    top_p: 1.0,
    model: model
  });

  // Return the plain text response from the AI
  return response.choices[0].message.content;
}

module.exports = { rateJoke };
