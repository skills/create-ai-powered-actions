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
        content: "You are a helpful assistant that evaluates jokes. Assess whether the input is actually a joke, and if so, rate its humor quality, creativity, and delivery."
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
            is_joke: {
              type: "boolean",
              description: "Whether the input is actually a joke or attempt at humor"
            },
            score: {
              type: ["number", "null"],
              description: "Rating from 1-10, where 10 is the funniest. Null if not a joke."
            },
            humor_type: {
              type: ["string", "null"],
              description: "The type of humor (e.g., pun, wordplay, observational, dark, etc.). Null if not a joke."
            },
            feedback: {
              type: ["string", "null"],
              description: "Short feedback on the joke's strengths and weaknesses. Null if not a joke."
            }
          },
          required: ["is_joke", "score", "humor_type", "feedback"],
          additionalProperties: false
        }
      }
    }
  });

  // Parse and return the structured JSON response
  return JSON.parse(response.choices[0].message.content);
}

module.exports = { rateJoke };
