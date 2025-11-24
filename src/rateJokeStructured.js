const OpenAI = require("openai");


async function rateJoke(joke, token) {
  const endpoint = "https://models.github.ai/inference";
  const model = "openai/gpt-4.1";

  // Initialize OpenAI client with GitHub Models endpoint
  const client = new OpenAI({ baseURL: endpoint, apiKey: token });

  // Create chat completion with structured output format
  const response = await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a joke critic who evaluates humor quality, creativity, and delivery. Provide structured evaluations."
      },
      {
        role: "user",
        content: `Please rate this joke: "${joke}"`
      }
    ],
    temperature: 1.0,
    top_p: 1.0,
    model: model,
    // Define the structured output format using JSON Schema
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "joke_rating",
        strict: true,
        schema: {
          type: "object",
          properties: {
            score: {
              type: "number",
              description: "Rating from 1-10, where 10 is the funniest"
            },
            humor_type: {
              type: "string",
              description: "The type of humor (e.g., pun, wordplay, observational, dark, etc.)"
            },
            feedback: {
              type: "string",
              description: "Short feedback on the joke's strengths and weaknesses"
            }
          },
          required: ["score", "humor_type", "feedback"],
          additionalProperties: false
        }
      }
    }
  });

  // Parse and return the structured JSON response
  return JSON.parse(response.choices[0].message.content);
}

module.exports = { rateJoke };
